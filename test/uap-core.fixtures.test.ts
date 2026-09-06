import { join } from 'node:path';

import { parseBrowser, parseDevice, parseOS } from '@/index';
import { fixturesRoot, runUapCoreFixtures } from '@test/utils/fixtures';

runUapCoreFixtures({
  name: 'browser',
  dir: join(fixturesRoot, 'browser'),
  parse: parseBrowser,
});

runUapCoreFixtures({
  name: 'os',
  dir: join(fixturesRoot, 'os'),
  parse: parseOS,
});

runUapCoreFixtures({
  name: 'device',
  dir: join(fixturesRoot, 'device'),
  parse: parseDevice,
});
