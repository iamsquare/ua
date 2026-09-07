/**
 * Bot detection helpers
 *
 * @module @iamsquare/ua/bots
 */

import { isIncludedIn, isString, toLowerCase } from 'remeda';
import type { ValueOf } from 'type-fest';

import { type BrowserType, type Extension } from '@/enums';
import { bots, crawler, fetcher } from '@/extensions';
import { parseBrowser } from '@/parse-ua';
import type { Result } from '@/types';

const BOT_TYPES = ['cli', 'crawler', 'fetcher', 'library'] satisfies ValueOf<typeof BrowserType>[];

const AI_ASSISTANTS = [
  'chatgpt-user',
  'claude-user',
  'cohere-ai',
  'duckassistbot',
  'gemini-deep-research',
  'mistralai-user',
  'novaact',
  'perplexity-user',
] satisfies Lowercase<ValueOf<typeof Extension.BrowserName.Fetcher>>[];

const AI_CRAWLERS = [
  'ai2bot',
  'amazonbot',
  'anthropic-ai',
  'applebot-extended',
  'applebot',
  'atlassian-bot',
  'bravebot',
  'bytespider',
  'ccbot',
  'chatglm-spider',
  'claude-searchbot',
  'claude-web',
  'claudebot',
  'cloudflare-autorag',
  'cohere-training-data-crawler',
  'coveobot',
  'dataforseobot',
  'deepseekbot',
  'diffbot',
  'facebookbot',
  'firecrawlagent',
  'google-cloudvertexbot',
  'google-extended',
  'google-notebooklm',
  'googleother-image',
  'googleother-video',
  'googleother',
  'gptbot',
  'huggingface-bot',
  'imagesiftbot',
  'kangaroo bot',
  'kimibot',
  'meta-externalagent',
  'meta-webindexer',
  'oai-searchbot',
  'omgili',
  'omgilibot',
  'pangubot',
  'perplexitybot',
  'petalbot',
  'replicate-bot',
  'runpod-bot',
  'sbintuitionsbot',
  'semrushbot-ocob',
  'semrushbot-swa',
  'tiktokspider',
  'timpibot',
  'together-bot',
  'v0bot',
  'velenpublicwebcrawler',
  'webzio-extended',
  'xai-bot',
  'youbot',
] satisfies Lowercase<ValueOf<typeof Extension.BrowserName.Crawler>>[];

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
