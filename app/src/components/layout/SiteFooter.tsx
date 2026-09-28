import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_GROUPS } from '@/lib/chrome';
import { SITE, mailtoHref, telHref } from '@/lib/site';

export function SiteFooter() {
  const linkClass = 'transition-colors duration-200 hover:text-blue-light';

  return (
    <footer className='relative bg-linear-160 from-deep to-[#0a1e2a] pt-[70px] pb-7 text-[14.5px] text-[#93a6b4]'>
      <div className='mx-auto max-w-site px-[26px]'>
        <div className='grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-[38px] max-lg:grid-cols-2 max-xs:grid-cols-1'>
          <div>
            <Image
              src='/images/logo.png'
              alt={SITE.name}
              width={520}
              height={174}
              className='mb-[18px] h-[38px] w-auto brightness-0 invert'
            />
            <p>{SITE.description}</p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className='mb-4 text-[15px] text-white'>{group.title}</h4>
              <ul className='grid gap-[9px]'>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className='mb-4 text-[15px] text-white'>Contact</h4>
            <ul className='grid gap-[9px]'>
              <li>
                <a href={telHref(SITE.phone)} className={linkClass}>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={mailtoHref(SITE.email)} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
              {SITE.address.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mt-[46px] flex flex-wrap justify-between gap-4 border-t border-white/10 pt-[22px] text-[13px]'>
          <div>
            © {new Date().getFullYear()} {SITE.name}
          </div>
          <div>KvK-nummer · Algemene voorwaarden · Privacyverklaring</div>
        </div>
      </div>
    </footer>
  );
}
