import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { ContactCta } from '@/components/sections/ContactCta';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { Wrap } from '@/components/ui/Wrap';
import { client } from '@/sanity/client';
import { getLayout, sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY } from '@/sanity/queries';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch(BLOG_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

const getPost = async (params: PageProps['params']) =>
  sanityFetch(BLOG_POST_QUERY, { slug: (await params).slug });

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params);
  return post ? pageMetadata(post.seo ?? { description: post.excerpt }, post.title) : {};
}

const dateFormat = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function BlogArticlePage({ params }: PageProps) {
  const [post, { site, ui }] = await Promise.all([getPost(params), getLayout()]);
  if (!post) notFound();
  const article = 'mx-auto max-w-[740px] px-[26px]';
  const meta = [
    site?.name,
    post.date ? dateFormat.format(new Date(post.date)) : null,
    post.readTime,
  ].filter(Boolean);

  return (
    // The article design sets headings at line-height 1.2 (1.18 elsewhere).
    <main className='[&_:is(h1,h2,h3)]:leading-[1.2]'>
      <Breadcrumb items={[{ label: post.blogTitle, href: '/blog/' }, { label: post.title }]} />

      <section className='relative pt-8 pb-10'>
        <Reveal className={article}>
          <span className='text-[12.5px] font-bold tracking-[.05em] text-blue-deep uppercase'>
            {post.category?.title}
          </span>
          <h1 className='mt-3.5 text-[36px] max-[600px]:text-[27px]'>{post.title}</h1>
          <div className='mt-[18px] flex items-center gap-4 text-[13.5px] text-muted'>
            {ui.blogAuthorInitials ? (
              <span className='flex size-[34px] items-center justify-center rounded-full bg-linear-135 from-blue to-blue-light font-display text-[13px] font-semibold text-white'>
                {ui.blogAuthorInitials}
              </span>
            ) : null}
            {meta.map((item, index) => (
              <span key={index} className='contents'>
                {index > 0 ? <span>·</span> : null}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </Reveal>
        <div className={`${article} mt-7`}>
          <Reveal>
            <div className='relative mt-2 h-[420px] overflow-hidden rounded-card-lg shadow-lift max-[700px]:h-[260px] max-[700px]:rounded-card'>
              <SanityImage image={post.image} alt='' priority sizes='740px' className='object-cover' />
            </div>
          </Reveal>
        </div>
      </section>

      <section className='relative pt-3 pb-[70px]'>
        <Reveal className={`${article} text-[17px] leading-[1.8] text-ink-soft`}>
          <PortableText
            value={post.body ?? []}
            components={{
              block: {
                normal: ({ children }) => <p className='mb-5'>{children}</p>,
                h2: ({ children }) => <h2 className='mt-11 mb-4 text-[24px] text-ink'>{children}</h2>,
              },
              list: {
                bullet: ({ children }) => <ul className='mb-5 grid list-disc gap-2 pl-5'>{children}</ul>,
              },
              listItem: {
                bullet: ({ children }) => <li className='text-[16.5px]'>{children}</li>,
              },
              types: {
                callout: ({ value }: { value: { title?: string; text?: string } }) => (
                  <div className='my-7 rounded-card border border-l-4 border-line border-l-blue bg-tint-2 px-6 py-[22px] text-[15.5px]'>
                    {value.title ? (
                      <b className='mb-1.5 block font-display text-[14.5px] text-ink'>{value.title}</b>
                    ) : null}
                    {value.text}
                  </div>
                ),
              },
            }}
          />
          <div className='mt-12 flex flex-wrap items-center justify-between gap-5 rounded-card-lg bg-tint px-8 py-[30px]'>
            <div>
              <h3 className='text-[18px]'>{post.ctaTitle || ui.blogCtaTitle}</h3>
              <p className='mt-1.5 mb-5 text-[14px] text-muted'>{ui.blogCtaText}</p>
            </div>
            {ui.blogCtaButton ? <Button href='#contact'>{ui.blogCtaButton}</Button> : null}
          </div>
        </Reveal>
      </section>

      {post.related?.length ? (
        <section className='relative bg-linear-180 from-[#fbfdfe] to-[#f2f9fd] py-[70px]'>
          <Wrap>
            <Reveal className='mb-9 max-w-[600px]'>
              {ui.blogRelatedKicker ? <Kicker>{ui.blogRelatedKicker}</Kicker> : null}
              <h2 className='text-[26px]'>{ui.blogRelatedTitle}</h2>
            </Reveal>
            <div className='grid grid-cols-3 gap-6 max-lg:grid-cols-1'>
              {post.related.map((other, index) => (
                <Reveal key={other._id} index={index}>
                  <Link
                    href={other.href}
                    className='block h-full overflow-hidden rounded-card border border-line bg-white transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-lift'
                  >
                    <div className='relative h-[150px]'>
                      <SanityImage image={other.image} alt='' sizes='(max-width: 900px) 100vw, 380px' className='object-cover' />
                    </div>
                    <div className='px-5 pt-[18px] pb-5'>
                      <span className='text-[11px] font-bold tracking-[.04em] text-blue-deep uppercase'>
                        {other.category?.title}
                      </span>
                      <h4 className='mt-2 text-[15.5px] leading-[1.35]'>{other.title}</h4>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>
      ) : null}

      <ContactCta cta={post.cta} padding='sm' />
    </main>
  );
}
