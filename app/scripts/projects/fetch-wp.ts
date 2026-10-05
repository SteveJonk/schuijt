/**
 * Downloads every post (= project) from the old WordPress site into
 * scripts/projects/wp-projects.json. The AI fields (subline, kenmerken,
 * werkzaamheden, zakelijke kaart) live next to it in ai-fields.json; see
 * seed-projects.ts for the Sanity side.
 *
 *   npm run projects:fetch
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://schuijtklussenbedrijf.nl/wp-json/wp/v2';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'wp-projects.json');

/** WordPress category id -> Sanity category id (`category-<id>`). */
const CATEGORY: Record<number, string> = {
  11: 'schuttingbouw',
  12: 'sierbestrating',
  13: 'terrasreiniging',
  14: 'tuinaanleg',
  30: 'zakelijk',
};

export type WpProject = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: { url: string; alt: string };
  /** Paragraphs; only <strong> is kept as markup. */
  paragraphs: string[];
  gallery: string[];
};

type WpPost = {
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  categories: number[];
  _embedded?: { 'wp:featuredmedia'?: { source_url: string; alt_text?: string }[] };
};

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

/** Original upload instead of a resized copy (foo-1024x768.jpg -> foo.jpg). */
const original = (url: string) => url.replace(/-\d+x\d+(\.\w+)$/, '$1');

function parse(post: WpPost): WpProject {
  const html = post.content.rendered;
  const paragraphs = [...html.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)]
    .map(([, , inner]) =>
      decode(
        inner
          .replace(/<br\s*\/?>/g, ' ')
          .replace(/<(?!\/?strong>)[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim(),
      ),
    )
    .filter((p) => p.replace(/<\/?strong>/g, '').trim());

  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  if (!featured) throw new Error(`${post.slug}: no featured image`);
  const main = original(featured.source_url);
  const gallery = [...new Set([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(([, src]) => original(decode(src))))].filter(
    (url) => url !== main,
  );

  const category = post.categories.map((id) => CATEGORY[id]).find(Boolean);
  if (!category) throw new Error(`${post.slug}: unknown categories ${post.categories}`);

  return {
    slug: decodeURIComponent(post.slug),
    title: decode(post.title.rendered),
    date: post.date.slice(0, 10),
    category,
    image: { url: main, alt: featured.alt_text ?? '' },
    paragraphs,
    gallery,
  };
}

async function main() {
  const posts: WpPost[] = [];
  for (let page = 1, pages = 1; page <= pages; page++) {
    const res = await fetch(`${API}/posts?per_page=100&page=${page}&_embed=wp:featuredmedia`);
    if (!res.ok) throw new Error(`WordPress ${res.status} on page ${page}`);
    pages = Number(res.headers.get('x-wp-totalpages'));
    posts.push(...(await res.json()));
  }
  const projects = posts.map(parse);
  writeFileSync(OUT, JSON.stringify(projects, null, 2) + '\n');
  console.log(`${projects.length} projects -> ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
