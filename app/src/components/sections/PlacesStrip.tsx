import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { getLayout } from '@/sanity/fetch';
import type { PlacesData } from '@/sanity/types';


/** Centred "werkgebied" band with place chips. `contact` is the roomier /contact/ version. */
export async function PlacesStrip({
  content,
  variant = 'local',
}: {
  content: PlacesData | null;
  variant?: 'local' | 'contact';
}) {
  if (!content?.title) return null;
  const { site } = await getLayout();
  const places = content.places?.length ? content.places : (site?.places ?? []);
  const contact = variant === 'contact';

  return (
    <section
      className={cn(
        'relative',
        contact ? 'bg-linear-180 from-[#fbfdfe] to-[#f2f9fd] py-20' : 'py-14',
      )}
    >
      <Reveal className='mx-auto max-w-site px-[26px] text-center'>
        {content.kicker ? <Kicker>{content.kicker}</Kicker> : null}
        <h2 className={contact ? 'text-[30px]' : 'text-[26px]'}>{content.title}</h2>
        <p
          className={cn(
            'mx-auto max-w-[520px] text-muted',
            contact ? 'mt-3.5 text-[16px]' : 'mt-3 text-[15.5px]',
          )}
        >
          {content.text}
        </p>
        <div className={cn('flex flex-wrap justify-center gap-2.5', contact ? 'mt-6' : 'mt-[22px]')}>
          {places.map((place) => (
            <span
              key={place}
              className='rounded-full border border-line bg-white px-4 py-2 text-[14px] transition-[translate,border-color,color] duration-250 hover:-translate-y-[3px] hover:border-blue hover:text-blue-deep'
            >
              {place}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
