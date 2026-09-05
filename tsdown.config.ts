import { entries, map, pipe } from 'remeda';
import { defineConfig } from 'tsdown';

const entry = {
  index: 'src/index.ts',
  bots: 'src/bots.ts',
  extensions: 'src/extensions.ts',
  helpers: 'src/helpers.ts',
  enums: 'src/enums.ts',
} as const;

export default defineConfig([
  {
    dts: true,
    sourcemap: true,
    target: 'node20',
    platform: 'neutral',
    entry,
    format: 'esm',
    outDir: 'dist/esm',
    unbundle: true,
    clean: ['dist'],
  },
  ...pipe(
    entry,
    entries(),
    map(([name, file]) => ({
      dts: true,
      sourcemap: true,
      target: 'node20',
      entry: { [name]: file },
      format: 'cjs' as const,
      outDir: 'dist/cjs',
      clean: false,
    })),
  ),
  {
    dts: false,
    sourcemap: false,
    target: 'node20',
    platform: 'node',
    entry: { cli: 'src/cli.ts' },
    format: 'esm',
    outDir: '.bin',
    clean: ['.bin'],
    fixedExtension: false,
    banner: { js: '#!/usr/bin/env node' },
    deps: {
      neverBundle: ['commander', 'remeda', 'consola', 'chalk', /(?:^|[\\/])dist[\\/]/],
    },
  },
]);
