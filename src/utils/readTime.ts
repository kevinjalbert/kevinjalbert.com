/**
 * Utility functions for calculating read time of articles
 */

export interface ReadTimeResult {
  minutes: number;
  text: string;
}

const WORDS_PER_MINUTE = 180;
const MINUTE_READ_LABEL = ' min read';

/**
 * Calculate read time based on text content
 * @param text - The text content to analyze
 * @returns ReadTimeResult with minutes and formatted text
 */
export function calculateReadTime(text: string): ReadTimeResult {
  // Remove code blocks and inline code to get a better estimate
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/^\s*#.*$/gm, '') // Remove markdown headers (they read faster)
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove image markdown
    .replace(/\[.*?\]\(.*?\)/g, '$1'); // Replace links with just the text

  const words = cleanText
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  const readTimeMinutes = Math.max(1, minutes); // Minimum 1 minute

  return {
    minutes: readTimeMinutes,
    text: `${readTimeMinutes}${MINUTE_READ_LABEL}`
  };
}

/**
 * Calculate read time from markdown content
 * @param markdownContent - The full markdown content including frontmatter
 * @returns ReadTimeResult with minutes and formatted text
 */
export function calculateReadTimeFromMarkdown(markdownContent: string): ReadTimeResult {
  // Split content to remove frontmatter
  const parts = markdownContent.split(/^---$/m);
  const content = parts.length >= 3 ? parts.slice(2).join('---') : markdownContent;

  return calculateReadTime(content);
}
