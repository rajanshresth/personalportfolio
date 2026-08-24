import type { APIRoute } from 'astro';
import { resolveProjects } from '../../../lib/notebooks';
import { generateOGPng } from '../../../lib/ogImage';

// One OG image per project, generated from its README-derived title, excerpt,
// and tags — so every project's social preview is optimized automatically.
export async function getStaticPaths() {
  const projects = await resolveProjects();
  return projects.map(project => ({ params: { slug: project.slug }, props: { project } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { project } = props as any;
  const png = await generateOGPng({
    title:       project.title,
    description: project.description,
    tags:        project.tags,
  });
  return new Response(png, {
    headers: {
      'Content-Type':  'image/png',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
};
