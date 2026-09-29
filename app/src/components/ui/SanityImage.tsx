import Image from 'next/image';
import { imageUrl, objectPosition, type SanityImageValue } from '@/sanity/image';

type SanityImageProps = {
  image: SanityImageValue;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Overrides the alt text from the studio (e.g. '' for purely decorative use). */
  alt?: string;
};

/** A Sanity image filling its (relatively positioned) parent. */
export function SanityImage({ image, sizes, className, priority, alt }: SanityImageProps) {
  const src = imageUrl(image);
  if (!src) return null;
  const position = objectPosition(image);

  return (
    <Image
      src={src}
      alt={alt ?? image?.alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
