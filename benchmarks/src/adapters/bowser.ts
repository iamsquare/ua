// eslint-disable-next-line import-x/default
import Bowser from 'bowser';

import { type ParserAdapter, undefToUndefined } from '@/adapters/types';

export const bowserAdapter = {
  id: 'bowser',
  label: 'bowser',
  entry: 'bowser',
  parse: (ua) => {
    const result = Bowser.parse(ua);

    return {
      browser: {
        name: undefToUndefined(result.browser.name),
        version: undefToUndefined(result.browser.version),
      },
      os: {
        name: undefToUndefined(result.os.name),
        version: undefToUndefined(result.os.version),
      },
      device: {
        type: undefToUndefined(result.platform.type),
        vendor: undefToUndefined(result.platform.vendor),
        model: undefToUndefined(result.platform.model),
      },
      engine: {
        name: undefToUndefined(result.engine.name),
        version: undefToUndefined(result.engine.version),
      },
    };
  },
} as const satisfies ParserAdapter;
