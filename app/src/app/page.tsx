import { HomeHero } from '@/components/home/HomeHero';
import { Paths } from '@/components/home/Paths';
import { Reviews } from '@/components/home/Reviews';
import { Services } from '@/components/home/Services';
import { ZakelijkBand } from '@/components/home/ZakelijkBand';
import { ContactCta } from '@/components/sections/ContactCta';
import { ProjectGrid } from '@/components/sections/ProjectGrid';
import { Werkgebied } from '@/components/sections/Werkgebied';
import { Werkwijze } from '@/components/sections/Werkwijze';
import { Divider } from '@/components/ui/Divider';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { PROJECTS, STEPS } from '@/lib/content/home';

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <Paths />
      <Services />
      <Werkwijze
        title='Van eerste gesprek tot opgeleverd werk'
        lead='U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.'
        steps={STEPS}
        divider={
          <Divider
            fill='#0d2a3a'
            path='M0,90 L0,44 C260,-4 520,74 780,44 C1020,16 1220,52 1440,30 L1440,90 Z'
          />
        }
      />
      <ZakelijkBand />
      <section id='projecten' className='relative py-24'>
        <Wrap>
          <SectionHead
            kicker='Projecten'
            title='Recent opgeleverd werk'
            lead='Een greep uit de tuinen, terrassen en terreinen die we de afgelopen periode hebben aangepakt.'
          />
          <ProjectGrid projects={PROJECTS} />
        </Wrap>
      </section>
      <Reviews />
      <Werkgebied image='/images/zakelijk-terrein.jpg' />
      <ContactCta />
    </main>
  );
}
