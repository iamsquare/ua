import { filter, isEmpty, isEmptyish, join, map, pipe } from 'remeda';
import type { ValueOf } from 'type-fest';

export const CATEGORY = {
  BROWSER: 'browser',
  OS: 'os',
  DEVICE: 'device',
  CPU: 'cpu',
  ENGINE: 'engine',
} as const;

export type Category = ValueOf<typeof CATEGORY>;

export type FieldMap = Record<string, string | undefined>;

export type NormalizedResult = {
  browser?: FieldMap;
  os?: FieldMap;
  device?: FieldMap;
  cpu?: FieldMap;
  engine?: FieldMap;
};

export type ParserAdapter = {
  id: string;
  label: string;
  entry: string;
  parse: (ua: string) => NormalizedResult | Promise<NormalizedResult>;
};

export const undefToUndefined = (value: unknown) => {
  if (isEmptyish(value)) return;

  return `${value}`;
};

export const joinVersionParts = (...parts: (string | number | null | undefined)[]) => {
  const cleaned = pipe(
    parts,
    filter((part) => !isEmptyish(part)),
    map((v) => `${v}`),
  );

  if (isEmpty(cleaned)) return;

  return join(cleaned, '.');
};
