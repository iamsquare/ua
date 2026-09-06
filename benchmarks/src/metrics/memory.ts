import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { filter, isEmptyish, last, pipe, split, startsWith } from 'remeda';

export type MemoryResult = {
  id: string;
  label: string;
  importHeapBytes: number;
  parseHeapBytes: number;
  uaCount: number;
};

const execFileAsync = promisify(execFile);

const workerPath = fileURLToPath(new URL('../run-memory-worker.ts', import.meta.url));
const benchmarksDir = fileURLToPath(new URL('..', import.meta.url));

export const measureMemoryIsolated = async (adapterId: string): Promise<MemoryResult> => {
  const { stdout, stderr } = await execFileAsync(
    'node',
    ['--expose-gc', '--import', 'tsx', workerPath, adapterId],
    {
      cwd: benchmarksDir,
      maxBuffer: 10 * 1024 * 1024,
      encoding: 'utf8',
    },
  );

  const line = pipe(stdout.trim(), split('\n'), filter(startsWith('{')), last());

  if (isEmptyish(line)) {
    throw new Error(`Memory worker produced no JSON for ${adapterId}\nstderr: ${stderr}`);
  }

  return JSON.parse(line);
};
