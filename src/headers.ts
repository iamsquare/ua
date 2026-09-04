import { entries, find, isArray, isEmptyish, isString, pipe, toLowerCase } from 'remeda';

import type { HeadersLike } from '@/types';

export const headerValue = (headers: HeadersLike, name: string) => {
  if (headers instanceof Headers) return headers.get(name) ?? undefined;

  const match = pipe(
    headers,
    entries(),
    find(([key]) => toLowerCase(key) === toLowerCase(name)),
  );

  if (isEmptyish(match)) return;

  const value = match[1];

  if (isArray(value)) return value[0];

  if (isString(value)) return value;
};
