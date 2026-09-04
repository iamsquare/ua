/**
 * Various helpers for working with User-Agent results
 *
 * @module @iamsquare/ua/helpers
 */

import {
  entries,
  filter,
  first,
  hasProp,
  isEmptyish,
  isIncludedIn,
  isNonNullish,
  isString,
  isTruthy,
  join,
  map,
  pipe,
  split,
  toLowerCase,
} from 'remeda';

import { CPUArch, EngineName, OSName } from '@/enums';
import { parseDevice, parseUA } from '@/parse-ua';
import type { Browser, CPU, Device, Engine, OS, Result } from '@/types';

type ResultOrUa = Result | string;

type IsOptions = {
  ignore?: string[];
  strip?: RegExp;
};

const asResult = (value: ResultOrUa) => (isString(value) ? parseUA(value) : value);

const normalize = (value: string, strip?: RegExp) =>
  toLowerCase(isNonNullish(strip) ? value.replace(strip, '') : value);

/**
 * Whether the result (or UA string) uses a Blink-based Chrome-family engine.
 *
 * @param value - A {@link Result} or raw User-Agent string.
 */
export const isChromeFamily = (value: ResultOrUa) => {
  const engine = asResult(value).engine;

  return toLowerCase(engine.name ?? '') === toLowerCase(EngineName.BLINK);
};

/**
 * Whether the current runtime is Electron (Node `process.versions.electron` or Electron UA).
 */
export const isElectron = () => {
  if (
    isNonNullish(process) &&
    isNonNullish(process.versions) &&
    hasProp(process.versions, 'electron')
  ) {
    return true;
  }

  return isNonNullish(navigator) && / electron\//i.test(navigator.userAgent);
};

/**
 * Infer a device vendor from an Android model string by running device rules on a synthetic UA.
 *
 * @param model - Device model token (e.g. `"SM-X706B"`).
 * @returns Matched vendor name, if any.
 */
export const getDeviceVendor = (model: string) =>
  parseDevice(
    `Mozilla/5.0 (Linux; Android 10; ${model}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36`,
  ).vendor;

/**
 * Whether the result looks like Apple Silicon (macOS + ARM architecture).
 *
 * @param value - A {@link Result} or raw User-Agent string.
 */
export const isAppleSilicon = (value: ResultOrUa) => {
  const { os, cpu } = asResult(value);

  if (toLowerCase(os.name ?? '') !== toLowerCase(OSName.MACOS)) {
    return false;
  }

  return toLowerCase(cpu.architecture ?? '') === toLowerCase(CPUArch.ARM);
};

/**
 * Case-insensitive match of `value` against any string field on `data`.
 *
 * Prefer the typed `isBrowser` / `isOS` / … helpers unless you need custom ignore/strip rules.
 *
 * @param data - A result slice (browser, OS, device, …).
 * @param value - Expected field value (often an enum constant).
 * @param options.ignore - Field names to skip.
 * @param options.strip - Regex stripped from both sides before compare.
 */
export const is = (
  data: Record<string, string | undefined>,
  value: string,
  options: IsOptions = {},
) => {
  const ignore = options.ignore ?? [];
  const strip = options.strip;

  return pipe(data, entries(), (pairs) =>
    pairs.some(
      ([key, entry]) =>
        !isIncludedIn(key, ignore) &&
        isNonNullish(entry) &&
        normalize(entry, strip) === normalize(value, strip),
    ),
  );
};

/**
 * Match a browser slice against a name/type value (ignores `version` / `major`; strips trailing `"browser"`).
 *
 * @param browser - `result.browser`
 * @param value - Expected value (e.g. `BrowserName.CHROME`)
 */
export const isBrowser = (browser: Browser, value: string) =>
  is(browser, value, { ignore: ['version', 'major'], strip: / ?browser$/i });

/**
 * Match an OS slice against a name value (ignores `version`; strips trailing `"os"`).
 *
 * @param os - `result.os`
 * @param value - Expected value (e.g. `OSName.ANDROID`)
 */
export const isOS = (os: OS, value: string) =>
  is(os, value, { ignore: ['version'], strip: / ?os$/i });

/**
 * Match an engine slice against a name value (ignores `version`).
 *
 * @param engine - `result.engine`
 * @param value - Expected value (e.g. `EngineName.BLINK`)
 */
export const isEngine = (engine: Engine, value: string) =>
  is(engine, value, { ignore: ['version'] });

/**
 * Match a device slice against a type/vendor/model value.
 *
 * @param device - `result.device`
 * @param value - Expected value (e.g. `DeviceType.MOBILE`)
 */
export const isDevice = (device: Device, value: string) => is(device, value);

/**
 * Match a CPU slice against an architecture value.
 *
 * @param cpu - `result.cpu`
 * @param value - Expected value (e.g. `CPUArch.ARM`)
 */
export const isCPU = (cpu: CPU, value: string) => is(cpu, value);

type DataSlice = Browser | CPU | Device | Engine | OS;

/**
 * Join selected fields from a result slice into a single display string.
 *
 * @param data - A result slice
 * @param fields - Keys to include (typed from the slice)
 * @returns Space-joined non-empty field values
 *
 * @example
 * ```ts
 * toString(result.browser, ['name', 'version']); // "Chrome 120.0.0.0"
 * ```
 */
export const toString = <T extends DataSlice>(data: T, fields: (keyof T & string)[]) =>
  pipe(
    fields,
    map((field) => (isEmptyish(data[field]) ? undefined : `${data[field]}`)),
    filter(isTruthy),
    join(' '),
  );

/**
 * Map Microsoft Outlook name/version pairs to a human-readable edition label.
 *
 * @param name - Parsed mail client name
 * @param version - Parsed version string
 */
export const getOutlookEdition = (name?: string, version?: string) => {
  if (isEmptyish(name) || isEmptyish(version)) return name;

  const cleanName = toLowerCase(name).replace(/microsoft\s+/, '');

  if (cleanName === 'macoutlook') {
    return Number.parseInt(pipe(version, split('.'), first()) ?? '0', 10) >= 16
      ? 'Outlook for Mac (Modern)'
      : 'Outlook for Mac (Legacy)';
  }

  if (cleanName === 'outlook') {
    const parts = pipe(version, split('.'), map(Number));

    const major = parts[0] ?? 0;
    const build = parts[2] ?? 0;

    if (major === 15) return 'Outlook 2013';
    if (major === 14) return 'Outlook 2010';
    if (major === 12) return 'Outlook 2007';
    if (major < 12) return 'Outlook (Legacy)';

    if (major === 16) {
      return build < 10000 ? 'Outlook 2016 (MSI / Volume License)' : 'Outlook 365 / 2019+ (Modern)';
    }
  }

  return name;
};
