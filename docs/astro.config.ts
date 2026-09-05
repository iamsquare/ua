import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';
import svgr from 'vite-plugin-svgr';

const repoRoot = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

export default defineConfig({
  site: 'https://ua.iamsquare.it',
  integrations: [
    starlight({
      title: '@iamsquare/ua',
      description:
        'User-Agent parser for browsers and Node.js. Detect browsers, OS, devices, and bots.',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/iamsquare/ua',
        },
      ],
      components: {
        Header: './src/components/starlight/Header.astro',
        Hero: './src/components/starlight/Hero.astro',
        Footer: './src/components/starlight/Footer.astro',
        SiteTitle: './src/components/starlight/SiteTitle.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
        PageSidebar: './src/components/starlight/PageSidebar.astro',
      },
      favicon: 'favicon.png',
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://ua.iamsquare.it/og.png?v=1',
          },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:type', content: 'image/png' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: '@iamsquare/ua | Typed User-Agent detection for browsers and Node.js',
          },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://ua.iamsquare.it/og.png?v=1',
          },
        },
      ],
      plugins: [
        starlightTypeDoc({
          entryPoints: [
            '../src/index.ts',
            '../src/bots.ts',
            '../src/extensions.ts',
            '../src/helpers.ts',
            '../src/enums.ts',
          ],
          tsconfig: '../tsconfig.json',
          output: 'reference/typedoc',
          watch: process.argv.includes('dev'),
          sidebar: {
            label: 'Type reference',
            readmeLabel: 'Overview',
          },
          typeDoc: {
            excludePrivate: true,
            excludeInternal: true,
            excludeExternals: true,
            sortEntryPoints: false,
            readme: path.join(repoRoot, 'docs/typedoc-readme.md'),
          },
        }),
      ],
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Why @iamsquare/ua', slug: 'docs/why' },
            { label: 'Installation', slug: 'docs/installation' },
            { label: 'Using the CLI', slug: 'docs/cli' },
          ],
        },
        { label: 'Playground', slug: 'docs/playground' },
        { label: 'Competitors', slug: 'docs/competitors' },
        { label: 'Changelogs', slug: 'docs/changelogs' },
        {
          label: 'Guides',
          items: [
            { label: 'Parsing', slug: 'docs/parsing' },
            { label: 'Extensions', slug: 'docs/extensions' },
            { label: 'Client Hints', slug: 'docs/client-hints' },
            { label: 'Bots', slug: 'docs/bots' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'API', slug: 'reference/api' },
            { label: 'Enums', slug: 'reference/enums' },
          ],
        },
        typeDocSidebarGroup,
      ],
      customCss: ['./src/styles/global.css'],
    }),
    react(),
  ],
  vite: {
    resolve: {
      tsconfigPaths: true,
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['clsx', 'remeda', 'tailwind-merge', '@paper-design/shaders-react'],
    },
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
    plugins: [svgr(), tailwindcss()],
  },
});
