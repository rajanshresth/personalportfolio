/**
 * OG image generator — builds a 1200×630 PNG using sharp (Astro's internal dep).
 * Called at build time from /og/*.png.ts endpoints.
 */

function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Simple word-wrap: returns up to `maxLines` strings, each ≤ `maxChars`. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = '';

  for (const word of words) {
    if (lines.length >= maxLines) break;
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }

  if (cur && lines.length < maxLines) {
    // Truncate last line if it still overflows
    if (cur.length > maxChars) cur = cur.slice(0, maxChars - 1) + '…';
    lines.push(cur);
  }

  return lines;
}

export interface OGOptions {
  title: string;
  description?: string;
  tags?: string[];
}

function buildSVG({ title, description = '', tags = [] }: OGOptions): string {
  const W = 1200;
  const H = 630;
  const PAD = 72;

  // Layout constants
  const SITE_LABEL = 'RAJANBUILDS.COM';
  const AUTHOR     = 'Rajan Shrestha';

  const titleLines = wrap(title, 34, 2);
  const descLines  = description ? wrap(description, 72, 2) : [];

  const TITLE_Y  = 220;
  const TITLE_LH = 70;
  const DESC_Y   = TITLE_Y + titleLines.length * TITLE_LH + 44;
  const DESC_LH  = 36;
  const TAG_Y    = 548;

  const titleSVG = titleLines
    .map(
      (line, i) =>
        `<text x="${PAD}" y="${TITLE_Y + i * TITLE_LH}"
          font-family="Georgia,'Times New Roman',serif"
          font-size="58" font-style="italic"
          fill="#e9e3d8">${escXml(line)}</text>`
    )
    .join('');

  const descSVG = descLines
    .map(
      (line, i) =>
        `<text x="${PAD}" y="${DESC_Y + i * DESC_LH}"
          font-family="Arial,Helvetica,sans-serif"
          font-size="22"
          fill="#8a8278">${escXml(line)}</text>`
    )
    .join('');

  // Build tag pills
  let tagX = PAD;
  const tagSVG = tags
    .slice(0, 4)
    .map(tag => {
      const label = tag.toUpperCase();
      const tagW  = label.length * 8.5 + 28;
      const el    = `
        <rect x="${tagX}" y="${TAG_Y}" width="${tagW}" height="26" rx="2" fill="#1c1a16"/>
        <text x="${tagX + tagW / 2}" y="${TAG_Y + 17}" text-anchor="middle"
          font-family="monospace,'Courier New'"
          font-size="10" letter-spacing="1.5"
          fill="#5c5750">${escXml(label)}</text>`;
      tagX += tagW + 10;
      return el;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0f0e0b"/>
  <rect width="${W}" height="3" fill="#9e7a52"/>
  <rect y="${H - 3}" width="${W}" height="3" fill="#9e7a52" opacity="0.25"/>
  <line x1="${PAD}" y1="128" x2="${W - PAD}" y2="128" stroke="#181612" stroke-width="1"/>

  <text x="${PAD}" y="94"
    font-family="monospace,'Courier New'"
    font-size="12" letter-spacing="2.5"
    fill="#5c5750">${escXml(SITE_LABEL)}</text>
  <circle cx="${PAD + SITE_LABEL.length * 8.2 + 10}" cy="88" r="3" fill="#9e7a52"/>

  <text x="${W - PAD}" y="94" text-anchor="end"
    font-family="Georgia,serif"
    font-size="14"
    fill="#5c5750">${escXml(AUTHOR)}</text>

  ${titleSVG}
  ${descSVG}
  ${tagSVG}
</svg>`;
}

export async function generateOGPng(opts: OGOptions): Promise<Buffer> {
  const svg = buildSVG(opts);
  // dynamic import so Vite doesn't try to bundle sharp for the browser
  const { default: sharp } = await import('sharp');
  return sharp(Buffer.from(svg)).png().toBuffer();
}
