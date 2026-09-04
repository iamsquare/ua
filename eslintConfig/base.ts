import js from '@eslint/js';
import type { Linter } from 'eslint';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

import { ERROR, WARN } from './utils';

export const baseLanguageOptions = {
  ecmaVersion: 'latest' as const,
  sourceType: 'module' as const,
  globals: {
    ...globals.browser,
    ...globals.node,
    ...globals.es2022,
  },
};

export const baseRules: Linter.RulesRecord = {
  ...js.configs.recommended.rules,
  'prettier/prettier': WARN,
  'import-x/no-unresolved': [ERROR, { ignore: ['^astro:', '^virtual:'] }],
  'import-x/order': [
    WARN,
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
  'no-unused-vars': [WARN, { argsIgnorePattern: '^_' }],
  'no-console': WARN,
  'prefer-const': ERROR,
  'no-var': ERROR,
};

export const baseConfig: Linter.Config[] = [
  {
    ignores: [
      '**/dist/**',
      '**/out/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.astro/**',
      '**/coverage/**',
      '**/test/fixtures/**',
    ],
  },
  js.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts}'],
    plugins: {
      prettier,
    },
    languageOptions: baseLanguageOptions,
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: './tsconfig.json',
        }),
      ],
    },
    rules: baseRules,
  },
];
