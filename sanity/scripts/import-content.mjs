/**
 * One-off import: pushes the content currently hardcoded in the React app
 * into Sanity. Safe to re-run — every document has a deterministic _id, so
 * re-running overwrites rather than duplicating.
 *
 *   cd sanity && npm run import
 *
 * Requires SANITY_STUDIO_PROJECT_ID and a write token (SANITY_WRITE_TOKEN)
 * in sanity/.env — create the token at sanity.io/manage > API > Tokens.
 */
import { createClient } from "@sanity/client";
import "dotenv/config";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Lipsesc variabilele. Creează sanity/.env pornind de la .env.example:\n" +
      "  SANITY_STUDIO_PROJECT_ID=...\n  SANITY_WRITE_TOKEN=..."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

// The data files are plain ES modules — import them directly.
const { GROUPS, SERVICES, DOMAINS } = await import(
  new URL("../../frontend/src/data/services.js", import.meta.url)
);
const { site, socials, locations } = await import(
  new URL("../../frontend/src/data/site.js", import.meta.url)
);
const { PARCURS } = await import(
  new URL("../../frontend/src/data/about.js", import.meta.url)
);
const { pages } = await import(
  new URL("../../frontend/src/data/pages.js", import.meta.url)
);
const { navigation } = await import(
  new URL("../../frontend/src/data/navigation.js", import.meta.url)
);

/** Stable, readable document ids so re-runs update instead of duplicating. */
const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining diacritics (ă, ș, ț…)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);

const docs = [];

// 1. Site settings (singleton)
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  name: site.name,
  title: site.title,
  cabinet: site.cabinet,
  email: site.email,
  phone: site.phone,
  whatsapp: site.whatsapp,
  address: site.address,
  hours: site.hours,
  bookButtonLabel: site.bookButtonLabel,
  whatsappLinkLabel: site.whatsappLinkLabel,
  whatsappGreeting: site.whatsappGreeting,
  metaDescription: site.metaDescription,
  emergencyNote: site.emergencyNote,
});

// 1b. Page copy — one singleton per page, ids matched to the schema names.
const PAGE_DOCS = {
  pageHome: pages.home,
  pageAbout: pages.about,
  pageServices: pages.services,
  pagePricing: pages.pricing,
  pageBooking: pages.booking,
  pageBlog: pages.blog,
};

/**
 * Items in an array of objects need a _key (so the Studio can reorder them)
 * and a _type (so it knows which form to render).
 */
const keyed = (items, type) =>
  items.map((item, i) => ({ _key: `${type}-${i + 1}`, _type: type, ...item }));

for (const [id, copy] of Object.entries(PAGE_DOCS)) {
  const doc = { _id: id, _type: id };
  for (const [field, value] of Object.entries(copy)) {
    // An empty field would only shadow the fallback in the app.
    if (value === "" || value === null || value === undefined) continue;
    doc[field] = value;
  }
  if (doc.features) doc.features = keyed(doc.features, "feature");
  if (doc.steps) doc.steps = keyed(doc.steps, "step");
  if (doc.story) doc.story = keyed(doc.story, "storyBlock");
  if (doc.cta) doc.cta = { _type: "ctaBand", ...doc.cta };
  if (doc.postCta) doc.postCta = { _type: "ctaBand", ...doc.postCta };
  if (doc.seo) doc.seo = { _type: "seo", ...doc.seo };
  if (doc.message) doc.message = { _type: "whatsappMessage", ...doc.message };
  docs.push(doc);
}

// 1c. Meniul (singleton)
docs.push({
  _id: "navigation",
  _type: "navigation",
  primary: keyed(navigation.primary, "navLink"),
  footer: keyed(navigation.footer, "navLink").map((l, i) => ({
    ...l,
    _key: `navLink-footer-${i + 1}`,
  })),
});

// 2. Categories — including "companii", which has no priced services
DOMAINS.forEach((d, i) => {
  const group = GROUPS.find((g) => g.id === d.id);
  docs.push({
    _id: `category-${d.id}`,
    _type: "serviceCategory",
    label: group?.label || d.title,
    title: d.title,
    slug: { _type: "slug", current: d.id },
    number: d.number,
    body: d.body,
    highlights: d.highlights,
    order: (i + 1) * 10,
  });
});

// 3. Services
SERVICES.forEach((s) => {
  docs.push({
    _id: `service-${slugify(s.title)}`,
    _type: "service",
    title: s.title,
    body: s.body,
    price: s.price,
    ...(s.duration ? { duration: s.duration } : {}),
    ...(s.footnote ? { footnote: s.footnote } : {}),
    category: { _type: "reference", _ref: `category-${s.group}` },
  });
});

// 4. Timeline
PARCURS.forEach((entry, i) => {
  docs.push({
    _id: `timeline-${i + 1}`,
    _type: "timelineEntry",
    period: entry.period,
    title: entry.title,
    meta: entry.meta,
    order: (i + 1) * 10,
  });
});

// 5. Cabinete
locations.forEach((loc, i) => {
  docs.push({
    _id: `location-${loc.id || slugify(loc.city)}`,
    _type: "location",
    city: loc.city,
    street: loc.street,
    ...(loc.mapQuery ? { mapQuery: loc.mapQuery } : {}),
    ...(loc.note ? { note: loc.note } : {}),
    order: (i + 1) * 10,
  });
});

// 6. Socials
socials.forEach((s, i) => {
  docs.push({
    _id: `social-${s.id}`,
    _type: "socialLink",
    platform: s.id,
    url: s.url,
    handle: s.handle,
    order: (i + 1) * 10,
  });
});

/**
 * Mod implicit: aditiv. Documentele care există rămân cum sunt, iar câmpurile
 * noi (adăugate ulterior în cod) se completează doar dacă lipsesc — așa se pot
 * trimite câmpuri noi în studio fără să se piardă ce a scris editorul.
 *
 * Cu `--force`, fiecare document e rescris din cod. Pierde editările!
 */
const force = process.argv.includes("--force");

const tx = client.transaction();
for (const doc of docs) {
  if (force) {
    tx.createOrReplace(doc);
    continue;
  }
  const { _id, _type, ...fields } = doc;
  tx.createIfNotExists({ _id, _type });
  tx.patch(_id, (patch) => patch.setIfMissing(fields));
}

console.log(
  force
    ? `Se rescriu ${docs.length} documente (--force)...`
    : `Se completează ${docs.length} documente, fără a suprascrie...`
);
await tx.commit();

const counts = docs.reduce((acc, d) => {
  acc[d._type] = (acc[d._type] || 0) + 1;
  return acc;
}, {});
for (const [type, n] of Object.entries(counts)) {
  console.log(`  ${String(n).padStart(3)}  ${type}`);
}

console.log("");
console.log(
  force
    ? "Gata — totul vine din cod. Deschide studioul ca să verifici."
    : "Gata. Ce era deja scris în studio a rămas neatins; s-au completat doar câmpurile care lipseau."
);
