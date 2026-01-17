import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        link: z.string().optional(),
        order: z.number().default(0),
    }),
});

export const collections = {
    projects: projectsCollection,
};
