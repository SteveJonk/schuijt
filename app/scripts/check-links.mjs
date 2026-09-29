/**
 * Crawls every path in /sitemap.xml and checks that each internal link, image
 * and #anchor on those pages resolves. Needs a running server.
 * The header's "Offerte aanvragen" (#contact) is swapped for /contact/ in the
 * browser on pages without a form, so an ANCHOR -> #contact on /privacy-policy/ is expected.
 */
// Usage: npm run build && npm start, then: npm run check:links [base-url]
const BASE = process.argv[2] ?? 'http://localhost:3000';
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const status = new Map();
const check = async (url) => {
  if (!status.has(url)) status.set(url, fetch(BASE + url, { redirect: 'manual' }).then((r) => r.status));
  return status.get(url);
};
const problems = [];
const ids = new Map();
const html = new Map();
for (const page of pages) {
  const r = await fetch(BASE + page, { redirect: 'manual' });
  if (r.status !== 200) { problems.push(`PAGE ${page} -> ${r.status}`); continue; }
  const text = await r.text();
  html.set(page, text);
  ids.set(page, new Set([...text.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
const external = new Set();
for (const [page, text] of html) {
  const hrefs = [...text.matchAll(/<a[^>]*\shref="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  for (const href of hrefs) {
    if (/^(tel:|mailto:)/.test(href)) continue;
    if (/^https?:/.test(href)) { external.add(href); continue; }
    const [path, hash] = href.split('#');
    const target = path || page;
    if (path) {
      if (!path.endsWith('/')) problems.push(`NO-SLASH ${page} -> ${href}`);
      const s = await check(path);
      if (s !== 200) problems.push(`LINK ${page} -> ${href} (${s})`);
    }
    if (hash && !(ids.get(target) ?? new Set()).has(hash)) problems.push(`ANCHOR ${page} -> ${href}`);
  }
  const imgs = [...text.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  // Images from the Sanity CDN are not checked here; only files served by the app.
  for (const src of imgs.filter((src) => src.startsWith('/'))) {
    const s = await check(src);
    if (s !== 200) problems.push(`IMG ${page} -> ${src} (${s})`);
  }
}
console.log(`pages: ${pages.length}, unique internal urls checked: ${status.size}`);
console.log(`external links: ${[...external].join(' | ')}`);
console.log(problems.length ? [...new Set(problems)].join('\n') : 'no problems');
