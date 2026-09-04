# Contributing

Thanks for your interest in contributing to `@iamsquare/ua`.

## Setup

```bash
pnpm install
```

## Development

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `pnpm test`      | Run the Vitest fixture suite   |
| `pnpm typecheck` | Type-check with `tsc --noEmit` |
| `pnpm lint`      | Lint and autofix               |
| `pnpm build`     | Build ESM + CJS outputs        |
| `pnpm docs:dev`  | Run the docs site locally      |

## Pull requests

1. Open a focused PR with a clear description of the change.
2. Add or update fixtures under [`test/fixtures`](./test/fixtures) when changing detection behavior.
3. If the change affects the published package, add a Changeset with `pnpm changeset`.
4. Keep PRs limited to one concern when practical.

## Reporting issues

Include the User-Agent string (or Client Hints headers), the expected result, and the actual result when reporting detection bugs.
