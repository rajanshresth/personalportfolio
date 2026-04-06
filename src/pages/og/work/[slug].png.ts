import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOGPng } from '../../../lib/ogImage';

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await getCollection('work');
  return items.map(item => ({
    params: { slug: item.id.replace(/\.md$/, '') },
    props:  { item },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { item } = props as any;
  const png = await generateOGPng({
    title:       item.data.title,
    description: item.data.description,
    tags:        item.data.tags ?? [],
  });
  return new Response(png, {
    headers: {
      'Content-Type':  'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
