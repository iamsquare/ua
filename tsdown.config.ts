import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    bots: 'src/bots.ts',
    extensions: 'src/extensions.ts',
    helpers: 'src/helpers.ts',
    enums: 'src/enums.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'node20',
  platform: 'neutral',
  unbundle: true,
});
