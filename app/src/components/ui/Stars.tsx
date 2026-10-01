import { cn } from '@/lib/cn';

/**
 * Five stars filled to `rating` (0-5), fractions included: 4,6 fills four and
 * a bit more than half of the fifth. A gold row clipped to the score on top of
 * a pale one.
 */
export function Stars({ rating, label, className }: { rating: number; label?: string; className?: string }) {
  const percent = Math.max(0, Math.min(5, rating)) * 20;
  return (
    <div className={cn('relative inline-block whitespace-nowrap', className)} role='img' aria-label={label}>
      <span className='text-[#dfe6eb]' aria-hidden='true'>
        ★★★★★
      </span>
      <span className='absolute inset-0 overflow-hidden text-gold' style={{ width: `${percent}%` }} aria-hidden='true'>
        ★★★★★
      </span>
    </div>
  );
}

/** 4.6 -> "4,6" — one decimal, Dutch comma. */
export function formatScore(rating: number) {
  return rating.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
