import { OfferteForm } from '@/components/OfferteForm';
import { IconMail, IconPhone } from '@/components/ui/icons';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { SITE, mailtoHref, telHref } from '@/lib/site';

type ContactCtaProps = {
  title?: string;
  text?: string;
};

/** The contact band with the offerte form that closes every page. */
export function ContactCta({
  title = 'Benieuwd wat uw project kost?',
  text = 'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
}: ContactCtaProps) {
  const links = [
    { href: telHref(SITE.phone), label: SITE.phone, Icon: IconPhone },
    { href: mailtoHref(SITE.email), label: SITE.email, Icon: IconMail },
  ];

  return (
    <section
      id='contact'
      className='relative overflow-hidden bg-linear-140 from-[#e9f6fc] to-[#d9eefa] py-24'
    >
      <span className='absolute -bottom-[200px] -left-[120px] size-[480px] rounded-full bg-blue/18 blur-[80px]' />
      <Wrap className='relative z-[2] grid grid-cols-2 items-center gap-[54px] max-lg:grid-cols-1 max-lg:gap-[34px]'>
        <Reveal>
          <Kicker>Contact</Kicker>
          <h2 className='text-[36px] max-lg:text-[28px]'>{title}</h2>
          <p className='mt-[15px] max-w-[420px] text-[17px] text-ink-soft'>{text}</p>
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
          <OfferteForm />
        </Reveal>
      </Wrap>
    </section>
  );
}
