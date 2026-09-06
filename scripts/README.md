# Scripts

## `sync:uap-core`

Downloads [uap-core](https://github.com/ua-parser/uap-core) test cases and **always overwrites** the local `uap-core.json` fixtures with upstream expects.

Those fixtures are **not** part of `pnpm test`. Run them separately while filling in regex coverage:

```bash
pnpm exec vitest run test/uap-core.fixtures.test.ts
```

Benchmark accuracy also reports main-suite and uap-core scores side by side (`pnpm --dir benchmarks bench`).

```bash
pnpm sync:uap-core
```

Pin a git ref with `UAP_CORE_REF` (default `master`):

```bash
UAP_CORE_REF=v0.18.0 pnpm sync:uap-core
```

### What it updates

| Upstream YAML            | Local fixture                            |
| ------------------------ | ---------------------------------------- |
| `tests/test_ua.yaml`     | `test/fixtures/ua/browser/uap-core.json` |
| `tests/test_os.yaml`     | `test/fixtures/ua/os/uap-core.json`      |
| `tests/test_device.yaml` | `test/fixtures/ua/device/uap-core.json`  |

Mapping:

- **browser**: `family` → `name`, joined version parts → `version` / `major`. Empty object `{}` when family is `Other`
- **os**: same without `major`
- **device**: `brand` → `vendor`, `model` → `model` (no `type`, since uap-core does not provide one)

Does not touch `src/rules/` or `regexes.yaml`.

### Output

```
browser: fetched=N written=N
os: fetched=N written=N
device: fetched=N written=N
```
