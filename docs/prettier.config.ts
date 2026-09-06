import sharedConfig from '@iamsquare/prettier-config';
import type { Config } from 'prettier';
/* @ts-expect-error - No types for prettier-plugin-astro */
import * as prettierPluginAstro from 'prettier-plugin-astro';

export default {
  ...sharedConfig,
  plugins: [prettierPluginAstro],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
} satisfies Config;
