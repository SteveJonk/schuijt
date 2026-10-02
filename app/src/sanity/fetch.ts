import { cache } from 'react';
import type { QueryParams } from 'next-sanity';
import { client } from '@/sanity/client';
import { LAYOUT_QUERY } from '@/sanity/queries';

/**
 * Every Sanity read that feeds a page carries this one tag. A publish in the
 * studio fires a webhook to `/api/revalidate`, which expires the tag, so the
 * change is live within seconds without a rebuild. One tag instead of one per
 * document type: the queries join navigation, labels and referenced documents,
 * so a per-type tag would miss pages that show the changed content indirectly.
 */
export const SANITY_TAG = 'sanity';

/**
 * Safety net only. If the webhook is misconfigured or a delivery is lost, the
 * cache still refreshes within an hour instead of staying stale.
 */
export const REVALIDATE = 60;

export function sanityFetch<const Q extends string>(
  query: Q,
  params: QueryParams = {},
) {
  return client.fetch(query, params, {
    next: { revalidate: REVALIDATE, tags: [SANITY_TAG] },
  });
}

/** Header, footer, labels and site details — one request per page render. */
export const getLayout = cache(async () => {
  const layout = await sanityFetch(LAYOUT_QUERY);
  return {
    ...layout,
    // Missing singletons render as blanks instead of crashing every page.
    ui: layout.ui ?? ({} as NonNullable<typeof layout.ui>),
  };
});

export type Layout = Awaited<ReturnType<typeof getLayout>>;
export type Ui = Layout['ui'];

/** "Gebaseerd op {aantal} reviews" + { aantal: 47 } -> "Gebaseerd op 47 reviews". */
export function fillLabel(
  template: string | null | undefined,
  values: Record<string, string | number>,
) {
  return (template ?? '').replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ''),
  );
}
