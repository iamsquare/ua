import { entries, filter, isEmpty, sumBy } from 'remeda';

import type { Category, FieldMap, ParserAdapter } from '@/adapters/types';
import type { CategoryFixtures } from '@/load-fixtures';

export type CategoryAccuracy = {
  category: Category;
  passed: number;
  total: number;
  percent: number;
};

export type AccuracyResult = {
  id: string;
  label: string;
  passed: number;
  total: number;
  percent: number;
  byCategory: CategoryAccuracy[];
};

const matchesExpect = (actual: FieldMap | undefined, expected: FieldMap): boolean =>
  isEmpty(filter(entries(expected), ([key, value]) => String(actual?.[key]) !== String(value)));

const scoreCategory = async (adapter: ParserAdapter, group: CategoryFixtures) => {
  let passed = 0;

  for (const unit of group.cases) {
    const result = await adapter.parse(unit.ua);

    if (matchesExpect(result[group.category], unit.expect)) {
      passed += 1;
    }
  }

  const total = group.cases.length;

  return {
    category: group.category,
    passed,
    total,
    percent: total === 0 ? 0 : (passed / total) * 100,
  };
};

export const measureAccuracy = async (
  adapter: ParserAdapter,
  fixtures: CategoryFixtures[],
): Promise<AccuracyResult> => {
  const byCategory: CategoryAccuracy[] = [];

  for (const group of fixtures) {
    byCategory.push(await scoreCategory(adapter, group));
  }

  const passed = sumBy(byCategory, (row) => row.passed);
  const total = sumBy(byCategory, (row) => row.total);

  return {
    id: adapter.id,
    label: adapter.label,
    passed,
    total,
    percent: total === 0 ? 0 : (passed / total) * 100,
    byCategory,
  };
};
