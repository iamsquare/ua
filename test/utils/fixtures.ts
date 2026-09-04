import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import {
  endsWith,
  entries,
  filter,
  flat,
  forEach,
  hasProp,
  isNullish,
  map,
  merge,
  pipe,
  when,
} from 'remeda';
import { describe, expect, it } from 'vitest';

import { parseUA } from '@/index';
import type { ExtensionPack } from '@/types';

export type FixtureCase = {
  desc: string;
  ua: string;
  expect: Record<string, string | undefined>;
};

export const fixturesRoot = join(import.meta.dirname, '../fixtures/ua');

export const readJsonDir = (dir: string): FixtureCase[] =>
  pipe(
    readdirSync(dir),
    filter(endsWith('.json')),
    map((name): FixtureCase[] => JSON.parse(readFileSync(join(dir, name), 'utf8'))),
    flat(),
  );

export const readJsonFile = (path: string): FixtureCase[] => JSON.parse(readFileSync(path, 'utf8'));

export const assertExpect = (
  actual: Record<string, string | undefined>,
  expected: Record<string, string | undefined>,
  keys?: string[],
) => {
  pipe(
    keys,
    when(isNullish, {
      onTrue: () => entries(expected),
      onFalse: (keys) =>
        pipe(
          keys,
          filter((key) => hasProp(expected, key)),
          map((key) => [key, expected[key]] as const),
        ),
    }),
    forEach(([key, value]) => expect(String(actual[key]), key).toBe(String(value))),
  );
};

export const withTestName = (cases: FixtureCase[]) =>
  map(cases, (unit) => merge(unit, { testName: unit.desc }));

export const runCategoryFixtures = ({
  name,
  dir,
  parse,
}: {
  name: string;
  dir: string;
  parse: (ua: string) => Record<string, string | undefined>;
}) => {
  describe(`${name} fixtures`, () => {
    it.each(withTestName(readJsonDir(dir)))('$testName', ({ ua, expect: expected }) =>
      assertExpect(parse(ua), expected),
    );
  });
};

const EXTENSION_SLICE_KEYS = {
  browser: ['name', 'version', 'type'],
  device: ['vendor', 'model', 'type'],
} as const;

type ExtensionFixturesOptions = {
  name: string;
  file: string;
  extensions: ExtensionPack | ExtensionPack[];
  slice: keyof typeof EXTENSION_SLICE_KEYS;
};

export const runExtensionFixtures = ({
  name,
  file,
  extensions,
  slice,
}: ExtensionFixturesOptions) => {
  describe(`extension ${name} fixtures`, () => {
    const cases = readJsonFile(join(fixturesRoot, 'extension', file));

    it.each(withTestName(cases))('$testName', ({ ua, expect: expected }) => {
      const result = parseUA(ua, { extensions });

      assertExpect(result[slice], expected, Array.from(EXTENSION_SLICE_KEYS[slice]));
    });
  });
};
