/** Stroke icons from the design. Colour follows `currentColor`. */
type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

function Svg({
  size = 16,
  strokeWidth = 2.4,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className={className}
    >
      {children}
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Svg strokeWidth={3} {...props}>
      <path d='M20 6L9 17l-5-5' />
    </Svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <Svg strokeWidth={2.6} {...props}>
      <path d='M5 12h14M13 6l6 6-6 6' />
    </Svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <Svg {...props}>
      <path d='M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z' />
    </Svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z' />
    </Svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <rect x='2' y='4' width='20' height='16' rx='2' />
      <path d='m22 7-10 6L2 7' />
    </Svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z' />
      <circle cx='12' cy='10' r='3' />
    </Svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d='M9 12l2 2 4-4' />
      <circle cx='12' cy='12' r='10' />
    </Svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d='M12 8v4l3 3' />
      <circle cx='12' cy='12' r='9' />
    </Svg>
  );
}
