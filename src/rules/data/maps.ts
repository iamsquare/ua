import type { StringMap } from '@/types';

export const windowsVersionMap = {
  '7': '6.1',
  '8': '6.2',
  '10': ['6.4', '10.0'],
  '2000': ['5.0', '5.01'],
  ME: '4.90',
  'NT 3.51': '3.51',
  'NT 4.0': '4.0',
  XP: ['5.1', '5.2'],
  Vista: '6.0',
  '8.1': '6.3',
  NT: '',
} as const satisfies StringMap;

export const formFactorsMap = {
  embedded: 'Automotive',
  mobile: 'Mobile',
  tablet: ['Tablet', 'EInk'],
  smarttv: 'TV',
  wearable: 'Watch',
  xr: ['VR', 'XR'],
  '?': ['Desktop', 'Unknown'],
} as const satisfies StringMap;

export const browserHintsMap = {
  Chrome: 'Google Chrome',
  Edge: 'Microsoft Edge',
  'Edge WebView2': 'Microsoft Edge WebView2',
  'Chrome WebView': 'Android WebView',
  'Chrome Headless': 'HeadlessChrome',
  'Huawei Browser': 'HuaweiBrowser',
  'MIUI Browser': 'Miui Browser',
  'Opera Mobi': 'OperaMobile',
  Yandex: 'YaBrowser',
} as const satisfies StringMap;
