import { consola } from 'consola';

import { loadAdapter } from '@/adapters';
import { allUserAgents, loadFixtures } from '@/load-fixtures';
import { measureSpeed } from '@/metrics/speed';

const main = async () => {
  const adapterId = process.argv[2];

  if (!adapterId) {
    throw new Error('Usage: tsx src/run-speed-worker.ts <adapter-id>');
  }

  const adapter = loadAdapter(adapterId);
  const uas = allUserAgents(loadFixtures());
  const result = await measureSpeed(adapter, uas);

  process.stdout.write(`${JSON.stringify(result)}\n`);
};

main().catch((error: unknown) => {
  consola.error(error);
  process.exitCode = 1;
});
