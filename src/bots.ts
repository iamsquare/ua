/**
 * Bot detection helpers
 *
 * @module @iamsquare/ua/bots
 */

import { isIncludedIn, isString, map, pipe, toLowerCase } from 'remeda';

import { BrowserType, Extension } from '@/enums';
import { bots, crawler, fetcher } from '@/extensions';
import { parseBrowser } from '@/parse-ua';
import type { Result } from '@/types';

const BOT_TYPES = map(
  [BrowserType.CLI, BrowserType.CRAWLER, BrowserType.FETCHER, BrowserType.LIBRARY],
  toLowerCase(),
);

const AI_ASSISTANTS = map(
  [
    Extension.BrowserName.Fetcher.AMAZON_NOVA_ACT,
    Extension.BrowserName.Fetcher.ANTHROPIC_CLAUDE_USER,
    Extension.BrowserName.Fetcher.COHERE_AI,
    Extension.BrowserName.Fetcher.DUCKDUCKGO_ASSISTBOT,
    Extension.BrowserName.Fetcher.GOOGLE_GEMINI_DEEP_RESEARCH,
    Extension.BrowserName.Fetcher.MISTRALAI_USER,
    Extension.BrowserName.Fetcher.OPENAI_CHATGPT_USER,
    Extension.BrowserName.Fetcher.PERPLEXITY_USER,
  ],
  toLowerCase(),
);

const AI_CRAWLERS = pipe(
  [
    Extension.BrowserName.Crawler.AI2_BOT,
    Extension.BrowserName.Crawler.AMAZON_BOT,
    Extension.BrowserName.Crawler.ANTHROPIC_AI,
    Extension.BrowserName.Crawler.ANTHROPIC_CLAUDE_BOT,
    Extension.BrowserName.Crawler.ANTHROPIC_CLAUDE_SEARCHBOT,
    Extension.BrowserName.Crawler.ANTHROPIC_CLAUDE_WEB,
    Extension.BrowserName.Crawler.APPLE_BOT,
    Extension.BrowserName.Crawler.APPLE_BOT_EXTENDED,
    Extension.BrowserName.Crawler.ATLASSIAN_BOT,
    Extension.BrowserName.Crawler.BRAVE_BOT,
    Extension.BrowserName.Crawler.BYTEDANCE_BYTESPIDER,
    Extension.BrowserName.Crawler.BYTEDANCE_TIKTOKSPIDER,
    Extension.BrowserName.Crawler.CLOUDFLARE_AUTORAG,
    Extension.BrowserName.Crawler.COHERE_TRAINING_DATA_CRAWLER,
    Extension.BrowserName.Crawler.COMMON_CRAWL_CCBOT,
    Extension.BrowserName.Crawler.COVEO_BOT,
    Extension.BrowserName.Crawler.DATAFORSEO_BOT,
    Extension.BrowserName.Crawler.DEEPSEEK_BOT,
    Extension.BrowserName.Crawler.DIFFBOT,
    Extension.BrowserName.Crawler.GOOGLE_EXTENDED,
    Extension.BrowserName.Crawler.GOOGLE_NOTEBOOKLM,
    Extension.BrowserName.Crawler.GOOGLE_OTHER,
    Extension.BrowserName.Crawler.GOOGLE_OTHER_IMAGE,
    Extension.BrowserName.Crawler.GOOGLE_OTHER_VIDEO,
    Extension.BrowserName.Crawler.GOOGLE_CLOUDVERTEXBOT,
    Extension.BrowserName.Crawler.HIVE_IMAGESIFTBOT,
    Extension.BrowserName.Crawler.HUAWEI_PETALBOT,
    Extension.BrowserName.Crawler.HUAWEI_PANGUBOT,
    Extension.BrowserName.Crawler.HUGGINGFACE_BOT,
    Extension.BrowserName.Crawler.KANGAROO_BOT,
    Extension.BrowserName.Crawler.FIRECRAWL_AGENT,
    Extension.BrowserName.Crawler.META_FACEBOOKBOT,
    Extension.BrowserName.Crawler.META_EXTERNALAGENT,
    Extension.BrowserName.Crawler.META_WEBINDEXER,
    Extension.BrowserName.Crawler.MOONSHOT_KIMIBOT,
    Extension.BrowserName.Crawler.OPENAI_GPTBOT,
    Extension.BrowserName.Crawler.OPENAI_SEARCH_BOT,
    Extension.BrowserName.Crawler.PERPLEXITY_BOT,
    Extension.BrowserName.Crawler.REPLICATE_BOT,
    Extension.BrowserName.Crawler.RUNPOD_BOT,
    Extension.BrowserName.Crawler.SB_INTUITIONS_BOT,
    Extension.BrowserName.Crawler.SEMRUSH_BOT_CONTENTSHAKE,
    Extension.BrowserName.Crawler.SEMRUSH_BOT_SWA,
    Extension.BrowserName.Crawler.TIMPI_BOT,
    Extension.BrowserName.Crawler.TOGETHER_BOT,
    Extension.BrowserName.Crawler.HUNTER_VELENPUBLICWEBCRAWLER,
    Extension.BrowserName.Crawler.VERCEL_V0BOT,
    Extension.BrowserName.Crawler.WEBZIO_OMGILI,
    Extension.BrowserName.Crawler.WEBZIO_OMGILI_BOT,
    Extension.BrowserName.Crawler.WEBZIO_EXTENDED,
    Extension.BrowserName.Crawler.XAI_BOT,
    Extension.BrowserName.Crawler.YOU_BOT,
    Extension.BrowserName.Crawler.ZHIPU_CHATGLM_SPIDER,
  ],
  map(toLowerCase()),
);

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
