import Link from 'next/link';
import { IconArrow } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import type { CardData, SectionHeadData } from '@/sanity/types';

export function Services({ services }: { services: { head: SectionHeadData | null; cards: CardData[] | null } | null }) {
  if (!services) return null;

  return (
    <section id='diensten' className='relative pt-5 pb-24'>
      <Wrap>
        <SectionHead head={services.head} />
        <div className='grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1'>
          {(services.cards ?? []).map((card, index) => (
            <Reveal key={card._key} index={index}>
              <Link
                href={card.link?.href ?? '#'}
                className='group block h-full overflow-hidden rounded-card border border-line bg-white transition-[translate,box-shadow,border-color] duration-350 ease-brand hover:-translate-y-[9px] hover:border-[#d5e9f4] hover:shadow-lift'
              >
                <div className='relative h-[172px] overflow-hidden'>
                  <SanityImage
                    image={card.image}
                    sizes='(max-width: 560px) 100vw, (max-width: 980px) 50vw, 290px'
                    className='object-cover transition-transform duration-800 ease-brand group-hover:scale-[1.08]'
                  />
                </div>
                <div className='px-[22px] pt-[22px] pb-[26px]'>
                  <h3 className='text-[18.5px]'>{card.title}</h3>
                  <p className='mt-[9px] text-[14px] text-muted'>{card.text}</p>
                  {card.link?.label ? (
                    <span className='mt-[15px] inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-blue-deep'>
                      {card.link.label}
                      <IconArrow size={14} strokeWidth={2.8} className='transition-transform duration-300 group-hover:translate-x-1' />
                    </span>
                  ) : null}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
