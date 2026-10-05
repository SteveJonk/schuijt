import { Reveal } from '@/components/ui/Reveal';
import { ReviewText } from '@/components/ui/ReviewText';
import { SectionHead } from '@/components/ui/SectionHead';
import { Stars } from '@/components/ui/Stars';
import { Wrap } from '@/components/ui/Wrap';
import { initials, reviewMeta } from '@/lib/reviews';
import { fillLabel, getLayout } from '@/sanity/fetch';
import type { ReviewData, SectionHeadData } from '@/sanity/types';

export async function Reviews({ reviews }: { reviews: { head: SectionHeadData | null; items: ReviewData[] | null } | null }) {
  if (!reviews?.items?.length) return null;
  const { ui } = await getLayout();

  return (
    <section id='reviews' className='relative bg-linear-180 from-[#f6fbfe] to-[#edf7fc] py-24'>
      <Wrap>
        <SectionHead head={reviews.head} />
        <div className='grid grid-cols-3 gap-6 max-lg:grid-cols-1'>
          {reviews.items.map((review, index) => {
            const stars = (
              <Stars
                rating={review.rating}
                label={fillLabel(ui.starsLabel, { score: review.rating })}
                className='text-[15px] tracking-[2px]'
              />
            );
            const author = (
              <div className='mt-5 flex items-center gap-[11px] font-display text-[14.5px] font-semibold'>
                <span className='flex size-[38px] items-center justify-center rounded-full bg-linear-135 from-blue to-blue-light text-[14px] text-white'>
                  {review.initials || initials(review.name)}
                </span>
                <div>
                  {review.name}
                  <small className='block font-sans text-[12.5px] font-normal text-muted'>{reviewMeta(review)}</small>
                </div>
              </div>
            );
            return (
              <Reveal key={review._id} index={index}>
                <div className='h-full rounded-card border border-[#dcecf5] bg-white px-7 py-[30px] transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-soft'>
                  {stars}
                  <ReviewText
                    text={review.text}
                    moreLabel={ui.reviewReadMore ?? 'Lees meer'}
                    closeLabel={ui.reviewClose ?? 'Sluiten'}
                    header={stars}
                    footer={author}
                  />
                  {author}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
