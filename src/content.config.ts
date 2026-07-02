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

export const collections = {
  work: workCollection,
};
