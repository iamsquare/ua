/**
 * Additional extension packs for parsing User-Agent strings
 *
 * @module @iamsquare/ua/extensions
 */

import { extensionsData } from '@/rules/data/extensions';
import { loadRules } from '@/rules/load';
import type { AuthoredCategory } from '@/rules/load';
import type { ExtensionPack } from '@/types';

const toPack = (
  pack: Partial<Record<'browser' | 'cpu' | 'device' | 'engine' | 'os', AuthoredCategory>>,
): ExtensionPack => ({
  ...(pack.browser ? { browser: loadRules(pack.browser) } : {}),
  ...(pack.cpu ? { cpu: loadRules(pack.cpu) } : {}),
  ...(pack.device ? { device: loadRules(pack.device) } : {}),
  ...(pack.engine ? { engine: loadRules(pack.engine) } : {}),
  ...(pack.os ? { os: loadRules(pack.os) } : {}),
});

/** Extension pack: command-line HTTP clients. */
export const cli = toPack(extensionsData.cli);
/** Extension pack: web crawlers and spiders. */
export const crawler = toPack(extensionsData.crawler);
/** Extension pack: additional / niche device models. */
export const extraDevice = toPack(extensionsData.extraDevice);
/** Extension pack: email clients. */
export const email = toPack(extensionsData.email);
/** Extension pack: fetchers and preview bots. */
export const fetcher = toPack(extensionsData.fetcher);
/** Extension pack: in-app / WebView browsers. */
export const inApp = toPack(extensionsData.inApp);
/** Extension pack: HTTP libraries and SDKs. */
export const library = toPack(extensionsData.library);
/** Extension pack: media players. */
export const mediaPlayer = toPack(extensionsData.mediaPlayer);
/** Extension pack: vehicle / automotive browsers. */
export const vehicle = toPack(extensionsData.vehicle);
/** Extension pack: combined bot-oriented rules (CLI, crawler, fetcher, library, …). */
export const bots = toPack(extensionsData.bots);

/**
 * All built-in extension packs keyed by name.
 *
 * Pass individual packs (or arrays of packs) to `parseUA` via `{ extensions }`.
 */
export const extensions = {
  cli,
  crawler,
  extraDevice,
  email,
  fetcher,
  inApp,
  library,
  mediaPlayer,
  vehicle,
  bots,
};
