import DeviceDetector from 'device-detector-js';
import { hasProp, isNonNullish } from 'remeda';

import { type ParserAdapter, undefToUndefined } from '@/adapters/types';

const detector = new DeviceDetector();

export const deviceDetectorJsAdapter = {
  id: 'device-detector-js',
  label: 'device-detector-js',
  entry: 'device-detector-js',
  parse: (ua) => {
    const result = detector.parse(ua);
    const client = result.client;

    return {
      browser: {
        name: undefToUndefined(client?.name),
        version: undefToUndefined(client?.version),
      },
      os: {
        name: undefToUndefined(result.os?.name),
        version: undefToUndefined(result.os?.version),
      },
      device: {
        vendor: undefToUndefined(result.device?.brand),
        model: undefToUndefined(result.device?.model),
        type: undefToUndefined(result.device?.type),
      },
      engine: {
        name:
          isNonNullish(client) && hasProp(client, 'engine')
            ? undefToUndefined(client.engine)
            : undefined,
        version:
          isNonNullish(client) && hasProp(client, 'engineVersion')
            ? undefToUndefined(client.engineVersion)
            : undefined,
      },
    };
  },
} as const satisfies ParserAdapter;
