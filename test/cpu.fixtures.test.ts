import { join } from 'node:path';

import { parseCPU } from '@/index';
import { fixturesRoot, runCategoryFixtures } from '@test/utils/fixtures';

runCategoryFixtures({
  name: 'cpu',
  dir: join(fixturesRoot, 'cpu'),
  parse: parseCPU,
});
