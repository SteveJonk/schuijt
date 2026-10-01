/**
 * Deletes every review that did not come from Google — the old mock reviews
 * and anything entered by hand — including their drafts.
 *
 *   npm run reviews:delete-manual:dry   list what would be deleted, change nothing
 *   npm run reviews:delete-manual       delete
 *
 * A review that another document still references (a pick on the home page)
 * is skipped, because Sanity refuses to delete it; remove the reference in the
 * studio first and run again.
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (Editor) in
 * app/.env, also for the dry run: drafts are only visible with a token.
 */
import { createClient } from '@sanity/client';

const DRY = process.argv.includes('--dry');

type Review = { _id: string; name: string | null; referencedBy: string[] };

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in app/.env');
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-26',
    token,
    useCdn: false,
    perspective: 'raw',
  });

  // Published and draft copies alike; references always point at the published id.
  const reviews = await client.fetch<Review[]>(
    `*[_type == "review" && source != "google"]{
      _id,
      name,
      "referencedBy": *[references(string::split(^._id, "drafts.")[-1]) && _type != "review"]._id
    } | order(_id asc)`,
  );

  const deletable = reviews.filter((review) => review.referencedBy.length === 0);
  const blocked = reviews.filter((review) => review.referencedBy.length > 0);

  if (!reviews.length) {
    console.log('No manual reviews found. Nothing to do.');
    return;
  }

  for (const review of deletable) console.log(`${DRY ? 'would delete' : 'delete'}  ${review._id}  ${review.name ?? ''}`);
  for (const review of blocked) {
    console.log(`skip          ${review._id}  ${review.name ?? ''}  (referenced by ${review.referencedBy.join(', ')})`);
  }

  if (DRY) {
    console.log(`\nDry run: ${deletable.length} would be deleted, ${blocked.length} skipped. Nothing changed.`);
    return;
  }
  if (deletable.length) {
    const transaction = client.transaction();
    deletable.forEach((review) => transaction.delete(review._id));
    await transaction.commit();
  }
  console.log(`\nDeleted ${deletable.length}, skipped ${blocked.length}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
