import type { Config } from 'prettier';

const prettierConfig = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
} as const satisfies Config;

export default prettierConfig;
