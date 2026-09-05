import type { ValueOf } from 'type-fest';

import { type AssignKind } from '@/rules/kinds';

/** Device form-factor constants used by core rules and `@iamsquare/ua/enums`. */
export const DEVICE_TYPE = {
  CONSOLE: 'console',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  SMARTTV: 'smarttv',
  WEARABLE: 'wearable',
  XR: 'xr',
  EMBEDDED: 'embedded',
} as const;

/** Device form-factor string values (e.g. `"mobile"`, `"tablet"`). */
export type DeviceType = ValueOf<typeof DEVICE_TYPE>;

/** Browser category constants for extension-detected types (crawler, in-app, etc.). */
export const BROWSER_TYPE = {
  CLI: 'cli',
  CRAWLER: 'crawler',
  FETCHER: 'fetcher',
  INAPP: 'inapp',
  LIBRARY: 'library',
  MEDIAPLAYER: 'mediaplayer',
  EMAIL: 'email',
} as const;

/** Browser category string values (e.g. `"crawler"`, `"inapp"`). */
export type BrowserType = ValueOf<typeof BROWSER_TYPE>;

/** Parsed browser slice of a {@link Result}. */
export type Browser = {
  name?: string;
  version?: string;
  major?: string;
  type?: string;
};

/** Parsed CPU slice of a {@link Result}. */
export type CPU = {
  architecture?: string;
};

/** Parsed device slice of a {@link Result}. */
export type Device = {
  type?: string;
  vendor?: string;
  model?: string;
};

/** Parsed engine slice of a {@link Result}. */
export type Engine = {
  name?: string;
  version?: string;
};

/** Parsed OS slice of a {@link Result}. */
export type OS = {
  name?: string;
  version?: string;
};

/**
 * Full parse result from {@link parseUA}.
 *
 * Slice objects are plain data. Use `@iamsquare/ua/helpers` for comparisons and formatting.
 */
export type Result = {
  ua: string;
  browser: Browser;
  cpu: CPU;
  device: Device;
  engine: Engine;
  os: OS;
};

/** Headers bag accepted for Client Hints / User-Agent lookup (Fetch `Headers` or a plain record). */
export type HeadersLike = Headers | Record<string, string | string[] | undefined>;

/**
 * Optional rule pack passed to `parseUA` / modular parsers via `extensions`.
 *
 * Each category prepends its rules ahead of the built-in set.
 */
export type ExtensionPack = Partial<{
  browser: Rule[];
  cpu: Rule[];
  device: Rule[];
  engine: Rule[];
  os: Rule[];
}>;

type ParseOptionsBase = {
  extensions?: ExtensionPack[];
  withFeatureCheck?: boolean;
};

/**
 * Options for {@link parseUA} and the modular parsers.
 *
 * When `withClientHints` is `true`, `headers` is required.
 */
export type ParseOptions =
  | (ParseOptionsBase & { withClientHints?: false; headers?: never })
  | (ParseOptionsBase & { withClientHints: true; headers: HeadersLike });

/** @internal */
export type Transform = (value: string, match: RegExpExecArray) => string | undefined;

/** @internal */
export type Assign =
  | { type: typeof AssignKind.Capture; field: string; transform?: Transform }
  | { type: typeof AssignKind.Literal; field: string; value: string | undefined }
  | {
      type: typeof AssignKind.Replace;
      field: string;
      replace: [RegExp | string, string];
      transform?: Transform;
    }
  | { type: typeof AssignKind.Map; field: string; map: StringMap }
  | {
      type: typeof AssignKind.ReplaceMap;
      field: string;
      replace: [RegExp | string, string];
      map: StringMap;
    }
  | {
      type: typeof AssignKind.Test;
      field: string;
      test: RegExp;
      ifTrue: string;
      ifFalse: string;
    };

/**
 * A matching rule: one or more regex patterns plus field assignments for captures.
 *
 * Used by extension packs and the low-level {@link matchRules} helper.
 */
export type Rule = {
  patterns: RegExp[];
  assign: Assign[];
};

/** @internal */
export type StringMap = Record<string, string | string[] | undefined>;
