import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['test/uap-core.fixtures.test.ts'],
    environment: 'node',
  },
});
