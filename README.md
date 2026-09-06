# @iamsquare/ua

[![npm](https://img.shields.io/npm/v/@iamsquare/ua.svg)](https://www.npmjs.com/package/@iamsquare/ua)
[![npm downloads](https://img.shields.io/npm/dm/@iamsquare/ua.svg)](https://www.npmjs.com/package/@iamsquare/ua)
[![Build](https://github.com/iamsquare/ua/actions/workflows/publish.yml/badge.svg)](https://github.com/iamsquare/ua/actions/workflows/publish.yml)
[![Test](https://github.com/iamsquare/ua/actions/workflows/test.yml/badge.svg)](https://github.com/iamsquare/ua/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](./LICENSE)
[![Node.js](https://img.shields.io/node/v/@iamsquare/ua.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

User-Agent parser for browsers and Node.js. Detect browsers, OS, devices, bots, apps, and AI crawlers.

- Typed results for browser, engine, OS, device, and CPU
- Dual ESM/CJS builds, Client Hints, and extension packs
- Same API in browsers and Node.js

## Install

```bash
pnpm add @iamsquare/ua
```

## CLI

Parse User-Agent strings from the terminal with `npx` / `pnpx` (binary: `ua`):

```bash
npx @iamsquare/ua "Flock/2.16 (Zenwalk 7.3; es_PR;)"
```

```json
[
  {
    "ua": "Flock/2.16 (Zenwalk 7.3; es_PR;)",
    "browser": { "name": "Flock", "version": "2.16", "major": "2" },
    "cpu": {},
    "device": {},
    "engine": {},
    "os": { "name": "Zenwalk", "version": "7.3" }
  }
]
```

Batch from a file (one UA per line):

```bash
npx @iamsquare/ua --input-file log.txt --output-file log-result.json
```

| Option                       | Description                                                    |
| ---------------------------- | -------------------------------------------------------------- |
| `-i`, `--input-file <path>`  | Text file with User-Agent strings (one per line)               |
| `-o`, `--output-file <path>` | Write the JSON array to this file                              |
| `-e`, `--extensions <packs>` | Comma-separated packs (`none`, `all`, or e.g. `crawler,email`) |

Defaults load `bots`, `email`, `extraDevice`, `inApp`, and `vehicle`. Full details: [Using the CLI](https://ua.iamsquare.it/docs/cli/).

## Usage

```ts
import { parseUA } from '@iamsquare/ua';

const result = parseUA(
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
);

console.log(result.browser); // { name: 'Chrome', version: '120.0.0.0', major: '120' }
console.log(result.os); // { name: 'macOS', version: '10.15.7' }
```

### Modular parsers

```ts
import { parseBrowser, parseOS, parseDevice, parseCPU, parseEngine } from '@iamsquare/ua';
```

### Bots

```ts
import { isBot, isAICrawler, isAIAssistant } from '@iamsquare/ua/bots';
```

### Extensions

```ts
import { parseUA } from '@iamsquare/ua';
import { crawler, email } from '@iamsquare/ua/extensions';

const result = parseUA(ua, { extensions: [crawler, email] });
```

### Client Hints

```ts
const result = parseUA(undefined, {
  withClientHints: true,
  headers: request.headers,
});
```

## Docs

```bash
pnpm docs:dev
```

Docs live in [`/docs`](./docs). Published site: https://ua.iamsquare.it/

## Releasing

Versioning uses [Changesets](./.changeset/README.md):

```bash
pnpm changeset
```

CI publishes public releases to npm from `master`. See [`.changeset/README.md`](./.changeset/README.md).

## Scripts

| Command              | Description                                                                    |
| -------------------- | ------------------------------------------------------------------------------ |
| `pnpm build`         | ESM + CJS dual build via tsdown                                                |
| `pnpm test`          | Vitest suite (main fixtures + user-agents smoke; excludes uap-core)            |
| `pnpm test:uap-core` | Upstream uap-core fixture suite (opt-in while coverage is filled in)           |
| `pnpm typecheck`     | `tsc --noEmit`                                                                 |
| `pnpm lint`          | ESLint + Prettier autofix                                                      |
| `pnpm lint:check`    | ESLint without writing fixes                                                   |
| `pnpm format`        | Prettier write across the repo                                                 |
| `pnpm sync:uap-core` | Overwrite `uap-core.json` fixtures from upstream ([docs](./scripts/README.md)) |
| `pnpm changeset`     | Add a Changeset for the next release                                           |

## Testing

`pnpm test` runs the Vitest suite under [`test/`](./test). Fixture JSON under [`test/fixtures`](./test/fixtures) is not shipped in the published package.

| Suite                                                                   | What it covers                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixture tests (`*.fixtures.test.ts`, Client Hints, extensions, helpers) | Curated UA / header cases. Expected browser, OS, device, engine, CPU slices. Excludes `uap-core.json`.                                                                                                                                                               |
| [`test/uap-core.fixtures.test.ts`](./test/uap-core.fixtures.test.ts)    | Upstream [uap-core](https://github.com/ua-parser/uap-core) fixtures. **Excluded** from default `pnpm test`. Run: `pnpm test:uap-core`                                                                                                                                |
| [`test/user-agents-smoke.test.ts`](./test/user-agents-smoke.test.ts)    | Property test over ~100k live samples from [`user-agents`](https://github.com/intoli/user-agents). Soft oracle: `user-agents` `deviceCategory` vs `device.type` via [`test/oracles/user-agents.ts`](./test/oracles/user-agents.ts). Uses a 60s timeout for slower CI |
| [`test/redos.test.ts`](./test/redos.test.ts)                            | ReDoS / timing guards (random UA strings + oversized Client Hints). **Excluded** from default `pnpm test`. Run explicitly: `pnpm exec vitest run test/redos.test.ts`                                                                                                 |

`user-agents` corpus is browser traffic only. Bot coverage stays in fixtures and [`test/bots.test.ts`](./test/bots.test.ts).

To refresh upstream uap-core expects (overwrite `uap-core.json` only), run `pnpm sync:uap-core` (see [`scripts/README.md`](./scripts/README.md)).

## Contributors

Contributions are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

## License

MIT. See [LICENSE](./LICENSE).
