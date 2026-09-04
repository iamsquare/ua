import { detect } from 'detect-browser';
import { hasProp, isNullish } from 'remeda';

import { type ParserAdapter, undefToUndefined } from '@/adapters/types';

export const detectBrowserAdapter = {
  id: 'detect-browser',
  label: 'detect-browser',
  entry: 'detect-browser',
  parse: (ua) => {
    const result = detect(ua);

    if (isNullish(result) || result.type === 'bot' || result.type === 'node') return {};

    return {
      browser: {
        name: undefToUndefined(result.name),
        version: undefToUndefined(result.version),
      },
      os: {
        name: undefToUndefined(hasProp(result, 'os') ? result.os : undefined),
      },
    };
  },
} as const satisfies ParserAdapter;
