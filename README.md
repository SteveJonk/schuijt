# L. Schuijt Klussenbedrijf — website

Next.js 16 (App Router, React 19, Tailwind v4) in `app/`, Sanity studio in `studio/`.
Every word and image on the site comes from Sanity; the code holds layout,
routing and form handling only.

## Setup

```bash
# Studio
cd studio
cp .env.example .env     # SANITY_STUDIO_PROJECT_ID
npm install
npm run dev              # http://localhost:3333

# App
cd ../app
cp .env.example .env     # same project id + SANITY_API_WRITE_TOKEN (Editor) for seeding
npm install
npm run seed             # uploads the images and creates every document
npm run dev              # http://localhost:3000
```

`npm run seed` only creates documents that do not exist yet, so it never
overwrites edits made in the studio. `npm run seed -- --force` resets every
seeded document to the original content. Form settings are never overwritten:
they may hold mail credentials.

## URLs

The URLs match the old WordPress site (with trailing slash):

| URL | Document in the studio |
|---|---|
| `/` | Pagina's → Algemeen → Home |
| `/<slug>/` | Dienstpagina (Diensten or Lokale pagina's), Project, or Tekstpagina |
| `/zakelijk/`, `/zakelijk/<slug>/` | Zakelijk (hub) and Dienstpagina's of soort "Zakelijk" |
| `/projecten/`, `/zakelijk/projecten/`, `/reviews/`, `/blog/`, `/contact/` | The matching page under Algemeen |
| `/blog/<slug>/` | Blog |

A slug that nobody published is a 404. Pages refresh from Sanity at most once
a minute; new slugs work without a rebuild.

## Where things live

- `app/src/sanity/queries.ts` — every GROQ query. Links chosen in the studio
  are resolved to URLs here, so components only get `href`s.
- `app/src/sanity/fetch.ts` — `sanityFetch` (60 s cache) and `getLayout()`:
  header, footer, site details and the "Vaste teksten" labels, fetched once
  per request.
- `app/src/components/` — `sections/` shared across pages, `home/`,
  `service/` (services, local and zakelijk pages), `project/`, `form/`.
- `app/src/app/globals.css` — the design tokens (`@theme`).
- `studio/schemaTypes/` — `documents/`, `singletons/`, `objects/`.

## Forms

Forms are built in the studio (Formulieren). `/api/submit-form` reads the
form's fields from Sanity as its allow-list and mails the answers through
Mailjet. Credentials and reCAPTCHA secrets go in `app/.env`; they win over
anything stored in Formulierinstellingen. Hidden fields can use `{{path}}` (the
page) and `{{service}}` (the service on a service page).

## Google reviews

Reviews are synced from Google every hour, no Business Profile manager access
needed. `app/src/lib/google-reviews.ts` asks the Google Places API (New) for
the business's score, total count and reviews, and upserts them as `review`
documents; `POST /api/google-reviews` runs it (header `x-sync-secret`,
`?dryRun=1` writes nothing). `app/netlify/functions/google-reviews-sync.mts`
calls that route `@hourly`; the studio page Reviews → Google-koppeling holds the
Place ID and has dry-run and sync buttons.

- Netlify env: `GOOGLE_PLACES_API_KEY`, `GOOGLE_REVIEWS_SYNC_SECRET`,
  `SANITY_API_WRITE_TOKEN` (see `app/.env.example`).
- Google only returns up to 5 review texts per request. The score and count on
  `/reviews/` are Google's own figures over all reviews; the review texts build
  up over time, nothing is ever deleted by the sync. Hide one in the studio
  with "Verbergen op de website".
- Optional: give the Sanity revalidate webhook the filter
  `_type != "googleReviews"`. The route revalidates itself when something
  changed, so the hourly status update does not need to expire the cache.

## Checks

```bash
npm run typegen                          # after changing a schema or query
npm run seed:dry && npm run check:queries   # every query against the seed data, offline
npm run build && npm start                  # then, in another terminal:
npm run check:links                         # every link, image and anchor on every page
npm run check:jsonld
```
