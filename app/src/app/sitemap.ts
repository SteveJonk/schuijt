import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { client } from '@/sanity/client';
import { REVALIDATE, SANITY_TAG } from '@/sanity/fetch';
import { SITEMAP_QUERY } from '@/sanity/queries';

const PAGE_TYPES = ['servicePage', 'project', 'textPage', 'blogPost'];

/**
 * Served at `/sitemap.xml`; `robots.ts` points at it. lastmod is the real
 * `_updatedAt` from Sanity (for overviews: their newest listed item, if newer).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await client.fetch(SITEMAP_QUERY, {}, { next: { revalidate: REVALIDATE, tags: [SANITY_TAG] } });

  // One entry per URL: two documents can share a slug, keep the newest date.
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const doc of docs) {
    if (!doc.path) continue;
    const url = `${SITE_URL}${encodeURI(doc.path)}`;
    const newest = doc.latestItem && doc.latestItem > doc._updatedAt ? doc.latestItem : doc._updatedAt;
    const lastModified = new Date(newest);
    const seen = byUrl.get(url);
    if (seen && (seen.lastModified as Date) >= lastModified) continue;
    const priority = doc.path === '/' ? 1 : PAGE_TYPES.includes(doc._type) ? 0.6 : 0.8;
    byUrl.set(url, { url, lastModified, priority });
  }

  return [...byUrl.values()];
}
