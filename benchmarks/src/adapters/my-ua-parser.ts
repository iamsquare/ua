import UAParser from 'my-ua-parser';

import { type ParserAdapter, undefToUndefined } from '@/adapters/types';

export const myUaParserAdapter = {
  id: 'my-ua-parser',
  label: 'my-ua-parser',
  entry: 'my-ua-parser',
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
