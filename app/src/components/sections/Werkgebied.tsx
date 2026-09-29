import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Wrap } from '@/components/ui/Wrap';
import { getLayout } from '@/sanity/fetch';
import type { HOME_QUERY_RESULT } from '@/sanity/sanity.types';

type WerkgebiedData = NonNullable<NonNullable<HOME_QUERY_RESULT>['werkgebied']>;

/** Homepage werkgebied: text with place chips beside a photo. Places come from the site settings. */
export async function Werkgebied({ werkgebied }: { werkgebied: WerkgebiedData | null }) {
  if (!werkgebied) return null;
  const { site } = await getLayout();

  return (
    <section className='py-24'>
      <Wrap className='grid grid-cols-2 items-center gap-[54px] max-lg:grid-cols-1 max-lg:gap-[34px]'>
        <Reveal>
          {werkgebied.kicker ? <Kicker>{werkgebied.kicker}</Kicker> : null}
          <h2 className='text-[34px]'>{werkgebied.title}</h2>
          <p className='mt-4 max-w-[460px] text-[17px] text-muted'>{werkgebied.text}</p>
          <div className='mt-[26px] flex flex-wrap gap-2.5'>
            {(site?.places ?? []).map((place) => (
              <span
                key={place}
                className='rounded-full border border-line bg-white px-4 py-2 text-[14px] transition-[translate,border-color,color] duration-250 hover:-translate-y-[3px] hover:border-blue hover:text-blue-deep'
              >
                {place}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal index={1}>
          <figure className='group relative h-[340px] overflow-hidden rounded-card-lg shadow-lift'>
            <SanityImage
              image={werkgebied.image}
              sizes='(max-width: 900px) 100vw, 580px'
              className='object-cover transition-transform duration-900 group-hover:scale-105'
            />
          </figure>
        </Reveal>
      </Wrap>
    </section>
  );
}
