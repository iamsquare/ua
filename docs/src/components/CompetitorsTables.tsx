import { concat, filter, first, map, pipe, sortBy } from 'remeda';

import data from '@/data/competitors.json';

type CategoryAccuracy = {
  category: string;
  passed: number;
  total: number;
  percent: number;
};

type LibraryReport = {
  id: string;
  label: string;
  accuracy: {
    percent: number;
    byCategory: CategoryAccuracy[];
  };
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
};

type BenchmarkReport = {
  meta: {
    generatedAt: string;
    node: string;
    fixtureCases: number;
    uniqueUserAgents: number;
  };
  libraries: LibraryReport[];
};

type Section = 'meta' | 'summary' | 'accuracy' | 'speed' | 'size';

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

export const CompetitorsTables = ({ section }: { section: Section }) => {
  const libraries = sortBy(report.libraries, [(row) => row.accuracy.percent, 'desc']);
  const categoryRows = first(libraries)?.accuracy.byCategory ?? [];
  const categories = map(categoryRows, (row) => row.category);
  const categoryHeaders = map(
    categoryRows,
    (row) => `${row.category} (${row.total.toLocaleString('en-US')})`,
  );

  if (section === 'summary') {
    return (
      <Table
        headers={['Library', 'Accuracy', 'Speed', 'Size (gzip)']}
        rows={map(libraries, (row) => [
          row.label,
          formatPercent(row.accuracy.percent),
          formatOps(row.speed.opsPerSec),
          formatBytes(row.size.gzipBytes),
        ])}
      />
    );
  }

  if (section === 'accuracy') {
    return (
      <Table
        headers={concat(['Library'], categoryHeaders)}
        rows={map(libraries, (row) =>
          concat(
            [row.label],
            map(categories, (category) => {
              const match = pipe(
                row.accuracy.byCategory,
                filter((item) => item.category === category),
                first(),
              );

              return formatPercent(match?.percent ?? 0);
            }),
          ),
        )}
      />
    );
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
};
