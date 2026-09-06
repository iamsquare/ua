# Benchmarks

Compare `@iamsquare/ua` against other User-Agent parsers on fixture accuracy, speed, bundle size, and memory footprint.

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

| Metric               | Meaning                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Accuracy             | Share of curated fixture expect keys matched (string equality) against `test/fixtures/ua` (excludes `uap-core.json`) |
| vs uap-core accuracy | Same check against upstream [uap-core](https://github.com/ua-parser/uap-core) fixtures (`uap-core.json`)             |
| Speed                | Ops/s from [tinybench](https://github.com/tinylibs/tinybench) in a fresh Node process per library (sync UA parse)    |
| Size                 | esbuild bundle of the package entry, raw and gzip                                                                    |
| Memory               | Heap delta in a fresh Node process (`--expose-gc`): import footprint, then retained parse of all unique UAs          |

Curated fixture expects are authored for `@iamsquare/ua`. Other libraries can fail on naming differences even when broadly correct.

## Competitors

`@iamsquare/ua`, `ua-parser-js`, `my-ua-parser`, `bowser`, `platform`, `detect-browser`.
