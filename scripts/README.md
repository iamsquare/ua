# Scripts

## `sync:uap-core`

Appends missing [uap-core](https://github.com/ua-parser/uap-core) test cases into local fixtures. Existing cases are never rewritten. Use this for TDD: new expects come from upstream, then fix parser rules (or expects) until tests pass.

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

Missing = UA string not already present. Mapping:

- **browser**: `family` → `name`, joined version parts → `version` / `major`. Empty object `{}` when family is `Other`
- **os**: same without `major`
- **device**: `brand` → `vendor`, `model` → `model` (no `type`, since uap-core does not provide one)

Does not touch `src/rules/` or `regexes.yaml`.

### Output

```
browser: fetched=N present=N appended=N
os: fetched=N present=N appended=N
device: fetched=N present=N appended=N
```
