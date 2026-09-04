import { UAParser } from 'ua-parser-js';

import { type ParserAdapter, undefToUndefined } from '@/adapters/types';

export const uaParserJsAdapter = {
  id: 'ua-parser-js',
  label: 'ua-parser-js',
  entry: 'ua-parser-js',
  parse: (ua) => {
    const result = UAParser(ua);

    return {
      browser: {
        name: undefToUndefined(result.browser.name),
        version: undefToUndefined(result.browser.version),
        major: undefToUndefined(result.browser.major),
      },
      os: {
        name: undefToUndefined(result.os.name),
        version: undefToUndefined(result.os.version),
      },
      device: {
        vendor: undefToUndefined(result.device.vendor),
        model: undefToUndefined(result.device.model),
        type: undefToUndefined(result.device.type),
      },
      cpu: {
        architecture: undefToUndefined(result.cpu.architecture),
      },
      engine: {
        name: undefToUndefined(result.engine.name),
        version: undefToUndefined(result.engine.version),
      },
    };
  },
} as const satisfies ParserAdapter;
