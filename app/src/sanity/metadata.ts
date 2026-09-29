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

  return {
    title: title && options.absolute ? { absolute: title } : title,
    description: seo?.description ?? undefined,
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : undefined,
  };
}
