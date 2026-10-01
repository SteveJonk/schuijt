import { createHash, timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { SyncError, syncGoogleReviews } from '@/lib/google-reviews';
import { SANITY_TAG } from '@/sanity/fetch';

export const runtime = 'nodejs';

/**
 * Syncs the Google reviews into Sanity — see `src/lib/google-reviews.ts`.
 *
 *   POST /api/google-reviews[?dryRun=1][&trigger=schedule|studio]
 *   x-sync-secret: <GOOGLE_REVIEWS_SYNC_SECRET>   (or Authorization: Bearer …)
 *
 * `dryRun=1` fetches from Google and reports what would change, but writes
 * nothing. Callers: the hourly Netlify job (`netlify/functions/
 * google-reviews-sync.mts`) and the buttons in the studio. The studio runs on
 * another origin, hence the CORS headers; the secret is what guards the route,
 * and without it set the route refuses everything.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'x-sync-secret, authorization, content-type',
  'Access-Control-Max-Age': '86400',
};

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: CORS });
}

/** Constant-time compare; hashing first evens out the lengths. */
function matches(given: string, expected: string) {
  const hash = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(hash(given), hash(expected));
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(request: NextRequest) {
  const secret = process.env.GOOGLE_REVIEWS_SYNC_SECRET;
  if (!secret) return reply({ ok: false, message: 'GOOGLE_REVIEWS_SYNC_SECRET is not set.' }, 500);

  const given =
    request.headers.get('x-sync-secret') ?? request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? '';
  if (!given || !matches(given, secret)) return reply({ ok: false, message: 'Ongeldig sync-geheim.' }, 401);

  const params = request.nextUrl.searchParams;
  const dryRun = ['1', 'true'].includes(params.get('dryRun') ?? '');
  const trigger = params.get('trigger');

  try {
    const result = await syncGoogleReviews({
      dryRun,
      trigger: trigger === 'schedule' || trigger === 'studio' ? trigger : 'manual',
    });
    // The Sanity webhook would get there too; this way it does not depend on it.
    if (!dryRun && result.changed) revalidateTag(SANITY_TAG, 'max');
    return reply(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`google-reviews sync failed: ${message}`);
    return reply({ ok: false, dryRun, message }, error instanceof SyncError ? error.status : 500);
  }
}
