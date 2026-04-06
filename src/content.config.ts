import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    tags:        z.array(z.string()),
    order:       z.number().default(0),
    link:        z.string().optional(),
  }),
});

const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    publishedAt: z.date(),
    tags:        z.array(z.string()),
    featured:    z.boolean().optional().default(false),
    draft:       z.boolean().optional().default(false),
    image:       z.string().optional(),
    imageAlt:    z.string().optional(),
  }),
});

export const collections = {
  work:    workCollection,
  writing: writingCollection,
};
