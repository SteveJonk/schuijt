import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'soft' | 'ghost';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-blue text-white shadow-btn hover:bg-blue-deep hover:shadow-btn-hover',
  soft: 'border-line bg-white text-ink shadow-soft hover:border-[#cfe6f3]',
  ghost: 'border-white/45 text-white hover:bg-white/12',
};

const sizeClass = {
  md: 'px-[26px] py-[13px] text-[15px]',
  sm: 'px-[22px] py-[11px] text-[14.5px]',
} as const;

/** Class string for anything that should look like a button (links, submits). */
export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: keyof typeof sizeClass = 'md',
  className?: string,
) {
  return cn(
    'inline-flex items-center gap-[9px] rounded-full border-[1.5px] border-transparent font-display leading-[1.65] font-semibold',
    'transition-[translate,box-shadow,background-color,color,border-color] duration-250 ease-brand hover:-translate-y-[3px]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue',
    variantClass[variant],
    sizeClass[size],
    className,
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof sizeClass;
  className?: string;
  onClick?: () => void;
};

export function Button({ href, children, variant, size, className, onClick }: ButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}
