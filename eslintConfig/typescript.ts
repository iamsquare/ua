import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { OFF, WARN } from './utils';

export const typescriptRules: Linter.RulesRecord = {
  '@typescript-eslint/no-explicit-any': WARN,
  '@typescript-eslint/no-unused-vars': [WARN, { argsIgnorePattern: '^_' }],
  '@typescript-eslint/consistent-type-imports': [WARN, { fixStyle: 'inline-type-imports' }],
  'import-x/no-named-as-default-member': OFF,
};

export const typescriptConfig = (importMetaUrl: string) =>
  defineConfig({
    files: ['**/*.{ts,mts,cts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.dirname(fileURLToPath(importMetaUrl)),
      },
    },
    rules: typescriptRules,
  });
