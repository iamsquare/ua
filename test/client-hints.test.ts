import { forEach } from 'remeda';
import { describe, expect, it } from 'vitest';

import { BrowserName, CPUArch, DeviceType, DeviceVendor, EngineName, OSName } from '@/enums';
import { isCPU, isDevice, isOS } from '@/helpers';
import { parseUA } from '@/index';
import { runClientHintsFixtures } from '@test/utils/fixtures';

describe('Map UA-CH headers', () => {
  const headers = {
    'sec-ch-ua': '"Chromium";v="93", "Google Chrome";v="93", " Not;A Brand";v="99"',
    'sec-ch-ua-full-version-list':
      '"Chromium";v="93.0.1.2", "Google Chrome";v="93.0.1.2", " Not;A Brand";v="99.0.1.2"',
    'sec-ch-ua-arch': '"arm"',
    'sec-ch-ua-bitness': '"64"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-model': '"Pixel 99"',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"13"',
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  };

  it('reads from client-hints headers when withClientHints is true', () => {
    const result = parseUA(undefined, { withClientHints: true, headers });

    expect(result.ua).toBe(headers['user-agent']);
    expect(result.browser.name).toBe(BrowserName.CHROME);
    expect(result.browser.version).toBe('93.0.1.2');
    expect(result.browser.major).toBe('93');
    expect(result.cpu.architecture).toBe(CPUArch.ARM_64);
    expect(result.device.type).toBe(DeviceType.MOBILE);
    expect(result.device.model).toBe('Pixel 99');
    expect(result.device.vendor).toBe(DeviceVendor.GOOGLE);
    expect(result.engine.name).toBe(EngineName.BLINK);
    expect(result.engine.version).toBe('93.0.1.2');
    expect(result.os.name).toBe(OSName.WINDOWS);
    expect(result.os.version).toBe('11');
  });

  it('only reads from user-agent when called without withClientHints', () => {
    const result = parseUA(headers['user-agent']);

    expect(result.browser.name).toBe(BrowserName.CHROME);
    expect(result.browser.version).toBe('110.0.0.0');
    expect(result.browser.major).toBe('110');
    expect(result.cpu.architecture).toBe(CPUArch.X86_64);
    expect(result.device.type).toBeUndefined();
    expect(result.device.model).toBeUndefined();
    expect(result.device.vendor).toBeUndefined();
    expect(result.engine.name).toBe(EngineName.BLINK);
    expect(result.engine.version).toBe('110.0.0.0');
    expect(result.os.name).toBe(OSName.LINUX);
    expect(result.os.version).toBeUndefined();
  });

  it('falls back to user-agent when withClientHints but few client-hints headers', () => {
    const sparse = {
      'sec-ch-ua-mobile': '?1',
      'user-agent': headers['user-agent'],
    };

    const result = parseUA(undefined, { withClientHints: true, headers: sparse });

    expect(result.browser.name).toBe(BrowserName.CHROME);
    expect(result.browser.version).toBe('110.0.0.0');
    expect(result.browser.major).toBe('110');
    expect(result.cpu.architecture).toBe(CPUArch.X86_64);
    expect(result.device.type).toBe(DeviceType.MOBILE);
    expect(result.device.model).toBeUndefined();
    expect(result.device.vendor).toBeUndefined();
    expect(result.engine.name).toBe(EngineName.BLINK);
    expect(result.engine.version).toBe('110.0.0.0');
    expect(result.os.name).toBe(OSName.LINUX);
    expect(result.os.version).toBeUndefined();
  });

  it('detects Apple silicon from client hints data', () => {
    const appleSilicon = {
      'sec-ch-ua-arch': 'arm',
      'sec-ch-ua-platform': 'macOS',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0',
    };

    const result = parseUA(undefined, { withClientHints: true, headers: appleSilicon });

    expect(isOS(result.os, OSName.MACOS)).toBe(true);
    expect(isCPU(result.cpu, CPUArch.ARM)).toBe(true);
    expect(isDevice(result.device, DeviceType.MOBILE)).toBe(false);
    expect(isDevice(result.device, DeviceType.TABLET)).toBe(false);
  });

  it('detects form-factors from client-hints', () => {
    expect(
      parseUA(undefined, {
        withClientHints: true,
        headers: { 'sec-ch-ua-form-factors': '"VR"' },
      }).device.type,
    ).toBe(DeviceType.XR);

    expect(
      parseUA(undefined, {
        withClientHints: true,
        headers: { 'sec-ch-ua-form-factors': '"Tablet", "EInk"' },
      }).device.type,
    ).toBe(DeviceType.TABLET);

    expect(
      parseUA(undefined, {
        withClientHints: true,
        headers: { 'sec-ch-ua-form-factors': '"Unknown"' },
      }).device.type,
    ).toBeUndefined();
  });

  it('avoids error on headers variation', () => {
    const variation = {
      'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      'sec-ch-ua-full-version-list': '"Google Chrome", "Chromium", "Not?A_Brand";v="24.0.0.0"',
      'sec-ch-ua-full-version': '""',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-arch': '""',
      'sec-ch-ua-bitness': '""',
      'sec-ch-ua-model': '""',
      'sec-ch-ua-platform': '"Windows"',
      'sec-ch-ua-platform-version': '""',
      'sec-ch-ua-wow64': '?0',
    };

    const result = parseUA(undefined, { withClientHints: true, headers: variation });

    expect(result.browser.name).toBe(BrowserName.CHROME);
    expect(result.browser.version).toBeUndefined();
    expect(result.browser.major).toBeUndefined();
  });
});

describe('withClientHints and withFeatureCheck', () => {
  it('applies form-factor client hints alongside feature check', () => {
    const headers = {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
      'sec-ch-ua-form-factors': '"VR"',
    };

    const result = parseUA(undefined, {
      withClientHints: true,
      withFeatureCheck: true,
      headers,
    });

    expect(result.device.type).toBe(DeviceType.XR);
  });
});

forEach(
  [
    { name: 'browsers', file: 'browsers.json' },
    { name: 'device-models', file: 'device-models.json' },
    { name: 'brand-priority', file: 'brand-priority.json' },
  ],
  runClientHintsFixtures,
);
