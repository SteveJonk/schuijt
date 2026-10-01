import type { Metadata } from 'next';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageIntro } from '@/components/sections/PageIntro';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { Stars, formatScore } from '@/components/ui/Stars';
import { Wrap } from '@/components/ui/Wrap';
import { buttonClass } from '@/components/ui/Button';
import { initials, reviewMeta } from '@/lib/reviews';
import { fillLabel, getLayout, sanityFetch } from '@/sanity/fetch';
import { pageMetadata } from '@/sanity/metadata';
import { REVIEWS_PAGE_QUERY } from '@/sanity/queries';

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await sanityFetch(REVIEWS_PAGE_QUERY);
  return pageMetadata(page?.seo, page?.title);
}

function GoogleLogo() {
  return (
    <svg width='18' height='18' viewBox='0 0 24 24' aria-hidden='true' className='flex-none'>
      <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z' />
      <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z' />
      <path fill='#FBBC05' d='M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9z' />
      <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z' />
    </svg>
  );
}

function ScoreCard({ rating, caption, stars, google }: { rating: number; caption: string; stars?: string; google?: string | null }) {
  return (
    <div className='rounded-card-lg border border-line bg-white p-8 text-center shadow-lift'>
      <div className='font-display text-[56px] leading-none font-extrabold text-ink'>{formatScore(rating)}</div>
      <Stars rating={rating} label={stars} className='mt-2.5 text-[22px] tracking-[3px]' />
      <div className='mt-2 text-[14px] text-muted'>{caption}</div>
      <div className='mt-[18px] flex items-center justify-center gap-2 border-t border-line pt-4 text-[13.5px] text-muted'>
        <GoogleLogo />
        {google}
      </div>
    </div>
  );
}

export default async function ReviewsPage() {
  const [{ page, reviews, score }, { site, ui }] = await Promise.all([sanityFetch(REVIEWS_PAGE_QUERY), getLayout()]);
  // Google's own score and count cover every review on Google; without a
  // sync yet, fall back to the average of the reviews in Sanity.
  const rating = score.google?.rating ?? (score.count ? score.average : null);
  const count = score.google?.userRatingCount ?? score.count;

  return (
    <main>
      <Breadcrumb items={[{ label: page?.title }]} />
      <PageIntro
        intro={page?.intro ?? null}
        aside={
          rating ? (
            <ScoreCard
              rating={rating}
              caption={fillLabel(page?.scoreCaption, { aantal: count })}
              stars={fillLabel(ui.starsLabel, { score: formatScore(rating) })}
              google={page?.googleLabel}
            />
          ) : undefined
        }
      />

      <section className='relative pt-5 pb-20'>
        <Wrap>
          <div className='mt-[38px] grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1'>
            {reviews.map((review, index) => (
              <Reveal key={review._id} index={index}>
                <div className='h-full rounded-card border border-line bg-white px-[26px] py-7 transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-soft'>
                  <div className='flex items-start justify-between'>
                    <Stars
                      rating={review.rating}
                      label={fillLabel(ui.starsLabel, { score: review.rating })}
                      className='text-[15px] tracking-[2px]'
                    />
                    {review.source === 'google' ? <GoogleLogo /> : null}
                  </div>
                  <p className='mt-3.5 text-[15px] text-ink-soft'>{review.text}</p>
                  <div className='mt-5 flex items-center gap-[11px]'>
                    <span className='flex size-[38px] items-center justify-center rounded-full bg-linear-135 from-blue to-blue-light font-display text-[14px] font-semibold text-white'>
                      {review.initials || initials(review.name)}
                    </span>
                    <div>
                      <b className='block font-display text-[14.5px] font-semibold'>{review.name}</b>
                      <small className='block text-[12.5px] text-muted'>{reviewMeta(review)}</small>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {page?.leave?.title ? (
        <section className='relative overflow-hidden bg-linear-140 from-deep via-[#124b68] via-55% to-[#0b6f9b] py-20 text-white'>
          <span className='pointer-events-none absolute -top-40 -right-[100px] size-[480px] rounded-full bg-[rgb(79_195_242/0.22)] blur-[90px]' />
          <Reveal className='relative z-[2] mx-auto max-w-[640px] px-[26px] text-center'>
            {page.leave.kicker ? <Kicker dark>{page.leave.kicker}</Kicker> : null}
            <h2 className='text-[30px] text-white'>{page.leave.title}</h2>
            <p className='mt-3.5 text-[16px] text-[#c3d2db]'>{page.leave.text}</p>
            {site?.googleReviewUrl && page.leave.button ? (
              <a
                href={site.googleReviewUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={buttonClass('primary', 'md', 'mt-[26px]')}
              >
                {page.leave.button}
              </a>
            ) : null}
          </Reveal>
        </section>
      ) : null}

      <ContactCta cta={page?.cta} />
    </main>
  );
}
