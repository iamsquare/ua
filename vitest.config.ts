import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['test/**/*.test.ts'],
    exclude: ['test/redos.test.ts'],
    environment: 'node',
  },
});
