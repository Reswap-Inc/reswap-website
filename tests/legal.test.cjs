const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { readFileSync, readdirSync } = require('node:fs');
const { join, resolve } = require('node:path');
const test = require('node:test');

const root = resolve(__dirname, '..');
const read = (path) => readFileSync(join(root, path), 'utf8').replace(/\r\n/g, '\n');
const manifest = JSON.parse(read('policy-source-manifest.json'));
const htmlFiles = (directory = '') => readdirSync(join(root, directory), { withFileTypes: true })
  .filter((entry) => !entry.name.startsWith('.') && entry.name !== 'node_modules')
  .flatMap((entry) => entry.isDirectory() ? htmlFiles(join(directory, entry.name))
    : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []);

test('every public legal link resolves to the correct canonical policy', () => {
  let policyLinks = 0;
  for (const path of htmlFiles()) {
    const html = read(path);
    assert.doesNotMatch(html, /reswap\.tmithun\.com/i, `${path} references the retired policy host`);
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      const label = match[2].replace(/<[^>]*>/g, '').trim();
      const expected = /^(Privacy(?: Policy)?)$/i.test(label) ? 'privacy.html'
        : /^(Terms(?: of (?:Use|Service))?)$/i.test(label) ? 'terms.html' : null;
      if (!expected) continue;
      policyLinks += 1;
      assert.equal(new URL(match[1], 'https://joinreswap.com/' + path.replaceAll('\\', '/')).pathname,
        '/' + expected, `${path}: ${label} goes to the wrong page`);
    }
  }
  assert.ok(policyLinks >= 40, 'all existing public footer/legal links must be checked');
});

for (const name of ['privacy', 'terms']) {
  test(`${name} preserves the existing policy content and adds accessible SMS terms`, () => {
    const html = read(name + '.html');
    const preserved = html.match(/<!-- BEGIN PRESERVED GENERAL POLICY -->([\s\S]*?)<!-- END PRESERVED GENERAL POLICY -->/);
    assert.ok(preserved, 'preserved policy markers are missing');
    assert.equal(createHash('sha256').update(preserved[1].trim()).digest('hex'),
      manifest.policies[name].normalizedBodySha256, 'existing General policy body must not be silently removed or rewritten');
    assert.match(html, new RegExp(`rel="canonical" href="https://joinreswap.com/${name}\\.html"`));
    assert.match(html, /id="sms"/);
    for (const phrase of ['Message frequency varies', 'Message and data rates may apply', 'STOP', 'HELP', 'support@reswap.org', 'not a condition of purchase', 'promotional or marketing purposes']) {
      assert.ok(html.includes(phrase), `${name} is missing ${phrase}`);
    }
    assert.match(html, /verification (?:code|request)/i);
    assert.match(html, /separate/i);
    assert.match(html, /invitation/i);
    assert.doesNotMatch(html, /<script\b/i, 'public legal pages must be readable without scripts');
  });
}
