import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ZakelijkProjectCard } from '@/components/project/ZakelijkProjectCard';
import { ContactCta } from '@/components/sections/ContactCta';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Werkwijze } from '@/components/sections/Werkwijze';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { IconArrow, IconCheck, IconCheckCircle, IconClock, IconPin } from '@/components/ui/icons';
import { LinkButton } from '@/components/ui/LinkButton';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { getLayout, sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { ZAKELIJK_PAGE_QUERY } from '@/sanity/queries';

const TRUST_ICONS = { pin: IconPin, check: IconCheckCircle, clock: IconClock };

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch(ZAKELIJK_PAGE_QUERY);
  return pageMetadata(page?.seo, page?.title);
}

export default async function ZakelijkPage() {
  const [page, { ui }] = await Promise.all([sanityFetch(ZAKELIJK_PAGE_QUERY), getLayout()]);
  if (!page) notFound();

  return (
    <main className='[--head-size:36px]'>
      <Breadcrumb items={[{ label: page.title }]} />
      <Hero hero={page.hero} variant='hub' />

      {page.stats?.length ? (
        <section className='relative z-[5] -mt-16 pb-5 max-[760px]:-mt-10'>
          <Reveal className='mx-auto max-w-site px-[26px]'>
            <div className='grid grid-cols-3 gap-5 overflow-hidden rounded-card-lg border border-line bg-white shadow-lift max-[760px]:grid-cols-1'>
              {page.stats.map((stat, index) => (
                <div
                  key={stat._key}
                  className={
                    index > 0
                      ? 'border-l border-line px-7 py-[30px] max-[760px]:border-t max-[760px]:border-l-0'
                      : 'px-7 py-[30px]'
                  }
                >
                  <strong className='block font-display text-[36px] leading-none font-extrabold text-blue-deep'>
                    {stat.value}
                  </strong>
                  <span className='mt-2.5 block text-[14px] text-muted'>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}

      {page.audiences?.cards?.length ? (
        <section className='relative py-24'>
          <Wrap>
            <SectionHead head={page.audiences.head} />
            <div className='grid grid-cols-3 gap-6 max-lg:grid-cols-1'>
              {page.audiences.cards.map((card, index) => (
                <Reveal key={card._key} index={index}>
                  <div className='group h-full overflow-hidden rounded-card border border-line bg-white transition-[translate,box-shadow,border-color] duration-350 ease-brand hover:-translate-y-[9px] hover:border-[#d5e9f4] hover:shadow-lift'>
                    <div className='relative h-[172px] overflow-hidden'>
                      <SanityImage
                        image={card.image}
                        sizes='(max-width: 900px) 100vw, 380px'
                        className='object-cover transition-transform duration-800 ease-brand group-hover:scale-[1.08]'
                      />
                    </div>
                    <div className='px-[22px] pt-[22px] pb-[26px]'>
                      <h3 className='text-[18.5px]'>{card.title}</h3>
                      <p className='mt-[9px] text-[14px] text-muted'>{card.text}</p>
                      {card.link?.href && card.link.label ? (
                        <Link
                          href={card.link.href}
                          className='mt-[15px] inline-flex items-center gap-1.5 font-display text-[13.5px] font-semibold text-blue-deep'
                        >
                          {card.link.label}
                          <IconArrow size={14} strokeWidth={2.8} className='transition-transform duration-300 group-hover:translate-x-1' />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Wrap>
          <Divider fill='#0d2a3a' path='M0,90 L0,44 C260,-4 520,74 780,44 C1020,16 1220,52 1440,30 L1440,90 Z' />
        </section>
      ) : null}

      {page.services?.items?.length ? (
        <section className='relative overflow-hidden bg-linear-140 from-deep via-[#124b68] via-55% to-[#0b6f9b] py-24 text-white'>
          <span className='pointer-events-none absolute -top-40 -left-[100px] size-[480px] rounded-full bg-[rgb(79_195_242/0.2)] blur-[90px]' />
          <Wrap>
            <SectionHead dark head={page.services.head} />
            <Reveal className='relative z-[2] mx-auto grid max-w-[780px] grid-cols-2 gap-x-10 gap-y-4 max-[700px]:grid-cols-1'>
              {page.services.items.map((item) => (
                <div key={item} className='flex items-start gap-3 text-[16px] text-[#e2ecf3]'>
                  <span className='mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-[rgb(79_195_242/0.2)] text-blue-light'>
                    <IconCheck size={12} strokeWidth={3.4} />
                  </span>
                  {item}
                </div>
              ))}
            </Reveal>
          </Wrap>
          <Divider fill='#fbfdfe' path='M0,60 C240,100 420,18 720,42 C1020,66 1200,100 1440,58 L1440,100 L0,100 Z' />
        </section>
      ) : null}

      <Werkwijze werkwijze={page.werkwijze} />

      {page.projects?.items?.length ? (
        <section className='relative py-24'>
          <Wrap>
            <SectionHead head={page.projects.head} />
            <div className='grid grid-cols-2 gap-7 max-[760px]:grid-cols-1'>
              {page.projects.items.map((card, index) => (
                <Reveal key={card._id} index={index}>
                  <ZakelijkProjectCard card={card} linkLabel={ui.viewProject} />
                </Reveal>
              ))}
            </div>
            {page.projects.link?.href ? (
              <Reveal index={2} className='mt-9 text-center'>
                <LinkButton link={page.projects.link} variant='soft' />
              </Reveal>
            ) : null}
          </Wrap>
        </section>
      ) : null}

      {page.trust?.length ? (
        <section className='relative bg-white py-24'>
          <Wrap className='grid grid-cols-3 gap-10 max-[760px]:grid-cols-1 max-[760px]:gap-7'>
            {page.trust.map((item, index) => {
              const Icon = TRUST_ICONS[item.icon ?? 'check'];
              return (
                <Reveal key={item._key} index={index}>
                  <div className='mb-3.5 flex size-11 items-center justify-center rounded-[14px] bg-tint text-blue'>
                    <Icon size={20} />
                  </div>
                  <h3 className='text-[15.5px]'>{item.title}</h3>
                  <p className='mt-2.5 text-[14.5px] text-muted'>{item.text}</p>
                </Reveal>
              );
            })}
          </Wrap>
        </section>
      ) : null}

      <Faq content={page.faq} titleSize='28px' />
      <ContactCta cta={page.cta} padding='lg' />
    </main>
  );
}
