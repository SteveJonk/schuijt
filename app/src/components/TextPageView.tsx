import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import type { TextPageData } from '@/sanity/types';

/** Plain text pages such as /privacy-policy/, in the blog article's column and type. */
export function TextPageView({ page }: { page: TextPageData }) {
  return (
    <main>
      <Breadcrumb items={[{ label: page.breadcrumb || page.title }]} />
      <section className='pt-8 pb-[70px]'>
        <Reveal className='mx-auto max-w-[740px] px-[26px]'>
          <h1 className='text-[36px] max-[600px]:text-[27px]'>{page.title}</h1>
          <div className='mt-8 text-[17px] leading-[1.8] text-ink-soft [&_a]:text-blue-deep [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-11 [&_h2]:mb-4 [&_h2]:text-[24px] [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[19px] [&_h3]:text-ink [&_p]:mb-5'>
            <PortableText
              value={page.body ?? []}
              components={{
                marks: {
                  link: ({ value, children }) => {
                    const href = (value as { href?: string })?.href ?? '';
                    return href.startsWith('/') ? (
                      <Link href={href}>{children}</Link>
                    ) : (
                      <a href={href} target='_blank' rel='noopener noreferrer'>
                        {children}
                      </a>
                    );
                  },
                },
              }}
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
