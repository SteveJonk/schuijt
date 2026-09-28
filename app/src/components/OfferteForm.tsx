'use client';

import { usePathname } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { buttonClass } from '@/components/ui/Button';
import { IconStar } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import { OFFERTE_FORM_ID, SERVICE_OPTIONS } from '@/lib/forms';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const control = cn(
  'w-full rounded-xl border-[1.5px] border-line bg-[#fbfdfe] px-[15px] py-[13px] font-sans text-[14.5px] leading-[normal]',
  'transition-[border-color,box-shadow] duration-250 focus:border-blue focus:shadow-[0_0_0_4px_rgb(6_159_223/0.13)] focus:outline-none',
);

/** `cta` is the short card in every page's contact band; `contact` the full one on /contact. */
type Variant = 'cta' | 'contact';

const REQUESTER_OPTIONS: Record<Variant, { value: string; label: string }[]> = {
  cta: [
    { value: 'particulier', label: 'Ik ben particulier' },
    { value: 'vve', label: 'Ik vraag aan namens een VvE of beheerder' },
    { value: 'bedrijf', label: 'Ik vraag aan namens een bedrijf' },
  ],
  contact: [
    { value: 'particulier', label: 'Particulier' },
    { value: 'vve', label: 'VvE of vastgoedbeheerder' },
    { value: 'bedrijf', label: 'Bedrijf of instelling' },
  ],
};

function Input({ name, placeholder, type = 'text', required }: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      aria-label={placeholder}
      required={required}
      className={control}
    />
  );
}

function Extra({ hint, children }: { hint: string; children: React.ReactNode }) {
  return (
    <div className='mt-0.5 grid gap-3.5 rounded-[14px] border border-dashed border-[#cfe6f3] bg-tint-2 px-4 pt-4 pb-1'>
      <div className='flex items-center gap-[7px] font-display text-[12.5px] font-semibold text-blue-deep'>
        <IconStar size={13} strokeWidth={3} className='text-blue' />
        {hint}
      </div>
      {children}
    </div>
  );
}

export function OfferteForm({ variant = 'cta' }: { variant?: Variant }) {
  const pathname = usePathname();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [requester, setRequester] = useState('particulier');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const isContact = variant === 'contact';

  const requesterSelect = (
    <div>
      {isContact ? (
        <label
          htmlFor='requesterType'
          className='-mb-1 block font-display text-[12.5px] font-semibold text-ink-soft'
        >
          Ik ben
        </label>
      ) : null}
      <select
        id='requesterType'
        name='requesterType'
        aria-label={isContact ? undefined : 'Ik ben'}
        value={requester}
        onChange={(event) => setRequester(event.target.value)}
        className={control}
      >
        {REQUESTER_OPTIONS[variant].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = new FormData(event.currentTarget);
    body.set('formId', OFFERTE_FORM_ID);
    body.set('page', pathname);

    if (RECAPTCHA_SITE_KEY) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setError('Bevestig dat u geen robot bent.');
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
      setStatus('done');
    } catch (submitError) {
      // A token is single-use: clear it so a retry gets a fresh one.
      recaptchaRef.current?.reset();
      setStatus('idle');
      setError(
        (submitError instanceof Error && submitError.message) ||
          'Versturen is mislukt. Probeer het later opnieuw.',
      );
    }
  }

  return (
    <div
      className={cn(
        'rounded-card-lg bg-white shadow-lift',
        isContact ? 'border border-line px-8 py-[34px]' : 'px-[30px] py-8',
      )}
    >
      {status === 'done' ? (
        <div className='py-6 text-center'>
          <h3 className='text-[22px]'>Bedankt voor uw aanvraag</h3>
          <p className='mt-2 text-[14.5px] text-muted'>
            We reageren doorgaans binnen één werkdag.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {isContact ? (
            <>
              <h2 className='text-[22px]'>Offerte aanvragen</h2>
              <p className='mt-2 text-[14.5px] text-muted'>
                Vul het formulier in, we reageren doorgaans binnen één werkdag.
              </p>
            </>
          ) : (
            <h3 className='text-[20px]'>Offerte aanvragen</h3>
          )}

          <div className={cn('grid gap-3.5', isContact ? 'mt-[22px]' : 'mt-5')}>
            {isContact ? requesterSelect : null}

            <div
              className={cn(
                'grid grid-cols-2 gap-3.5',
                isContact ? 'max-xs:grid-cols-1' : 'max-lg:grid-cols-1',
              )}
            >
              <Input name='name' placeholder='Naam' required />
              <Input name='phone' type='tel' placeholder='Telefoonnummer' />
            </div>
            <Input name='email' type='email' placeholder='E-mailadres' required />
            {isContact ? null : requesterSelect}

            {isContact && requester === 'vve' ? (
              <Extra hint='Aanvullend voor VvE / beheerder'>
                <Input name='vveName' placeholder='Naam van de VvE of het complex' />
                <Input name='surface' placeholder='Geschatte oppervlakte (indien bekend)' />
              </Extra>
            ) : null}
            {isContact && requester === 'bedrijf' ? (
              <Extra hint='Aanvullend voor bedrijf / instelling'>
                <Input name='company' placeholder='Bedrijfsnaam' />
                <Input name='location' placeholder='Locatie van het project' />
              </Extra>
            ) : null}

            <select name='service' aria-label='Waar gaat het om?' defaultValue='' className={control}>
              <option value=''>Waar gaat het om?</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <textarea
              name='message'
              placeholder={
                isContact
                  ? 'Vertel kort over uw situatie of project'
                  : 'Korte omschrijving van het werk'
              }
              aria-label='Omschrijving'
              className={cn(control, 'resize-y', isContact ? 'min-h-[110px]' : 'min-h-[92px]')}
            />
          </div>

          {RECAPTCHA_SITE_KEY ? (
            <div className='mt-4'>
              <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />
            </div>
          ) : null}

          {error ? (
            <p role='alert' className='mt-4 text-[14px] text-danger'>
              {error}
            </p>
          ) : null}

          <button
            type='submit'
            disabled={status === 'sending'}
            className={buttonClass(
              'primary',
              'md',
              cn(
                'w-full cursor-pointer justify-center disabled:pointer-events-none disabled:opacity-60',
                isContact ? 'mt-5' : 'mt-[18px]',
              ),
            )}
          >
            {status === 'sending' ? 'Versturen…' : 'Verstuur aanvraag'}
          </button>
          <div className='mt-3.5 text-center text-[12.5px] text-muted'>
            We reageren doorgaans binnen één werkdag.
          </div>
        </form>
      )}
    </div>
  );
}
