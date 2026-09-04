import {
  concat,
  filter,
  flat,
  isArray,
  isEmpty,
  isEmptyish,
  isNonNullish,
  isString,
  map,
  pipe,
  when,
} from 'remeda';
import type { KeysOfUnion } from 'type-fest';

import { applyClientHints, parseClientHints } from '@/client-hints';
import { majorFromVersion, matchDeviceRules, matchRules, trimUa } from '@/engine/match-rules';
import { isBrowser } from '@/env';
import { applyFeatureCheck } from '@/feature-check';
import { headerValue } from '@/headers';
import { browserRules, cpuRules, deviceRules, engineRules, osRules } from '@/rules';
import type {
  Browser,
  CPU,
  Device,
  Engine,
  ExtensionPack,
  HeadersLike,
  OS,
  ParseOptions,
  Result,
  Rule,
} from '@/types';

const normalizeExtensions = (extensions: ParseOptions['extensions']) => {
  if (isEmptyish(extensions)) return [];

  return isArray(extensions) ? extensions : [extensions];
};

const rulesFor = (
  category: KeysOfUnion<ExtensionPack>,
  extensions: ExtensionPack[],
  defaults: Rule[],
) =>
  isEmpty(extensions)
    ? defaults
    : concat(
        pipe(
          extensions,
          map((pack) => pack[category]),
          filter(isNonNullish),
          flat(),
        ),
        defaults,
      );

const resolveUa = (ua?: string, headers?: HeadersLike) => {
  if (isString(ua)) return trimUa(ua);

  if (isNonNullish(headers)) {
    const fromHeaders = headerValue(headers, 'user-agent');

    if (fromHeaders) return trimUa(fromHeaders);
  }

  if (isBrowser() && isNonNullish(navigator) && isString(navigator.userAgent)) {
    return trimUa(navigator.userAgent);
  }

  return '';
};

const applyIosSafariVersionFix = (os: OS, ua: string) => {
  if (os.name !== 'iOS' || isEmptyish(os.version) || !/^1[89][^\d]/.exec(os.version)) return os;

  const match = /\) Version\/((\d+)[\d.]*)/.exec(ua);

  if (isNonNullish(match) && Number.parseInt(match[2]!, 10) >= 26) {
    return { name: os.name, version: match[1] };
  }

  return os;
};

const toBrowser = (matched: Record<string, string | undefined> | undefined): Browser => ({
  name: matched?.name,
  version: matched?.version,
  major: majorFromVersion(matched?.version),
  type: matched?.type,
});

const toCpu = (matched: Record<string, string | undefined> | undefined): CPU => ({
  architecture: matched?.architecture,
});

const toDevice = (matched: Record<string, string | undefined> | undefined): Device => ({
  type: matched?.type,
  vendor: matched?.vendor,
  model: matched?.model,
});

const toEngine = (matched: Record<string, string | undefined> | undefined): Engine => ({
  name: matched?.name,
  version: matched?.version,
});

const toOs = (matched: Record<string, string | undefined> | undefined): OS => ({
  name: matched?.name,
  version: matched?.version,
});

const clientHintHeaders = (options: ParseOptions) =>
  options.withClientHints === true ? options.headers : undefined;

const resolveParse = (ua?: string, options: ParseOptions = {}) => ({
  ua: resolveUa(ua, clientHintHeaders(options)),
  extensions: normalizeExtensions(options.extensions),
});

/**
 * Parse only the browser slice from a User-Agent string.
 *
 * @param ua - User-Agent string; when omitted, uses `headers` (if Client Hints) or `navigator.userAgent` in browsers.
 * @param options - Extensions, Client Hints, and feature-check flags.
 */
export const parseBrowser = (ua?: string, options: ParseOptions = {}): Browser => {
  const { ua: resolved, extensions } = resolveParse(ua, options);

  return toBrowser(matchRules(resolved, rulesFor('browser', extensions, browserRules)));
};

/**
 * Parse only the CPU architecture slice from a User-Agent string.
 *
 * @param ua - User-Agent string; when omitted, uses `headers` or `navigator.userAgent` in browsers.
 * @param options - Extensions, Client Hints, and feature-check flags.
 */
export const parseCPU = (ua?: string, options: ParseOptions = {}): CPU => {
  const { ua: resolved, extensions } = resolveParse(ua, options);

  return toCpu(matchRules(resolved, rulesFor('cpu', extensions, cpuRules)));
};

/**
 * Parse only the device slice from a User-Agent string.
 *
 * @param ua - User-Agent string; when omitted, uses `headers` or `navigator.userAgent` in browsers.
 * @param options - Extensions, Client Hints, and feature-check flags.
 */
export const parseDevice = (ua?: string, options: ParseOptions = {}): Device => {
  const { ua: resolved, extensions } = resolveParse(ua, options);

  return toDevice(matchDeviceRules(resolved, rulesFor('device', extensions, deviceRules)));
};

/**
 * Parse only the rendering-engine slice from a User-Agent string.
 *
 * @param ua - User-Agent string; when omitted, uses `headers` or `navigator.userAgent` in browsers.
 * @param options - Extensions, Client Hints, and feature-check flags.
 */
export const parseEngine = (ua?: string, options: ParseOptions = {}): Engine => {
  const { ua: resolved, extensions } = resolveParse(ua, options);

  return toEngine(matchRules(resolved, rulesFor('engine', extensions, engineRules)));
};

/**
 * Parse only the OS slice from a User-Agent string.
 *
 * @param ua - User-Agent string; when omitted, uses `headers` or `navigator.userAgent` in browsers.
 * @param options - Extensions, Client Hints, and feature-check flags.
 */
export const parseOS = (ua?: string, options: ParseOptions = {}): OS => {
  const { ua: resolved, extensions } = resolveParse(ua, options);

  return applyIosSafariVersionFix(
    toOs(matchRules(resolved, rulesFor('os', extensions, osRules))),
    resolved,
  );
};

/**
 * Parse a User-Agent into browser, CPU, device, engine, and OS slices.
 *
 * @param ua - User-Agent string; when omitted, uses `headers` (Client Hints) or `navigator.userAgent` in browsers.
 * @param options - Extensions, Client Hints (`headers` required when enabled), and feature-check flags.
 * @returns Full {@link Result} with the resolved UA string and all slices.
 *
 * @example
 * ```ts
 * const result = parseUA(navigator.userAgent);
 * const withHints = parseUA(ua, { withClientHints: true, headers: request.headers });
 * ```
 */
export const parseUA = (ua?: string, options: ParseOptions = {}): Result => {
  const { ua: resolved, extensions } = resolveParse(ua, options);
  const headers = clientHintHeaders(options);
  const hints = isNonNullish(headers) ? parseClientHints(headers) : undefined;

  const base = {
    ua: resolved,
    browser: toBrowser(matchRules(resolved, rulesFor('browser', extensions, browserRules))),
    cpu: toCpu(matchRules(resolved, rulesFor('cpu', extensions, cpuRules))),
    device: toDevice(matchDeviceRules(resolved, rulesFor('device', extensions, deviceRules))),
    engine: toEngine(matchRules(resolved, rulesFor('engine', extensions, engineRules))),
    os: applyIosSafariVersionFix(
      toOs(matchRules(resolved, rulesFor('os', extensions, osRules))),
      resolved,
    ),
  };

  return pipe(
    base,
    when(
      () => isNonNullish(hints),
      (b) => applyClientHints(b, hints!),
    ),
    when(() => options.withFeatureCheck === true, applyFeatureCheck),
  );
};
