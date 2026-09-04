import { baseConfig } from '@iamsquare/eslint-config/base';
import { typescriptConfig } from '@iamsquare/eslint-config/typescript';

export default [...baseConfig, ...typescriptConfig(import.meta.url)];
