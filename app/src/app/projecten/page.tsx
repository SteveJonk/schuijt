import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageIntro } from '@/components/sections/PageIntro';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FilterButtons, FilterItem, FilterScope } from '@/components/ui/Filter';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Wrap } from '@/components/ui/Wrap';
import { sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { PROJECTS_PAGE_QUERY } from '@/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await sanityFetch(PROJECTS_PAGE_QUERY);
  return pageMetadata(page?.seo, page?.title);
}

export default async function ProjectenPage() {
  const { page, categories, projects } = await sanityFetch(PROJECTS_PAGE_QUERY);
  const filters = [
    ...(page?.filterAll ? [{ value: 'alle', label: page.filterAll }] : []),
    ...categories.map((category) => ({ value: category._id, label: category.title })),
  ];

  return (
    <main>
      <Breadcrumb items={[{ label: page?.title }]} />
      <FilterScope>
        <PageIntro intro={page?.intro ?? null}>
          <FilterButtons options={filters} className='mt-[38px]' />
        </PageIntro>
        <section className='relative pt-11 pb-20'>
          <Wrap>
            <div className='grid auto-rows-[230px] grid-cols-3 gap-5 max-lg:auto-rows-[200px] max-lg:grid-cols-2 max-sm:grid-cols-1'>
              {projects.map((project, index) => (
                <FilterItem key={project._id} category={project.category?._id ?? ''}>
                  <Reveal index={index} step={50} max={8}>
                    <Link
                      href={project.href}
                      className='group relative block h-full overflow-hidden rounded-card shadow-soft transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-lift'
                    >
                      <SanityImage
                        image={project.image}
                        alt=''
                        sizes='(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px'
                        className='object-cover transition-transform duration-900 ease-brand group-hover:scale-[1.08]'
                      />
                      <div className='absolute inset-0 bg-linear-180 from-transparent from-42% to-[rgb(13_42_58/0.88)]' />
                      <div className='absolute inset-x-0 bottom-0 z-[2] p-[18px] text-white'>
                        <span className='text-[11px] font-bold tracking-[.04em] text-[#8fd4f5] uppercase'>
                          {project.category?.title}
                        </span>
                        <b className='mt-1 block font-display text-[15px] font-semibold'>{project.title}</b>
                      </div>
                    </Link>
                  </Reveal>
                </FilterItem>
              ))}
            </div>
          </Wrap>
        </section>
      </FilterScope>
      <ContactCta cta={page?.cta} />
    </main>
  );
}
