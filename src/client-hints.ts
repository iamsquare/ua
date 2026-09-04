import {
  filter,
  find,
  hasAtLeast,
  isArray,
  isEmptyish,
  isNonNullish,
  isNullish,
  map,
  merge,
  pipe,
  reduce,
} from 'remeda';

import { majorFromVersion, mapString, matchRules } from '@/engine/match-rules';
import { headerValue } from '@/headers';
import { coreMaps, cpuRules, deviceRules } from '@/rules';
import type { Browser, CPU, Device, Engine, HeadersLike, OS, Result } from '@/types';

export type ClientHints = {
  brands?: { brand: string; version: string }[];
  fullVersionList?: { brand: string; version: string }[];
  mobile?: boolean;
  model?: string;
  platform?: string;
  platformVersion?: string;
  architecture?: string;
  formFactors?: string[] | string;
  bitness?: string;
};

type BrandEntry = { brand: string; version: string };

type BrandAcc = {
  browser: Browser;
  engine: Engine;
  prevBrand?: string;
};

const parseBrandList = (raw?: string) => {
  if (isEmptyish(raw)) return;

  const brands = map(Array.from(raw.matchAll(/"([^"]+)";v="([^"]+)"/g)), (match) => ({
    brand: match[1] ?? '',
    version: match[2] ?? '',
  }));

  return hasAtLeast(brands, 1) ? brands : undefined;
};

const parseFormFactors = (raw?: string) => {
  if (isEmptyish(raw)) return;

  const factors = map(Array.from(raw.matchAll(/"([^"]+)"/g)), (match) => match[1] ?? '');

  return hasAtLeast(factors, 1) ? factors : raw;
};

const stripQuotes = (raw?: string) => {
  if (isEmptyish(raw)) return;

  return raw.replace(/^"|"$/g, '');
};

export const parseClientHints = (headers: HeadersLike) => {
  const get = (name: string) => headerValue(headers, name) ?? '';

  return {
    brands: parseBrandList(get('sec-ch-ua')),
    fullVersionList: parseBrandList(get('sec-ch-ua-full-version-list')),
    mobile: /\?1/.test(get('sec-ch-ua-mobile') ?? ''),
    model: stripQuotes(get('sec-ch-ua-model')),
    platform: stripQuotes(get('sec-ch-ua-platform')),
    platformVersion: stripQuotes(get('sec-ch-ua-platform-version')),
    architecture: stripQuotes(get('sec-ch-ua-arch')),
    formFactors: parseFormFactors(get('sec-ch-ua-form-factors')),
    bitness: stripQuotes(get('sec-ch-ua-bitness')),
  };
};

const shouldPreferBrand = (prevBrand: string | undefined, brandName: string) =>
  isNullish(prevBrand) ||
  (/Chrom/.test(prevBrand) && brandName !== 'Chromium') ||
  (prevBrand === 'Edge' && /WebView2/.test(brandName));

const applyBrandHints = (browser: Browser, engine: Engine, brands?: BrandEntry[]) => {
  if (isEmptyish(brands)) return { browser, engine };

  return pipe(
    brands,
    filter((entry) => !/not.a.brand/i.test(entry.brand)),
    reduce(
      (acc: BrandAcc, entry) => {
        if (!shouldPreferBrand(acc.prevBrand, entry.brand)) {
          return entry.brand === 'Chromium'
            ? merge(acc, { engine: { ...acc.engine, version: entry.version } })
            : acc;
        }

        const brandName = mapString(entry.brand, coreMaps.browserHintsMap) ?? entry.brand;
        const existingName = acc.browser.name;

        const nextBrowser =
          existingName && !/Chrom/.test(existingName) && /Chrom/.test(brandName)
            ? acc.browser
            : merge(acc.browser, {
                name: brandName,
                version: entry.version,
                major: majorFromVersion(entry.version),
              });

        return {
          browser: nextBrowser,
          engine:
            brandName === 'Chromium' ? merge(acc.engine, { version: entry.version }) : acc.engine,
          prevBrand: brandName,
        };
      },
      { browser, engine },
    ),
    ({ browser: nextBrowser, engine: nextEngine }) => ({
      browser: nextBrowser,
      engine: nextEngine,
    }),
  );
};

const applyCpuHints = (cpu: CPU, hints: ClientHints) => {
  if (isEmptyish(hints.architecture)) return cpu;

  const archName = hints.bitness === '64' ? `${hints.architecture}64` : hints.architecture;

  return merge(cpu, matchRules(`${archName};`, cpuRules));
};

const applyModelHint = (device: Device, model?: string) => {
  if (isEmptyish(model)) return device;

  const next = merge(device, { model });

  if (next.type && next.vendor) return next;

  const reParse = matchRules(`droid 9; ${model})`, deviceRules);

  return merge(next, {
    type: next.type ?? reParse?.type,
    vendor: next.vendor ?? reParse?.vendor,
  });
};

const applyFormFactorHint = (device: Device, formFactors?: ClientHints['formFactors']) => {
  if (isEmptyish(formFactors)) return device;

  const factors = isArray(formFactors) ? formFactors : [formFactors];

  const formFactor = pipe(
    factors,
    map((factor) => mapString(factor, coreMaps.formFactorsMap)),
    find(isNonNullish),
  );

  return isNonNullish(formFactor) ? merge(device, { type: formFactor }) : device;
};

const applyDeviceHints = (device: Device, hints: ClientHints) =>
  pipe(
    hints.mobile ? merge(device, { type: 'mobile' }) : device,
    (next) => applyModelHint(next, hints.model),
    (next) => applyFormFactorHint(next, hints.formFactors),
  );

const windowsVersionFromHint = (platformVersion?: string) =>
  Number.parseInt(majorFromVersion(platformVersion) ?? '0', 10) >= 13 ? '11' : '10';

const applyOsHints = (os: OS, hints: ClientHints) => {
  if (isEmptyish(hints.platform)) {
    return os.name === 'Windows' && hints.model === 'Xbox'
      ? { name: 'Xbox', version: undefined }
      : os;
  }

  const next = merge(os, {
    name: hints.platform,
    version:
      hints.platform === 'Windows'
        ? windowsVersionFromHint(hints.platformVersion)
        : hints.platformVersion,
  });

  return next.name === 'Windows' && hints.model === 'Xbox'
    ? { name: 'Xbox', version: undefined }
    : next;
};

export const applyClientHints = (result: Result, hints: ClientHints): Result => {
  const brands = hints.fullVersionList ?? hints.brands;
  const { browser, engine } = applyBrandHints(result.browser, result.engine, brands);

  return {
    ...result,
    browser,
    engine,
    cpu: applyCpuHints(result.cpu, hints),
    device: applyDeviceHints(result.device, hints),
    os: applyOsHints(result.os, hints),
  };
};
