// Repo README.md → project title, short description, and rendered HTML.
//
// Fetched from GitHub at build time so a project's copy comes from its README
// (single source of truth) instead of being duplicated in the site. Results
// are cached per repo for the duration of the build so pages that both need a
// README (listing + detail) only fetch it once.

import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';
import { unwrapAstroImages, absolutizeUrls, sanitizeHtml } from './ipynb';

export interface ReadmeData {
  /** First H1 in the README, if any. */
  title: string | null;
  /** Plain-text excerpt (first real paragraph), for cards and meta tags. */
  excerpt: string;
  /** Rendered README HTML, with relative asset/link URLs made absolute. */
  html: string;
}

const cache = new Map<string, ReadmeData | null>();

function parseRepo(repoUrl: string): { user: string; repo: string } | null {
  const m = repoUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
  return m ? { user: m[1], repo: m[2] } : null;
}

async function fetchReadmeRaw(user: string, repo: string): Promise<{ md: string; branch: string } | null> {
  const branches = ['main', 'master'];
  const names = ['README.md', 'readme.md', 'Readme.md'];
  for (const branch of branches) {
    for (const name of names) {
      const url = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${name}`;
      try {
        const res = await fetch(url);
        if (res.ok) return { md: await res.text(), branch };
      } catch {
        /* try next */
      }
    }
  }
  return null;
}

function extractTitle(md: string): string | null {
  const m = md.match(/^\s{0,3}#\s+(.+?)\s*$/m);
  return m ? m[1].replace(/[`*_]/g, '').trim() : null;
}

/** Drop the leading H1 so it doesn't duplicate the page's own <h1>. */
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+.+\r?\n+/, '');
}

/** First substantial paragraph, as plain text, truncated. */
function makeExcerpt(md: string, maxLen = 200): string {
  const paras: string[] = [];
  let cur: string[] = [];
  const flush = () => {
    if (cur.length) { paras.push(cur.join(' ')); cur = []; }
  };
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    const skip =
      !line ||
      /^#{1,6}\s/.test(line) ||   // heading
      /^!?\[!?\[/.test(line) ||   // badge / linked image
      /^!\[/.test(line) ||        // image
      /^>/.test(line) ||          // quote
      /^[-*+]\s/.test(line) ||    // bullet
      /^\d+\.\s/.test(line) ||    // ordered item
      /^`[^`]+`$/.test(line) ||   // lone inline-code line
      /^<.+>$/.test(line);        // raw HTML line
    if (skip) { flush(); continue; }
    cur.push(line);
  }
  flush();

  let text = paras.find(p => p.length > 40) ?? paras[0] ?? '';
  text = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length > maxLen) text = text.slice(0, maxLen - 1).replace(/\s+\S*$/, '').trim() + '…';
  return text;
}

export async function loadReadme(repoUrl: string): Promise<ReadmeData | null> {
  if (cache.has(repoUrl)) return cache.get(repoUrl)!;

  let result: ReadmeData | null = null;
  const parsed = parseRepo(repoUrl);
  if (parsed) {
    const raw = await fetchReadmeRaw(parsed.user, parsed.repo);
    if (raw) {
      const { user, repo } = parsed;
      const rawBase = `https://raw.githubusercontent.com/${user}/${repo}/${raw.branch}/`;
      const blobBase = `https://github.com/${user}/${repo}/blob/${raw.branch}/`;
      const processor = await createSatteriMarkdownProcessor({});
      let html = unwrapAstroImages((await processor.render(stripLeadingH1(raw.md))).code);
      html = absolutizeUrls(html, rawBase, blobBase);
      html = sanitizeHtml(html);
      result = {
        title: extractTitle(raw.md),
        excerpt: makeExcerpt(raw.md),
        html,
      };
    }
  }

  cache.set(repoUrl, result);
  return result;
}
