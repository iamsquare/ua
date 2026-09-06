import { describe, expect, it } from 'vitest';

import { matchDeviceRules, matchRules } from '@/engine/match-rules';
import { deviceRules } from '@/rules';
import { AssignKind } from '@/rules/kinds';
import type { Rule } from '@/types';

describe('matchRules', () => {
  it('matches first rule and assigns captures and literals', () => {
    const rules = [
      [
        [/chrome\/([\d.]+)/i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'Chrome' },
        ],
      ],
      [
        [/firefox\/([\d.]+)/i],
        [
          { type: AssignKind.Capture, field: 'version' },
          { type: AssignKind.Literal, field: 'name', value: 'Firefox' },
        ],
      ],
    ] satisfies Rule[];

    expect(matchRules('Mozilla Chrome/120.0 Safari', rules)).toEqual({
      version: '120.0',
      name: 'Chrome',
    });
  });

  it('applies replace transforms', () => {
    const rules = [
      [
        [/(comodo_dragon)\/([\w.]+)/i],
        [
          {
            type: AssignKind.Replace,
            field: 'name',
            replace: [/_/g, ' '],
          },
          { type: AssignKind.Capture, field: 'version' },
        ],
      ],
    ] satisfies Rule[];

    expect(matchRules('comodo_dragon/1.2', rules)).toEqual({
      name: 'comodo dragon',
      version: '1.2',
    });
  });

  it('lets Literal skip a capture slot so the next assign reads the following group', () => {
    const rules = [
      [
        [/(chrome)\/([\d.]+)/i],
        [
          { type: AssignKind.Literal, field: 'name', value: 'Chrome WebView' },
          { type: AssignKind.Capture, field: 'version' },
        ],
      ],
    ] satisfies Rule[];

    expect(matchRules('; wv). chrome/43.0', rules)).toEqual({
      name: 'Chrome WebView',
      version: '43.0',
    });
  });
});

describe('matchDeviceRules', () => {
  it('fast-misses Windows and Linux desktop UAs', () => {
    expect(
      matchDeviceRules(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        deviceRules,
      ),
    ).toBeUndefined();

    expect(
      matchDeviceRules(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        deviceRules,
      ),
    ).toBeUndefined();
  });

  it('still matches Macintosh, iPhone, and Pixel', () => {
    expect(
      matchDeviceRules(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
        deviceRules,
      ),
    ).toMatchObject({ vendor: 'Apple', model: 'Macintosh' });

    expect(
      matchDeviceRules(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
        deviceRules,
      ),
    ).toMatchObject({ vendor: 'Apple', model: 'iPhone', type: 'mobile' });

    expect(
      matchDeviceRules(
        'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        deviceRules,
      ),
    ).toMatchObject({ vendor: 'Google', model: 'Pixel 8', type: 'mobile' });
  });
});
