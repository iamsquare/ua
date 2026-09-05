import { find } from 'remeda';

import { bowserAdapter } from '@/adapters/bowser';
import { detectBrowserAdapter } from '@/adapters/detect-browser';
import { iamsquareAdapter } from '@/adapters/iamsquare';
import { myUaParserAdapter } from '@/adapters/my-ua-parser';
import { platformAdapter } from '@/adapters/platform';
import type { ParserAdapter } from '@/adapters/types';
import { uaParserJsAdapter } from '@/adapters/ua-parser-js';

export const adapters = [
  iamsquareAdapter,
  uaParserJsAdapter,
  myUaParserAdapter,
  bowserAdapter,
  platformAdapter,
  detectBrowserAdapter,
] as const satisfies readonly ParserAdapter[];

export const loadAdapter = (id: string): ParserAdapter => {
  const adapter = find(adapters, (entry) => entry.id === id);

  if (!adapter) throw new Error(`Unknown adapter id: ${id}`);

  return adapter;
};
