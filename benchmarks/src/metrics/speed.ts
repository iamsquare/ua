import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { filter, isEmptyish, last, pipe, split, startsWith } from 'remeda';
import { Bench } from 'tinybench';

import type { ParserAdapter } from '@/adapters/types';

export type SpeedResult = {
  id: string;
  label: string;
  totalMs: number;
  opsPerSec: number;
  iterations: number;
  uaCount: number;
};

const execFileAsync = promisify(execFile);

const BENCH_TIME_MS = 2000;
const WARMUP_TIME_MS = 2000;

const workerPath = fileURLToPath(new URL('../run-speed-worker.ts', import.meta.url));

export const measureSpeed = async (adapter: ParserAdapter, uas: string[]) => {
  if (uas.length === 0) {
    return {
      id: adapter.id,
      label: adapter.label,
      totalMs: 0,
      opsPerSec: 0,
      iterations: 0,
      uaCount: 0,
    };
  }

  let index = 0;

  const bench = new Bench({ time: BENCH_TIME_MS, warmupTime: WARMUP_TIME_MS, throws: true });

  bench.add(
    adapter.id,
    () => {
      adapter.parse(uas[index] ?? '');
      index = (index + 1) % uas.length;
    },
    { async: false },
  );

  await bench.run();

  const task = bench.getTask(adapter.id);
  const result = task?.result;

  if (result?.state !== 'completed') {
    throw new Error(
      `Speed benchmark failed for ${adapter.id}: ${result?.state ?? 'missing result'}`,
    );
  }

  return {
    id: adapter.id,
    label: adapter.label,
    totalMs: result.totalTime,
    opsPerSec: result.throughput.mean,
    iterations: result.throughput.samplesCount,
    uaCount: uas.length,
  };
};

export const measureSpeedIsolated = async (adapterId: string): Promise<SpeedResult> => {
  const { stdout, stderr } = await execFileAsync('pnpm', ['exec', 'tsx', workerPath, adapterId], {
    cwd: fileURLToPath(new URL('../..', import.meta.url)),
    maxBuffer: 10 * 1024 * 1024,
    encoding: 'utf8',
  });

  const line = pipe(stdout.trim(), split('\n'), filter(startsWith('{')), last());

  if (isEmptyish(line)) {
    throw new Error(`Speed worker produced no JSON for ${adapterId}\nstderr: ${stderr}`);
  }

  return JSON.parse(line);
};
