import { getCollection } from 'astro:content';
import { marked } from 'marked';

export interface SearchResult {
  permalink: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  url: string;
}

export async function generateSearchIndex(): Promise<SearchResult[]> {
  const blogPosts = await getCollection('blog');

  // Sort by date (newest first) using pubDate from frontmatter
  const sortedPosts = blogPosts.sort((a, b) => {
    const dateA = new Date(a.data.pubDate);
    const dateB = new Date(b.data.pubDate);
    return dateB.getTime() - dateA.getTime();
  });

  const searchIndex: SearchResult[] = [];

  for (const post of sortedPosts) {
    // Use pubDate from frontmatter
    const date = new Date(post.data.pubDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get content text (we'll extract from the raw body for search purposes)
    const contentText = post.body.replace(/\s+/g, ' ').trim();

    searchIndex.push({
      permalink: post.data.permalink,
      title: post.data.title,
      description: post.data.description || '',
      content: contentText,
      date,
      tags: post.data.tags || [],
      url: `/${post.data.permalink}`
    });
  }

  return searchIndex;
}

export function searchPosts(query: string, posts: SearchResult[]): SearchResult[] {
  if (!query.trim()) return [];

  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);

  const results = posts
    .map(post => {
      let score = 0;
      const searchableText = `${post.title} ${post.description} ${post.content} ${post.tags.join(' ')}`.toLowerCase();

      // Exact title match gets highest score
      if (post.title.toLowerCase().includes(queryLower)) {
        score += 100;
      }

      // Description match
      if (post.description.toLowerCase().includes(queryLower)) {
        score += 50;
      }

      // Tag matches
      post.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          score += 30;
        }
      });

      // Word matches in content
      queryWords.forEach(word => {
        const regex = new RegExp(word, 'gi');
        const matches = searchableText.match(regex);
        if (matches) {
          score += matches.length * 5;
        }
      });

      return { ...post, score };
    })
    .filter(post => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Limit to top 10 results

  return results;
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;

  const queryWords = query.split(/\s+/).filter(word => word.length > 0);
  let highlightedText = text;

  queryWords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  });

  return highlightedText;
}
