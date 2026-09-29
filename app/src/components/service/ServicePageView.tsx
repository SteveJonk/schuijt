import { ContactCta } from '@/components/sections/ContactCta';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { PlacesStrip } from '@/components/sections/PlacesStrip';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { Werkwijze } from '@/components/sections/Werkwijze';
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { IconCheck } from '@/components/ui/icons';
import { Kicker } from '@/components/ui/Kicker';
import { LinkButton } from '@/components/ui/LinkButton';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { getLayout } from '@/sanity/fetch';
import type { ServicePageData } from '@/sanity/types';

function Types({ types }: { types: ServicePageData['types'] }) {
  if (!types?.items?.length) return null;

  return (
    <section className='relative pt-4 pb-24'>
      <Wrap>
        <SectionHead head={types.head} />
        <div className='grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1'>
          {types.items.map((item, index) => (
            <Reveal key={item._key} index={index}>
              <div className='group h-full overflow-hidden rounded-card border border-line bg-white transition-[translate,box-shadow,border-color] duration-350 ease-brand hover:-translate-y-[9px] hover:border-[#d5e9f4] hover:shadow-lift'>
                <div className='relative h-[172px] overflow-hidden'>
                  <SanityImage
                    image={item.image}
                    sizes='(max-width: 560px) 100vw, (max-width: 980px) 50vw, 290px'
                    className='object-cover transition-transform duration-800 ease-brand group-hover:scale-[1.08]'
                  />
                </div>
                <div className='px-[22px] pt-[22px] pb-[26px]'>
                  <h3 className='text-[18px]'>{item.title}</h3>
                  <p className='mt-[9px] text-[14px] text-muted'>{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Materials({ materials }: { materials: ServicePageData['materials'] }) {
  if (!materials?.title) return null;

  return (
    <section className='relative py-24'>
      <Wrap className='grid grid-cols-[.95fr_1.05fr] items-center gap-14 max-xl:grid-cols-1 max-xl:gap-[38px]'>
        <Reveal>
          {materials.kicker ? <Kicker>{materials.kicker}</Kicker> : null}
          <h2 className='text-[32px]'>{materials.title}</h2>
          <p className='mt-4 max-w-[440px] text-[17px] text-muted'>{materials.text}</p>
          <div className='mt-[26px] grid gap-[13px]'>
            {(materials.points ?? []).map((point) => (
              <div key={point} className='flex items-start gap-3 text-[15.5px] text-ink-soft'>
                <span className='mt-0.5 flex size-[22px] flex-none items-center justify-center rounded-full bg-tint text-blue'>
                  <IconCheck size={12} strokeWidth={3.4} />
                </span>
                {point}
              </div>
            ))}
          </div>
          {materials.ctaLabel ? (
            <div className='mt-8'>
              <Button href='#contact'>{materials.ctaLabel}</Button>
            </div>
          ) : null}
        </Reveal>
        <Reveal index={1}>
          <div className='grid grid-cols-2 grid-rows-[170px_170px] gap-[18px] max-xs:grid-rows-[140px_140px]'>
            {(materials.photos ?? []).map((photo, index) => (
              <figure
                key={photo.asset?._ref ?? index}
                className={cn(
                  'group relative overflow-hidden rounded-card shadow-soft',
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
    </section>
  );
}

/**
 * One template for every service-shaped page: the services themselves
 * (/sierbestrating/), their local variants (/schutting-plaatsen-in-haarlem/)
 * and the zakelijk audiences (/zakelijk/woningcorporaties/).
 */
export async function ServicePageView({ page }: { page: ServicePageData }) {
  const { ui, zakelijkTitle } = await getLayout();
  const label = page.breadcrumb || page.title;

  const crumbs: Crumb[] =
    page.kind === 'zakelijk'
      ? [{ label: zakelijkTitle, href: '/zakelijk/' }]
      : [
          ui.breadcrumbServices ?? {},
          ...(page.kind === 'lokaal' && page.parent
            ? [{ label: page.parent.breadcrumb || page.parent.title, href: page.parent.path }]
            : []),
        ];

  return (
    // Section heads on inner pages are a notch smaller than on the homepage.
    <main className='[--head-size:36px]'>
      <Breadcrumb items={[...crumbs, { label }]} />
      <Hero hero={page.hero} />
      <PlacesStrip content={page.nearby} />
      <Types types={page.types} />
      <Werkwijze
        werkwijze={page.werkwijze}
        divider={
          <Divider
            fill='#ffffff'
            path='M0,90 L0,44 C260,-4 520,74 780,44 C1020,16 1220,52 1440,30 L1440,90 Z'
          />
        }
      />
      <Materials materials={page.materials} />
      {page.projects?.tiles?.length ? (
        <section id='projecten' className='relative py-24'>
          <Wrap>
            <SectionHead head={page.projects.head} />
            <ProjectGrid tiles={page.projects.tiles} />
            {page.projects.link?.href ? (
              <div className='mt-9 text-center'>
                <LinkButton link={page.projects.link} variant='soft' />
              </div>
            ) : null}
          </Wrap>
        </section>
      ) : null}
      <Faq content={page.faq} />
      <ContactCta cta={page.cta} size='service' padding='lg' service={label} />
    </main>
  );
}
