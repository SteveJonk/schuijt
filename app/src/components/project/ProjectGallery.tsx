'use client';

import { useRef, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SanityImage } from '@/components/ui/SanityImage';
import { cn } from '@/lib/cn';
import type { ProjectPageData } from '@/sanity/types';

type GalleryItem = NonNullable<ProjectPageData['gallery']>[number];

const navButton =
  'absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-[28px] text-white transition-colors hover:bg-black/70 max-[760px]:size-10';

/** The project photo grid; a click opens the photo large in a native <dialog>. */
export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const step = (delta: number) =>
    setCurrent((i) => (i + delta + items.length) % items.length);
  const open = (index: number) => {
    setCurrent(index);
    dialog.current?.showModal();
  };

  return (
    <>
      <div className='grid auto-rows-[200px] grid-cols-4 gap-[18px] max-lg:auto-rows-[170px] max-lg:grid-cols-2 max-xs:grid-cols-1'>
        {items.map((item, index) => (
          <Reveal
            key={item._key}
            index={index}
            className={cn(item.wide && 'col-span-2 max-xs:col-span-1')}
          >
            <button
              type='button'
              onClick={() => open(index)}
              aria-label={
                item.image?.alt ? `Vergroot: ${item.image.alt}` : 'Vergroot foto'
              }
              className='group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-card shadow-soft transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-1.5 hover:shadow-lift'
            >
              <SanityImage
                image={item.image}
                sizes='(max-width: 520px) 100vw, (max-width: 900px) 50vw, 560px'
                className='object-cover transition-transform duration-900 ease-brand group-hover:scale-[1.08]'
              />
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label='Foto'
        // A click on the backdrop lands on the dialog itself; clicks on the photo or buttons don't.
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') step(-1);
          if (e.key === 'ArrowRight') step(1);
        }}
        className='m-auto h-[90vh] max-h-none w-[92vw] max-w-[1400px] overflow-visible bg-transparent p-0 backdrop:bg-[rgb(13_42_58/0.88)]'
      >
        <div className='pointer-events-none absolute inset-0'>
          <SanityImage
            image={items[current]?.image}
            sizes='92vw'
            className='object-contain'
          />
        </div>
        <button
          type='button'
          onClick={() => dialog.current?.close()}
          aria-label='Sluiten'
          className='cursor-pointer absolute top-2 right-2 flex size-10 items-center justify-center rounded-full bg-black/45 text-[26px] leading-none text-white hover:bg-black/70'
        >
          ×
        </button>
        {items.length > 1 ? (
          <>
            <button
              type='button'
              onClick={() => step(-1)}
              aria-label='Vorige foto'
              className={cn(navButton, 'cursor-pointer left-2')}
            >
              ‹
            </button>
            <button
              type='button'
              onClick={() => step(1)}
              aria-label='Volgende foto'
              className={cn(navButton, 'cursor-pointer right-2')}
            >
              ›
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
