import { cn } from '@/lib/cn';
import { toFormDefinition } from '@/lib/form-fields';
import { getLayout } from '@/sanity/fetch';
import type { FormData } from '@/sanity/types';
import type { FormFieldVariant } from './fields';
import { FormRenderer } from './FormRenderer';

type FormCardProps = {
  form: FormData | null | undefined;
  variant?: FormFieldVariant;
  lead?: string | null;
  messagePlaceholder?: string | null;
  /** For hidden fields: `{{service}}` on service pages. */
  context?: Record<string, string>;
};

/** A form from the studio in the white card of the design. */
export async function FormCard({ form, variant = 'compact', lead, messagePlaceholder, context }: FormCardProps) {
  const definition = toFormDefinition(form);
  if (!definition) return null;
  const { ui, recaptcha } = await getLayout();

  return (
    <div
      className={cn(
        'rounded-card-lg bg-white shadow-lift',
        variant === 'stacked' ? 'border border-line px-8 py-[34px]' : 'px-[30px] py-8',
      )}
    >
      <FormRenderer
        form={definition}
        variant={variant}
        lead={lead}
        messagePlaceholder={messagePlaceholder}
        context={context}
        recaptcha={
          recaptcha?.recaptchaEnabled && recaptcha.recaptchaSiteKey
            ? { enabled: true, siteKey: recaptcha.recaptchaSiteKey }
            : undefined
        }
        labels={{
          sending: ui.formSending,
          error: ui.formError,
          recaptchaMissing: ui.formRecaptchaMissing,
          step: ui.formStep,
          note: ui.formNote,
        }}
      />
    </div>
  );
}
