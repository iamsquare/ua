import fc from 'fast-check';
import UserAgent from 'user-agents';
import { describe, expect, it } from 'vitest';

import { parseUA } from '@/index';
import {
  matchesDeviceCategory,
  toExpectation,
  toFingerprint,
  toInput,
} from '@test/oracles/user-agents';

const NUM_RUNS = 100_000;

const gen = new UserAgent();

const realUaArb = fc.noShrink(fc.noBias(fc.integer()).map(() => toFingerprint(gen.random())));

describe('Smoke real-UA deviceCategory', () => {
  it('parseUA device.type agrees with deviceCategory', { timeout: 60_000 }, () => {
    fc.assert(
      fc.property(realUaArb, (fp) => {
        const ua = toInput(fp);
        const result = parseUA(ua);

        expect(result.ua).toBe(ua);
        expect(matchesDeviceCategory(result, toExpectation(fp))).toBe(true);
      }),
      { numRuns: NUM_RUNS },
    );
  });
});
