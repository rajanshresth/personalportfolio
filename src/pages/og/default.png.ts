import type { APIRoute } from 'astro';
import { generateOGPng } from '../../lib/ogImage';

export const GET: APIRoute = async () => {
  const png = await generateOGPng({
    title:       'Automation that runs your revenue engine',
    description: 'n8n, Python, and Docker systems for GTM, RevOps, and supply chain & logistics teams.',
    tags:        ['n8n', 'Python', 'Docker'],
  });
  return new Response(png, {
    headers: {
      'Content-Type':  'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
