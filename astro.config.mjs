import { defineConfig } from 'astro/config';
import remarkWikiLink from 'remark-wiki-link';
import { remarkImageWikilinks } from './plugins/remark-image-wikilinks.js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Configure to read content from the parent content directory
  srcDir: './src',

  // Configure markdown processing
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-light',
      wrap: true
    },
    remarkPlugins: [
      remarkImageWikilinks,
      [remarkWikiLink, {
        pageResolver: (name) => {
          // Handle page links only
          return [name.replace(/ /g, '-').toLowerCase()];
        },
        hrefTemplate: (permalink) => {
          // Handle page links
          return `/blog/${permalink}`;
        },
        aliasDivider: '|'
      }]
    ],
  },

  // Configure site settings
  site: 'https://kevinjalbert.com', // Update with actual domain

  // Configure build output to temp directory (configurable via env var)
  outDir: process.env.ASTRO_OUT_DIR || './dist',

  // Configure public directory (handled by scripts, not directly by Astro)
  // publicDir: './public',

  // Configure integrations
  integrations: [
    sitemap(),
    tailwind()
  ]
});
