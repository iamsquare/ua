# Benchmarks

Compare `@iamsquare/ua` against other User-Agent parsers on fixture accuracy, speed, and bundle size.

Not part of the root test, build, lint, or CI pipelines.

## Run

Build the library first, then:

```bash
pnpm build
pnpm --dir benchmarks bench
```

Or from the repo root:

```bash
pnpm bench
```

Writes:

- `results/latest.json` and `results/latest.md` (gitignored, local only)
- `../docs/src/data/competitors.json` (committed snapshot for the docs page)

## Metrics

| Metric   | Meaning                                                                           |
| -------- | --------------------------------------------------------------------------------- |
| Accuracy | Share of fixture expect keys matched (string equality) against `test/fixtures/ua` |
| Speed    | Ops/s parsing the fixture UA list                                                 |
| Size     | esbuild bundle of the package entry, raw and gzip                                 |

Fixture expects are authored for `@iamsquare/ua`. Other libraries can fail on naming differences even when broadly correct.

## Competitors

`ua-parser-js`, `my-ua-parser`, `bowser`, `platform`, `detect-browser`, `device-detector-js`.
