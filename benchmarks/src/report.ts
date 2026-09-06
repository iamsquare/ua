import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import chalk from 'chalk';
import { consola } from 'consola';
import { concat, filter, first, forEach, join as joinLines, map, pipe, sortBy } from 'remeda';

import type { AccuracyResult } from '@/metrics/accuracy';
import type { MemoryResult } from '@/metrics/memory';
import type { SizeResult } from '@/metrics/size';
import type { SpeedResult } from '@/metrics/speed';

export type LibraryReport = {
  id: string;
  label: string;
  accuracy: AccuracyResult;
  uapCoreAccuracy: AccuracyResult;
  speed: SpeedResult;
  size: SizeResult;
  memory: MemoryResult;
};

export type BenchmarkReport = {
  meta: {
    generatedAt: string;
    node: string;
    fixtureCases: number;
    uapCoreFixtureCases: number;
    uniqueUserAgents: number;
  };
  libraries: LibraryReport[];
};

const resultsDir = join(import.meta.dirname, '../results');
const docsDataPath = join(import.meta.dirname, '../../docs/src/data/competitors.json');

const formatPercent = (value: number) => `${value.toFixed(1)}%`;
const formatMs = (value: number) => `${value.toFixed(1)} ms`;
const formatOps = (value: number) => `${Math.round(value).toLocaleString('en-US')} ops/s`;

const formatBytes = (value: number) => {
  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
};

const pad = (value: string, width: number) => value.padEnd(width);

const mdTable = (headers: string[], rows: string[][]) =>
  pipe(
    concat(
      [
        `| ${joinLines(headers, ' | ')} |`,
        `| ${joinLines(
          map(headers, () => '---'),
          ' | ',
        )} |`,
      ],
      map(rows, (row) => `| ${joinLines(row, ' | ')} |`),
    ),
    joinLines('\n'),
  );

export const buildMarkdown = (report: BenchmarkReport): string => {
  const libraries = sortBy(report.libraries, [(row) => row.accuracy.percent, 'desc']);
  const categoryRows = first(libraries)?.accuracy.byCategory ?? [];
  const categories = map(categoryRows, (row) => row.category);
  const categoryHeaders = map(
    categoryRows,
    (row) => `${row.category} (${row.total.toLocaleString('en-US')})`,
  );
  const uapCoreCategoryRows = first(libraries)?.uapCoreAccuracy.byCategory ?? [];
  const uapCoreCategories = map(uapCoreCategoryRows, (row) => row.category);
  const uapCoreCategoryHeaders = map(
    uapCoreCategoryRows,
    (row) => `${row.category} (${row.total.toLocaleString('en-US')})`,
  );

  const summary = mdTable(
    ['Library', 'Accuracy', 'vs uap-core accuracy', 'Speed', 'Size (gzip)', 'Memory (import)'],
    map(libraries, (row) => [
      row.label,
      formatPercent(row.accuracy.percent),
      formatPercent(row.uapCoreAccuracy.percent),
      formatOps(row.speed.opsPerSec),
      formatBytes(row.size.gzipBytes),
      formatBytes(row.memory.importHeapBytes),
    ]),
  );

  const accuracyByCategory = mdTable(
    concat(['Library'], categoryHeaders),
    map(libraries, (row) =>
      concat(
        [row.label],
        map(categories, (category) => {
          const match = filter(row.accuracy.byCategory, (item) => item.category === category)[0];

          return formatPercent(match?.percent ?? 0);
        }),
      ),
    ),
  );

  const uapCoreAccuracyByCategory = mdTable(
    concat(['Library'], uapCoreCategoryHeaders),
    map(libraries, (row) =>
      concat(
        [row.label],
        map(uapCoreCategories, (category) => {
          const match = filter(
            row.uapCoreAccuracy.byCategory,
            (item) => item.category === category,
          )[0];

          return formatPercent(match?.percent ?? 0);
        }),
      ),
    ),
  );

  const speed = mdTable(
    ['Library', 'Total', 'Ops/s', 'UAs', 'Iterations'],
    map(libraries, (row) => [
      row.label,
      formatMs(row.speed.totalMs),
      formatOps(row.speed.opsPerSec),
      String(row.speed.uaCount),
      String(row.speed.iterations),
    ]),
  );

  const size = mdTable(
    ['Library', 'Raw', 'Gzip'],
    map(libraries, (row) => [
      row.label,
      formatBytes(row.size.rawBytes),
      formatBytes(row.size.gzipBytes),
    ]),
  );

  const memory = mdTable(
    ['Library', 'Import heap', 'Parse heap', 'UAs'],
    map(libraries, (row) => [
      row.label,
      formatBytes(row.memory.importHeapBytes),
      formatBytes(row.memory.parseHeapBytes),
      String(row.memory.uaCount),
    ]),
  );

  return joinLines(
    [
      '# Competitor benchmarks',
      '',
      `Generated: ${report.meta.generatedAt}`,
      `Node: ${report.meta.node}`,
      `Main fixture cases: ${report.meta.fixtureCases}`,
      `uap-core fixture cases: ${report.meta.uapCoreFixtureCases}`,
      `Unique user agents (main): ${report.meta.uniqueUserAgents}`,
      '',
      '## Summary',
      '',
      summary,
      '',
      '## Accuracy by category',
      '',
      accuracyByCategory,
      '',
      '## vs uap-core accuracy by category',
      '',
      uapCoreAccuracyByCategory,
      '',
      '## Speed',
      '',
      speed,
      '',
      '## Size',
      '',
      size,
      '',
      '## Memory',
      '',
      memory,
      '',
    ],
    '\n',
  );
};

export const printSummary = (report: BenchmarkReport) => {
  const libraries = sortBy(report.libraries, [(row) => row.accuracy.percent, 'desc']);
  const rows = map(libraries, (row) => ({
    library: row.label,
    accuracy: formatPercent(row.accuracy.percent),
    uapCore: formatPercent(row.uapCoreAccuracy.percent),
    speed: formatOps(row.speed.opsPerSec),
    gzip: formatBytes(row.size.gzipBytes),
    memory: formatBytes(row.memory.importHeapBytes),
  }));

  const widths = {
    library: Math.max(7, ...map(rows, (row) => row.library.length)),
    accuracy: Math.max(4, ...map(rows, (row) => row.accuracy.length), 'Accuracy'.length),
    uapCore: Math.max(8, ...map(rows, (row) => row.uapCore.length), 'uap-core'.length),
    speed: Math.max(5, ...map(rows, (row) => row.speed.length)),
    gzip: Math.max(4, ...map(rows, (row) => row.gzip.length)),
    memory: Math.max(6, ...map(rows, (row) => row.memory.length)),
  };

  consola.box(chalk.bold('Competitor benchmarks'));

  consola.log(
    chalk.dim(
      `${pad('Library', widths.library)}  ${pad('Accuracy', widths.accuracy)}  ${pad('uap-core', widths.uapCore)}  ${pad('Speed', widths.speed)}  ${pad('Gzip', widths.gzip)}  ${pad('Memory', widths.memory)}`,
    ),
  );

  forEach(rows, (row) => {
    consola.log(
      `${pad(row.library, widths.library)}  ${chalk.cyan(pad(row.accuracy, widths.accuracy))}  ${chalk.blue(pad(row.uapCore, widths.uapCore))}  ${chalk.yellow(pad(row.speed, widths.speed))}  ${chalk.magenta(pad(row.gzip, widths.gzip))}  ${chalk.green(pad(row.memory, widths.memory))}`,
    );
  });
};

export const writeReports = (report: BenchmarkReport) => {
  mkdirSync(resultsDir, { recursive: true });
  mkdirSync(dirname(docsDataPath), { recursive: true });

  const json = `${JSON.stringify(report, null, 2)}\n`;
  const markdown = buildMarkdown(report);

  const latestJson = join(resultsDir, 'latest.json');
  const latestMd = join(resultsDir, 'latest.md');

  writeFileSync(latestJson, json);
  writeFileSync(latestMd, markdown);
  writeFileSync(docsDataPath, json);

  consola.success(chalk.green(`Wrote ${latestJson}`));
  consola.success(chalk.green(`Wrote ${latestMd}`));
  consola.success(chalk.green(`Wrote ${docsDataPath}`));
};
