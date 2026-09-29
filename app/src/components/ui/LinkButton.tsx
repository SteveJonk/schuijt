import type { LinkData } from '@/sanity/types';
import { Button } from './Button';

/** A studio link rendered as a button; renders nothing without a URL or label. */
export function LinkButton({
  link,
  ...props
}: { link: LinkData | null | undefined } & Omit<Parameters<typeof Button>[0], 'href' | 'children'>) {
  if (!link?.href || !link.label) return null;
  return (
    <Button href={link.href} {...props}>
      {link.label}
    </Button>
  );
}
