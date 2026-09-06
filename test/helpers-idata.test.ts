import { merge } from 'remeda';
import { describe, expect, it, vi, afterEach } from 'vitest';

import { BrowserName, CPUArch, DeviceType, DeviceVendor, EngineName, OSName } from '@/enums';
import { applyFeatureCheck } from '@/feature-check';
import {
  getDeviceVendor,
  getOutlookEdition,
  is,
  isAppleSilicon,
  isBrowser,
  isChromeFamily,
  isElectron,
  isEngine,
  isOS,
  toString,
} from '@/helpers';
import { parseUA } from '@/parse-ua';
import type { Result } from '@/types';

const emptyResult = (): Result => ({
  ua: '',
  browser: {},
  cpu: {},
  device: {},
  engine: {},
  os: {},
});

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

  it('matches engine name via isEngine and ignores version', () => {
    expect(isEngine({ name: EngineName.BLINK, version: '120' }, EngineName.BLINK)).toBe(true);
    expect(isEngine({ name: EngineName.BLINK, version: '120' }, '120')).toBe(false);
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

describe('isChromeFamily', () => {
  const chromeUa =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  const firefoxUa =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0';

  it('detects Blink engines from Result or UA string', () => {
    expect(isChromeFamily(chromeUa)).toBe(true);
    expect(isChromeFamily(parseUA(chromeUa))).toBe(true);
  });

  it('returns false for non-Blink engines', () => {
    expect(isChromeFamily(firefoxUa)).toBe(false);
    expect(isChromeFamily(emptyResult())).toBe(false);
  });
});

describe('isElectron', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(process.versions, 'electron');
  });

  it('returns false outside Electron', () => {
    expect(isElectron()).toBe(false);
  });

  it('detects Electron via process.versions.electron', () => {
    Object.defineProperty(process.versions, 'electron', {
      value: '28.0.0',
      configurable: true,
      enumerable: true,
    });

    expect(isElectron()).toBe(true);
  });

  it('detects Electron via navigator.userAgent', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Electron/28.0.0 Safari/537.36',
    });

    expect(isElectron()).toBe(true);
  });
});

describe('getDeviceVendor', () => {
  it('infers vendor from an Android model token', () => {
    expect(getDeviceVendor('SM-X706B')).toBe(DeviceVendor.SAMSUNG);
  });
});

describe('isAppleSilicon', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns true for macOS + ARM architecture', () => {
    expect(
      isAppleSilicon(
        merge(emptyResult(), {
          os: { name: OSName.MACOS },
          cpu: { architecture: CPUArch.ARM },
        }),
      ),
    ).toBe(true);
  });

  it('returns false when OS is not macOS', () => {
    expect(
      isAppleSilicon(
        merge(emptyResult(), {
          os: { name: OSName.WINDOWS },
          cpu: { architecture: CPUArch.ARM },
        }),
      ),
    ).toBe(false);
  });

  it('returns false on Node when macOS is not ARM', () => {
    expect(
      isAppleSilicon(
        merge(emptyResult(), {
          os: { name: OSName.MACOS },
          cpu: { architecture: CPUArch.X86_64 },
        }),
      ),
    ).toBe(false);
  });

  it('detects Apple Silicon via WebGL renderer in browser', () => {
    const webgl = {
      getExtension: () => ({ UNMASKED_RENDERER_WEBGL: 0x9246 }),
      getParameter: () => 'ANGLE (Apple, Apple M2 Pro, OpenGL 4.1)',
    };

    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {
      createElement: () => ({
        getContext: (type: string) => (type === 'webgl' ? webgl : null),
      }),
    });

    expect(
      isAppleSilicon(
        merge(emptyResult(), {
          os: { name: OSName.MACOS },
          cpu: { architecture: CPUArch.X86_64 },
        }),
      ),
    ).toBe(true);
  });

  it('falls back through webgl2 / experimental-webgl contexts', () => {
    const webgl = {
      getExtension: () => ({ UNMASKED_RENDERER_WEBGL: 0x9246 }),
      getParameter: () => 'Apple M1',
    };

    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {
      createElement: () => ({
        getContext: (type: string) => (type === 'experimental-webgl' ? webgl : null),
      }),
    });

    expect(
      isAppleSilicon(
        merge(emptyResult(), {
          os: { name: OSName.MACOS },
          cpu: {},
        }),
      ),
    ).toBe(true);
  });

  it('returns false when WebGL probing throws', () => {
    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {
      createElement: () => {
        throw new Error('canvas unavailable');
      },
    });

    expect(
      isAppleSilicon(
        merge(emptyResult(), {
          os: { name: OSName.MACOS },
          cpu: { architecture: CPUArch.X86_64 },
        }),
      ),
    ).toBe(false);
  });
});

describe('getOutlookEdition', () => {
  it('returns the name when name or version is missing', () => {
    expect(getOutlookEdition(undefined, '16.0')).toBeUndefined();
    expect(getOutlookEdition('Outlook', undefined)).toBe('Outlook');
    expect(getOutlookEdition('', '16.0')).toBe('');
  });

  it('labels Mac Outlook modern vs legacy', () => {
    expect(getOutlookEdition('Microsoft MacOutlook', '16.46')).toBe('Outlook for Mac (Modern)');
    expect(getOutlookEdition('MacOutlook', '15.41')).toBe('Outlook for Mac (Legacy)');
  });

  it('maps Windows Outlook editions by major/build', () => {
    expect(getOutlookEdition('Outlook', '15.0.0')).toBe('Outlook 2013');
    expect(getOutlookEdition('Outlook', '14.0.0')).toBe('Outlook 2010');
    expect(getOutlookEdition('Outlook', '12.0.0')).toBe('Outlook 2007');
    expect(getOutlookEdition('Outlook', '11.0.0')).toBe('Outlook (Legacy)');
    expect(getOutlookEdition('Microsoft Outlook', '16.0.4266')).toBe(
      'Outlook 2016 (MSI / Volume License)',
    );
    expect(getOutlookEdition('Outlook', '16.0.14326')).toBe('Outlook 365 / 2019+ (Modern)');
  });

  it('returns the original name for unrecognized clients', () => {
    expect(getOutlookEdition('Thunderbird', '115.0')).toBe('Thunderbird');
    expect(getOutlookEdition('Outlook', '17.0.0')).toBe('Outlook');
  });
});

describe('withClientHints', () => {
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
