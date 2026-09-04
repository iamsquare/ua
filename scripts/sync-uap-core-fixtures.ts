import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { consola } from 'consola';
import {
  filter,
  isEmpty,
  isNonNullish,
  isNullish,
  isString,
  join as joinParts,
  map,
  pipe,
} from 'remeda';
import { parse as parseYaml } from 'yaml';

type FixtureCase = {
  desc: string;
  ua: string;
  expect: Record<string, string | undefined>;
};

type UpstreamCase = {
  user_agent_string: string;
  family?: string | null;
  brand?: string | null;
  model?: string | null;
  major?: string | null;
  minor?: string | null;
  patch?: string | null;
  patch_minor?: string | null;
};

type UpstreamFile = {
  test_cases: UpstreamCase[];
};

type Category = 'browser' | 'os' | 'device';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURES_ROOT = join(ROOT, 'test/fixtures/ua');
const REF = process.env.UAP_CORE_REF ?? 'master';
const RAW_BASE = `https://raw.githubusercontent.com/ua-parser/uap-core/${REF}/tests`;

const CATEGORIES = [
  { category: 'browser' as const, file: 'test_ua.yaml' },
  { category: 'os' as const, file: 'test_os.yaml' },
  { category: 'device' as const, file: 'test_device.yaml' },
] as const;

const isPresent = (value?: string | null): value is string => isString(value) && !isEmpty(value);

const joinVersion = (...parts: (string | null | undefined)[]) => {
  const present = pipe(parts, filter(isPresent));

  if (isEmpty(present)) return undefined;

  return joinParts(present, '.');
};

const label = (...parts: (string | null | undefined)[]) =>
  pipe(parts, filter(isPresent), joinParts(' '));

const toBrowserOrOsCase = (unit: UpstreamCase, withMajor: boolean) => {
  const family = unit.family ?? 'Other';
  const version = joinVersion(unit.major, unit.minor, unit.patch, unit.patch_minor);
  const isOther = family === 'Other';

  return {
    desc: `uap-core: ${label(family, version)}`,
    ua: unit.user_agent_string,
    expect: isOther
      ? {}
      : {
          name: family,
          version: isPresent(version) ? version : undefined,
          major: withMajor && isPresent(unit.major) ? unit.major : undefined,
        },
  };
};

const toDeviceCase = (unit: UpstreamCase) => ({
  desc: `uap-core: ${label(unit.brand, unit.family, unit.model)}`,
  ua: unit.user_agent_string,
  expect: {
    vendor: isPresent(unit.brand) ? unit.brand : undefined,
    model: isPresent(unit.model) ? unit.model : undefined,
  },
});

const toFixtureCase = (category: Category, unit: UpstreamCase) => {
  switch (category) {
    case 'browser':
      return toBrowserOrOsCase(unit, true);
    case 'os':
      return toBrowserOrOsCase(unit, false);
    case 'device':
      return toDeviceCase(unit);
  }
};

const fixturePath = (category: Category) => join(FIXTURES_ROOT, category, 'uap-core.json');

const readFixtures = (category: Category): FixtureCase[] =>
  JSON.parse(readFileSync(fixturePath(category), 'utf8'));

const writeFixtures = (category: Category, cases: FixtureCase[]) =>
  writeFileSync(fixturePath(category), `${JSON.stringify(cases, null, 2)}\n`);

const fetchUpstream = async (file: string) => {
  const response = await fetch(`${RAW_BASE}/${file}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${file} (ref=${REF}): ${response.status} ${response.statusText}`,
    );
  }

  const parsed = parseYaml(await response.text()) as UpstreamFile;

  if (isNullish(parsed.test_cases)) {
    throw new Error(`No test_cases in ${file}`);
  }

  return parsed.test_cases;
};

const syncCategory = async (category: Category, file: string) => {
  const upstream = await fetchUpstream(file);
  const existing = readFixtures(category);
  const known = new Set(map(existing, (unit) => unit.ua));

  const missing = pipe(
    upstream,
    filter((unit) => isNonNullish(unit.user_agent_string) && !known.has(unit.user_agent_string)),
    map((unit) => toFixtureCase(category, unit)),
  );

  if (missing.length > 0) {
    writeFixtures(category, [...existing, ...missing]);
  }

  return {
    fetched: upstream.length,
    present: existing.length,
    appended: missing.length,
  };
};

const main = async () => {
  consola.start(`Syncing uap-core fixtures (ref=${REF})…`);

  for (const { category, file } of CATEGORIES) {
    const result = await syncCategory(category, file);

    consola.info(
      `${category}: fetched=${result.fetched} present=${result.present} appended=${result.appended}`,
    );
  }

  consola.success('Done');
};

main().catch((error: unknown) => {
  consola.error(error);
  process.exitCode = 1;
});
