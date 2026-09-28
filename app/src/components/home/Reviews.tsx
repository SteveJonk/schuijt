import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { REVIEWS } from '@/lib/content/home';

export function Reviews() {
  return (
    <section id='reviews' className='relative bg-linear-180 from-[#f6fbfe] to-[#edf7fc] py-24'>
      <Wrap>
        <SectionHead kicker='Reviews' title='Wat klanten over ons zeggen' />
        <div className='grid grid-cols-3 gap-6 max-lg:grid-cols-1'>
          {REVIEWS.map((review, index) => (
            <Reveal key={review.name} index={index}>
              <div className='h-full rounded-card border border-[#dcecf5] bg-white px-7 py-[30px] transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-soft'>
                <div className='text-[15px] tracking-[2px] text-gold' aria-label='5 van 5 sterren'>
                  ★★★★★
                </div>
                <p className='mt-3.5 text-[15px] text-ink-soft'>{review.text}</p>
                <div className='mt-5 flex items-center gap-[11px] font-display text-[14.5px] font-semibold'>
                  <span className='flex size-[38px] items-center justify-center rounded-full bg-linear-135 from-blue to-blue-light text-[14px] text-white'>
                    {review.initials}
                  </span>
                  <div>
                    {review.name}
                    <small className='block font-sans text-[12.5px] font-normal text-muted'>
                      {review.meta}
                    </small>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
