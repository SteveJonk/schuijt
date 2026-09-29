import { FormCard } from '@/components/form/FormCard';
import { IconMail, IconPhone } from '@/components/ui/icons';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { mailtoHref, telHref } from '@/lib/site';
import { getLayout } from '@/sanity/fetch';
import type { CtaData } from '@/sanity/types';

const SIZES = {
  home: 'text-[36px] max-lg:text-[28px]',
  service: 'text-[34px] max-lg:text-[27px]',
  page: 'text-[32px] max-lg:text-[26px]',
} as const;

type ContactCtaProps = {
  cta: Partial<CtaData> | null | undefined;
  /** Heading scale: home 36px, service pages 34px, everything else 32px. */
  size?: keyof typeof SIZES;
  /** Section padding: 70px (blog article), 80px (most inner pages), 96px (home, services, zakelijk). */
  padding?: 'sm' | 'md' | 'lg';
  /** Filled into a hidden `{{service}}` field. */
  service?: string | null;
  /** Overrides the title from the studio (project pages use a label from Vaste teksten). */
  title?: string | null;
};

/** The contact band with the page's form that closes most pages. */
export async function ContactCta({ cta, size = 'page', padding = 'md', service, title }: ContactCtaProps) {
  const { site, ui } = await getLayout();
  const links = [
    site?.phone ? { href: telHref(site.phone), label: site.phone, Icon: IconPhone } : null,
    site?.email ? { href: mailtoHref(site.email), label: site.email, Icon: IconMail } : null,
  ].filter((link) => link !== null);

  return (
    <section
      id='contact'
      className={cn(
        'relative overflow-hidden bg-linear-140 from-[#e9f6fc] to-[#d9eefa]',
        { sm: 'py-[70px]', md: 'py-20', lg: 'py-24' }[padding],
      )}
    >
      <span className='absolute -bottom-[200px] -left-[120px] size-[480px] rounded-full bg-blue/18 blur-[80px]' />
      <Wrap className='relative z-[2] grid grid-cols-2 items-center gap-[54px] max-lg:grid-cols-1 max-lg:gap-[34px]'>
        <Reveal>
          {ui.ctaKicker ? <Kicker>{ui.ctaKicker}</Kicker> : null}
          <h2 className={SIZES[size]}>{title ?? cta?.title}</h2>
          <p className='mt-[15px] max-w-[420px] text-[17px] text-ink-soft'>{cta?.text ?? ui.ctaText}</p>
          <div className='mt-7 grid gap-3.5'>
            {links.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                className='inline-flex items-center gap-3 font-display text-[16px] font-semibold transition-colors duration-200 hover:text-blue-deep'
              >
                <span className='flex size-10 items-center justify-center rounded-[13px] bg-white text-blue shadow-soft'>
                  <Icon size={18} />
                </span>
                {label}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal index={1}>
          <FormCard
            form={cta?.form}
            messagePlaceholder={cta?.messagePlaceholder}
            context={service ? { service } : undefined}
          />
        </Reveal>
      </Wrap>
    </section>
  );
}
