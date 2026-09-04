/**
 * Core User-Agent parser: `parseUA`, modular parsers, result types, and low-level match helpers.
 *
 * @module @iamsquare/ua
 */
export {
  type Browser,
  type BrowserType,
  type CPU,
  type Device,
  type DeviceType,
  type Engine,
  type ExtensionPack,
  type HeadersLike,
  type OS,
  type ParseOptions,
  type Result,
  type Rule,
  BROWSER_TYPE,
  DEVICE_TYPE,
} from '@/types';

export { parseBrowser, parseCPU, parseDevice, parseEngine, parseOS, parseUA } from '@/parse-ua';
