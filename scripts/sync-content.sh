#!/bin/bash

# Content sync script between Obsidian vault and Astro project
# Usage:
#   ./sync-content.sh        # Pull from Obsidian to Astro
#   ./sync-content.sh --push # Push from Astro to Obsidian

OBSIDIAN_DIR="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Knowledge/kevinjalbert.com"
ASTRO_CONTENT_DIR="./src/content"

if [ "$1" == "--push" ]; then
  echo "🔼 Pushing content from Astro to Obsidian..."

  # Sync all content (excluding config.ts)
  rsync -av --delete --exclude="config.ts" "$ASTRO_CONTENT_DIR/" "$OBSIDIAN_DIR/"

  echo "📝 Content pushed to Obsidian vault"
else
  echo "🔽 Pulling content from Obsidian to Astro..."

  # Sync all content (excluding config.ts)
  rsync -av --delete --exclude="config.ts" "$OBSIDIAN_DIR/" "$ASTRO_CONTENT_DIR/"

  echo "📝 Content pulled from Obsidian vault"
fi

echo "✅ Sync complete!"
