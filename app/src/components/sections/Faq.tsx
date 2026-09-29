import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import type { FaqData } from '@/sanity/types';


/**
 * Accordion of <details>. `tinted` sits on the pale-blue band (services, zakelijk);
 * `white` is the /contact/ version with tinted items and a tighter head.
 */
export function Faq({
  content,
  variant = 'tinted',
  titleSize,
}: {
  content: FaqData | null;
  variant?: 'tinted' | 'white';
  /** e.g. '28px'; defaults to the page's section-head size. */
  titleSize?: string;
}) {
  if (!content?.items?.length) return null;
  const white = variant === 'white';

  return (
    <section
      className={cn('relative', white ? 'bg-white py-20' : 'bg-linear-180 from-[#f6fbfe] to-[#edf7fc] py-24')}
      style={titleSize ? ({ '--head-size': titleSize } as React.CSSProperties) : undefined}
    >
      <Wrap>
        {white ? (
          <Reveal className='mx-auto mb-10 max-w-[620px] text-center'>
            {content.kicker ? <Kicker>{content.kicker}</Kicker> : null}
            <h2 className='text-[length:var(--head-size,28px)]'>{content.title}</h2>
          </Reveal>
        ) : (
          <SectionHead head={content} />
        )}
        <Reveal className='mx-auto grid max-w-[820px] gap-3.5'>
          {content.items.map((item) => (
            <details
              key={item._key}
              open={item.open ?? undefined}
              className={cn(
                'group overflow-hidden rounded-card border transition-shadow duration-300 open:shadow-soft',
                white ? 'border-line bg-tint-2' : 'border-[#dcecf5] bg-white',
              )}
            >
              <summary className='flex cursor-pointer list-none items-center justify-between gap-4 px-[26px] py-[22px] font-display text-[16px] font-semibold [&::-webkit-details-marker]:hidden'>
                {item.question}
                <span className='flex size-[26px] flex-none items-center justify-center rounded-full bg-tint text-[18px] text-blue-deep transition-transform duration-300 group-open:rotate-45'>
                  +
                </span>
              </summary>
              <div className='max-w-[640px] px-[26px] pb-6 text-[15px] text-muted'>{item.answer}</div>
            </details>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}
