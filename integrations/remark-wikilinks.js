import { visit } from 'unist-util-visit';
import { readFile, readdir } from 'fs/promises';
import { join, extname } from 'path';

/**
 * Custom remark plugin to handle all wikilinks (both images and page links)
 * Reads frontmatter to get actual permalinks for page links
 * Simply converts wikilink syntax to standard markdown - Astro handles the rest
 */
export default function remarkWikilinks() {
  let titleToPermalink = {};
  let isInitialized = false;
  let initializationPromise = null;

  // Build mapping of titles to permalinks by reading all markdown files recursively
  async function buildTitleMapping() {
    if (isInitialized) return;
    if (initializationPromise) return initializationPromise;

    initializationPromise = (async () => {

    try {
      const contentDir = './src/content/blog';

      // Recursively find all markdown files
      async function findMarkdownFiles(dir, files = []) {
        const entries = await readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(dir, entry.name);
          if (entry.isDirectory()) {
            await findMarkdownFiles(fullPath, files);
          } else if (entry.isFile() && extname(entry.name) === '.md') {
            files.push(fullPath);
          }
        }

        return files;
      }

      const markdownFiles = await findMarkdownFiles(contentDir);

      for (const filePath of markdownFiles) {
        const content = await readFile(filePath, 'utf-8');

        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];

          // Extract title and permalink
          const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
          const permalinkMatch = frontmatter.match(/^permalink:\s*(.+)$/m);

          if (titleMatch && permalinkMatch) {
            const title = titleMatch[1].replace(/^["']|["']$/g, ''); // Remove quotes
            const permalink = permalinkMatch[1].replace(/^["']|["']$/g, '');
            titleToPermalink[title] = permalink;

            // Also map filename without extension as fallback
            const filename = filePath.split('/').pop().replace('.md', '');
            titleToPermalink[filename] = permalink;
          }
        }
      }

      isInitialized = true;
      console.log(`📋 Mapped ${Object.keys(titleToPermalink).length / 2} blog posts for wikilinks`);
    } catch (error) {
      console.warn('Could not build title to permalink mapping:', error);
    }
    })();

    return initializationPromise;
  }

  return async (tree, file) => {
    // Initialize the title mapping
    await buildTitleMapping();

    visit(tree, 'text', (node, index, parent) => {
      if (!node.value || typeof node.value !== 'string') {
        return;
      }

      // Look for all wikilink patterns: [[content]]
      const wikilinkPattern = /\[\[([^\]]+)\]\]/g;
      const matches = [...node.value.matchAll(wikilinkPattern)];

      if (matches.length === 0) {
        return;
      }

      // Split the text node and replace wikilinks
      const newNodes = [];
      let lastIndex = 0;

      for (const match of matches) {
        const [fullMatch, content] = match;
        const startIndex = match.index;

        // Add text before the match
        if (startIndex > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex, startIndex)
          });
        }

        // Check if it's an image wikilink (starts with !)
        const isImage = node.value.charAt(startIndex - 1) === '!';

        if (isImage) {
          // Handle image wikilink: ![[filename.jpg]] or ![[filename.jpg|Alt Text]] → ![](assets/filename.jpg) or ![Alt Text](assets/filename.jpg)
          let imagePath = content;
          let altText = '';

          // Check if there's alt text (pipe character)
          if (content.includes('|')) {
            const parts = content.split('|');
            imagePath = parts[0].trim();
            altText = parts[1].trim();
          }

          // If it's just a filename, prefix with assets/
          if (!imagePath.includes('/')) {
            imagePath = `assets/${imagePath}`;
          }

          // Remove the ! from the previous text node if it exists
          if (newNodes.length > 0 && newNodes[newNodes.length - 1].type === 'text') {
            const lastNode = newNodes[newNodes.length - 1];
            if (lastNode.value.endsWith('!')) {
              lastNode.value = lastNode.value.slice(0, -1);
            }
          }

          // Create proper markdown image node with relative path
          newNodes.push({
            type: 'image',
            url: imagePath,
            alt: altText,
            title: null
          });
        } else {
          // Handle page wikilink: [[Page Title]] or [[Page Title|Alt Text]] → [Page Title](/permalink) or [Alt Text](/permalink)
          let linkTarget = content;
          let linkText = content;

          // Check if there's alt text (pipe character)
          if (content.includes('|')) {
            const parts = content.split('|');
            linkTarget = parts[0].trim();
            linkText = parts[1].trim();
          }

          let permalink;

          // Try to find the actual permalink from the mapping using the linkTarget
          if (titleToPermalink[linkTarget]) {
            permalink = titleToPermalink[linkTarget];
          } else {
            // For relative paths like ../Docker Compose DNS Consistency (DCDC)/Docker Compose DNS Consistency (DCDC)
            // Extract just the final part (title) for permalink generation
            const title = linkTarget.split('/').pop();

            if (titleToPermalink[title]) {
              permalink = titleToPermalink[title];
            } else {
              // Fallback: convert title to permalink format
              permalink = title.replace(/\s+/g, '-').toLowerCase();
            }
          }

          // Create proper markdown link node
          newNodes.push({
            type: 'link',
            url: `/${permalink}`,
            title: null,
            children: [{
              type: 'text',
              value: linkText
            }]
          });
        }

        lastIndex = startIndex + fullMatch.length;
      }

      // Add any remaining text after the last match
      if (lastIndex < node.value.length) {
        newNodes.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }

      // Replace the current node with the new nodes
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length;
      }
    });
  };
}
