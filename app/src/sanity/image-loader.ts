/** Quality for the Sanity CDN; with `auto=format` that usually ends up WebP/AVIF. */
export const SANITY_QUALITY = 85;

/**
 * Sanity images the CDN can resize itself. SVGs are excluded: they should come
 * through unscaled.
 */
function isSanityImage(src: string): boolean {
  if (!src.startsWith('https://cdn.sanity.io/images/')) return false;
  return !src.split('?')[0].toLowerCase().endsWith('.svg');
}

/**
 * `next/image` loader: the Sanity CDN renders every srcset width straight from
 * the original and picks the format, so Next does not re-encode every image.
 * Configured in next.config.ts.
 *
 * A `w`/`h` already in the URL only acts as an aspect ratio: for a crop (`h`
 * present) the height scales with the width. Other parameters (`rect` from a
 * hotspot crop, `fit`) are kept.
 */
export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!isSanityImage(src)) return src;
  const url = new URL(src);
  const params = url.searchParams;
  const w = Number(params.get('w'));
  const h = Number(params.get('h'));

  params.set('w', String(width));
  if (w > 0 && h > 0) params.set('h', String(Math.round((width * h) / w)));
  params.set('q', String(quality ?? SANITY_QUALITY));
  params.set('auto', 'format');
  if (!params.has('fit')) params.set('fit', 'max');

  // URLSearchParams encodes the commas in `rect=` as %2C; keep them the way
  // @sanity/image-url writes them.
  return url.toString().replace(/%2C/gi, ',');
}
