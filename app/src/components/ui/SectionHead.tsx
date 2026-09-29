import { cn } from '@/lib/cn';
import type { SectionHeadData } from '@/sanity/types';
import { Kicker } from './Kicker';
import { Reveal } from './Reveal';

type SectionHeadProps = {
  head: Partial<SectionHeadData> | null | undefined;
  align?: 'center' | 'left';
  /** Light text for the navy bands. */
  dark?: boolean;
  className?: string;
};

export function SectionHead({ head, align = 'center', dark = false, className }: SectionHeadProps) {
  if (!head?.title) return null;

  return (
    <Reveal
      className={cn(
        'mb-[52px] max-w-[660px]',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {head.kicker ? <Kicker dark={dark}>{head.kicker}</Kicker> : null}
      {/* Pages set --head-size to tune every section head at once (service pages: 36px). */}
      <h2 className={cn('text-[length:var(--head-size,38px)]', dark && 'text-white')}>{head.title}</h2>
      {head.lead ? (
        <p className={cn('mt-4 text-[17px]', dark ? 'text-[#bcd0da]' : 'text-muted')}>{head.lead}</p>
      ) : null}
    </Reveal>
  );
}
