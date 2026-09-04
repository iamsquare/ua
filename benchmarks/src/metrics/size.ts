import { gzipSync } from 'node:zlib';

import { build } from 'esbuild';
import { map } from 'remeda';

import type { ParserAdapter } from '@/adapters/types';

export type SizeResult = {
  id: string;
  label: string;
  rawBytes: number;
  gzipBytes: number;
};

const bundleEntry = async (entry: string) => {
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    target: 'node20',
    logLevel: 'silent',
  });

  return result.outputFiles[0]?.contents ?? new Uint8Array();
};

export const measureSize = async (adapter: ParserAdapter): Promise<SizeResult> => {
  const bytes = await bundleEntry(adapter.entry);

  return {
    id: adapter.id,
    label: adapter.label,
    rawBytes: bytes.byteLength,
    gzipBytes: gzipSync(bytes).byteLength,
  };
};

export const measureSizes = (adapters: ParserAdapter[]) => Promise.all(map(adapters, measureSize));
