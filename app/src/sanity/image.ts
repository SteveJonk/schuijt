import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from '@/sanity/client';

const { projectId, dataset } = client.config();
const builder = createImageUrlBuilder({ projectId: projectId!, dataset: dataset! });

/** An image as the queries project it (see IMAGE in queries.ts). */
export type SanityImageValue = {
  asset?: { _ref: string } | null;
  hotspot?: { x?: number; y?: number } | null;
  crop?: unknown;
  alt?: string | null;
  dimensions?: { width: number; height: number } | null;
} | null | undefined;

/** Full-size URL (crop applied); `next/image` asks the CDN for the width it needs. */
export function imageUrl(image: SanityImageValue): string | null {
  if (!image?.asset?._ref) return null;
  return builder.image(image as SanityImageSource).url();
}

/** Fixed-size URL, e.g. for Open Graph images and mail logos. */
export function imageSrc(image: SanityImageValue, width: number, height?: number): string | null {
  if (!image?.asset?._ref) return null;
  let url = builder.image(image as SanityImageSource).width(width);
  if (height) url = url.height(height).fit('crop');
  return url.url();
}

/** The hotspot as a CSS object-position, so `object-cover` keeps the subject in view. */
export function objectPosition(image: SanityImageValue): string | undefined {
  const { x, y } = image?.hotspot ?? {};
  return x !== undefined && y !== undefined ? `${x * 100}% ${y * 100}%` : undefined;
}
