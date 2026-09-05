import chalk from 'chalk';
import { consola } from 'consola';
import { sumBy } from 'remeda';

import { adapters } from '@/adapters';
import type { ParserAdapter } from '@/adapters/types';
import { allUserAgents, loadFixtures, type CategoryFixtures } from '@/load-fixtures';
import { measureAccuracy } from '@/metrics/accuracy';
import { measureSize } from '@/metrics/size';
import { measureSpeedIsolated } from '@/metrics/speed';
import { printSummary, writeReports, type BenchmarkReport, type LibraryReport } from '@/report';

const measureLibrary = async (adapter: ParserAdapter, fixtures: CategoryFixtures[]) => {
  consola.start(chalk.cyan(`Measuring ${adapter.label}...`));

  const accuracy = await measureAccuracy(adapter, fixtures);
  const speed = await measureSpeedIsolated(adapter.id);
  const size = await measureSize(adapter);

  consola.success(chalk.green(`Done ${adapter.label}`));

  return {
    id: adapter.id,
    label: adapter.label,
    accuracy,
    speed,
    size,
  };
};

const main = async () => {
  const fixtures = loadFixtures();
  const uas = allUserAgents(fixtures);
  const fixtureCases = sumBy(fixtures, (group) => group.cases.length);

  consola.info(
    chalk.dim(
      `Loaded ${chalk.white(fixtureCases)} fixture cases (${chalk.white(uas.length)} unique UAs) across ${chalk.white(fixtures.length)} categories`,
    ),
  );

  const libraries: LibraryReport[] = [];

  for (const adapter of adapters) {
    libraries.push(await measureLibrary(adapter, fixtures));
  }

  const report = {
    meta: {
      generatedAt: new Date().toISOString(),
      node: process.version,
      fixtureCases,
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
