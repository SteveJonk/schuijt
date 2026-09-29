import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageIntro } from '@/components/sections/PageIntro';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FilterButtons, FilterItem, FilterScope } from '@/components/ui/Filter';
import { IconArrow } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Wrap } from '@/components/ui/Wrap';
import { sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { BLOG_PAGE_QUERY } from '@/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await sanityFetch(BLOG_PAGE_QUERY);
  return pageMetadata(page?.seo, page?.title);
}

export default async function BlogPage() {
  const { page, categories, posts } = await sanityFetch(BLOG_PAGE_QUERY);
  const [featured, ...rest] = posts;
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
            {featured ? (
              <Reveal className='mb-[52px]'>
                <Link
                  href={featured.href}
                  className='group grid grid-cols-[1.1fr_1fr] overflow-hidden rounded-card-lg border border-line shadow-lift max-[800px]:grid-cols-1'
                >
                  <div className='relative min-h-[320px] max-[800px]:min-h-[220px]'>
                    <SanityImage image={featured.image} alt='' sizes='(max-width: 800px) 100vw, 600px' className='object-cover' />
                  </div>
                  <div className='flex flex-col justify-center px-[38px] py-10'>
                    <span className='text-[12px] font-bold tracking-[.05em] text-blue-deep uppercase'>
                      {featured.category?.title}
                    </span>
                    <h2 className='mt-3 text-[27px]'>{featured.title}</h2>
                    <p className='mt-3.5 text-[15.5px] text-muted'>{featured.excerpt}</p>
                    <div className='mt-5 text-[13px] text-muted'>{featured.readTime}</div>
                    {page?.readMore ? (
                      <span className='mt-[22px] inline-flex items-center gap-[7px] font-display text-[14.5px] font-semibold text-blue-deep'>
                        {page.readMore}
                        <IconArrow size={16} className='transition-transform duration-300 group-hover:translate-x-1' />
                      </span>
                    ) : null}
                  </div>
                </Link>
              </Reveal>
            ) : null}

            <div className='grid grid-cols-3 gap-[26px] max-lg:grid-cols-2 max-sm:grid-cols-1'>
              {rest.map((post, index) => (
                <FilterItem key={post._id} category={post.category?._id ?? ''}>
                  <Reveal index={index}>
                    <Link
                      href={post.href}
                      className='group block h-full overflow-hidden rounded-card border border-line bg-white transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-2 hover:shadow-lift'
                    >
                      <div className='relative h-[190px] overflow-hidden'>
                        <SanityImage
                          image={post.image}
                          alt=''
                          sizes='(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px'
                          className='object-cover transition-transform duration-800 group-hover:scale-[1.08]'
                        />
                      </div>
                      <div className='px-[22px] pt-[22px] pb-6'>
                        <span className='text-[11.5px] font-bold tracking-[.04em] text-blue-deep uppercase'>
                          {post.category?.title}
                        </span>
                        <h3 className='mt-2.5 text-[18px] leading-[1.3]'>{post.title}</h3>
                        <p className='mt-2.5 text-[14px] text-muted'>{post.excerpt}</p>
                        <div className='mt-4 flex justify-between border-t border-line pt-3.5 text-[12.5px] text-muted'>
                          <span>{post.readTime}</span>
                        </div>
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
