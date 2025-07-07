import { defineConfig } from 'astro/config';
import remarkWikilinks from './integrations/remark-wikilinks.js';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import astroBrokenLinksChecker from 'astro-broken-links-checker';

// https://astro.build/config
export default defineConfig({
  // Configure to read content from the parent content directory
  srcDir: './src',

  // Configure markdown processing
  markdown: {
    remarkPlugins: [
      remarkWikilinks, // Our comprehensive plugin for all wikilinks (images and pages)
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-light',
      wrap: true
    },
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
    tailwind(),
    astroBrokenLinksChecker({
      logFilePath: 'broken-links.log', // Log broken links to a file
      checkExternalLinks: false, // Set to true if you want to check external links (slower)
      // Additional options available:
      // checkExternalLinks: true, // Enable to check external URLs (much slower)
      // timeoutMs: 3000, // Timeout for external link checks
      // retries: 3 // Number of retries for failed external links
    })
  ]
});
