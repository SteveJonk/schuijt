import { CountUp } from '@/components/ui/CountUp';
import { Divider } from '@/components/ui/Divider';
import { IconCheck } from '@/components/ui/icons';
import { Kicker } from '@/components/ui/Kicker';
import { LinkButton } from '@/components/ui/LinkButton';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import type { HOME_QUERY_RESULT } from '@/sanity/sanity.types';

type Zakelijk = NonNullable<NonNullable<HOME_QUERY_RESULT>['zakelijk']>;

export function ZakelijkBand({ zakelijk }: { zakelijk: Zakelijk | null }) {
  if (!zakelijk) return null;

  return (
    <section
      id='zakelijk'
      className='relative overflow-hidden bg-linear-140 from-deep via-[#124b68] via-55% to-[#0b6f9b] pt-[110px] pb-24 text-white'
    >
      <span className='pointer-events-none absolute -top-[140px] -right-[100px] size-[520px] rounded-full bg-[rgb(79_195_242/0.22)] blur-[90px]' />
      <Wrap className='relative z-[2] grid grid-cols-[.95fr_1.05fr] items-center gap-[58px] max-xl:grid-cols-1 max-xl:gap-10'>
        <Reveal>
          {zakelijk.kicker ? <Kicker dark>{zakelijk.kicker}</Kicker> : null}
          <h2 className='text-[36px] text-white max-xl:text-[28px]'>{zakelijk.title}</h2>
          <p className='mt-4 max-w-[470px] text-[17px] text-[#bed2de]'>{zakelijk.text}</p>
          <div className='mt-[26px] grid gap-[13px]'>
            {(zakelijk.points ?? []).map((point) => (
              <div key={point} className='flex items-start gap-3 text-[15.5px] text-[#e2ecf3]'>
                <span className='mt-[3px] flex size-[22px] flex-none items-center justify-center rounded-full bg-[rgb(79_195_242/0.2)] text-blue-light'>
                  <IconCheck size={12} strokeWidth={3.4} />
                </span>
                {point}
              </div>
            ))}
          </div>
          {zakelijk.stats?.length ? (
            <div className='mt-8 flex flex-wrap gap-10 border-t border-white/16 pt-[26px]'>
              {zakelijk.stats.map((stat) => (
                <div key={stat._key}>
                  <strong className='block font-display text-[36px] leading-none font-bold text-white'>
                    <CountUp value={stat.value} suffix={stat.suffix ?? ''} />
                  </strong>
                  <span className='mt-[7px] block max-w-[190px] text-[13.5px] text-[#a8c0ce]'>{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className='mt-8 flex flex-wrap gap-3.5'>
            <LinkButton link={zakelijk.primaryCta} />
            <LinkButton link={zakelijk.secondaryCta} variant='ghost' />
          </div>
        </Reveal>
        <Reveal index={1}>
          <div className='grid grid-cols-2 grid-rows-[176px_176px] gap-[18px] max-xs:grid-rows-[150px_150px]'>
            {(zakelijk.photos ?? []).map((photo, index) => (
              <figure
                key={photo.asset?._ref ?? index}
                className={cn(
                  'group relative overflow-hidden rounded-card shadow-[0_24px_50px_-26px_rgb(0_0_0/0.7)]',
                  index === 0 && 'row-span-2 max-xs:col-span-2 max-xs:row-span-1',
                )}
              >
                <SanityImage
                  image={photo}
                  sizes='(max-width: 980px) 50vw, 320px'
                  className='object-cover transition-transform duration-900 group-hover:scale-[1.07]'
                />
              </figure>
            ))}
          </div>
        </Reveal>
      </Wrap>
      <Divider fill='#ffffff' path='M0,90 L0,52 C300,88 560,14 860,38 C1100,58 1260,80 1440,54 L1440,90 Z' />
    </section>
  );
}
