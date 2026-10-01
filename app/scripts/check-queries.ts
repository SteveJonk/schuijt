/* eslint-disable @typescript-eslint/no-explicit-any -- query results are checked by assertion, not by type */
/**
 * Runs every GROQ query in src/sanity/queries.ts against the seed dataset,
 * offline, and fails on anything a page would trip over: a missing document,
 * a link without a URL, a contact block without a form.
 *
 *   npm run seed:dry && npm run check:queries
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluate, parse } from 'groq-js';
import * as Q from '../src/sanity/queries';

const dataset = readFileSync(new URL('./seed/dataset.ndjson', import.meta.url), 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((line) => JSON.parse(line));

async function run<T = any>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return (await evaluate(parse(query, { params }), { dataset, params })).get();
}

/** Every `href` anywhere in a result must resolve to something. */
function assertLinks(value: unknown, where: string, trail = '') {
  if (Array.isArray(value)) value.forEach((v, i) => assertLinks(v, where, `${trail}[${i}]`));
  else if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) {
      if (key === 'href') assert.ok(typeof v === 'string' && /^(\/|#|https?:|tel:|mailto:)/.test(v), `${where}${trail}.href = ${v}`);
      else assertLinks(v, where, `${trail}.${key}`);
    }
  }
}

const checked: string[] = [];
async function check(name: string, query: string, params: Record<string, unknown>, test: (r: any) => void) {
  const result = await run(query, params);
  assert.ok(result, `${name} returned nothing`);
  assertLinks(result, name);
  test(result);
  checked.push(name);
}

async function main() {
  const layout = await run(Q.LAYOUT_QUERY);
  assertLinks(layout, 'LAYOUT');
  assert.ok(layout.site.name && layout.site.logo.asset, 'site name/logo');
  assert.equal(layout.navigation.links.length, 6);
  assert.ok(layout.navigation.links[0].children.length >= 4 && layout.navigation.links[2].children.length === 3, 'nav children');
  assert.ok(layout.ui.breadcrumbHome && layout.ui.breadcrumbServices.href);
  assert.ok(layout.zakelijkTitle && layout.projectsTitle && layout.zakelijkProjectsTitle);

  await check('HOME', Q.HOME_QUERY, {}, (r) => {
    assert.ok(r.hero.titleHighlight && r.hero.image.dimensions);
    assert.equal(r.services.cards.length, 4);
    assert.equal(r.reviews.items.length, 0, 'no reviews seeded; they come from Google');
    assert.ok(r.cta.form?._id === 'form.offerte-dienstkeuze');
  });

  const rootSlugs: string[] = await run(Q.ROOT_SLUGS_QUERY);
  assert.equal(rootSlugs.length, 6 + 24 + 102 + 1, 'root slugs');
  for (const slug of rootSlugs) {
    await check(`ROOT /${slug}/`, Q.ROOT_PAGE_QUERY, { slug }, (r) => {
      if (r._type === 'servicePage') {
        assert.ok(r.hero && r.cta.form?._id, `${slug}: hero/form`);
        if (r.kind === 'lokaal') assert.ok(r.parent?.path && r.nearby?.places.length, `${slug}: parent`);
      }
      if (r._type === 'project') assert.ok(r.category.relatedPage.path && r.cta.form?._id, `${slug}: category/form`);
      if (r._type === 'textPage') assert.ok(r.body.length);
    });
  }

  const zakelijkSlugs: string[] = await run(Q.ZAKELIJK_SLUGS_QUERY);
  assert.deepEqual([...zakelijkSlugs].sort(), ['vve-vastgoedbeheer', 'woningcorporaties']);
  for (const slug of zakelijkSlugs) {
    await check(`ZAKELIJK /${slug}/`, Q.ZAKELIJK_SERVICE_QUERY, { slug }, (r) =>
      assert.equal(r.cta.form?._id, 'form.offerte-zakelijk'),
    );
  }

  await check('ZAKELIJK_PAGE', Q.ZAKELIJK_PAGE_QUERY, {}, (r) => assert.equal(r.projects.items.length, 2));
  await check('PROJECTS_PAGE', Q.PROJECTS_PAGE_QUERY, {}, (r) => {
    assert.equal(r.projects.length, 100);
    assert.equal(r.categories.length, 4);
    assert.ok(r.page.cta.form?._id === 'form.offerte');
  });
  await check('ZAKELIJK_PROJECTS_PAGE', Q.ZAKELIJK_PROJECTS_PAGE_QUERY, {}, (r) => assert.equal(r.projects.length, 2));
  // No reviews are seeded: they come from Google.
  await check('REVIEWS_PAGE', Q.REVIEWS_PAGE_QUERY, {}, (r) => {
    assert.equal(r.reviews.length, 0);
    assert.equal(r.score.count, 0);
  });
  await check('BLOG_PAGE', Q.BLOG_PAGE_QUERY, {}, (r) => {
    assert.equal(r.posts.length, 7);
    assert.equal(r.posts[0].href, '/blog/sierbestrating-kosten-per-m2/');
  });
  for (const slug of await run<string[]>(Q.BLOG_SLUGS_QUERY)) {
    await check(`BLOG /${slug}/`, Q.BLOG_POST_QUERY, { slug }, (r) => assert.equal(r.related.length, 3));
  }
  await check('CONTACT_PAGE', Q.CONTACT_PAGE_QUERY, {}, (r) => assert.equal(r.form?._id, 'form.contact'));
  await check('SITEMAP', Q.SITEMAP_QUERY, {}, (r) => assert.equal(r.length, 6 + 24 + 2 + 102 + 1 + 7));
  for (const formId of ['form.offerte', 'form.offerte-dienstkeuze', 'form.offerte-zakelijk', 'form.contact']) {
    await check(`FORM ${formId}`, Q.FORM_QUERY, { formId }, (r) => assert.ok(r.fields.length >= 5));
  }
  await check('FORM_SETTINGS', Q.FORM_SETTINGS_QUERY, {}, () => {});

  console.log(`check:queries — ${checked.length + 1} results checked, all links resolve`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
