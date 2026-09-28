'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION = 1400;

/** Counts from 0 to `value` (ease-out) the first time it is half in view. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setCurrent(value);
          return;
        }
        let start: number | null = null;
        const step = (ts: number) => {
          start ??= ts;
          const p = Math.min((ts - start) / DURATION, 1);
          setCurrent(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}
