/** Wavy SVG edge pinned to the bottom of a section, filled with the next section's colour. */
export function Divider({ path, fill, height = 90 }: { path: string; fill: string; height?: number }) {
  return (
    <div className='pointer-events-none absolute inset-x-0 -bottom-px z-[3] w-full leading-none'>
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio='none'
        className='block h-auto w-full'
        aria-hidden='true'
      >
        <path fill={fill} d={path} />
      </svg>
    </div>
  );
}
