import Link from 'next/link';
import { IconArrow } from '@/components/ui/icons';
import { SanityImage } from '@/components/ui/SanityImage';
import type { ZakelijkCardData } from '@/sanity/types';

export function ZakelijkProjectCard({ card, linkLabel }: { card: ZakelijkCardData; linkLabel?: string | null }) {
  return (
    <div className='group h-full overflow-hidden rounded-card border border-line bg-white transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-lift'>
      <div className='relative h-[230px]'>
        <SanityImage image={card.image} sizes='(max-width: 760px) 100vw, 560px' className='object-cover' />
      </div>
      <div className='px-[26px] pt-[26px] pb-7'>
        {card.tag ? (
          <div className='text-[12.5px] font-bold tracking-[.04em] text-blue-deep uppercase'>{card.tag}</div>
        ) : null}
        <h3 className='mt-2.5 text-[19px]'>{card.title}</h3>
        {card.text ? <p className='mt-2.5 text-[14.5px] text-muted'>{card.text}</p> : null}
        {card.stats?.length ? (
          <div className='mt-[18px] flex gap-[22px] border-t border-line pt-4 text-[13px] text-muted'>
            {card.stats.map((stat) => (
              <div key={stat._key}>
                <strong className='block font-display text-[15px] font-bold text-ink'>{stat.value}</strong>
                {stat.label}
              </div>
            ))}
          </div>
        ) : null}
        {linkLabel ? (
          <Link
            href={card.href}
            className='mt-5 inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-blue-deep'
          >
            {linkLabel}
            <IconArrow size={14} strokeWidth={2.8} className='transition-transform duration-300 group-hover:translate-x-1' />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
