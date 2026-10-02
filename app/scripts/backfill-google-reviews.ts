/**
 * One-off: imports ALL Google reviews (the hourly sync only sees the newest 5).
 * Uses SerpApi (free tier is plenty) and only creates missing reviews.
 *
 *   npm run reviews:backfill:dry   list what would be created, change nothing
 *   npm run reviews:backfill       create them
 *
 * Needs in app/.env: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_WRITE_TOKEN,
 * GOOGLE_PLACES_API_KEY and SERPAPI_API_KEY (https://serpapi.com/manage-api-key).
 */
import { syncGoogleReviews } from '../src/lib/google-reviews';

const dryRun = process.argv.includes('--dry');

async function main() {
  const result = await syncGoogleReviews({ dryRun, trigger: 'manual', all: true });
  for (const r of result.reviews ?? []) console.log(`${r.action.padEnd(9)} ${r.rating}★ ${r.publishedAt?.slice(0, 10) ?? '?'} ${r.author}`);
  console.log(`${dryRun ? '[dry run] ' : ''}created ${result.created}, already there ${result.unchanged}, skipped (no text) ${result.skipped}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
