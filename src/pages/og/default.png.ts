import type { APIRoute } from 'astro';
import { generateOGPng } from '../../lib/ogImage';

export const GET: APIRoute = async () => {
  const png = await generateOGPng({
    title:       'Engineering systems, building products',
    description: 'B.E. Industrial Engineering student and data analyst. Applying systems thinking toward a career in Product Management.',
    tags:        ['Product', 'Data', 'Systems'],
  });
  return new Response(png, {
    headers: {
      'Content-Type':  'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
