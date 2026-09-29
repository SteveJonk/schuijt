import Image from 'next/image';
import Link from 'next/link';
import { mailtoHref, telHref } from '@/lib/site';
import { getLayout } from '@/sanity/fetch';
import { imageUrl } from '@/sanity/image';

export async function SiteFooter() {
  const { site, footer } = await getLayout();
  const linkClass = 'transition-colors duration-200 hover:text-blue-light';
  const logo = imageUrl(site?.logo);
  const dims = site?.logo?.dimensions;

  return (
    <footer className='relative bg-linear-160 from-deep to-[#0a1e2a] pt-[70px] pb-7 text-[14.5px] text-[#93a6b4]'>
      <div className='mx-auto max-w-site px-[26px]'>
        <div className='grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-[38px] max-lg:grid-cols-2 max-xs:grid-cols-1'>
          <div>
            {logo && dims ? (
              <Image
                src={logo}
                alt={site?.name ?? ''}
                width={dims.width}
                height={dims.height}
                className='mb-[18px] h-[38px] w-auto brightness-0 invert'
              />
            ) : null}
            <p>{site?.description}</p>
          </div>
          {(footer?.groups ?? []).map((group) => (
            <div key={group._key}>
              <h4 className='mb-4 text-[15px] text-white'>{group.title}</h4>
              <ul className='grid gap-[9px]'>
                {(group.links ?? []).map((link) =>
                  link.href ? (
                    <li key={`${link.label}-${link.href}`}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ))}
          <div>
            {footer?.contactTitle ? (
              <h4 className='mb-4 text-[15px] text-white'>{footer.contactTitle}</h4>
            ) : null}
            <ul className='grid gap-[9px]'>
              {site?.phone ? (
                <li>
                  <a href={telHref(site.phone)} className={linkClass}>
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site?.email ? (
                <li>
                  <a href={mailtoHref(site.email)} className={linkClass}>
                    {site.email}
                  </a>
                </li>
              ) : null}
              {(site?.address ?? []).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mt-[46px] flex flex-wrap justify-between gap-4 border-t border-white/10 pt-[22px] text-[13px]'>
          <div>
            © {new Date().getFullYear()} {site?.name}
          </div>
          <div>
            {[
              footer?.legalText,
              ...(footer?.legalLinks ?? []).map((link) =>
                link.href ? (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ) : null,
              ),
            ]
              .filter(Boolean)
              .map((item, index) => (
                <span key={index}>
                  {index > 0 ? ' · ' : null}
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
