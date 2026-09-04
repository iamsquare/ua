/**
 * Bot detection helpers
 *
 * @module @iamsquare/ua/bots
 */

import { isIncludedIn, isString, map, pipe, toLowerCase, values } from 'remeda';

import { BrowserType, Extension } from '@/enums';
import { bots, crawler, fetcher } from '@/extensions';
import { parseBrowser } from '@/parse-ua';
import type { Result } from '@/types';

const BOT_TYPES = pipe(BrowserType, values(), map(toLowerCase()));

const AI_ASSISTANTS = pipe(Extension.BrowserName.Fetcher, values(), map(toLowerCase()));

const AI_CRAWLERS = pipe(Extension.BrowserName.Crawler, values(), map(toLowerCase()));

const resolveBrowserName = (resultOrUa: Result | string) => {
  const browser = isString(resultOrUa)
    ? parseBrowser(resultOrUa, { extensions: [crawler, fetcher, bots] })
    : resultOrUa.browser;

  return isString(browser.name) ? toLowerCase(browser.name) : undefined;
};

const resolveBrowserType = (resultOrUa: Result | string) => {
  const browser = isString(resultOrUa)
    ? parseBrowser(resultOrUa, { extensions: [bots] })
    : resultOrUa.browser;

  return isString(browser.type) ? toLowerCase(browser.type) : undefined;
};

/**
 * Whether the UA / result is a bot-like client (CLI, crawler, fetcher, or library type).
 *
 * When given a string, parses with the `bots` extension pack.
 *
 * @param resultOrUa - A {@link Result} or raw User-Agent string.
 */
export const isBot = (resultOrUa: Result | string) => {
  const type = resolveBrowserType(resultOrUa);

  return isString(type) && isIncludedIn(type, BOT_TYPES);
};

/**
 * Whether the UA / result matches a known AI assistant user agent.
 *
 * @param resultOrUa - A {@link Result} or raw User-Agent string.
 */
export const isAIAssistant = (resultOrUa: Result | string) => {
  const name = resolveBrowserName(resultOrUa);

  return isString(name) && isIncludedIn(name, AI_ASSISTANTS);
};

/**
 * Whether the UA / result matches a known AI crawler / training bot.
 *
 * @param resultOrUa - A {@link Result} or raw User-Agent string.
 */
export const isAICrawler = (resultOrUa: Result | string) => {
  const name = resolveBrowserName(resultOrUa);

  return isString(name) && isIncludedIn(name, AI_CRAWLERS);
};
