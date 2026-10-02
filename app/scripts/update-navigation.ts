/**
 * Updates only the `links` of the navigation document; everything else
 * (CTA label, menu labels, other documents) is left alone.
 *
 *   npm run navigation:update:dry   print the new links, change nothing (needs the token to read)
 *   npm run navigation:update       write them
 *
 * Diensten gets one submenu entry per service page, Zakelijk gets
 * Algemeen / VvE / Woningcorporaties. Needs NEXT_PUBLIC_SANITY_PROJECT_ID and
 * SANITY_API_WRITE_TOKEN (Editor) in app/.env. Publishes straight away; if the
 * navigation has an open draft in the studio, discard it first.
 */
import { createClient } from '@sanity/client';
import { SERVICE_SLUGS } from './seed/content/routes';
import { SERVICE_PAGES } from './seed/content/services';

const DRY = process.argv.includes('--dry');

const internal = (key: string, label: string, id: string) => ({
  _key: key,
  _type: 'link',
  label,
  linkType: 'internal',
  internalLink: { _type: 'reference', _ref: id },
});
const navItem = (link: Record<string, unknown>, children: unknown[] = []) => ({ ...link, _type: 'navItem', children });

type Ids = { service: Record<string, string>; zakelijk: Record<string, string> };

const buildLinks = (ids: Ids) => [
  navItem(
    { _key: 'diensten', _type: 'link', label: 'Diensten', linkType: 'external', href: '/#diensten' },
    SERVICE_SLUGS.filter((s) => ids.service[s]).map((s) =>
      internal(`diensten-${s}`, SERVICE_PAGES[s].crumb, ids.service[s]),
    ),
  ),
  navItem(internal('projecten', 'Projecten', 'projectsPage')),
  navItem(internal('zakelijk', 'Zakelijk', 'zakelijkPage'), [
    internal('zakelijk-algemeen', 'Algemeen', 'zakelijkPage'),
    internal('zakelijk-vve', 'VvE', ids.zakelijk['vve-vastgoedbeheer']),
    internal('zakelijk-woco', 'Woningcorporaties', ids.zakelijk['woningcorporaties']),
  ]),
  navItem(internal('reviews', 'Reviews', 'reviewsPage')),
  navItem(internal('blog', 'Blog', 'blogPage')),
  navItem(internal('contact', 'Contact', 'contactPage')),
];

async function main() {
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

  // The live ids may differ from the seed's, so look the pages up by kind + slug.
  const pages = await client.fetch<{ _id: string; kind: string; slug: string }[]>(
    `*[_type == "servicePage" && !(_id in path("drafts.**"))]{ _id, kind, "slug": slug.current }`,
  );
  const ids: Ids = { service: {}, zakelijk: {} };
  for (const p of pages) if (p.kind === 'dienst' || p.kind === 'zakelijk') ids[p.kind === 'dienst' ? 'service' : 'zakelijk'][p.slug] = p._id;
  for (const s of SERVICE_SLUGS) if (!ids.service[s]) console.warn(`skip: no published dienst page "${s}"`);
  for (const s of ['vve-vastgoedbeheer', 'woningcorporaties']) if (!ids.zakelijk[s]) throw new Error(`No zakelijk page "${s}"`);

  const links = buildLinks(ids);
  if (DRY) return console.log(JSON.stringify(links, null, 2));
  await client.patch('navigation').set({ links }).commit();
  console.log(`Navigation updated: ${links.length} items.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
