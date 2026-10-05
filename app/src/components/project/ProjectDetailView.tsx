import { PortableText } from 'next-sanity';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ContactCta } from '@/components/sections/ContactCta';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { IconCheck } from '@/components/ui/icons';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Wrap } from '@/components/ui/Wrap';
import { getLayout } from '@/sanity/fetch';
import type { ProjectPageData } from '@/sanity/types';

/** A project (a former WordPress post), particulier or zakelijk. */
export async function ProjectDetailView({ project }: { project: ProjectPageData }) {
  const { ui, projectsTitle, zakelijkProjectsTitle } = await getLayout();
  const zakelijk = Boolean(project.category?.isZakelijk);
  const related = project.category?.relatedPage;

  return (
    <main>
      <Breadcrumb
        items={[
          zakelijk
            ? { label: zakelijkProjectsTitle, href: '/zakelijk/projecten/' }
            : { label: projectsTitle, href: '/projecten/' },
          { label: project.title },
        ]}
      />

      <section className='relative pt-[26px]'>
        <Wrap>
          <Reveal>
            <div className='relative h-[460px] overflow-hidden rounded-card-lg shadow-lift max-[760px]:h-[340px] max-[760px]:rounded-card'>
              <SanityImage image={project.image} priority sizes='(max-width: 1180px) 100vw, 1128px' className='object-cover' />
              <div className='absolute inset-0 bg-linear-180 from-[rgb(13_42_58/0)] from-45% to-[rgb(13_42_58/0.82)]' />
              <div className='absolute inset-x-0 bottom-0 z-[2] px-11 py-10 text-white max-[760px]:px-6 max-[760px]:py-[26px]'>
                <Kicker dark className='mb-3.5'>
                  {zakelijk ? ui.projectKickerZakelijk : ui.projectKickerParticulier}
                </Kicker>
                <h1 className='max-w-[760px] text-[38px] text-white max-[760px]:text-[27px]'>{project.title}</h1>
                {project.subline ? <p className='mt-2.5 text-[16px] text-[#d3dde5]'>{project.subline}</p> : null}
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {project.meta?.length ? (
        <section className='relative -mt-px py-9'>
          <Reveal className='mx-auto max-w-site px-[26px]'>
            <div className='grid grid-cols-4 gap-px overflow-hidden rounded-card border border-line bg-line max-[800px]:grid-cols-2 max-[460px]:grid-cols-1'>
              {project.meta.map((item) => (
                <div key={item._key} className='bg-white px-6 py-[22px]'>
                  <div className='text-[12.5px] font-medium text-muted'>{item.label}</div>
                  <div className='mt-1.5 font-display text-[19px] font-bold text-ink'>{item.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className='relative pt-5 pb-20'>
        <Wrap className='grid grid-cols-[1.3fr_.9fr] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-[34px]'>
          <Reveal>
            <h2 className='text-[26px]'>{ui.projectAbout}</h2>
            <div className='mt-[18px] grid gap-4 text-[16px] text-ink-soft'>
              <PortableText value={project.intro ?? []} />
            </div>
          </Reveal>
          {project.works?.length ? (
            <Reveal index={1}>
              <div className='rounded-card border border-line bg-tint-2 px-[26px] py-7'>
                <h3 className='text-[16.5px]'>{ui.projectWorks}</h3>
                <ul className='mt-4 grid gap-[13px]'>
                  {project.works.map((work) => (
                    <li key={work} className='flex items-start gap-[11px] text-[14.5px] text-ink-soft'>
                      <span className='mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-tint text-blue'>
                        <IconCheck size={11} strokeWidth={3.6} />
                      </span>
                      {work}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </Wrap>
      </section>

      {project.gallery?.length ? (
        <section className='relative bg-linear-180 from-[#fbfdfe] to-[#f2f9fd] py-20'>
          <Wrap>
            <Reveal className='mb-10 max-w-[620px]'>
              {ui.projectGalleryKicker ? <Kicker>{ui.projectGalleryKicker}</Kicker> : null}
              <h2 className='text-[28px]'>{ui.projectGalleryTitle}</h2>
            </Reveal>
            <ProjectGallery items={project.gallery} />
          </Wrap>
        </section>
      ) : null}

      {related?.path ? (
        <section className='relative py-[50px]'>
          <Reveal className='mx-auto max-w-site px-[26px]'>
            <div className='flex flex-wrap items-center justify-between gap-5 rounded-card bg-tint px-[30px] py-[26px]'>
              <div>
                <div className='text-[12.5px] font-semibold text-blue-deep'>{ui.projectRelatedLabel}</div>
                <h3 className='mt-1.5 text-[19px]'>{related.breadcrumb || related.title}</h3>
              </div>
              {ui.projectRelatedButton ? (
                <Button href={related.path} variant='soft'>
                  {ui.projectRelatedButton}
                </Button>
              ) : null}
            </div>
          </Reveal>
        </section>
      ) : null}

      <ContactCta
        cta={project.cta}
        title={zakelijk ? ui.projectCtaZakelijk : ui.projectCtaParticulier}
      />
    </main>
  );
}
