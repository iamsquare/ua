import { parseUA } from '@iamsquare/ua';

import { type ParserAdapter } from '@/adapters/types';

export const iamsquareAdapter = {
  id: '@iamsquare/ua',
  label: '@iamsquare/ua',
  entry: '@iamsquare/ua',
  parse: (ua) => {
    const result = parseUA(ua);

    return {
      browser: result.browser,
      os: result.os,
      device: result.device,
      cpu: result.cpu,
      engine: result.engine,
    };
  },
} as const satisfies ParserAdapter;
