import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  // Sort by date (newest first)
  const sortedPosts = blog.sort((a, b) => {
    const dateA = a.data.pubDate || new Date(a.id.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '1970-01-01');
    const dateB = b.data.pubDate || new Date(b.id.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '1970-01-01');
    return new Date(dateB) - new Date(dateA);
  });

  return rss({
    title: "Kevin Jalbert's Blog",
    description: 'Personal blog about software development, productivity, and technology',
    site: context.site || 'https://kevinjalbert.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate || post.id.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '1970-01-01'),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
