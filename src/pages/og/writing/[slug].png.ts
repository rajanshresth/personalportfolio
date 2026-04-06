import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOGPng } from '../../../lib/ogImage';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { slug: post.id.replace(/\.md$/, '') },
    props:  { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as any;
  const png = await generateOGPng({
    title:       post.data.title,
    description: post.data.description,
    tags:        post.data.tags ?? [],
  });
  return new Response(png, {
    headers: {
      'Content-Type':  'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
