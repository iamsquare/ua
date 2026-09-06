import { concat, filter, first, map, pipe, sortBy } from 'remeda';

import data from '@/data/competitors.json';

type CategoryAccuracy = {
  category: string;
  passed: number;
  total: number;
  percent: number;
};

type AccuracyBlock = {
  percent: number;
  byCategory: CategoryAccuracy[];
};

type LibraryReport = {
  id: string;
  label: string;
  accuracy: AccuracyBlock;
  uapCoreAccuracy?: AccuracyBlock;
  speed: {
    totalMs: number;
    opsPerSec: number;
    uaCount: number;
    iterations: number;
  };
  size: {
    rawBytes: number;
    gzipBytes: number;
  };
  memory: {
    importHeapBytes: number;
    parseHeapBytes: number;
    uaCount: number;
  };
};

type BenchmarkReport = {
  meta: {
    generatedAt: string;
    node: string;
    fixtureCases: number;
    uapCoreFixtureCases?: number;
    uniqueUserAgents: number;
  };
  libraries: LibraryReport[];
};

type Section = 'meta' | 'summary' | 'accuracy' | 'uap-core-accuracy' | 'speed' | 'size' | 'memory';

const report = data as BenchmarkReport;

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

const cellClass =
  'whitespace-nowrap border-b border-gray-300 px-12 py-8 text-left dark:border-gray-700';

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-base">
      <thead>
        <tr>
          {map(headers, (header) => (
            <th key={header} className={cellClass}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {map(rows, (row, rowIndex) => (
          <tr key={rowIndex}>
            {map(row, (cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`} className={cellClass}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const accuracyCategoryTable = (pick: (row: LibraryReport) => AccuracyBlock | undefined) => {
  const libraries = sortBy(report.libraries, [(row) => pick(row)?.percent ?? 0, 'desc']);
  const categoryRows = pick(first(libraries)!)?.byCategory ?? [];
  const categories = map(categoryRows, (row) => row.category);
  const categoryHeaders = map(
    categoryRows,
    (row) => `${row.category} (${row.total.toLocaleString('en-US')})`,
  );

  return (
    <Table
      headers={concat(['Library'], categoryHeaders)}
      rows={map(libraries, (row) =>
        concat(
          [row.label],
          map(categories, (category) => {
            const match = pipe(
              pick(row)?.byCategory ?? [],
              filter((item) => item.category === category),
              first(),
            );

            return formatPercent(match?.percent ?? 0);
          }),
        ),
      )}
    />
  );
};

export const CompetitorsTables = ({ section }: { section: Section }) => {
  const libraries = sortBy(report.libraries, [(row) => row.accuracy.percent, 'desc']);

  if (section === 'summary') {
    return (
      <Table
        headers={[
          'Library',
          'Accuracy',
          'vs uap-core accuracy',
          'Speed',
          'Size (gzip)',
          'Memory (import)',
        ]}
        rows={map(libraries, (row) => [
          row.label,
          formatPercent(row.accuracy.percent),
          row.uapCoreAccuracy ? formatPercent(row.uapCoreAccuracy.percent) : '—',
          formatOps(row.speed.opsPerSec),
          formatBytes(row.size.gzipBytes),
          formatBytes(row.memory.importHeapBytes),
        ])}
      />
    );
  }

  if (section === 'accuracy') {
    return accuracyCategoryTable((row) => row.accuracy);
  }

  if (section === 'uap-core-accuracy') {
    return accuracyCategoryTable((row) => row.uapCoreAccuracy);
  }

  if (section === 'speed') {
    return (
      <Table
        headers={['Library', 'Total', 'Ops/s', 'UAs', 'Iterations']}
        rows={map(libraries, (row) => [
          row.label,
          formatMs(row.speed.totalMs),
          formatOps(row.speed.opsPerSec),
          String(row.speed.uaCount),
          String(row.speed.iterations),
        ])}
      />
    );
  }

  if (section === 'size') {
    return (
      <Table
        headers={['Library', 'Raw', 'Gzip']}
        rows={map(libraries, (row) => [
          row.label,
          formatBytes(row.size.rawBytes),
          formatBytes(row.size.gzipBytes),
        ])}
      />
    );
  }

  return (
    <Table
      headers={['Library', 'Import heap', 'Parse heap', 'UAs']}
      rows={map(libraries, (row) => [
        row.label,
        formatBytes(row.memory.importHeapBytes),
        formatBytes(row.memory.parseHeapBytes),
        String(row.memory.uaCount),
      ])}
    />
  );
};
