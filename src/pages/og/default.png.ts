import type { APIRoute } from 'astro';
import { generateOGPng } from '../../lib/ogImage';

export const GET: APIRoute = async () => {
  const png = await generateOGPng({
    title:       'Turning data into decisions',
    description: 'Data science, analytics, and decision science with Python, SQL, machine learning, and optimization.',
    tags:        ['Python', 'SQL', 'Machine Learning', 'Optimization'],
  });
  return new Response(png, {
    headers: {
      'Content-Type':  'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
