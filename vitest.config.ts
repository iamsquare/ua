import { filter, map } from 'remeda';
import { defineConfig } from 'vitest/config';

const optionalSuites = ['test/redos.test.ts', 'test/uap-core.fixtures.test.ts'] as const;

const argv = map(process.argv, (arg) => arg.replaceAll('\\', '/'));

const exclude = filter(optionalSuites, (file) => !argv.some((arg) => arg.includes(file)));

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['test/**/*.test.ts'],
    exclude,
    environment: 'node',
  },
});
