import Link from 'next/link';
import { Fragment } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { getLayout } from '@/sanity/fetch';

export type Crumb = { label?: string | null; href?: string | null };

/** Home / … / current page, above a page hero. The last item is the current page. */
export async function Breadcrumb({ items }: { items: Crumb[] }) {
  const { ui } = await getLayout();
  const trail = [{ label: ui.breadcrumbHome, href: '/' }, ...items].filter((item) => item.label);

  return (
    <Reveal className='mx-auto max-w-site px-[26px]'>
      <nav
        aria-label={ui.breadcrumbHome ?? undefined}
        className='flex flex-wrap items-center gap-2 pt-7 pb-5 text-[13.5px] text-muted'
      >
        {trail.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 ? <span className='text-[#c3ccd5]'>/</span> : null}
            {index === trail.length - 1 || !item.href ? (
              <b className='font-semibold text-ink'>{item.label}</b>
            ) : (
              <Link href={item.href} className='transition-colors duration-200 hover:text-blue-deep'>
                {item.label}
              </Link>
            )}
          </Fragment>
        ))}
      </nav>
    </Reveal>
  );
}
