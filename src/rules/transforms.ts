import { prop, toLowerCase } from 'remeda';
import type { KeysOfUnion } from 'type-fest';

import { TransformKind } from '@/rules/kinds';
import type { Transform } from '@/types';

const EMAIL_NAME_MAP = {
  YahooMobile: 'Yahoo Mail',
  YahooMail: 'Yahoo Mail',
  'K-9': 'K-9 Mail',
  'K-9 Mail': 'K-9 Mail',
  Zdesktop: 'Zimbra',
  zdesktop: 'Zimbra',
} as const;

export const transforms = {
  [TransformKind.Lower]: toLowerCase(),
  [TransformKind.Trim]: (value: string) => value.replace(/^\s+/, '').trim(),
  [TransformKind.Email]: (value: string) =>
    prop(EMAIL_NAME_MAP, value as KeysOfUnion<typeof EMAIL_NAME_MAP>) ?? value,
  [TransformKind.AndroidOrIos]: (value: string) => (value === 'A' ? 'Android' : 'iOS'),
} as const satisfies Record<TransformKind, Transform>;
