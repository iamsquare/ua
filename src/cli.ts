import { createReadStream, createWriteStream, existsSync } from 'node:fs';
import type { WriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { createInterface } from 'node:readline';

import chalk from 'chalk';
import { Command } from 'commander';
import { consola } from 'consola';
import {
  filter,
  first,
  isEmpty,
  isIncludedIn,
  isNullish,
  join,
  keys,
  map,
  partition,
  pipe,
  split,
  values,
} from 'remeda';
import type { ValueOf } from 'type-fest';

import { extensions } from '../dist/esm/extensions.js';
import { parseUA } from '../dist/esm/index.js';

type ExtensionName = keyof typeof extensions;
type ExtensionPack = ValueOf<typeof extensions>;

const EXTENSION_NAMES = keys(extensions);

const DEFAULT_EXTENSION_NAMES = [
  'bots',
  'email',
  'extraDevice',
  'inApp',
  'vehicle',
] as const satisfies ExtensionName[];

const isExtensionName = (name: string): name is ExtensionName =>
  isIncludedIn(name, EXTENSION_NAMES);

const parseExtensionNames = (value: string | undefined) => {
  if (isNullish(value)) return undefined;

  return pipe(
    value,
    split(','),
    map((name) => name.trim()),
    filter((name) => !isEmpty(name)),
  );
};

const resolveExtensions = (names: string[] | undefined): ExtensionPack[] => {
  if (isNullish(names)) return map(DEFAULT_EXTENSION_NAMES, (name) => extensions[name]);

  if (first(names) === 'none') return [];

  if (first(names) === 'all') return values(extensions);

  const [known, unknown] = partition(names, isExtensionName);

  if (isEmpty(known)) {
    consola.error(`No valid extension packs. Available: ${join(EXTENSION_NAMES, ', ')}, none, all`);
    process.exit(1);
  }

  if (!isEmpty(unknown)) {
    consola.warn(`Unknown extension pack(s) ignored: ${join(unknown, ', ')}.`);
  }

  return map(known, (name) => extensions[name]);
};

const createParser = (packs: ExtensionPack[]) => (ua: string) => parseUA(ua, { extensions: packs });

const parseMany = (uas: string[], parseOne: (ua: string) => ReturnType<typeof parseUA>) =>
  pipe(
    uas,
    filter((ua) => !isEmpty(ua.trim())),
    map(parseOne),
  );

const runBatch = (
  inputFile: string,
  parseOne: (ua: string) => ReturnType<typeof parseUA>,
  outputFile?: string,
) => {
  const inputPath = resolve(inputFile);
  const outputPath = outputFile ? resolve(outputFile) : undefined;

  if (!existsSync(inputPath)) {
    consola.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const startPerf = performance.now();
  const inputStream = createReadStream(inputPath, 'utf8');
  const rl = createInterface({ input: inputStream, crlfDelay: Infinity });
  const outputStream = outputPath
    ? createWriteStream(outputPath, { encoding: 'utf8' })
    : process.stdout;

  let lineNumber = 0;

  outputStream.write('[\n');

  rl.on('line', (line) => {
    if (isEmpty(line.trim())) return;

    const json = JSON.stringify(parseOne(line), null, 4);

    if (lineNumber > 0) outputStream.write(',\n');

    outputStream.write(json);
    lineNumber += 1;
  });

  rl.on('close', () => {
    outputStream.write('\n]');

    if (!outputPath) {
      process.exit(0);

      return;
    }

    (outputStream as WriteStream).end(() => {
      const elapsed = (performance.now() - startPerf).toFixed(3);

      consola.success(chalk.green('Done!'));
      consola.info(`Number of lines found: ${chalk.cyan(String(lineNumber))}`);
      consola.info(`Task finished in: ${chalk.cyan(`${elapsed}ms`)}`);
      consola.info(`Output written to: ${chalk.cyan(outputPath)}`);
      process.exit(0);
    });
  });
};

const program = new Command();

program
  .name('ua')
  .description('Parse User-Agent string(s) to JSON')
  .argument('[uas...]', 'User-Agent string(s) to parse')
  .option('-i, --input-file <path>', 'Path to a text file with one User-Agent per line')
  .option('-o, --output-file <path>', 'Path to write JSON results (batch mode)')
  .option(
    '-e, --extensions <packs>',
    `Comma-separated extension packs (default: ${join(DEFAULT_EXTENSION_NAMES, ', ')}). Use "none", "all", or: ${join(EXTENSION_NAMES, ', ')}`,
  )
  .action(
    (uas: string[], options: { inputFile?: string; outputFile?: string; extensions?: string }) => {
      const parseOne = createParser(resolveExtensions(parseExtensionNames(options.extensions)));

      if (options.inputFile) {
        runBatch(options.inputFile, parseOne, options.outputFile);

        return;
      }

      if (isEmpty(uas)) {
        program.help({ error: true });

        return;
      }

      process.stdout.write(`${JSON.stringify(parseMany(uas, parseOne), null, 4)}\n`);
    },
  );

program.parse();
