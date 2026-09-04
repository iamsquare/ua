import type { ValueOf } from 'type-fest';

export const AssignKind = {
  Capture: 'capture',
  Literal: 'literal',
  Replace: 'replace',
  Map: 'map',
  ReplaceMap: 'replace-map',
  Test: 'test',
} as const;

export type AssignKind = ValueOf<typeof AssignKind>;

export const TransformKind = {
  Lower: 'lower',
  Trim: 'trim',
  Email: 'email',
  AndroidOrIos: 'aos',
} as const;

export type TransformKind = ValueOf<typeof TransformKind>;
