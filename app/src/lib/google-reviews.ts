import { createClient, type SanityClient } from 'next-sanity';
import { env } from '@/lib/env';
import { initials } from '@/lib/reviews';

/**
 * Pulls the business's rating and reviews from the Google Places API (New)
 * and mirrors them into Sanity as `review` documents. Called by
 * `/api/google-reviews` — from the hourly Netlify job and from the buttons on
 * the "Google-koppeling" page in the studio.
 *
 * Limits of the Places API, which works without being a manager of the Google
 * Business Profile: it returns the overall score and count over ALL reviews,
 * but at most 5 review texts. Reviews are therefore never deleted here — every
 * run adds what is new, so the collection grows over time. Hiding one is done
 * in the studio ("Verborgen op de website"), which the sync leaves alone.
 */

const CONFIG_ID = 'googleReviews';
const FIELD_MASK = 'id,displayName,rating,userRatingCount,googleMapsUri,reviews';

type Trigger = 'schedule' | 'studio' | 'manual';

type GooglePlace = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    name: string;
    rating?: number;
    text?: { text?: string; languageCode?: string };
    originalText?: { text?: string; languageCode?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
    publishTime?: string;
    googleMapsUri?: string;
  }[];
};

type Config = {
  placeId?: string;
  languageCode?: string;
  enabled?: boolean;
  placeName?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
};

/** The fields the sync owns on a review; editors own the rest. */
type ReviewFields = {
  name: string;
  rating: number;
  text: string;
  publishedAt: string | null;
  google: {
    reviewId: string;
    authorUrl: string | null;
    authorPhotoUrl: string | null;
    reviewUrl: string | null;
    language: string | null;
  };
};

export type ReviewAction = 'create' | 'update' | 'unchanged';

export type SyncResult = {
  ok: boolean;
  dryRun: boolean;
  trigger: Trigger;
  message?: string;
  place?: { name: string | null; rating: number | null; userRatingCount: number | null; googleMapsUri: string | null };
  reviews?: { id: string; author: string; rating: number; publishedAt: string | null; text: string; action: ReviewAction }[];
  created?: number;
  updated?: number;
  unchanged?: number;
  skipped?: number;
  changed?: boolean;
};

export class SyncError extends Error {
  constructor(
    message: string,
    readonly status = 500,
  ) {
    super(message);
  }
}

function writeClient(): SanityClient {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) throw new SyncError('SANITY_API_WRITE_TOKEN is not set.');
  return createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token,
    useCdn: false,
    // Drafts too: a draft open in the studio gets the same patch, or
    // publishing it later would put the old values back.
    perspective: 'raw',
  });
}

/** "places/ChIJ…/reviews/ChZDSUhN…" -> a valid, stable Sanity document id. */
function documentId(reviewName: string) {
  const reviewId = reviewName.split('/reviews/').pop() ?? reviewName;
  return `googleReview-${reviewId.replace(/[^a-zA-Z0-9_-]/g, '_')}`.slice(0, 128);
}

async function fetchPlace(placeId: string, languageCode: string): Promise<GooglePlace> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new SyncError('GOOGLE_PLACES_API_KEY is not set.');

  const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`);
  url.searchParams.set('languageCode', languageCode);
  const response = await fetch(url, {
    headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': FIELD_MASK },
    cache: 'no-store',
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new SyncError(`Google Places API ${response.status}: ${body?.error?.message ?? response.statusText}`, 502);
  }
  return (await response.json()) as GooglePlace;
}

/** Google's review -> our fields. Null for a rating without text: nothing to show. */
function toFields(review: NonNullable<GooglePlace['reviews']>[number]): ReviewFields | null {
  // The original text, not Google's machine translation of it.
  const text = (review.originalText?.text ?? review.text?.text ?? '').trim();
  if (!text || !review.rating) return null;
  return {
    name: review.authorAttribution?.displayName?.trim() || 'Google-gebruiker',
    rating: review.rating,
    text,
    publishedAt: review.publishTime ?? null,
    google: {
      reviewId: review.name,
      authorUrl: review.authorAttribution?.uri ?? null,
      authorPhotoUrl: review.authorAttribution?.photoUri ?? null,
      reviewUrl: review.googleMapsUri ?? null,
      language: review.originalText?.languageCode ?? review.text?.languageCode ?? null,
    },
  };
}

function differs(existing: Record<string, unknown>, fields: ReviewFields) {
  const google = (existing.google ?? {}) as Record<string, unknown>;
  return (
    existing.name !== fields.name ||
    existing.rating !== fields.rating ||
    existing.text !== fields.text ||
    existing.publishedAt !== fields.publishedAt ||
    Object.entries(fields.google).some(([key, value]) => (google[key] ?? null) !== value)
  );
}

export async function syncGoogleReviews({ dryRun, trigger }: { dryRun: boolean; trigger: Trigger }): Promise<SyncResult> {
  const client = writeClient();
  const config = await client.fetch<Config | null>(`*[_id == $id][0]`, { id: CONFIG_ID });

  if (!config?.placeId) {
    throw new SyncError('Geen Google Place ID ingevuld (en gepubliceerd) op de pagina "Google-koppeling".', 400);
  }
  if (trigger === 'schedule' && config.enabled === false) {
    return { ok: true, dryRun, trigger, message: 'Automatisch ophalen staat uit.' };
  }

  const now = new Date().toISOString();
  try {
    const place = await fetchPlace(config.placeId, config.languageCode || 'nl');
    const incoming = (place.reviews ?? []).map((review) => ({ id: documentId(review.name), fields: toFields(review) }));
    const reviews = incoming.flatMap(({ id, fields }) => (fields ? [{ id, fields }] : []));

    const ids = reviews.flatMap(({ id }) => [id, `drafts.${id}`]);
    const existing = await client.fetch<Record<string, unknown>[]>(`*[_id in $ids]`, { ids });
    const byId = new Map(existing.map((doc) => [doc._id as string, doc]));

    const transaction = client.transaction();
    const results: NonNullable<SyncResult['reviews']> = [];
    for (const { id, fields } of reviews) {
      const published = byId.get(id);
      const draft = byId.get(`drafts.${id}`);
      const action: ReviewAction = !published && !draft ? 'create' : differs(draft ?? published!, fields) ? 'update' : 'unchanged';
      results.push({ id, author: fields.name, rating: fields.rating, publishedAt: fields.publishedAt, text: fields.text, action });

      if (action === 'unchanged') continue;
      const patch = { ...fields, google: { ...fields.google, syncedAt: now } };
      if (action === 'create') {
        transaction.create({ _id: id, _type: 'review', source: 'google', hidden: false, initials: initials(fields.name), ...patch });
        continue;
      }
      if (published) transaction.patch(id, (p) => p.set(patch));
      if (draft) transaction.patch(`drafts.${id}`, (p) => p.set(patch));
    }

    const aggregate = {
      placeName: place.displayName?.text ?? null,
      rating: place.rating ?? null,
      userRatingCount: place.userRatingCount ?? null,
      googleMapsUri: place.googleMapsUri ?? null,
    };
    const aggregateChanged = (Object.keys(aggregate) as (keyof typeof aggregate)[]).some(
      (key) => (config[key] ?? null) !== aggregate[key],
    );

    const created = results.filter((r) => r.action === 'create').length;
    const updated = results.filter((r) => r.action === 'update').length;
    const result: SyncResult = {
      ok: true,
      dryRun,
      trigger,
      place: { name: aggregate.placeName, rating: aggregate.rating, userRatingCount: aggregate.userRatingCount, googleMapsUri: aggregate.googleMapsUri },
      reviews: results,
      created,
      updated,
      unchanged: results.length - created - updated,
      skipped: incoming.length - reviews.length,
      changed: created + updated > 0 || aggregateChanged,
    };

    if (!dryRun) {
      if (created + updated > 0) await transaction.commit({ visibility: 'async' });
      await patchConfig(client, { ...aggregate, lastSync: { at: now, trigger, ok: true, message: null, created, updated } });
    }
    return result;
  } catch (error) {
    // Leave a trace in the studio; a dry run writes nothing, not even this.
    if (!dryRun) {
      const message = error instanceof Error ? error.message : String(error);
      await patchConfig(client, { lastSync: { at: now, trigger, ok: false, message, created: 0, updated: 0 } }).catch(() => {});
    }
    throw error;
  }
}

/** Patches the published settings and, if it is open, the draft. */
async function patchConfig(client: SanityClient, values: Record<string, unknown>) {
  const draftId = `drafts.${CONFIG_ID}`;
  const hasDraft = await client.fetch<boolean>(`defined(*[_id == $id][0]._id)`, { id: draftId });
  const transaction = client.transaction().patch(CONFIG_ID, (p) => p.set(values));
  if (hasDraft) transaction.patch(draftId, (p) => p.set(values));
  await transaction.commit({ visibility: 'async' });
}
