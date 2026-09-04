import { describe, expect, it, vi, afterEach } from 'vitest';

import { BrowserName, DeviceType, OSName } from '@/enums';
import { applyFeatureCheck } from '@/feature-check';
import { is, isBrowser, isOS, toString } from '@/helpers';
import { parseUA } from '@/parse-ua';

describe('is / toString helpers', () => {
  it('matches browser name case-insensitively and ignores version/major', () => {
    const result = parseUA(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );

    expect(isBrowser(result.browser, BrowserName.CHROME)).toBe(true);
    expect(isBrowser(result.browser, 'chrome')).toBe(true);
    expect(isBrowser(result.browser, result.browser.version ?? '')).toBe(false);
  });

  it('strips Browser / OS suffixes via typed helpers', () => {
    expect(isBrowser({ name: 'Android Browser' }, 'Android')).toBe(true);
    expect(isOS({ name: 'Mac OS' }, 'Mac')).toBe(true);
  });

  it('allows generic is for custom ignore/strip', () => {
    expect(is({ name: 'Chrome', version: '120' }, '120')).toBe(true);
    expect(is({ name: 'Chrome', version: '120' }, '120', { ignore: ['version'] })).toBe(false);
  });

  it('formats slices with toString', () => {
    const result = parseUA(
      'Mozilla/5.0 (Linux; Android 10; STK-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
    );

    expect(toString(result.browser, ['name', 'version'])).toMatch(/Chrome /);
    expect(toString(result.os, ['name', 'version'])).toBe('Android 10');
    expect(toString(result.device, ['vendor', 'model'])).toContain('STK-LX1');
  });
});

describe('ParseOptions withClientHints', () => {
  it('applies Client Hints only when withClientHints is true', () => {
    const ua =
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';

    const headers = {
      'user-agent': ua,
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-model': '"Galaxy S3 Marketing"',
      'sec-ch-ua-platform': '"Android"',
    };

    const without = parseUA(ua);
    const withHints = parseUA(ua, { withClientHints: true, headers });

    expect(without.os.name).toBe(OSName.LINUX);
    expect(withHints.os.name).toBe(OSName.ANDROID);
    expect(withHints.device.type).toBe(DeviceType.MOBILE);
    expect(withHints.device.model).toBe('Galaxy S3 Marketing');
  });
});

describe('withFeatureCheck', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('detects iPad via feature check when UA reports Macintosh', () => {
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {});
    vi.stubGlobal('navigator', {
      userAgent: ua,
      standalone: false,
      maxTouchPoints: 5,
    });

    const without = parseUA(ua);
    const withCheck = parseUA(ua, { withFeatureCheck: true });

    expect(without.device.model).toBe('Macintosh');
    expect(applyFeatureCheck(without).device).toMatchObject({
      model: 'iPad',
      type: DeviceType.TABLET,
    });
    expect(withCheck.device).toMatchObject({
      model: 'iPad',
      type: DeviceType.TABLET,
    });
  });

  it('sets Brave when navigator.brave.isBrave exists', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {});
    vi.stubGlobal('navigator', {
      userAgent: ua,
      brave: { isBrave: () => Promise.resolve(true) },
    });

    const result = parseUA(ua, { withFeatureCheck: true });

    expect(result.browser.name).toBe(BrowserName.BRAVE);
  });
});
