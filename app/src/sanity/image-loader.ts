/**
 * `next/image` loader: Sanity's CDN resizes and picks the format, so Next does
 * not re-encode every image. Configured in next.config.ts.
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
  if (!src.startsWith('https://cdn.sanity.io/')) return src;
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'max');
  return url.toString();
}
