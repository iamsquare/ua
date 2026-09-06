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

/** Upstream uap-core fixture file — scored separately from the main suite. */
export const UAP_CORE_FILE = 'uap-core.json';

const readJsonDir = (dir: string, options: { exclude?: string[] } = {}) =>
  pipe(
    readdirSync(dir),
    filter(endsWith('.json')),
    filter((name) => !options.exclude?.includes(name)),
    map((name): FixtureCase[] => JSON.parse(readFileSync(join(dir, name), 'utf8'))),
    flat(),
  );

const readJsonFile = (path: string): FixtureCase[] => JSON.parse(readFileSync(path, 'utf8'));

/** Main curated fixtures (excludes `uap-core.json`). */
export const loadFixtures = () =>
  map(
    [CATEGORY.BROWSER, CATEGORY.OS, CATEGORY.DEVICE, CATEGORY.CPU, CATEGORY.ENGINE] as const,
    (category) => ({
      category,
      cases: readJsonDir(join(fixturesRoot, category), { exclude: [UAP_CORE_FILE] }),
    }),
  );

/** Upstream uap-core fixtures only (browser / os / device). */
export const loadUapCoreFixtures = () =>
  map([CATEGORY.BROWSER, CATEGORY.OS, CATEGORY.DEVICE] as const, (category) => ({
    category,
    cases: readJsonFile(join(fixturesRoot, category, UAP_CORE_FILE)),
  }));

export const allUserAgents = (fixtures: CategoryFixtures[]) =>
  pipe(
    fixtures,
    flatMap((group) => group.cases),
    map((unit) => unit.ua),
    unique(),
  );
