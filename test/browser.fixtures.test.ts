import { join } from 'node:path';

import { parseBrowser } from '@/index';
import { fixturesRoot, runCategoryFixtures } from '@test/utils/fixtures';

runCategoryFixtures({
  name: 'browser',
  dir: join(fixturesRoot, 'browser'),
  parse: parseBrowser,
});
