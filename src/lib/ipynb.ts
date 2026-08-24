// Jupyter notebook (.ipynb) → static HTML renderer.
//
// Fetches a notebook from GitHub at build time and turns each cell into
// ready-to-inject HTML: markdown cells go through Astro's markdown processor
// (so headings, lists, and fenced code all render + highlight), code cells are
// syntax-highlighted with Shiki, and every output kind — stdout/stderr streams,
// execute_result / display_data (images, DataFrame HTML tables, plain text),
// and errors — is rendered to match the site's dark theme.

import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';

// ── helpers ──────────────────────────────────────────────────────────
const ANSI_RE = /\x1b\[[0-9;]*m/g;
const stripAnsi = (s: string) => s.replace(ANSI_RE, '');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Notebook `source` / `text` fields are a string or an array of strings. */
const join = (s: unknown): string =>
  Array.isArray(s) ? s.join('') : typeof s === 'string' ? s : '';

/**
 * Defense-in-depth sanitizer for HTML injected via set:html (notebook outputs
 * and rendered READMEs). Removes active/embedding elements, inline event
 * handlers, and javascript: URIs while keeping presentational markup
 * (tables, images, styles, links). Content comes from the site owner's own
 * repos, so this is a safety net, not the only line of defense.
 */
export function sanitizeHtml(html: string): string {
  return html
    // Elements that can execute or embed — drop element + contents.
    .replace(/<(script|iframe|object|embed|form|noscript)\b[\s\S]*?<\/\1>/gi, '')
    // Void/self-closing variants and stray dangerous tags.
    .replace(/<\/?(script|iframe|object|embed|form|noscript|base|meta|link)\b[^>]*>/gi, '')
    // Inline event handlers (onclick, onerror, …).
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '')
    // Neutralize javascript: URIs in href/src.
    .replace(/((?:href|src|xlink:href)\s*=\s*")\s*javascript:[^"]*"/gi, '$1#"')
    .replace(/((?:href|src|xlink:href)\s*=\s*')\s*javascript:[^']*'/gi, "$1#'");
}

const sanitize = sanitizeHtml;

/** Convert a GitHub blob URL to its raw.githubusercontent.com equivalent. */
export function blobToRaw(url: string): string {
  const m = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/);
  return m ? `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3]}` : url;
}

/**
 * The markdown processor emits Astro's `<img __ASTRO_IMAGE_="{json}">`
 * optimization placeholder, which is only resolved inside Astro's own content
 * pipeline. Used standalone, we get a src-less broken tag — so turn it back
 * into a plain <img>.
 */
export function unwrapAstroImages(html: string): string {
  return html.replace(/<img\s+__ASTRO_IMAGE_="([^"]*)"\s*\/?>/g, (_m, enc: string) => {
    try {
      const json = enc.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
      const o = JSON.parse(json);
      const src = String(o.src ?? '');
      const alt = String(o.alt ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
      return src ? `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />` : '';
    } catch {
      return '';
    }
  });
}

/** Rewrite relative src/href in rendered HTML to absolute URLs. */
export function absolutizeUrls(html: string, rawBase: string, blobBase: string): string {
  return html.replace(
    /\b(src|href)="(?!https?:|#|mailto:|data:|\/\/)([^"]+)"/g,
    (_m, attr: string, path: string) => {
      const clean = path.replace(/^\.?\//, '');
      return `${attr}="${(attr === 'src' ? rawBase : blobBase) + clean}"`;
    }
  );
}

// ── types ────────────────────────────────────────────────────────────
export interface NbOutput {
  kind: 'image' | 'html' | 'text' | 'stream' | 'error';
  html: string;
  stderr?: boolean;
}

export interface NbCell {
  type: 'markdown' | 'code';
  execCount: number | null;
  inputHtml: string;
  outputs: NbOutput[];
}

export interface Notebook {
  cells: NbCell[];
  language: string;
}

// ── output rendering ─────────────────────────────────────────────────
function renderImage(data: Record<string, unknown>): NbOutput | null {
  for (const mime of ['image/png', 'image/jpeg', 'image/gif']) {
    if (data[mime]) {
      const b64 = join(data[mime]).replace(/\s+/g, '');
      return {
        kind: 'image',
        html: `<img src="data:${mime};base64,${b64}" alt="Notebook output figure" loading="lazy" decoding="async" />`,
      };
    }
  }
  if (data['image/svg+xml']) {
    return { kind: 'image', html: sanitize(join(data['image/svg+xml'])) };
  }
  return null;
}

function renderOutput(o: any): NbOutput | null {
  switch (o.output_type) {
    case 'stream': {
      const text = join(o.text);
      if (!text) return null;
      return {
        kind: 'stream',
        stderr: o.name === 'stderr',
        html: `<pre class="nb-stream${o.name === 'stderr' ? ' nb-stream--err' : ''}">${esc(text)}</pre>`,
      };
    }
    case 'execute_result':
    case 'display_data': {
      const data = (o.data ?? {}) as Record<string, unknown>;
      const img = renderImage(data);
      if (img) return img;
      if (data['text/html'])
        return { kind: 'html', html: `<div class="nb-table">${sanitize(join(data['text/html']))}</div>` };
      if (data['text/plain']) {
        const text = join(data['text/plain']);
        if (!text.trim()) return null;
        return { kind: 'text', html: `<pre class="nb-text">${esc(text)}</pre>` };
      }
      return null;
    }
    case 'error': {
      const tb = stripAnsi(join((o.traceback ?? []).join('\n')));
      return { kind: 'error', html: `<pre class="nb-error">${esc(tb)}</pre>` };
    }
    default:
      return null;
  }
}

// ── fetch + render ───────────────────────────────────────────────────
export async function fetchNotebook(blobUrl: string): Promise<any> {
  const raw = blobToRaw(blobUrl);
  const res = await fetch(raw);
  if (!res.ok) {
    throw new Error(`Failed to fetch notebook (HTTP ${res.status}): ${raw}`);
  }
  return res.json();
}

export async function renderNotebook(
  nb: any,
  ctx: { rawBase?: string; blobBase?: string } = {}
): Promise<Notebook> {
  const processor = await createSatteriMarkdownProcessor({});
  const language: string = nb?.metadata?.language_info?.name ?? 'python';
  const md = async (s: string) => {
    let html = unwrapAstroImages((await processor.render(s)).code);
    if (ctx.rawBase && ctx.blobBase) html = absolutizeUrls(html, ctx.rawBase, ctx.blobBase);
    return html;
  };

  const cells: NbCell[] = [];
  for (const cell of nb?.cells ?? []) {
    const source = join(cell.source);

    if (cell.cell_type === 'markdown') {
      cells.push({ type: 'markdown', execCount: null, inputHtml: await md(source), outputs: [] });
    } else if (cell.cell_type === 'code') {
      const inputHtml = source.trim() ? await md('```' + language + '\n' + source + '\n```') : '';
      const outputs = (cell.outputs ?? [])
        .map(renderOutput)
        .filter((o: NbOutput | null): o is NbOutput => o !== null);
      cells.push({
        type: 'code',
        execCount: typeof cell.execution_count === 'number' ? cell.execution_count : null,
        inputHtml,
        outputs,
      });
    }
  }

  return { cells, language };
}

/** Fetch + render in one step, resolving relative image/link URLs. */
export async function loadNotebook(blobUrl: string): Promise<Notebook> {
  const nb = await fetchNotebook(blobUrl);
  const rawFile = blobToRaw(blobUrl);
  const rawBase = rawFile.slice(0, rawFile.lastIndexOf('/') + 1);
  const blobBase = blobUrl.slice(0, blobUrl.lastIndexOf('/') + 1);
  return renderNotebook(nb, { rawBase, blobBase });
}
