import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkWikilinks from '../integrations/remark-wikilinks.js';

/**
 * Process markdown with the wikilinks plugin
 * @param {string} markdown - The markdown content to process
 * @param {string} mockFilePath - Mock file path for testing
 * @returns {Promise<string>} The processed markdown
 */
async function processWikilinks(markdown, mockFilePath = '/test/post/test.md') {
  const processor = unified()
    .use(remarkParse)
    .use(remarkWikilinks)
    .use(remarkStringify);

  const result = await processor.process({
    value: markdown,
    path: mockFilePath
  });

  return result.toString().trim();
}

describe('Wikilinks Plugin', () => {
  describe('Image wikilinks', () => {
    it('should convert simple image wikilinks to markdown images', async () => {
      const input = 'Here is an image: ![[screenshot.jpg]]';
      const expected = 'Here is an image: ![](assets/screenshot.jpg)';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should preserve existing paths in image wikilinks', async () => {
      const input = 'Another image: ![[assets/diagram.png]]';
      const expected = 'Another image: ![](assets/diagram.png)';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle multiple image wikilinks', async () => {
      const input = '![[first.jpg]] and ![[second.png]]';
      const expected = '![](assets/first.jpg) and ![](assets/second.png)';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle image wikilinks with alt text', async () => {
      const input = 'Here is an image: ![[screenshot.jpg|My Screenshot]]';
      const expected = 'Here is an image: ![My Screenshot](assets/screenshot.jpg)';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });
  });

  describe('Page wikilinks', () => {
    it('should convert page wikilinks to markdown links', async () => {
      const input = 'Check out [[My Other Post]] for more info.';
      const expected = 'Check out [My Other Post](/my-other-post) for more info.';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle page links with special characters', async () => {
      const input = 'See [[Another Page]] for details.';
      const expected = 'See [Another Page](/another-page) for details.';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle wikilinks with alt text', async () => {
      const input = 'Check out [[../Docker Compose DNS Consistency (DCDC)/Docker Compose DNS Consistency (DCDC)|Docker Compose DNS Consistency (DCDC)]] for more info.';
      const expected = 'Check out [Docker Compose DNS Consistency (DCDC)](/docker-compose-dns-consistency-dcdc) for more info.';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle simple alt text cases', async () => {
      const input = 'See [[My Post|Custom Display Text]] for details.';
      const expected = 'See [Custom Display Text](/my-post) for details.';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });
  });

  describe('Mixed content', () => {
    it('should handle both image and page wikilinks in the same content', async () => {
      const input = 'Text before ![[image.jpg]] and [[Another Page]] after.';
      const expected = 'Text before ![](assets/image.jpg) and [Another Page](/another-page) after.';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle complex mixed content', async () => {
      const input = 'Look at ![[chart.jpg]] and visit [[Another Page]].';
      const expected = 'Look at ![](assets/chart.jpg) and visit [Another Page](/another-page).';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });
  });

  describe('Edge cases', () => {
    it('should leave regular markdown unchanged', async () => {
      const input = 'Just regular markdown with [normal link](http://example.com)';
      const expected = 'Just regular markdown with [normal link](http://example.com)';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle content with no wikilinks', async () => {
      const input = 'Regular markdown with [link](url) and ![image](path)';
      const expected = 'Regular markdown with [link](url) and ![image](path)';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });

    it('should handle empty content', async () => {
      const input = '';
      const expected = '';
      const result = await processWikilinks(input);
      expect(result).toBe(expected);
    });
  });

  describe('File path variations', () => {
    it('should work with different file paths', async () => {
      const input = 'Image: ![[test.jpg]]';
      const expected = 'Image: ![](assets/test.jpg)';
      const result = await processWikilinks(input, '/different/path/post.md');
      expect(result).toBe(expected);
    });
  });
});
