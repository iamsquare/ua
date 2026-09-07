import {
  hasProp,
  isEmptyish,
  isFunction,
  isNonNullish,
  isString,
  isTruthy,
  pipe,
  setPath,
  when,
} from 'remeda';

import { isBrowser } from '@/env';
import { type Result } from '@/types';

const getNavigator = () => {
  if (!isBrowser() || !hasProp(globalThis, 'navigator')) return;

  return globalThis.navigator;
};

export const applyFeatureCheck = (result: Result): Result => {
  const nav = getNavigator();

  if (isNonNullish(nav) && isString(nav.userAgent) && nav.userAgent !== result.ua) {
    return result;
  }

  return pipe(
    result,
    when(
      () => isFunction(nav?.brave?.isBrave),
      (next) => setPath(next, ['browser', 'name'], 'Brave'),
    ),
    when(
      (next) => isTruthy(nav?.userAgentData?.mobile) && isEmptyish(next.device.type),
      (next) => setPath(next, ['device', 'type'], 'mobile'),
    ),
    when(
      (next) =>
        next.device.model === 'Macintosh' &&
        isNonNullish(nav) &&
        hasProp(nav, 'standalone') &&
        isNonNullish(nav.maxTouchPoints) &&
        nav.maxTouchPoints > 2,
      (next) =>
        pipe(
          next,
          (next) => setPath(next, ['device', 'model'], 'iPad'),
          (next) => setPath(next, ['device', 'type'], 'tablet'),
        ),
    ),
    when(
      (next) => isEmptyish(next.os.name) && isNonNullish(nav?.userAgentData?.platform),
      (next) => setPath(next, ['os', 'name'], nav?.userAgentData?.platform),
    ),
  );
};
