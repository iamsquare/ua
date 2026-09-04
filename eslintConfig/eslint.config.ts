import { baseConfig } from './base';
import { typescriptConfig } from './typescript';

export default [...baseConfig, ...typescriptConfig(import.meta.url)];
