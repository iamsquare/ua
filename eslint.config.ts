import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

import { baseConfig } from '@iamsquare/eslint-config/base';
import { typescriptConfig } from '@iamsquare/eslint-config/typescript';

export default [
  {
    ignores: ['docs/**', 'eslintConfig/**', 'prettierConfig/**'],
  },
  ...baseConfig,
  ...typescriptConfig(import.meta.url),
  {
    files: ['benchmarks/**/*.{ts,mts,cts,tsx}'],
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: './benchmarks/tsconfig.json',
        }),
      ],
    },
  },
];
