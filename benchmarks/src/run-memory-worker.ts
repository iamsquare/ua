import { consola } from 'consola';
import { isFunction, map } from 'remeda';

import type { ParserAdapter } from '@/adapters/types';
import { allUserAgents, loadFixtures } from '@/load-fixtures';
import type { MemoryResult } from '@/metrics/memory';

const forceGc = () => {
  if (!isFunction(globalThis.gc)) {
    throw new Error('Memory worker requires --expose-gc');
  }

  globalThis.gc();
  globalThis.gc();
};

const heapUsed = () => process.memoryUsage().heapUsed;

const loadAdapterIsolated = async (id: string): Promise<ParserAdapter> => {
  switch (id) {
    case '@iamsquare/ua':
      return (await import('./adapters/iamsquare')).iamsquareAdapter;
    case 'ua-parser-js':
      return (await import('./adapters/ua-parser-js')).uaParserJsAdapter;
    case 'my-ua-parser':
      return (await import('./adapters/my-ua-parser')).myUaParserAdapter;
    case 'bowser':
      return (await import('./adapters/bowser')).bowserAdapter;
    case 'platform':
      return (await import('./adapters/platform')).platformAdapter;
    case 'detect-browser':
      return (await import('./adapters/detect-browser')).detectBrowserAdapter;
    default:
      throw new Error(`Unknown adapter id: ${id}`);
  }
};

const main = async () => {
  const adapterId = process.argv[2];

  if (!adapterId) {
    throw new Error('Usage: node --expose-gc --import tsx src/run-memory-worker.ts <adapter-id>');
  }

  forceGc();
  const baseline = heapUsed();

  const adapter = await loadAdapterIsolated(adapterId);

  forceGc();
  const afterImport = heapUsed();

  const uas = allUserAgents(loadFixtures());

  forceGc();
  const afterFixtures = heapUsed();

  const results = await Promise.all(map(uas, (ua) => adapter.parse(ua)));

  forceGc();
  const afterParse = heapUsed();

  const result = {
    id: adapter.id,
    label: adapter.label,
    importHeapBytes: Math.max(0, afterImport - baseline),
    parseHeapBytes: Math.max(0, afterParse - afterFixtures),
    uaCount: results.length,
  } as const satisfies MemoryResult;

  process.stdout.write(`${JSON.stringify(result)}\n`);
};

main().catch((error: unknown) => {
  consola.error(error);
  process.exitCode = 1;
});
