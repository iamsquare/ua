import { isIncludedIn, isNonNullish } from 'remeda';
import type { ValueOf } from 'type-fest';
import type UserAgent from 'user-agents';

import { DeviceType } from '@/enums';
import type { Result } from '@/types';

export const ORACLE_DEVICE_CATEGORY = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  TABLET: 'tablet',
} as const;

export type OracleDeviceCategory = ValueOf<typeof ORACLE_DEVICE_CATEGORY>;

export type OracleFingerprint = {
  userAgent: string;
  deviceCategory: OracleDeviceCategory;
};

export const deviceCategoryMap = {
  [ORACLE_DEVICE_CATEGORY.MOBILE]: DeviceType.MOBILE,
  [ORACLE_DEVICE_CATEGORY.TABLET]: DeviceType.TABLET,
  [ORACLE_DEVICE_CATEGORY.DESKTOP]: undefined,
} as const satisfies Record<OracleDeviceCategory, ValueOf<typeof DeviceType> | undefined>;

export type DeviceCategoryExpectation = {
  deviceType: ValueOf<typeof DeviceType> | undefined;
};

export const toInput = (fp: OracleFingerprint) => fp.userAgent;

export const toExpectation = (fp: OracleFingerprint): DeviceCategoryExpectation => ({
  deviceType: deviceCategoryMap[fp.deviceCategory],
});

const mobileOrTablet = [DeviceType.MOBILE, DeviceType.TABLET] as const;

export const matchesDeviceCategory = (result: Result, expected: DeviceCategoryExpectation) => {
  if (isNonNullish(expected.deviceType)) return result.device.type === expected.deviceType;

  return !isIncludedIn(result.device.type, mobileOrTablet);
};

export const isOracleDeviceCategory = (value: unknown): value is OracleDeviceCategory =>
  value === ORACLE_DEVICE_CATEGORY.DESKTOP ||
  value === ORACLE_DEVICE_CATEGORY.MOBILE ||
  value === ORACLE_DEVICE_CATEGORY.TABLET;

export const toFingerprint = (sample: UserAgent): OracleFingerprint => {
  const deviceCategory: unknown = Reflect.get(sample.data, 'deviceCategory');

  if (!isOracleDeviceCategory(deviceCategory)) {
    throw new Error(`Unexpected Oracle deviceCategory: ${String(deviceCategory)}`);
  }

  return { userAgent: sample.data.userAgent, deviceCategory };
};
