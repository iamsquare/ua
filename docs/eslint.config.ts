import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { baseConfig } from '@iamsquare/eslint-config/base';
import { reactConfig } from '@iamsquare/eslint-config/react';
import { typescriptConfig } from '@iamsquare/eslint-config/typescript';
import eslintPluginAstro from 'eslint-plugin-astro';

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
      },
    },
  },
  ...baseConfig,
  ...typescriptConfig(import.meta.url),
  ...reactConfig,
  ...eslintPluginAstro.configs['flat/recommended'],
];
