import {
  hasProp,
  isEmptyish,
  isFunction,
  isNonNullish,
  isString,
  isTruthy,
  mergeDeep,
  pipe,
  when,
} from 'remeda';

import { isBrowser } from '@/env';
import { DEVICE_TYPE, type Result } from '@/types';

type NavigatorLike = {
  userAgent?: string;
  standalone?: boolean;
  maxTouchPoints?: number;
  brave?: { isBrave?: unknown };
  userAgentData?: {
    mobile?: boolean;
    platform?: string;
  };
};

const getNavigator = (): NavigatorLike | undefined => {
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
      mergeDeep({
        browser: { name: 'Brave' },
      }),
    ),
    when(
      (next) => isTruthy(nav?.userAgentData?.mobile) && isEmptyish(next.device.type),
      mergeDeep({
        device: { type: DEVICE_TYPE.MOBILE },
      }),
    ),
    when(
      (next) =>
        next.device.model === 'Macintosh' &&
        isNonNullish(nav) &&
        hasProp(nav, 'standalone') &&
        isNonNullish(nav.maxTouchPoints) &&
        nav.maxTouchPoints > 2,
      mergeDeep({
        device: { model: 'iPad', type: DEVICE_TYPE.TABLET },
      }),
    ),
    when(
      (next) => isEmptyish(next.os.name) && isNonNullish(nav?.userAgentData?.platform),
      (next) =>
        mergeDeep(next, {
          os: { name: nav?.userAgentData?.platform },
        }),
    ),
  );
};
