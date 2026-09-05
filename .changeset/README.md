# Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) to version and publish `@iamsquare/ua` publicly to npm via [trusted publishing (OIDC)](https://docs.npmjs.com/trusted-publishers/).

## Adding a changeset

When a PR should release the package:

```bash
pnpm changeset
```

Select `@iamsquare/ua`, the semver bump, and a short summary. Commit the generated file under `.changeset/`.

## Release flow

1. Merge the feature PR (with changeset) to `master`
2. CI opens or updates a **Version Packages** PR (`chore: version packages`)
3. Merge that PR to bump `package.json` + `CHANGELOG.md`
4. CI runs `pnpm release` (`changeset publish`) to **npmjs.org**, pushes git tags, and creates **GitHub Releases**

## Setup (one-time)

### 1. First package publish (manual)

Trusted publishers are configured on an **existing** package. Create `@iamsquare/ua` once from your machine (after `npm login`):

```bash
pnpm build
pnpm publish --access public
```

That claims the name (e.g. `0.0.1`). Later releases go through Changesets/CI; the next bump must be higher than what you published manually.

### 2. Trusted Publisher on npm

On [npmjs.com](https://www.npmjs.com/package/@iamsquare/ua) → **Settings** → **Trusted Publisher** → GitHub Actions:

| Field               | Value           |
| ------------------- | --------------- |
| Organization / user | `iamsquare`     |
| Repository          | `ua`            |
| Workflow filename   | `publish.yml`   |
| Environment         | _(leave empty)_ |

Allow **`npm publish`**. The workflow already has `id-token: write` and does not use `NPM_TOKEN`.

### 3. Docs site

Enable **GitHub Pages** → Source: **GitHub Actions**. Docs deploy separately via **Deploy Docs** to GitHub Pages at `https://ua.iamsquare.it/`.
