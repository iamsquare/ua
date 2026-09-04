import { map } from 'remeda';

import type { ParserAdapter } from '@/adapters/types';

export type SpeedResult = {
  id: string;
  label: string;
  totalMs: number;
  opsPerSec: number;
  iterations: number;
  uaCount: number;
};

const WARMUP_ITERS = 3;
const BENCH_ITERS = 5;

const parseAll = async (adapter: ParserAdapter, uas: string[]) => {
  await Promise.all(map(uas, (ua) => Promise.resolve(adapter.parse(ua))));
};

const runPasses = async (adapter: ParserAdapter, uas: string[], iterations: number) => {
  for (let i = 0; i < iterations; i++) {
    await parseAll(adapter, uas);
  }
};

export const measureSpeed = async (adapter: ParserAdapter, uas: string[]): Promise<SpeedResult> => {
  await runPasses(adapter, uas, WARMUP_ITERS);

  const start = performance.now();

  await runPasses(adapter, uas, BENCH_ITERS);

  const totalMs = performance.now() - start;
  const totalOps = uas.length * BENCH_ITERS;

  return {
    id: adapter.id,
    label: adapter.label,
    totalMs,
    opsPerSec: totalMs === 0 ? 0 : (totalOps / totalMs) * 1000,
    iterations: BENCH_ITERS,
    uaCount: uas.length,
  };
};
