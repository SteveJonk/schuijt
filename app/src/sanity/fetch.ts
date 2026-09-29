import { cache } from 'react';
import type { QueryParams } from 'next-sanity';
import { client } from '@/sanity/client';
import { LAYOUT_QUERY } from '@/sanity/queries';

/**
 * Every page fetch goes through here. Pages are cached and refreshed at most
 * once a minute, so a publish in the studio is live within 60 seconds without
 * a rebuild.
 */
export const REVALIDATE = 60;

export function sanityFetch<const Q extends string>(query: Q, params: QueryParams = {}) {
  return client.fetch(query, params, { next: { revalidate: REVALIDATE } });
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
export function fillLabel(template: string | null | undefined, values: Record<string, string | number>) {
  return (template ?? '').replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}
