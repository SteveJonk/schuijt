# Studio

The Sanity studio for this project. Content edited here is what the app in
`../app` renders.

## Setup

```bash
cp .env.example .env   # fill in SANITY_STUDIO_PROJECT_ID
npm install
npm run dev            # http://localhost:3333
```

## Layout

- `schemaTypes/documents/` — repeatable content: `servicePage` (services, local
  and zakelijk pages; `kind` decides the URL), `project`, `blogPost`,
  `review`, `category`, `textPage`, and the form creator (`formType`)
- `schemaTypes/singletons/` — one-off documents: the fixed pages (Home,
  Zakelijk, overviews, Contact), Website, Navigatie, Footer, Vaste teksten and
  Formulierinstellingen. Each has `_id` equal to its type name.
- `schemaTypes/objects/` — shared field groups (hero, FAQ, link, seo, …) and
  the form field type
- `schemaTypes/fields.ts` — small helpers for common fields; titles are Dutch
- `structure.ts` — the studio menu (Pagina's, Projecten, Blog, Reviews,
  Categorieën, Formulieren, Instellingen, Media)

## Types

```bash
npm run typegen        # schema extract + sanity typegen generate
```

Writes `../app/src/sanity/schema.json` and `../app/src/sanity/sanity.types.ts`.
Typegen runs from here because the CLI needs a studio project root, but the
GROQ it reads and the types it writes belong to the app. Run it after changing
a schema type; the root `README.md` has the full story.

## Deploying

```bash
npm run deploy         # deploys to <hostname>.sanity.studio
```

Pushes to `main` that touch `studio/` deploy automatically through
`.github/workflows/deploy-sanity-studio.yml`. The root `README.md` lists the
repository secret and variables it needs.

See the root `README.md` for how a block travels from here to the front end.
