import { describe, expect, it } from 'vitest';

import { isAICrawler, isBot } from '@/bots';
import { bots, crawler } from '@/extensions';
import { parseUA } from '@/index';

describe('bots helpers', () => {
  it('detects crawlers as bots', () => {
    const ua = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
    const result = parseUA(ua, { extensions: [bots, crawler] });

    expect(isBot(result)).toBe(true);
  });

  it('detects GPTBot as AI crawler', () => {
    const ua = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0)';

    expect(isAICrawler(ua)).toBe(true);
  });
});
