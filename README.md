# [Kevin Jalbert's Blog](https://kevinjalbert.com/)

> A modern, fast blog built with [Astro](https://astro.build) focusing on software development, productivity, and technology insights.

## ✨ Features

- **⚡ Ultra-Fast Performance**: Built with Astro 5 for optimal performance and static site generation
- **🔍 Advanced Search**: Powered by Pagefind with keyboard shortcuts (`/` to search) and mobile-optimized interface
- **⚠️ Smart Content Dating**: Automatic disclaimer system for potentially outdated technical content
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
│   ├── layouts/          # Page layouts
│   ├── pages/            # File-based routing
│   ├── styles/           # Global CSS and Tailwind
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration files
│   └── content/          # Content collections (synced from Obsidian)
├── scripts/              # Content sync and utility scripts
├── integrations/         # Custom Astro plugins
├── test/                 # Test files
├── public/               # Static assets
└── [config files]       # Astro, Tailwind, and test configuration
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
| `npm run check-dated`| Analyze content aging and disclaimer system      |

> **Note**: The search functionality requires a production build (`npm run build`) to work properly as it depends on Pagefind indexing.

## 🛠️ Tech Stack

**Core**: [Astro](https://astro.build) + [TypeScript](https://www.typescriptlang.org/) with strict mode
**Styling**: [Tailwind CSS](https://tailwindcss.com/) with Typography plugin
**Search**: [Pagefind](https://pagefind.app/) for fast, client-side search
**Content**: Obsidian integration with wiki-style linking via remark plugins
**Testing**: [Vitest](https://vitest.dev/) with TypeScript support
**Quality**: Automatic sitemap, RSS feeds, and broken link checking

## 🛠️ Development Workflow

### Quick Start

1. **Install dependencies**: `npm install`
2. **Sync content from Obsidian**: `npm run sync`
3. **Start development**: `npm run dev`
4. **Build for production**: `npm run build`

### Content Management with Obsidian

The project features seamless integration with Obsidian for content creation through automated sync scripts:

```bash
# Pull content from Obsidian to project (standard workflow)
npm run sync

# Push content from project back to Obsidian (if needed)
npm run sync:push
```

**Workflow**: Create and edit in Obsidian → Sync to project → Develop with hot reloading → Build with search indexing → Deploy

## ⚠️ Smart Content Dating System

The blog includes an intelligent system for automatically flagging potentially outdated technical content to maintain reader trust and content quality.

### How It Works

- **Dynamic Detection**: Client-side JavaScript automatically evaluates post age and technology tags
- **Age Buckets**: Different technologies have different aging thresholds
- **Real-time Aging**: Content automatically ages into disclaimers without requiring site rebuilds
- **Manual Overrides**: Support for frontmatter flags `forceShowDatedDisclaimer` and `forceHideDatedDisclaimer`

### Configuration

The system is configured via `src/config/dated-content.json` with tag-based aging rules:

```json
{
  "ageBuckets": [
    {
      "ageInMonths": 6,
      "tags": ["ai", "chatgpt", "whisper"]
    },
    {
      "ageInMonths": 24,
      "tags": ["rails", "ruby", "tools"]
    }
  ]
}
```

### Maintenance

Use the built-in audit tool to maintain the system:

```bash
npm run check-dated
```

This command provides:

- Analysis of posts by age bucket
- Detection of unused configuration tags
- Identification of post tags not in any bucket
- Manual override analysis
- Summary statistics

### Frontmatter Options

```yaml
# Force show disclaimer (overrides automatic detection)
forceShowDatedDisclaimer: true

# Force hide disclaimer (prevents automatic detection)
forceHideDatedDisclaimer: true
```

Note: Zod validation prevents both flags from being true simultaneously.

## 🧪 Testing & Quality

**Test Framework**: Vitest with TypeScript support
**Coverage**: Wikilinks plugin and core functionality
**Commands**: `npm run test` (watch) or `npm run test:run` (single run)
**Quality Assurance**: Automatic broken link detection during builds

## 🔍 Features & Navigation

**Search**: Press `/` to search, mobile-optimized interface
**Content Discovery**: Tag browsing at `/tags`, RSS feed at `/rss.xml`
**Enhanced Content**: Reading time calculation, wiki-style `[[linking]]`
**Performance**: Mobile-first responsive design with smooth transitions

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/kevinjalbert/kevinjalbert.com/blob/main/LICENSE) licensed.
