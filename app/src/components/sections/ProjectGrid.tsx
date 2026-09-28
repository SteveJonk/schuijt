import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export type Project = {
  image: string;
  title: string;
  text: string;
  size?: 'wide' | 'tall';
};

const sizeClass = {
  wide: 'col-span-2 max-xs:col-span-1',
  tall: 'row-span-2 max-lg:row-span-1',
} as const;

/** Masonry-ish photo grid with captions that lift on hover. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className='grid auto-rows-[206px] grid-cols-4 gap-[18px] max-lg:auto-rows-[172px] max-lg:grid-cols-2 max-xs:grid-cols-1'>
      {projects.map((project, index) => (
        <Reveal
          key={project.title}
          index={index}
          className={project.size && sizeClass[project.size]}
        >
          <div className='group relative h-full overflow-hidden rounded-card shadow-soft transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-lift'>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes='(max-width: 520px) 100vw, (max-width: 900px) 50vw, 600px'
              className='object-cover transition-transform duration-900 ease-brand group-hover:scale-[1.08]'
            />
            <div className='absolute inset-0 bg-linear-180 from-transparent from-42% to-[rgb(13_42_58/0.88)]' />
            <div className='absolute inset-x-0 bottom-0 z-[2] translate-y-1.5 p-5 text-white transition-[translate] duration-350 group-hover:translate-y-0'>
              <b className='block font-display text-[15.5px] font-semibold'>{project.title}</b>
              <span className='text-[12.5px] text-[#c6d5e0]'>{project.text}</span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
