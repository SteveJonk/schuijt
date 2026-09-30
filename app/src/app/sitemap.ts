import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { client } from '@/sanity/client';
import { REVALIDATE, SANITY_TAG } from '@/sanity/fetch';
import { SITEMAP_QUERY } from '@/sanity/queries';

/** Fixed routes (their content lives in singletons) plus every published document. */
const FIXED = ['/', '/projecten/', '/zakelijk/', '/zakelijk/projecten/', '/reviews/', '/blog/', '/contact/'];

/** Served at `/sitemap.xml`; `robots.ts` points at it. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await client.fetch(SITEMAP_QUERY, {}, { next: { revalidate: REVALIDATE, tags: [SANITY_TAG] } });

  return [
    ...FIXED.map((path) => ({ url: `${SITE_URL}${path}`, priority: path === '/' ? 1 : 0.8 })),
    ...docs.map((doc) => ({
      url: `${SITE_URL}${encodeURI(doc.path)}`,
      lastModified: new Date(doc._updatedAt),
      priority: 0.6,
    })),
  ];
}
