import Image from 'next/image';
import { IconStar } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

type HeroArtProps = {
  images: [string, string];
  alt: string;
  badge: { value: string; label: string };
  /** Service pages use a slightly smaller composition than the homepage. */
  compact?: boolean;
};

/** Two overlapping, gently bobbing photos with a floating stat badge. */
export function HeroArt({ images, alt, badge, compact = false }: HeroArtProps) {
  const figure =
    'group absolute m-0 overflow-hidden rounded-card-lg shadow-lift motion-reduce:animate-none';
  const img = 'object-cover transition-transform duration-800 group-hover:scale-105';

  return (
    <div className={cn('relative', compact ? 'h-[460px] max-xl:h-[360px]' : 'h-[490px] max-xl:h-[370px]')}>
      <figure
        className={cn(
          figure,
          'top-2 right-0 w-[84%] animate-bob-a max-xl:h-[250px] max-xl:w-full',
          compact ? 'h-[310px]' : 'h-[322px]',
        )}
      >
        <Image src={images[0]} alt={alt} fill priority sizes='(max-width: 980px) 100vw, 480px' className={img} />
      </figure>
      <figure
        className={cn(
          figure,
          'left-0 w-[56%] animate-bob-b border-[5px] border-white max-xl:bottom-0 max-xl:h-40 max-xl:w-[60%]',
          compact ? 'bottom-3.5 h-[200px]' : 'bottom-6 h-[210px]',
        )}
      >
        <Image src={images[1]} alt='' fill sizes='(max-width: 980px) 60vw, 320px' className={img} />
      </figure>
      <div
        className={cn(
          'absolute z-[5] flex animate-bob-a items-center gap-3 rounded-2xl bg-white px-[18px] py-3.5 shadow-lift motion-reduce:animate-none',
          'max-xl:right-[4%]',
          compact ? 'right-[6%] bottom-[52px] max-xl:bottom-[30px]' : 'right-[8%] bottom-16 max-xl:bottom-[34px]',
        )}
      >
        <div className='flex size-[38px] items-center justify-center rounded-xl bg-tint text-blue'>
          <IconStar size={19} />
        </div>
        <div>
          <b className='block font-display text-[22px] leading-none text-blue-deep'>{badge.value}</b>
          <small className='mt-[3px] block text-[12px] text-muted'>{badge.label}</small>
        </div>
      </div>
    </div>
  );
}
