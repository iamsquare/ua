import type { Linter } from 'eslint';
import react from 'eslint-plugin-react';
import { configs as reactHooksConfigs } from 'eslint-plugin-react-hooks';

import { OFF } from './utils';

export const reactRules: Linter.RulesRecord = {
  'react/no-is-mounted': OFF,
  'react/prop-types': OFF,
  'react/react-in-jsx-scope': OFF,
};

export const reactLanguageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

export const reactSettings = {
  react: {
    // Pin version: eslint-plugin-react@7.37.5's "detect" still calls
    // context.getFilename(), which ESLint 10 removed.
    version: '19.0',
  },
};

const reactFiles = ['**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts}'];

export const reactConfig: Linter.Config[] = [
  {
    ...react.configs.flat.recommended,
    files: reactFiles,
  },
  {
    ...react.configs.flat['jsx-runtime'],
    files: reactFiles,
  },
  {
    ...reactHooksConfigs.flat['recommended-latest'],
    files: reactFiles,
  },
  {
    files: reactFiles,
    languageOptions: reactLanguageOptions,
    settings: reactSettings,
    rules: reactRules,
  },
];
