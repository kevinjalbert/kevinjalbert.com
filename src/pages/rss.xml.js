import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  // Schema validation ensures all required fields are present, no manual checking needed

  // Sort by date (newest first) using pubDate from frontmatter
  const sortedPosts = blog.sort((a, b) => {
    const dateA = new Date(a.data.pubDate);
    const dateB = new Date(b.data.pubDate);
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    title: "Kevin Jalbert's Blog",
    description: 'Personal blog about software development, productivity, and technology',
    site: context.site || 'https://kevinjalbert.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate),
      description: post.data.description,
      link: `/${post.data.permalink}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
