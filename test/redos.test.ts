import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { UA_MAX_LENGTH } from '@/engine/match-rules';
import { parseUA } from '@/index';

const REDOS_THRESHOLD_MS = 1000;

describe('ReDoS', () => {
  it('parses oversized sec-ch-ua-model under 100ms', () => {
    const headers = {
      'sec-ch-ua-platform': '"Android"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-model': `"${'A '.repeat(25000)}"`,
    };

    const t0 = process.hrtime.bigint();

    parseUA(undefined, { withClientHints: true, headers });

    const ms = Number(process.hrtime.bigint() - t0) / 1e6;

    expect(ms).toBeLessThan(100);
  });

  it('parseUA stays under 1s for random UAs', () => {
    fc.assert(
      fc.property(fc.string({ maxLength: UA_MAX_LENGTH }), (ua) => {
        const t0 = process.hrtime.bigint();

        parseUA(ua);

        const ms = Number(process.hrtime.bigint() - t0) / 1e6;

        expect(ms).toBeLessThan(REDOS_THRESHOLD_MS);
      }),
      { numRuns: 100_000 },
    );
  });
});
