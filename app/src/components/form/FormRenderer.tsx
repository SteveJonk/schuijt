'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { buttonClass } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { fillTokens, toFieldRows, toSteps, type FormDefinition } from '@/lib/form-fields';
import { FormField, type FormFieldVariant } from './fields';

/** Public half of the reCAPTCHA settings — the secret stays server-side. */
export type FormRecaptcha = {
  enabled: boolean;
  siteKey: string;
};

/** Interface texts from "Vaste teksten" in the studio. */
export type FormLabels = {
  sending?: string | null;
  error?: string | null;
  recaptchaMissing?: string | null;
  /** "Stap {n} van {totaal}" */
  step?: string | null;
  note?: string | null;
};

export type FormRendererProps = {
  form: FormDefinition;
  labels: FormLabels;
  /** Intro under the title (contact page). */
  lead?: string | null;
  recaptcha?: FormRecaptcha;
  variant?: FormFieldVariant;
  /** Replaces the placeholder of the form's text areas on this page. */
  messagePlaceholder?: string | null;
  /**
   * Values the page knows and the visitor does not type. Hidden fields pick
   * them up by `{{token}}`; `{{path}}` is always available.
   */
  context?: Record<string, string>;
};

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function IconArrowRight() {
  return (
    <svg width='15' height='15' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
      <path d='M2 7h10M8.2 3.2 12 7l-3.8 3.8' stroke='currentColor' strokeWidth='1.4' />
    </svg>
  );
}

/**
 * Renders any form from the studio's form creator — one page of fields or
 * several steps — and posts it to /api/submit-form in one request. A form with
 * a redirect sends the visitor to that page afterwards instead of showing its
 * confirmation.
 *
 * Every step stays mounted (hidden steps keep their values in the FormData),
 * which is why the form carries `noValidate`: validation runs per step with
 * the browser's own messages.
 */
export function FormRenderer({
  form,
  labels,
  lead,
  recaptcha,
  variant = 'compact',
  messagePlaceholder,
  context,
}: FormRendererProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const stacked = variant === 'stacked';
  const steps = toSteps(form);
  const total = steps.length;
  const isLastStep = step >= total - 1;
  const usesRecaptcha = Boolean(recaptcha?.enabled && recaptcha.siteKey);
  const tokens = { path: pathname, ...context };

  function controlsOf(index: number): Control[] {
    const container = stepRefs.current[index];
    if (!container) return [];
    return Array.from(container.querySelectorAll<Control>('input, select, textarea'));
  }

  const stepIsValid = (index: number) => controlsOf(index).every((control) => control.checkValidity());

  function reportStep(index: number) {
    const invalid = controlsOf(index).find((control) => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    return false;
  }

  function goNext(event: MouseEvent<HTMLButtonElement>) {
    // This button becomes the submit button on the last step; without this the
    // click that reveals the last step would also submit it.
    event.preventDefault();
    if (reportStep(step)) setStep((current) => Math.min(current + 1, total - 1));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstInvalid = steps.findIndex((_, index) => !stepIsValid(index));
    if (firstInvalid !== -1) {
      if (firstInvalid !== step) flushSync(() => setStep(firstInvalid));
      reportStep(firstInvalid);
      return;
    }

    const body = new FormData(event.currentTarget);
    body.set('formId', form.id);

    if (usesRecaptcha) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setError(labels.recaptchaMissing ?? null);
        return;
      }
      body.set('recaptchaToken', token);
    }

    setStatus('sending');
    setError(null);
    try {
      const response = await fetch('/api/submit-form', { method: 'POST', body });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message);
      if (form.redirect) {
        // Stay on 'sending' so the button keeps its disabled state until the
        // new page takes over — a second submit would mail the same answers.
        if (form.redirect.internal) router.push(form.redirect.href);
        else window.location.assign(form.redirect.href);
        return;
      }
      setStatus('done');
    } catch (submitError) {
      // A token is single-use: clear it so a retry gets a fresh one.
      recaptchaRef.current?.reset();
      setStatus('idle');
      // The server's reason is for the logs; the visitor gets the studio's message.
      console.error(submitError);
      setError(labels.error ?? null);
    }
  }

  if (status === 'done') {
    return (
      <div className='py-6 text-center'>
        {form.successTitle ? <h3 className='text-[22px]'>{form.successTitle}</h3> : null}
        {form.successBody ? <p className='mt-2 text-[14.5px] text-muted'>{form.successBody}</p> : null}
      </div>
    );
  }

  const Title = stacked ? 'h2' : 'h3';

  return (
    <form onSubmit={onSubmit} noValidate>
      {form.showTitle && form.title ? (
        <Title className={stacked ? 'text-[22px]' : 'text-[20px]'}>{form.title}</Title>
      ) : null}
      {lead ? <p className='mt-2 text-[14.5px] text-muted'>{lead}</p> : null}

      {total > 1 ? (
        <div className='mt-5 flex items-center gap-3.5'>
          <div className='h-1 flex-1 overflow-hidden rounded-full bg-line'>
            <span
              className='block h-full rounded-full bg-blue transition-[width] duration-450 ease-brand'
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
          <span className='font-display text-[12.5px] font-semibold whitespace-nowrap text-muted'>
            {(labels.step ?? '').replace('{n}', String(step + 1)).replace('{totaal}', String(total))}
          </span>
        </div>
      ) : null}

      {steps.map((formStep, index) => (
        <div
          key={index}
          ref={(el) => {
            stepRefs.current[index] = el;
          }}
          hidden={index !== step}
          className={cn('grid gap-3.5', stacked ? 'mt-[22px]' : 'mt-5')}
        >
          {formStep.title ? <h3 className='text-[17px]'>{formStep.title}</h3> : null}

          {formStep.fields
            .filter((field) => field.type === 'hidden')
            .map((field) => (
              <input
                key={field.name}
                type='hidden'
                name={field.name}
                value={fillTokens(field.defaultValue ?? '', tokens)}
              />
            ))}

          {toFieldRows(formStep.fields).map((row) => {
            const key = row.map((field) => field.name).join('-');
            const placeholderFor = (type: string, own?: string) =>
              type === 'textarea' && messagePlaceholder ? messagePlaceholder : own;
            return row.length === 2 ? (
              <div
                key={key}
                className={cn('grid grid-cols-2 gap-3.5', stacked ? 'max-xs:grid-cols-1' : 'max-lg:grid-cols-1')}
              >
                {row.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    variant={variant}
                    idPrefix={form.id}
                    placeholder={placeholderFor(field.type, field.placeholder)}
                  />
                ))}
              </div>
            ) : (
              <FormField
                key={key}
                field={row[0]}
                variant={variant}
                idPrefix={form.id}
                placeholder={placeholderFor(row[0].type, row[0].placeholder)}
              />
            );
          })}
        </div>
      ))}

      {usesRecaptcha && isLastStep ? (
        <div className='mt-4'>
          <ReCAPTCHA ref={recaptchaRef} sitekey={recaptcha!.siteKey} />
        </div>
      ) : null}

      {error ? (
        <p role='alert' className='mt-4 text-[14px] text-danger'>
          {error}
        </p>
      ) : null}

      {isLastStep ? (
        <button
          type='submit'
          disabled={status === 'sending'}
          className={buttonClass(
            'primary',
            'md',
            cn(
              'w-full cursor-pointer justify-center disabled:pointer-events-none disabled:opacity-60',
              stacked ? 'mt-5' : 'mt-[18px]',
            ),
          )}
        >
          {status === 'sending' ? labels.sending : form.submitButtonText}
        </button>
      ) : (
        <button
          type='button'
          onClick={goNext}
          className={buttonClass('primary', 'md', cn('w-full cursor-pointer justify-center', stacked ? 'mt-5' : 'mt-[18px]'))}
        >
          {form.nextButtonText}
          <IconArrowRight />
        </button>
      )}

      {step > 0 ? (
        <button
          type='button'
          onClick={() => setStep((current) => Math.max(current - 1, 0))}
          className='mt-3.5 flex w-full cursor-pointer items-center justify-center gap-1.5 text-[13.5px] font-medium text-muted transition-colors duration-250 hover:text-ink'
        >
          ← {form.backButtonText}
        </button>
      ) : null}

      {labels.note ? <div className='mt-3.5 text-center text-[12.5px] text-muted'>{labels.note}</div> : null}
    </form>
  );
}
