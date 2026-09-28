import Image from 'next/image';
import Link from 'next/link';
import { IconArrow } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { PATHS } from '@/lib/content/home';

/** The two entry cards (particulier / zakelijk) overlapping the hero. */
export function Paths() {
  return (
    <section className='relative z-[6] -mt-[72px] pb-24 max-md:-mt-14 max-md:pb-[70px]'>
      <Wrap className='grid grid-cols-2 gap-[26px] max-md:grid-cols-1'>
        {PATHS.map((path, index) => (
          <Reveal key={path.href} index={index}>
            <Link
              href={path.href}
              className='group relative flex h-full min-h-[300px] items-end overflow-hidden rounded-card-lg shadow-lift transition-[translate] duration-350 ease-brand hover:-translate-y-2'
            >
              <Image
                src={path.image}
                alt=''
                fill
                sizes='(max-width: 820px) 100vw, 580px'
                className='object-cover transition-transform duration-900 ease-brand group-hover:scale-[1.07]'
              />
              <div className='absolute inset-0 bg-linear-180 from-[rgb(13_42_58/0)] from-30% to-[rgb(13_42_58/0.9)]' />
              <div className='relative z-[2] w-full p-8 text-white'>
                <span className='inline-block rounded-full bg-blue-light px-[13px] py-[5px] font-display text-[12.5px] font-semibold text-[#0a2c3d]'>
                  {path.tag}
                </span>
                <h3 className='mt-3 text-[26px] text-white'>{path.title}</h3>
                <p className='mt-2.5 max-w-[340px] text-[14.5px] text-[#d5e2ea]'>{path.text}</p>
                <span className='mt-4 inline-flex items-center gap-[7px] font-display text-[14.5px] font-semibold'>
                  {path.cta}
                  <IconArrow size={16} className='transition-transform duration-300 group-hover:translate-x-[5px]' />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </Wrap>
    </section>
  );
}
