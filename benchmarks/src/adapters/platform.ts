import platform from 'platform';
import { isEmptyish, pipe, split } from 'remeda';

import { type ParserAdapter, undefToUndefined } from '@/adapters/types';

const splitOs = (os?: string) => {
  if (!os) return { name: undefined, version: undefined };

  const [name, ...rest] = pipe(os, split(' '));

  return {
    name: undefToUndefined(name),
    version: !isEmptyish(rest) ? rest.join(' ') : undefined,
  };
};

export const platformAdapter = {
  id: 'platform',
  label: 'platform',
  entry: 'platform',
  parse: (ua) => {
    const result = platform.parse(ua);
    const os = splitOs(undefToUndefined(result.os?.toString()));

    return {
      browser: {
        name: undefToUndefined(result.name),
        version: undefToUndefined(result.version),
      },
      os,
      device: {
        vendor: undefToUndefined(result.manufacturer),
        model: undefToUndefined(result.product),
      },
      engine: {
        name: undefToUndefined(result.layout),
      },
    };
  },
} as const satisfies ParserAdapter;
