import { join } from 'node:path';

import { parseOS } from '@/index';
import { fixturesRoot, runCategoryFixtures } from '@test/utils/fixtures';

runCategoryFixtures({
  name: 'os',
  dir: join(fixturesRoot, 'os'),
  parse: parseOS,
});
