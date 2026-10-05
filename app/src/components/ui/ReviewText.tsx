'use client';

import { useRef, type ReactNode } from 'react';

const LIMIT = 150;

/** Cut at the last word boundary before `LIMIT` characters. */
function truncate(text: string) {
  if (text.length <= LIMIT) return null;
  const cut = text.slice(0, LIMIT);
  return (
    cut
      .slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : LIMIT)
      .replace(/[\s.,;:!?-]+$/, '') + '…'
  );
}

/**
 * A review text clipped to 150 characters, with a link-style button that
 * opens the full review in a native modal dialog. `header` and `footer`
 * (stars, author) are repeated inside the dialog around the full text.
 */
export function ReviewText({
  text,
  moreLabel,
  closeLabel,
  header,
  footer,
}: {
  text: string;
  moreLabel: string;
  closeLabel: string;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const short = truncate(text);

  if (!short) return <p className='mt-3.5 text-[15px] text-ink-soft'>{text}</p>;

  return (
    <>
      <p className='mt-3.5 text-[15px] text-ink-soft'>
        {short}{' '}
        <button
          type='button'
          onClick={() => dialog.current?.showModal()}
          className='font-display font-semibold whitespace-nowrap text-blue underline-offset-4 hover:text-blue-deep cursor-pointer hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue'
        >
          {moreLabel}
        </button>
      </p>
      <dialog
        ref={dialog}
        // A click on the backdrop lands on the dialog element itself.
        onClick={(event) =>
          event.target === event.currentTarget && dialog.current?.close()
        }
        className='m-auto w-[min(600px,calc(100%-32px))] rounded-card-lg border border-line bg-white p-0 text-left shadow-lift backdrop:bg-deep/60 backdrop:backdrop-blur-sm'
      >
        <div className='max-h-[80vh] overflow-y-auto px-[26px] py-7 sm:px-8 sm:py-8'>
          <div className='flex items-start justify-between gap-4'>
            {header}
            <button
              type='button'
              onClick={() => dialog.current?.close()}
              aria-label={closeLabel}
              className='-mt-1 -mr-2 flex size-9 flex-none items-center justify-center rounded-full text-[22px] cursor-pointer leading-none text-muted transition-colors hover:bg-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-blue'
            >
              ×
            </button>
          </div>
          <p className='mt-3.5 text-[15.5px] whitespace-pre-line text-ink-soft'>
            {text}
          </p>
          {footer}
        </div>
      </dialog>
    </>
  );
}
