import { NextResponse } from 'next/server';
import { renderFormMail } from '@/lib/form-mail';
import { OFFERTE_FIELDS, OFFERTE_FORM_ID } from '@/lib/forms';
import { SITE_DEFAULTS, SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';

/** Google's siteverify. Returns false on any doubt — this gate fails closed. */
async function verifyRecaptcha(token: string, secret: string) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error('submit-form: reCAPTCHA verification failed', error);
    return false;
  }
}

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

/**
 * Sends via Mailjet's HTTP API (v3.1). Throws on a non-2xx response.
 *
 * This is the only provider-specific function in the route: swapping Mailjet
 * for Postmark, Resend or SMTP means rewriting this one and nothing else.
 */
async function sendViaMailjet(
  { apiKey, apiSecret }: { apiKey: string; apiSecret: string },
  message: {
    fromEmail: string;
    fromName: string;
    to: string[];
    replyTo?: string;
    subject: string;
    html: string;
    text: string;
  },
) {
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Messages: [
        {
          From: { Email: message.fromEmail, Name: message.fromName },
          To: message.to.map((email) => ({ Email: email })),
          ...(message.replyTo ? { ReplyTo: { Email: message.replyTo } } : {}),
          Subject: message.subject,
          HTMLPart: message.html,
          TextPart: message.text,
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Mailjet responded ${response.status}: ${body}`);
  }
}

export async function POST(request: Request) {
  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return fail('Het verzoek kon niet worden gelezen.', 400);
  }

  const formId = String(body.get('formId') ?? '');
  if (formId !== OFFERTE_FORM_ID) return fail('Unknown form.', 404);

  // Spam gate before any real work. Only on when the secret is configured.
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret) {
    const token = String(body.get('recaptchaToken') ?? '');
    if (!token || !(await verifyRecaptcha(token, recaptchaSecret))) {
      return fail('De reCAPTCHA-controle is mislukt. Probeer het opnieuw.', 400);
    }
  }

  const answers: { label: string; value: string }[] = [];
  /** First answer to an e-mail field — the reply-to address. */
  let submitterEmail = '';

  for (const field of OFFERTE_FIELDS) {
    const values = body.getAll(field.name);
    const label = field.label;

    const text = values
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim())
      .filter(Boolean)
      .join(', ');

    if (!text) {
      if (field.isRequired) return fail(`"${label}" is verplicht.`, 400);
      continue;
    }
    if (field.type === 'email' && !submitterEmail) submitterEmail = text;
    answers.push({ label, value: text });
  }

  if (answers.length === 0) return fail('Het formulier was leeg.', 400);

  const mailjetApiKey = process.env.MAILJET_API_KEY;
  const mailjetApiSecret = process.env.MAILJET_API_SECRET;
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL;
  // Mailjet only accepts a sender it has validated; fall back to the recipient,
  // which is the one address known to belong to this account.
  const fromEmail = process.env.MAILJET_FROM_EMAIL || adminEmail;
  const fromName = SITE_DEFAULTS.name;

  if (!adminEmail || !fromEmail || !mailjetApiKey || !mailjetApiSecret) {
    console.error('submit-form: missing mail settings (MAILJET_* / CONTACT_ADMIN_EMAIL)');
    return fail('Het formulier is nog niet ingesteld. Neem direct contact met ons op.', 500);
  }

  const branding = {
    logoUrl: `${SITE_URL}/images/logo.png`,
    logoAlt: fromName,
    primaryColor: '#069fdf',
    textColor: '#16202b',
    footer: `Verstuurd via het offerteformulier op de website van ${fromName}.`,
  };

  const subject = 'Nieuwe offerteaanvraag via de website';
  const mail = renderFormMail({
    title: subject,
    intro: 'Er is een nieuwe offerteaanvraag binnengekomen via de website.',
    answers,
    branding,
  });

  const credentials = { apiKey: mailjetApiKey, apiSecret: mailjetApiSecret };

  try {
    await sendViaMailjet(credentials, {
      fromEmail,
      fromName,
      to: [adminEmail],
      replyTo: submitterEmail || undefined,
      subject,
      html: mail.html,
      text: mail.text,
    });
  } catch (error) {
    console.error('submit-form: sending failed', error);
    return fail('Versturen is mislukt. Probeer het later opnieuw.', 502);
  }

  return NextResponse.json({ success: true });
}
