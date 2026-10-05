import type { Metadata } from 'next';
import { ZakelijkProjectCard } from '@/components/project/ZakelijkProjectCard';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageIntro } from '@/components/sections/PageIntro';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FilterButtons, FilterItem, FilterScope } from '@/components/ui/Filter';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { getLayout, sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { ZAKELIJK_PROJECTS_PAGE_QUERY } from '@/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await sanityFetch(ZAKELIJK_PROJECTS_PAGE_QUERY);
  return pageMetadata(page?.seo, page?.title);
}

export default async function ZakelijkProjectenPage() {
  const [{ page, categories, projects }, { ui, zakelijkTitle }] = await Promise.all([
    sanityFetch(ZAKELIJK_PROJECTS_PAGE_QUERY),
    getLayout(),
  ]);

  const filters = [
    ...(page?.filterAll ? [{ value: 'alle', label: page.filterAll }] : []),
    ...categories.map((category) => ({ value: category._id, label: category.title })),
  ];

  return (
    <main>
      <Breadcrumb
        items={[{ label: zakelijkTitle, href: '/zakelijk/' }, { label: page?.breadcrumb || page?.title }]}
      />
      <FilterScope>
        <PageIntro intro={page?.intro ?? null}>
          <FilterButtons options={filters} className='mt-[38px]' />
        </PageIntro>
        <section className='relative pt-11 pb-20'>
          <Wrap className='grid grid-cols-2 gap-7 max-[760px]:grid-cols-1'>
            {projects.map((card, index) => (
              <FilterItem key={card._id} category={card.category ?? ''}>
                <Reveal index={index}>
                  <ZakelijkProjectCard card={card} linkLabel={ui.viewProject} />
                </Reveal>
              </FilterItem>
            ))}
            {page?.soonTitle ? (
              <Reveal index={projects.length} className='col-span-full'>
                <div className='rounded-card border-[1.5px] border-dashed border-line bg-tint-2 px-[30px] py-10 text-center'>
                  <h3 className='text-[17px]'>{page.soonTitle}</h3>
                  <p className='mx-auto mt-2 max-w-[360px] text-[14px] text-muted'>{page.soonText}</p>
                </div>
              </Reveal>
            ) : null}
          </Wrap>
        </section>
      </FilterScope>
      <ContactCta cta={page?.cta} />
    </main>
  );
}
