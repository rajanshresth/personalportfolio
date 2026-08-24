// Notebook-backed projects: normalization + README-driven metadata.
//
// The editable list lives in src/data/notebooks.ts. This module turns each
// entry into a project (deriving slug/title/repo from the GitHub URL) and, at
// build time, resolves the title and description from the repo's README.md via
// src/lib/readme.ts. Notebook rendering itself is in src/lib/ipynb.ts.

import { notebookList } from '../data/notebooks';
import { loadReadme } from './readme';

export interface NotebookInput {
  /** GitHub blob URL of the .ipynb file. Required. */
  url: string;
  slug?: string;
  /** Override the README's title. */
  title?: string;
  /** Override the README's excerpt. */
  description?: string;
  tags?: string[];
  /** Repo URL for the "View source" link (defaults to the notebook's repo). */
  repo?: string;
  /** ISO date, e.g. '2026-08-24'. Optional. */
  publishDate?: string;
}

/** A project after URL-based normalization (still sync, no network). */
export interface NotebookProject {
  slug: string;
  url: string;
  repo: string;
  tags: string[];
  publishDate?: string;
  /** Explicit title override, or '' when the README should provide it. */
  title: string;
  /** Explicit description override, or '' when the README should provide it. */
  description: string;
  /** Humanized repo name — last-resort title if there's no README. */
  defaultTitle: string;
}

/** A project with README-resolved title/description/html (build-time). */
export interface ResolvedProject {
  slug: string;
  url: string;
  repo: string;
  tags: string[];
  publishDate?: string;
  title: string;
  description: string;
  readmeHtml: string | null;
}

// ── URL-based derivation ──────────────────────────────────────────────
function parseGitHubBlob(url: string) {
  const m = url.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/[^/]+\/(.+)$/);
  if (!m) return null;
  const [, user, repo, path] = m;
  return { user, repo, path, file: path.split('/').pop() ?? 'notebook.ipynb' };
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/\.ipynb$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const humanize = (s: string) =>
  s.replace(/\.ipynb$/, '').replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());

function normalize(entry: string | NotebookInput, taken: Set<string>): NotebookProject {
  const input: NotebookInput = typeof entry === 'string' ? { url: entry } : entry;
  const gh = parseGitHubBlob(input.url);
  const repoName = gh?.repo ?? 'notebook';

  let slug = input.slug ?? slugify(repoName);
  if (!input.slug && gh && taken.has(slug)) slug = slugify(`${repoName}-${gh.file}`);
  while (taken.has(slug)) slug = `${slug}-2`;
  taken.add(slug);

  return {
    slug,
    url: input.url,
    repo: input.repo ?? (gh ? `https://github.com/${gh.user}/${gh.repo}` : input.url),
    tags: input.tags ?? [],
    publishDate: input.publishDate,
    title: input.title ?? '',
    description: input.description ?? '',
    defaultTitle: humanize(repoName),
  };
}

// Normalized list — order preserved as authored in src/data/notebooks.ts.
export const notebooks: NotebookProject[] = (() => {
  const taken = new Set<string>();
  return notebookList.map(entry => normalize(entry, taken));
})();

export function getNotebook(slug: string): NotebookProject | undefined {
  return notebooks.find(n => n.slug === slug);
}

// ── README-resolved projects (build-time) ─────────────────────────────
export async function resolveProject(n: NotebookProject): Promise<ResolvedProject> {
  const readme = await loadReadme(n.repo);
  return {
    slug: n.slug,
    url: n.url,
    repo: n.repo,
    tags: n.tags,
    publishDate: n.publishDate,
    title: n.title || readme?.title || n.defaultTitle,
    description: n.description || readme?.excerpt || '',
    readmeHtml: readme?.html ?? null,
  };
}

export async function resolveProjects(): Promise<ResolvedProject[]> {
  return Promise.all(notebooks.map(resolveProject));
}
