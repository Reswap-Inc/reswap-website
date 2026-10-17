// One scoped mechanical repair: all public policy labels use the branded canonical pages.
const { readdirSync, readFileSync, writeFileSync } = require('node:fs');
const { join, resolve } = require('node:path');
const root = resolve(__dirname, '..');
function repair(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { repair(path); continue; }
    if (!entry.name.endsWith('.html')) continue;
    const original = readFileSync(path, 'utf8');
    const updated = original.replace(/<a\b([^>]*?)href=(["'])(.*?)\2([^>]*)>([\s\S]*?)<\/a>/gi,
      (anchor, before, quote, href, after, labelHtml) => {
        const label = labelHtml.replace(/<[^>]*>/g, '').trim();
        const target = /^(Privacy(?: Policy)?)$/i.test(label) ? '/privacy.html'
          : /^(Terms(?: of (?:Use|Service))?)$/i.test(label) ? '/terms.html' : null;
        return target ? `<a${before}href=${quote}${target}${quote}${after}>${labelHtml}</a>` : anchor;
      });
    if (updated !== original) { writeFileSync(path, updated); console.log(path); }
  }
}
repair(root);
