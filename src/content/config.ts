import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    permalink: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const images = defineCollection({
  type: 'data',
  schema: z.any(), // Images don't need schema validation
});

export const collections = {
  blog,
  pages,
  images,
};
