# Docs

Starlight site for `@iamsquare/ua`.

```
pnpm create astro@latest -- --template starlight
```

## Project structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in `src/content/docs/`. Each file is a route based on its name.

Images go in `src/assets/` and can be embedded with a relative link.

Static assets such as favicons go in `public/`.

## Commands

Run from the repo root (or `docs/` when working in this package alone):

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Learn more

See [Starlight docs](https://starlight.astro.build/), [Astro docs](https://docs.astro.build), or the [Astro Discord](https://astro.build/chat).
