/**
 * Runs the Google reviews sync every hour by calling the site's own
 * `/api/google-reviews` route, which does the work (see
 * `src/lib/google-reviews.ts`). Switch it off without a deploy with the
 * "Elk uur automatisch ophalen" toggle on the Google-koppeling page.
 *
 * Needs GOOGLE_REVIEWS_SYNC_SECRET in the Netlify environment (same value the
 * route checks). Scheduled functions only run on the published production deploy.
 */
const syncGoogleReviews = async () => {
  const origin = process.env.URL;
  const secret = process.env.GOOGLE_REVIEWS_SYNC_SECRET;
  if (!origin || !secret) {
    console.error('google-reviews-sync: URL or GOOGLE_REVIEWS_SYNC_SECRET is not set');
    return;
  }

  const response = await fetch(`${origin}/api/google-reviews?trigger=schedule`, {
    method: 'POST',
    headers: { 'x-sync-secret': secret, 'user-agent': 'netlify-google-reviews-sync' },
  });
  const body = await response.text();
  console.log(`google-reviews-sync ${response.status}: ${body.slice(0, 500)}`);
};

export default syncGoogleReviews;

export const config = { schedule: '@hourly' };
