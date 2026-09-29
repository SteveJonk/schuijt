import { IconStar } from '@/components/ui/icons';
import { SanityImage } from '@/components/ui/SanityImage';
import { cn } from '@/lib/cn';
import type { HeroData } from '@/sanity/types';

export type HeroSize = 'home' | 'page' | 'hub';

const SIZES = {
  home: {
    box: 'h-[490px] max-xl:h-[370px]',
    a1: 'h-[322px] max-xl:h-[250px]',
    a2: 'bottom-6 h-[210px] max-xl:h-40',
    badge: 'right-[8%] bottom-16 max-xl:bottom-[34px]',
  },
  page: {
    box: 'h-[460px] max-xl:h-[360px]',
    a1: 'h-[310px] max-xl:h-[250px]',
    a2: 'bottom-3.5 h-[200px] max-xl:h-40',
    badge: 'right-[6%] bottom-[52px] max-xl:bottom-[30px]',
  },
  hub: {
    box: 'h-[440px] max-xl:h-[340px]',
    a1: 'h-[300px] max-xl:h-[230px]',
    a2: 'bottom-2 h-[190px] max-xl:h-[150px]',
    badge: '',
  },
} as const;

/** Two overlapping, gently bobbing photos with an optional floating badge. */
export function HeroArt({ hero, size = 'page' }: { hero: HeroData; size?: HeroSize }) {
  const sz = SIZES[size];
  const figure = 'group absolute m-0 overflow-hidden rounded-card-lg shadow-lift motion-reduce:animate-none';
  const img = 'object-cover transition-transform duration-800 group-hover:scale-105';

  return (
    <div className={cn('relative', sz.box)}>
      <figure className={cn(figure, 'top-2 right-0 w-[84%] animate-bob-a max-xl:w-full', sz.a1)}>
        <SanityImage image={hero.image} priority sizes='(max-width: 980px) 100vw, 480px' className={img} />
      </figure>
      <figure
        className={cn(
          figure,
          'left-0 w-[56%] animate-bob-b border-[5px] border-white max-xl:bottom-0 max-xl:w-[60%]',
          sz.a2,
        )}
      >
        <SanityImage image={hero.imageSmall} sizes='(max-width: 980px) 60vw, 320px' className={img} />
      </figure>
      {hero.badge?.value ? (
        <div
          className={cn(
            'absolute z-[5] flex animate-bob-a items-center gap-3 rounded-2xl bg-white px-[18px] py-3.5 shadow-lift motion-reduce:animate-none',
            'max-xl:right-[4%]',
            sz.badge,
          )}
        >
          <div className='flex size-[38px] items-center justify-center rounded-xl bg-tint text-blue'>
            <IconStar size={19} />
          </div>
          <div>
            <b className='block font-display text-[22px] leading-none text-blue-deep'>{hero.badge.value}</b>
            <small className='mt-[3px] block text-[12px] text-muted'>{hero.badge.label}</small>
          </div>
        </div>
      ) : null}
    </div>
  );
}
