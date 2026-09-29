import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Paths } from '@/components/home/Paths';
import { Reviews } from '@/components/home/Reviews';
import { Services } from '@/components/home/Services';
import { ZakelijkBand } from '@/components/home/ZakelijkBand';
import { ContactCta } from '@/components/sections/ContactCta';
import { Hero } from '@/components/sections/Hero';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { Werkgebied } from '@/components/sections/Werkgebied';
import { Werkwijze } from '@/components/sections/Werkwijze';
import { Divider } from '@/components/ui/Divider';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { HOME_QUERY } from '@/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const home = await sanityFetch(HOME_QUERY);
  return pageMetadata(home?.seo, undefined, { absolute: true });
}

export default async function HomePage() {
  const home = await sanityFetch(HOME_QUERY);
  if (!home) notFound();

  return (
    <main>
      <Hero hero={home.hero} variant='home' />
      <Paths paths={home.paths} />
      <Services services={home.services} />
      <Werkwijze
        werkwijze={home.werkwijze}
        divider={
          <Divider
            fill='#0d2a3a'
            path='M0,90 L0,44 C260,-4 520,74 780,44 C1020,16 1220,52 1440,30 L1440,90 Z'
          />
        }
      />
      <ZakelijkBand zakelijk={home.zakelijk} />
      {home.projects?.tiles?.length ? (
        <section id='projecten' className='relative py-24'>
          <Wrap>
            <SectionHead head={home.projects.head} />
            <ProjectGrid tiles={home.projects.tiles} />
          </Wrap>
        </section>
      ) : null}
      <Reviews reviews={home.reviews} />
      <Werkgebied werkgebied={home.werkgebied} />
      <ContactCta cta={home.cta} size='home' padding='lg' />
    </main>
  );
}
