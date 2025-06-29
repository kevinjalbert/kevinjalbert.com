/**
 * Remark plugin to convert image wikilinks and absolute image paths to relative paths
 * Converts:
 * - ![[path/image.jpg|Alt Text]] to ![Alt Text](../images/path/image.jpg)
 * - ![alt](/images/path/image.jpg) to ![alt](../images/path/image.jpg)
 * - <img src="/images/path/image.jpg"> to <img src="../images/path/image.jpg">
 * Uses relative paths that Astro can process and optimize automatically
 */
export function remarkImageWikilinks() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'text' && node.value) {
        // Convert Obsidian wikilinks to standard markdown images
        node.value = node.value.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, imagePath, altText) => {
          // Check if it's an image file
          if (imagePath.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
            const alt = altText || '';
            return `![${alt}](../images/${imagePath})`;
          }
          return match;
        });

        // Convert absolute /images/ paths to relative ../images/ paths in markdown
        node.value = node.value.replace(/!\[([^\]]*)\]\(\/images\/([^)]+)\)/g, (match, alt, imagePath) => {
          return `![${alt}](../images/${imagePath})`;
        });

        // Convert absolute /images/ paths to relative ../images/ paths in HTML img tags
        node.value = node.value.replace(/(<img[^>]+src=["'])\/images\/([^"']+)(["'][^>]*>)/g, (match, start, imagePath, end) => {
          return `${start}../images/${imagePath}${end}`;
        });
      }

      if (node.children) {
        node.children.forEach(child => visit(child));
      }
    }

    visit(tree);
    return tree;
  };
}
