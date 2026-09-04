import { bowserAdapter } from '@/adapters/bowser';
import { detectBrowserAdapter } from '@/adapters/detect-browser';
import { deviceDetectorJsAdapter } from '@/adapters/device-detector-js';
import { iamsquareAdapter } from '@/adapters/iamsquare';
import { myUaParserAdapter } from '@/adapters/my-ua-parser';
import { platformAdapter } from '@/adapters/platform';
import { uaParserJsAdapter } from '@/adapters/ua-parser-js';

export const adapters = [
  iamsquareAdapter,
  uaParserJsAdapter,
  myUaParserAdapter,
  bowserAdapter,
  platformAdapter,
  detectBrowserAdapter,
  deviceDetectorJsAdapter,
];
