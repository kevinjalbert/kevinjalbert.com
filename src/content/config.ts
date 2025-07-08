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
    forceShowDatedDisclaimer: z.boolean().optional(),
    forceHideDatedDisclaimer: z.boolean().optional(),
  }).refine(
    (data) => !(data.forceShowDatedDisclaimer && data.forceHideDatedDisclaimer),
    {
      message: "Cannot have both forceShowDatedDisclaimer and forceHideDatedDisclaimer set to true",
      path: ["forceShowDatedDisclaimer", "forceHideDatedDisclaimer"],
    }
  ),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = {
  blog,
  pages,
};
