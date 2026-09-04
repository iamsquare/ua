import { join } from 'node:path';

import { parseDevice } from '@/index';
import { fixturesRoot, runCategoryFixtures } from '@test/utils/fixtures';

runCategoryFixtures({
  name: 'device',
  dir: join(fixturesRoot, 'device'),
  parse: parseDevice,
});
