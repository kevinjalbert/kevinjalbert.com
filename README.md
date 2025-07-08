# [Kevin Jalbert's Blog](https://kevinjalbert.com/)

> A modern, fast blog built with [Astro](https://astro.build) focusing on software development, productivity, and technology insights.

## ✨ Features

- **⚡ Ultra-Fast Performance**: Built with Astro 5 for optimal performance and static site generation
- **🔍 Advanced Search**: Powered by Pagefind with keyboard shortcuts (`/` to search) and mobile-optimized interface
- **🏷️ Smart Tag System**: Browse and filter posts by topics and categories
- **📱 Responsive Design**: Beautiful, modern UI with Tailwind CSS and mobile-first approach
- **🔗 Wiki-Style Linking**: Seamless internal linking between posts with custom remark plugins
- **📡 RSS & Sitemap**: Stay updated with RSS feeds and SEO-optimized sitemaps
- **⌨️ Keyboard Navigation**: Power user shortcuts for search and navigation
- **📝 Obsidian Integration**: Complete content workflow with bidirectional sync
- **🖼️ Image Optimization**: Automatic image processing and optimization through Astro
- **🎨 Enhanced Typography**: Rich typography support with Tailwind Typography
- **📋 Code Copy Feature**: One-click copy functionality for code blocks
- **🔄 View Transitions**: Smooth page transitions with Astro's ViewTransitions API

## 🚀 Project Structure

Modern Astro project with content collections and integrated tooling:

```text
kevinjalbert.com/
├── src/
│   ├── components/       # Reusable Astro components
│   │   └── SearchModal.astro  # Advanced search modal with Pagefind
│   ├── layouts/          # Page layouts with ViewTransitions
│   │   └── Layout.astro  # Main layout with search, navigation, mobile menu
│   ├── pages/            # File-based routing
│   │   ├── [...page].astro    # Dynamic pagination
│   │   ├── [...slug].astro    # Dynamic blog post routing
│   │   ├── index.astro        # Homepage
│   │   ├── rss.xml.js        # RSS feed generation
│   │   ├── api/              # API routes
│   │   ├── blog/             # Blog-specific pages
│   │   ├── posts/            # Post listing pages
│   │   └── tags/             # Tag-based filtering
│   ├── styles/           # Global CSS and Tailwind
│   │   └── global.css    # Base styles and utilities
│   ├── utils/            # Utility functions
│   │   ├── readTime.ts   # Reading time calculation
│   │   └── search-index.ts    # Search indexing utilities
│   └── content/          # Content collections (synced from Obsidian)
│       ├── blog/         # Blog posts (markdown files)
│       ├── pages/        # Static pages (about, now, etc.)
│       └── config.ts     # Content collection schemas
├── scripts/              # Content sync and utility scripts
│   └── sync-content.sh   # Bidirectional Obsidian sync
├── integrations/         # Custom Astro plugins and integrations
│   └── remark-wikilinks.js   # Wiki-style linking for pages and images
├── test/                 # Test files
│   ├── README.md         # Test documentation
│   └── wikilinks.test.js # Wikilinks functionality tests
├── public/               # Static assets
├── astro.config.mjs      # Astro configuration with integrations
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration with typography
├── tsconfig.json         # TypeScript configuration (strict mode)
└── vitest.config.js      # Vitest test configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command              | Action                                           |
|:---------------------|:-------------------------------------------------|
| `npm install`        | Install dependencies                             |
| `npm run dev`        | Start development server                         |
| `npm run build`      | Build site + generate search index with Pagefind |
| `npm run preview`    | Preview the built site locally                   |
| `npm run sync`       | Pull content from Obsidian vault                 |
| `npm run sync:push`  | Push content back to Obsidian vault              |
| `npm run test`       | Run tests in watch mode                          |
| `npm run test:run`   | Run tests once                                   |

> **Note**: The search functionality requires a production build (`npm run build`) to work properly as it depends on Pagefind indexing.

## 🛠️ Tech Stack & Dependencies

### Core Framework

- **[Astro](https://astro.build)** - Static site generator with content collections
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety with strict mode enabled

### Integrations & Plugins

- **[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)** - Utility-first CSS framework
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Automatic sitemap generation
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - RSS feed generation
- **[remark-wiki-link](https://github.com/landakram/remark-wiki-link)** - Wiki-style internal linking
- **Custom remark plugins** - Enhanced linking and processing for wiki-style content

### Search & Discovery

- **[Pagefind](https://pagefind.app/)** - Fast, low-bandwidth search indexing
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typography styles

### Development & Quality

- **[Vitest](https://vitest.dev/)** - Fast unit testing framework with TypeScript support
- **[astro-broken-links-checker](https://github.com/imazen/astro-broken-link-checker)** - Automated link validation during builds

### Content Management

- **Obsidian Integration** - Bidirectional content sync workflow using `rsync`

## 🛠️ Development Workflow

### Quick Start

1. **Install dependencies**: `npm install`
2. **Sync content from Obsidian**: `npm run sync`
3. **Start development**: `npm run dev`
4. **Build for production**: `npm run build`

### Content Management with Obsidian

This project features seamless integration with Obsidian for content creation and management through automated sync scripts.

#### Content Sync Workflow

Use the built-in sync commands to manage content between your Obsidian vault and the project:

```bash
# Pull content from Obsidian to project (standard workflow)
npm run sync

# Push content from project back to Obsidian (if needed)
npm run sync:push
```

#### Complete Workflow

1. **Create in Obsidian**: Write and edit blog posts in your Obsidian vault with full markdown support
2. **Sync to Project**: Run `npm run sync` to pull content into the Astro project structure
3. **Develop & Test**: Use standard Astro development workflow (`npm run dev`) with hot reloading
4. **Build & Deploy**: Use `npm run build` to create production build with Pagefind search indexing
5. **Optional Push Back**: Use `npm run sync:push` to sync changes back to Obsidian vault

### Development Features

- **Hot Reloading**:
  - Source files (components, layouts, styles) → instant updates
  - Content files (blog posts, pages) → automatic refresh
  - Config changes → restart dev server
- **TypeScript**: Strict mode enabled with full type checking
- **Search Indexing**: Automatically built during production builds (requires `npm run build`)
- **Mobile-First**: Responsive design with mobile navigation and search
- **Link Validation**: Automatic broken link detection during builds (logs to `broken-links.log`)

## 🧪 Testing

The project includes test coverage for core functionality:

- **Vitest**: Fast unit testing framework with TypeScript support
- **Wikilinks Testing**: Comprehensive tests for the custom remark wikilinks plugin
- **Test Commands**: Run `npm run test` for watch mode or `npm run test:run` for single run

Tests are located in the `test/` directory and cover critical functionality like content processing and internal linking.

## 🔍 Search & Navigation Features

- **Keyboard Shortcuts**: Press `/` to open search from anywhere
- **Mobile Optimized**: Touch-friendly search interface with swipe navigation
- **Tag Browsing**: Discover content by topics at `/tags`
- **RSS Feed**: Subscribe to updates at `/rss.xml`
- **Automatic Sitemap**: SEO-optimized site structure
- **Reading Time**: Calculated automatically for each post
- **Wiki Links**: Internal post linking with `[[Post Title]]` syntax

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/kevinjalbert/kevinjalbert.com/blob/main/LICENSE) licensed.
