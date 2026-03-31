import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    tags:        z.array(z.string()),
    order:       z.number().default(0),
    link:        z.string().optional(),
  }),
});

const writingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags:        z.array(z.string()),
    featured:    z.boolean().optional().default(false),
    draft:       z.boolean().optional().default(false),
    image:       z.string().optional(),        // relative path or URL for og:image / cover
    imageAlt:    z.string().optional(),
  }),
});

export const collections = {
  work:    workCollection,
  writing: writingCollection,
};
