import Image from 'next/image';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';

export const PLACES = [
  'Heemskerk',
  'Beverwijk',
  'Castricum',
  'Uitgeest',
  'Limmen',
  'Velsen',
  'Alkmaar',
  'Haarlem',
  'Amsterdam',
];

export function Werkgebied({ image }: { image: string }) {
  return (
    <section className='py-24'>
      <Wrap className='grid grid-cols-2 items-center gap-[54px] max-lg:grid-cols-1 max-lg:gap-[34px]'>
        <Reveal>
          <Kicker>Werkgebied</Kicker>
          <h2 className='text-[34px]'>Actief in Heemskerk en de hele regio</h2>
          <p className='mt-4 max-w-[460px] text-[17px] text-muted'>
            Particuliere klussen doen we binnen ongeveer 25 kilometer rond Heemskerk. Voor grotere
            zakelijke projecten rijden we verder door Noord-Holland.
          </p>
          <div className='mt-[26px] flex flex-wrap gap-2.5'>
            {PLACES.map((place) => (
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
            <Image
              src={image}
              alt='Werkgebied rond Heemskerk'
              fill
              sizes='(max-width: 900px) 100vw, 580px'
              className='object-cover transition-transform duration-900 group-hover:scale-105'
            />
          </figure>
        </Reveal>
      </Wrap>
    </section>
  );
}
