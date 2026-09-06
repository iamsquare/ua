import chalk from 'chalk';
import { consola } from 'consola';
import { sumBy } from 'remeda';

import { adapters } from '@/adapters';
import type { ParserAdapter } from '@/adapters/types';
import {
  allUserAgents,
  loadFixtures,
  loadUapCoreFixtures,
  type CategoryFixtures,
} from '@/load-fixtures';
import { measureAccuracy } from '@/metrics/accuracy';
import { measureMemoryIsolated } from '@/metrics/memory';
import { measureSize } from '@/metrics/size';
import { measureSpeedIsolated } from '@/metrics/speed';
import { printSummary, writeReports, type BenchmarkReport, type LibraryReport } from '@/report';

const measureLibrary = async (
  adapter: ParserAdapter,
  fixtures: CategoryFixtures[],
  uapCoreFixtures: CategoryFixtures[],
) => {
  consola.start(chalk.cyan(`Measuring ${adapter.label}...`));

  const accuracy = await measureAccuracy(adapter, fixtures);
  const uapCoreAccuracy = await measureAccuracy(adapter, uapCoreFixtures);
  const speed = await measureSpeedIsolated(adapter.id);
  const size = await measureSize(adapter);
  const memory = await measureMemoryIsolated(adapter.id);

  consola.success(
    chalk.green(
      `Done ${adapter.label} — Accuracy ${accuracy.percent.toFixed(1)}% / uap-core ${uapCoreAccuracy.percent.toFixed(1)}%`,
    ),
  );

  return {
    id: adapter.id,
    label: adapter.label,
    accuracy,
    uapCoreAccuracy,
    speed,
    size,
    memory,
  };
};

const main = async () => {
  const fixtures = loadFixtures();
  const uapCoreFixtures = loadUapCoreFixtures();
  const uas = allUserAgents(fixtures);
  const fixtureCases = sumBy(fixtures, (group) => group.cases.length);
  const uapCoreFixtureCases = sumBy(uapCoreFixtures, (group) => group.cases.length);

  consola.info(
    chalk.dim(
      `Main fixtures: ${chalk.white(fixtureCases)} cases (${chalk.white(uas.length)} unique UAs)`,
    ),
  );
  consola.info(chalk.dim(`uap-core fixtures: ${chalk.white(uapCoreFixtureCases)} cases`));

  const libraries: LibraryReport[] = [];

  for (const adapter of adapters) {
    libraries.push(await measureLibrary(adapter, fixtures, uapCoreFixtures));
  }

  const report = {
    meta: {
      generatedAt: new Date().toISOString(),
      node: process.version,
      fixtureCases,
      uapCoreFixtureCases,
      uniqueUserAgents: uas.length,
    },
    libraries,
  } as const satisfies BenchmarkReport;

  printSummary(report);
  writeReports(report);
};

main().catch((error: unknown) => {
  consola.error(error);
  process.exitCode = 1;
});
