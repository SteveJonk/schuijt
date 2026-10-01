/** "Jan de Vries" -> "JV", "Marieke" -> "M". For the avatar circle on a review. */
export function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '?';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/** Line under the reviewer's name: "Heemskerk · Tuinaanleg", or else the month it was written. */
export function reviewMeta(review: { location?: string | null; service?: string | null; publishedAt?: string | null }) {
  const place = [review.location, review.service].filter(Boolean).join(' · ');
  if (place || !review.publishedAt) return place;
  return new Date(review.publishedAt).toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
}
