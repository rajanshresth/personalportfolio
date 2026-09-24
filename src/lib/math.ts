// LaTeX math support for the satteri markdown pipeline.
//
// Satteri has no built-in math rendering, so this hast plugin scans text
// nodes for KaTeX-style delimiters ($$…$$ display and $…$ inline) and
// replaces them with server-rendered KaTeX HTML. Runs at build time for both
// README rendering (src/lib/readme.ts) and notebook markdown cells
// (src/lib/ipynb.ts).

import katex from 'katex';
import { htmlToHast } from 'satteri';
import type { HastPluginDefinition } from 'satteri';

interface MathPart {
  type: 'text' | 'math';
  value: string;
  display: boolean;
}

const MATH_RE = /\$\$([\s\S]+?)\$\$|\$([^\s$](?:[^$]*[^\s$])?)\$/g;

/** Split a text node's value into literal text and math segments. */
function splitMath(value: string): MathPart[] {
  const parts: MathPart[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  MATH_RE.lastIndex = 0;
  while ((m = MATH_RE.exec(value))) {
    if (m.index > last) parts.push({ type: 'text', value: value.slice(last, m.index), display: false });
    if (m[1] !== undefined) {
      parts.push({ type: 'math', value: m[1], display: true });
    } else {
      parts.push({ type: 'math', value: m[2], display: false });
    }
    last = m.index + m[0].length;
  }
  if (last < value.length) parts.push({ type: 'text', value: value.slice(last), display: false });
  return parts;
}

/** True when the text node lives inside a <code> or <pre> ancestor. */
function isInCode(node: any, ctx: any): boolean {
  let cur = ctx.parent?.(node);
  while (cur) {
    if (cur.type === 'element' && (cur.tagName === 'code' || cur.tagName === 'pre')) return true;
    cur = ctx.parent?.(cur);
  }
  return false;
}

function renderMathHtml(tex: string, display: boolean): string {
  return katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    strict: 'ignore',
    output: 'htmlAndMathml',
  });
}

export const katexMathPlugin: HastPluginDefinition = {
  name: 'katex-math',
  text(node: any, ctx: any) {
    const value: string = node.value ?? '';
    if (!value.includes('$')) return;
    const parts = splitMath(value);
    if (parts.length <= 1) return;
    if (isInCode(node, ctx)) return;

    const replacement: any[] = [];
    for (const part of parts) {
      if (part.type === 'text') {
        if (part.value) replacement.push({ type: 'text', value: part.value });
        continue;
      }
      const html = renderMathHtml(part.value, part.display);
      const tree = htmlToHast(html, { fragment: true });
      const children = 'children' in tree ? tree.children : [];
      replacement.push(...children);
    }
    ctx.replaceNode(node, replacement);
  },
};
