import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { endsWith, filter, flat, flatMap, map, pipe, unique } from 'remeda';

import { CATEGORY, type Category } from '@/adapters/types';

export type FixtureCase = {
  desc: string;
  ua: string;
  expect: Record<string, string | undefined>;
};

export type CategoryFixtures = {
  category: Category;
  cases: FixtureCase[];
};

const fixturesRoot = join(import.meta.dirname, '../../test/fixtures/ua');

const readJsonDir = (dir: string) =>
  pipe(
    readdirSync(dir),
    filter(endsWith('.json')),
    map((name): FixtureCase[] => JSON.parse(readFileSync(join(dir, name), 'utf8'))),
    flat(),
  );

export const loadFixtures = () =>
  map(
    [CATEGORY.BROWSER, CATEGORY.OS, CATEGORY.DEVICE, CATEGORY.CPU, CATEGORY.ENGINE] as const,
    (category) => ({
      category,
      cases: readJsonDir(join(fixturesRoot, category)),
    }),
  );

export const allUserAgents = (fixtures: CategoryFixtures[]) =>
  pipe(
    fixtures,
    flatMap((group) => group.cases),
    map((unit) => unit.ua),
    unique(),
  );
