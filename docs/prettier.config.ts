import sharedConfig from '@iamsquare/prettier-config';
import type { Config } from 'prettier';

export default {
  ...sharedConfig,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
} satisfies Config;
