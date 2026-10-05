/**
 * Replaces every project in Sanity with the real WordPress content:
 * text and photos from wp-projects.json (`npm run projects:fetch`), subline,
 * kenmerken, werkzaamheden and zakelijke kaart from ai-fields.json.
 *
 *   npm run projects:seed:dry   print what would be written, touch nothing
 *   npm run projects:seed       upload photos and overwrite all projects
 *
 * Ids stay `project-<slug>`, so references (e.g. featured projects on the
 * home page) keep working. Open drafts of projects are discarded, and
 * projects that are not on WordPress are deleted. Photos are uploaded once;
 * re-runs reuse them via the WordPress URL stored in the asset's `source`.
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in app/.env.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import type { WpProject } from './fetch-wp';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const DRY = process.argv.includes('--dry');

type Pair = [string, string];
type AiFields = {
  subline: string;
  meta: Pair[];
  works: string[];
  card?: { tag: string; title: string; text: string; stats: Pair[] };
};

const read = <T>(file: string): T => JSON.parse(readFileSync(path.join(DIR, file), 'utf8'));
const projects = read<WpProject[]>('wp-projects.json');
const ai = read<Record<string, AiFields>>('ai-fields.json');

/** Same as the main seed: one slug contains "m²". */
const idSafe = (slug: string) =>
  /^[a-z0-9-]+$/.test(slug)
    ? slug
    : `${slug.replace(/[^a-z0-9-]/g, '')}-${createHash('sha1').update(slug).digest('hex').slice(0, 6)}`;

const keyed = <T extends object>(items: T[]) => items.map((item, i) => ({ _key: `k${i}`, ...item }));

/** "a <strong>b</strong> c" -> a portable text block with a bold span. */
function block(html: string) {
  const children = html
    .split(/(<strong>[\s\S]*?<\/strong>)/)
    .filter(Boolean)
    .map((part) => {
      const bold = part.startsWith('<strong>');
      return { _type: 'span', text: bold ? part.slice(8, -9) : part, marks: bold ? ['strong'] : [] };
    });
  return { _type: 'block', style: 'normal', markDefs: [], children };
}

const image = (assetId: string, alt = '') => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
  alt,
});

function toDoc(p: WpProject, asset: (url: string) => string) {
  const f = ai[p.slug];
  if (!f) throw new Error(`${p.slug}: missing in ai-fields.json`);
  return {
    _id: `project-${idSafe(p.slug)}`,
    _type: 'project',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    date: p.date,
    category: { _type: 'reference', _ref: `category-${p.category}` },
    image: image(asset(p.image.url), p.image.alt || p.title),
    subline: f.subline,
    meta: keyed(f.meta.map(([label, value]) => ({ _type: 'metaItem', label, value }))),
    intro: keyed(p.paragraphs.map(block)),
    works: f.works,
    gallery: keyed(p.gallery.map((url) => ({ _type: 'galleryImage', image: image(asset(url)), wide: false }))),
    ...(f.card
      ? {
          cardTag: f.card.tag,
          cardTitle: f.card.title,
          cardText: f.card.text,
          cardImage: image(asset(p.image.url), f.card.title),
          cardStats: keyed(f.card.stats.map(([value, label]) => ({ _type: 'stat', value, label }))),
        }
      : {}),
    seo: { _type: 'seo', description: f.subline },
  };
}

async function main() {
  const urls = [...new Set(projects.flatMap((p) => [p.image.url, ...p.gallery]))];

  if (DRY) {
    const docs = projects.map((p) => toDoc(p, (url) => `image-dry-${url}`));
    console.log(JSON.stringify(docs[0], null, 2));
    console.log(`\n${docs.length} projects, ${urls.length} photos. Nothing written (--dry).`);
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) throw new Error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in app/.env');
  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-26',
    token,
    useCdn: false,
  });

  const categories = await client.fetch<string[]>(`*[_type == "category"]._id`);
  const missing = [...new Set(projects.map((p) => `category-${p.category}`))].filter((id) => !categories.includes(id));
  if (missing.length) throw new Error(`Missing categories in Sanity: ${missing.join(', ')}`);

  const assets = new Map(
    (await client.fetch<{ _id: string; url: string }[]>(
      `*[_type == "sanity.imageAsset" && source.name == "wordpress"]{_id, "url": source.id}`,
    )).map((a) => [a.url, a._id]),
  );
  const todo = urls.filter((url) => !assets.has(url));
  console.log(`Photos: ${urls.length - todo.length} already uploaded, ${todo.length} to upload…`);
  // ponytail: 6 parallel uploads; raise if it's too slow, lower on rate limits.
  const queue = [...todo];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      for (let url = queue.shift(); url; url = queue.shift()) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Download ${res.status}: ${url}`);
        const asset = await client.assets.upload('image', Buffer.from(await res.arrayBuffer()), {
          filename: decodeURIComponent(path.basename(new URL(url).pathname)),
          source: { name: 'wordpress', id: url, url },
        });
        assets.set(url, asset._id);
        process.stdout.write('↑');
      }
    }),
  );
  if (todo.length) console.log('');

  const docs = projects.map((p) => toDoc(p, (url) => assets.get(url)!));
  const ids = docs.map((d) => d._id);
  const stale = await client.fetch<string[]>(
    `*[_type == "project" && !(_id in $ids) && !(_id in path("drafts.**"))]._id`,
    { ids },
  );
  const drafts = await client.fetch<string[]>(`*[_type == "project" && _id in path("drafts.**")]._id`);

  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc));
  [...drafts, ...stale, ...stale.map((id) => `drafts.${id}`)].forEach((id) => tx.delete(id));
  await tx.commit();
  console.log(
    `Done: ${docs.length} projects written, ${drafts.length} drafts discarded, ${stale.length} old projects deleted${stale.length ? ` (${stale.join(', ')})` : ''}.`,
  );
}

main().catch((err) => {
  console.error('\nFailed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
