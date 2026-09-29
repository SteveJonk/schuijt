import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FormCard } from '@/components/form/FormCard';
import { Faq } from '@/components/sections/Faq';
import { PageIntro } from '@/components/sections/PageIntro';
import { PlacesStrip } from '@/components/sections/PlacesStrip';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { IconCheck, IconMail, IconPhone, IconPin } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { mailtoHref, telHref } from '@/lib/site';
import { getLayout, sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { CONTACT_PAGE_QUERY } from '@/sanity/queries';

const ICONS = { phone: IconPhone, mail: IconMail, pin: IconPin };

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch(CONTACT_PAGE_QUERY);
  return pageMetadata(page?.seo, page?.title);
}

export default async function ContactPage() {
  const [page, { site }] = await Promise.all([sanityFetch(CONTACT_PAGE_QUERY), getLayout()]);
  if (!page) notFound();

  const cardLink = (show: string | null) =>
    show === 'phone' && site?.phone
      ? { href: telHref(site.phone), label: site.phone }
      : show === 'email' && site?.email
        ? { href: mailtoHref(site.email), label: site.email }
        : null;

  return (
    <main>
      <Breadcrumb items={[{ label: page.title }]} />
      <PageIntro variant='contact' intro={page.intro}>
        {page.badges?.length ? (
          <div className='mt-[30px] flex flex-wrap gap-2.5'>
            {page.badges.map((badge) => (
              <span
                key={badge}
                className='inline-flex items-center gap-2 rounded-full border border-[#dceaf3] bg-white/80 px-4 py-[9px] text-[14px] font-medium text-ink-soft'
              >
                <IconCheck size={15} className='text-blue' />
                {badge}
              </span>
            ))}
          </div>
        ) : null}
      </PageIntro>

      {/* id="contact": the header's offerte button jumps here. */}
      <section id='contact' className='relative py-20'>
        <Wrap className='grid grid-cols-[.85fr_1.15fr] items-start gap-[50px] max-[940px]:grid-cols-1 max-[940px]:gap-9'>
          <Reveal className='grid gap-4'>
            {(page.infoCards ?? []).map((card) => {
              const Icon = ICONS[card.icon ?? 'pin'];
              const link = cardLink(card.show);
              return (
                <div
                  key={card._key}
                  className='flex items-start gap-4 rounded-card border border-line bg-white p-6 transition-[translate,box-shadow] duration-300 ease-brand hover:-translate-y-[5px] hover:shadow-soft'
                >
                  <div className='flex size-[46px] flex-none items-center justify-center rounded-[14px] bg-tint text-blue'>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className='text-[16px]'>{card.title}</h3>
                    <p className='mt-1.5 text-[14.5px] text-muted'>{card.text}</p>
                    {link ? (
                      <a href={link.href} className='mt-1.5 block font-display text-[15.5px] font-semibold text-blue-deep'>
                        {link.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
            {page.hours?.rows?.length ? (
              <div className='rounded-card bg-deep p-[26px] text-white'>
                <h3 className='text-[16px] text-white'>{page.hours.title}</h3>
                {page.hours.rows.map((row) => (
                  <div
                    key={row._key}
                    className='flex justify-between border-b border-white/12 py-[9px] text-[14.5px] text-[#c3d0d8] last:border-b-0'
                  >
                    <span>{row.day}</span>
                    <b className='font-medium text-white'>{row.time}</b>
                  </div>
                ))}
              </div>
            ) : null}
          </Reveal>
          <Reveal index={1}>
            <FormCard form={page.form} variant='stacked' lead={page.formLead} />
          </Reveal>
        </Wrap>
      </section>

      <PlacesStrip variant='contact' content={page.werkgebied} />
      <Faq content={page.faq} variant='white' />
    </main>
  );
}
