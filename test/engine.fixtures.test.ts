import { join } from 'node:path';

import { parseEngine } from '@/index';
import { fixturesRoot, runCategoryFixtures } from '@test/utils/fixtures';

runCategoryFixtures({
  name: 'engine',
  dir: join(fixturesRoot, 'engine'),
  parse: parseEngine,
});
