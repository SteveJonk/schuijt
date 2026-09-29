import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { FormFieldDefinition } from '@/lib/form-fields';

/** `compact` is the card in a page's contact band, `stacked` the full card on /contact/. */
export type FormFieldVariant = 'stacked' | 'compact';

export const controlClass = cn(
  'block w-full rounded-xl border-[1.5px] border-line bg-[#fbfdfe] px-[15px] py-[13px] font-sans text-[14.5px] leading-[normal]',
  'transition-[border-color,box-shadow] duration-250 focus:border-blue focus:shadow-[0_0_0_4px_rgb(6_159_223/0.13)] focus:outline-none',
);

/** Turns `[label](href)` in editor copy into a real link. */
export function linkify(text: string): ReactNode {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (parts[i + 1]) {
      nodes.push(
        <Link key={i} href={parts[i + 2]} className='text-blue-deep underline underline-offset-[3px]'>
          {parts[i + 1]}
        </Link>,
      );
    }
  }
  return nodes;
}

/**
 * One field from the form creator. The design works with placeholders, so a
 * label is only shown where there is no placeholder to say what goes in — and
 * never in the compact card; screen readers always get it.
 */
export function FormField({
  field,
  variant = 'compact',
  idPrefix = 'field',
  placeholder = field.placeholder,
}: {
  field: FormFieldDefinition;
  variant?: FormFieldVariant;
  idPrefix?: string;
  placeholder?: string;
}) {
  const id = `${idPrefix}-${field.name}`;
  const visibleLabel = variant === 'stacked' && !placeholder;

  // Hidden fields are drawn by the renderer itself — it is the only place that
  // knows the page context their value is filled from.
  if (field.type === 'hidden') return null;

  if (field.type === 'checkbox') {
    return (
      <div className='grid gap-2'>
        {(field.checkboxOptions ?? []).map((option, index) => (
          <div key={option} className='flex items-start gap-3'>
            <input
              type='checkbox'
              id={`${id}-${index}`}
              name={field.name}
              value={option}
              required={field.isRequired ?? undefined}
              className='mt-[3px] size-[18px] shrink-0 cursor-pointer accent-blue'
            />
            <label htmlFor={`${id}-${index}`} className='cursor-pointer text-[13.5px] leading-[1.6] text-muted'>
              {linkify(option)}
            </label>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={
          visibleLabel
            ? '-mb-1 block font-display text-[12.5px] font-semibold text-ink-soft'
            : 'sr-only'
        }
      >
        {field.label}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          required={field.isRequired ?? undefined}
          placeholder={placeholder ?? undefined}
          className={cn(controlClass, 'resize-y', variant === 'stacked' ? 'min-h-[110px]' : 'min-h-[92px]')}
        />
      ) : field.type === 'select' ? (
        <select
          id={id}
          name={field.name}
          required={field.isRequired ?? undefined}
          // With a placeholder the empty option is the initial value, so a
          // required dropdown actually blocks submitting; without one the
          // browser preselects the first real option.
          defaultValue={placeholder ? '' : undefined}
          className={controlClass}
        >
          {placeholder ? <option value=''>{placeholder}</option> : null}
          {(field.selectOptions ?? []).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : field.type === 'radio' ? (
        <div className='flex flex-wrap gap-x-6 gap-y-2.5'>
          {(field.radioOptions ?? []).map((option) => (
            <label key={option} className='flex cursor-pointer items-center gap-2.5 text-[14.5px] text-ink-soft'>
              <input
                type='radio'
                name={field.name}
                value={option}
                required={field.isRequired ?? undefined}
                className='size-[18px] cursor-pointer accent-blue'
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          id={id}
          name={field.name}
          required={field.isRequired ?? undefined}
          placeholder={placeholder ?? undefined}
          className={controlClass}
        />
      )}

      {field.helpText ? <p className='mt-2 text-[12.5px] text-muted'>{linkify(field.helpText)}</p> : null}
    </div>
  );
}
