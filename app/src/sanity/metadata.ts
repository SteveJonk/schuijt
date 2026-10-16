import type { Metadata } from 'next';
import { imageSrc, type SanityImageValue } from '@/sanity/image';

type Seo = {
  title?: string | null;
  description?: string | null;
  noIndex?: boolean | null;
  ogImage?: SanityImageValue;
} | null | undefined;

/** A page's metadata from its `seo` fields, falling back to the page title. */
export function pageMetadata(seo: Seo, fallbackTitle?: string | null, options: { absolute?: boolean } = {}): Metadata {
  const title = seo?.title || fallbackTitle || undefined;
  const ogImage = imageSrc(seo?.ogImage, 1200, 630);

  // Next merges metadata per key and an explicit `undefined` still overwrites
  // the layout's value, so only set keys that have one. `openGraph` replaces
  // the layout's object wholesale, hence `type` is repeated here.
  return {
    title: title && options.absolute ? { absolute: title } : title,
    ...(seo?.description && { description: seo.description }),
    ...(seo?.noIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  };
}
