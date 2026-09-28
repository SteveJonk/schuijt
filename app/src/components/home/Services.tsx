import Image from 'next/image';
import Link from 'next/link';
import { IconArrow } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { SERVICES } from '@/lib/content/home';

export function Services() {
  return (
    <section id='diensten' className='relative pt-5 pb-24'>
      <Wrap>
        <SectionHead
          kicker='Diensten'
          title='Alles voor de buitenkant van uw woning'
          lead='Vier specialismen die we dagelijks uitvoeren, los te bestellen of als één compleet project.'
        />
        <div className='grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1'>
          {SERVICES.map((service, index) => (
            <Reveal key={service.href} index={index}>
              <Link
                href={service.href}
                className='group block h-full overflow-hidden rounded-card border border-line bg-white transition-[translate,box-shadow,border-color] duration-350 ease-brand hover:-translate-y-[9px] hover:border-[#d5e9f4] hover:shadow-lift'
              >
                <div className='relative h-[172px] overflow-hidden'>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes='(max-width: 560px) 100vw, (max-width: 980px) 50vw, 290px'
                    className='object-cover transition-transform duration-800 ease-brand group-hover:scale-[1.08]'
                  />
                </div>
                <div className='px-[22px] pt-[22px] pb-[26px]'>
                  <h3 className='text-[18.5px]'>{service.title}</h3>
                  <p className='mt-[9px] text-[14px] text-muted'>{service.text}</p>
                  <span className='mt-[15px] inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-blue-deep'>
                    Meer hierover
                    <IconArrow size={14} strokeWidth={2.8} className='transition-transform duration-300 group-hover:translate-x-1' />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
