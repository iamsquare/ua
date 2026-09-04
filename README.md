# @iamsquare/ua

[![npm](https://img.shields.io/npm/v/@iamsquare/ua.svg)](https://www.npmjs.com/package/@iamsquare/ua)
[![npm downloads](https://img.shields.io/npm/dm/@iamsquare/ua.svg)](https://www.npmjs.com/package/@iamsquare/ua)
[![Build](https://github.com/iamsquare/ua/actions/workflows/publish.yml/badge.svg)](https://github.com/iamsquare/ua/actions/workflows/publish.yml)
[![Test](https://github.com/iamsquare/ua/actions/workflows/test.yml/badge.svg)](https://github.com/iamsquare/ua/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](./LICENSE)
[![Node.js](https://img.shields.io/node/v/@iamsquare/ua.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

The Essential Web Development Tool for User-Agent Detection. Detect Browsers, OS, Devices, Bots, Apps, AI Crawlers, and more. Run in Browser (client-side) or Node.js (server-side).

Powerful User-Agent detection in a compact, TypeScript-first library with Client Hints support.

- **Comprehensive detection:** Identify browsers, engines, OS, devices, CPUs, bots, apps, AI crawlers, and more
- **Modern & typed:** Dual ESM/CJS builds, Client Hints support, and a functional TypeScript API
- **Runs everywhere:** Use seamlessly in browsers, Node.js, and modern JavaScript runtimes

## Install

```bash
pnpm add @iamsquare/ua
```

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

Documentation lives in [`/docs`](./docs). Published docs: https://ua.iamsquare.it/

## Releasing

Versioning uses [Changesets](./.changeset/README.md):

```bash
pnpm changeset
```

CI publishes public releases to npm from `master`. See [`.changeset/README.md`](./.changeset/README.md).

## Scripts

| Command              | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `pnpm build`         | ESM + CJS dual build via tsdown                                     |
| `pnpm test`          | Vitest fixture suite                                                |
| `pnpm typecheck`     | `tsc --noEmit`                                                      |
| `pnpm lint`          | ESLint + Prettier autofix                                           |
| `pnpm lint:check`    | ESLint without writing fixes                                        |
| `pnpm format`        | Prettier write across the repo                                      |
| `pnpm sync:uap-core` | Append missing uap-core test fixtures ([docs](./scripts/README.md)) |
| `pnpm changeset`     | Add a Changeset for the next release                                |

## Testing

The Vitest suite under [`test/fixtures`](./test/fixtures) includes User-Agent cases from [uap-core](https://github.com/ua-parser/uap-core) and other UA-parser libraries. Those fixtures verify this library's behavior against known inputs. They are not shipped in the published package.

To pull new upstream cases without overwriting local expects, run `pnpm sync:uap-core` (see [`scripts/README.md`](./scripts/README.md)).

## Contributors

Contributions are welcome! Please read the [CONTRIBUTING GUIDE](./CONTRIBUTING.md) first for detailed contribution instructions.

## License

MIT. See [LICENSE](./LICENSE).
