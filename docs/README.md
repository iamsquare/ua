# Docs

Starlight site for `@iamsquare/ua`.

## Project structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.ts
├── package.json
└── tsconfig.json
```

Starlight picks up `.md` or `.mdx` files in `src/content/docs/`. Each file becomes a route from its path.

Put images in `src/assets/` and link them relatively.

Static assets such as favicons go in `public/`.

## Commands

Run from the repo root, or from `docs/` when working in this package alone:

| Command                | Action                                     |
| :--------------------- | :----------------------------------------- |
| `pnpm install`         | Install dependencies                       |
| `pnpm dev`             | Start the local server at `localhost:4321` |
| `pnpm build`           | Build the production site to `./dist/`     |
| `pnpm preview`         | Preview the production build locally       |
| `pnpm astro ...`       | Run Astro CLI commands (`add`, `check`, …) |
| `pnpm astro -- --help` | Show Astro CLI help                        |

## Learn more

[Starlight docs](https://starlight.astro.build/), [Astro docs](https://docs.astro.build), or the [Astro Discord](https://astro.build/chat).
