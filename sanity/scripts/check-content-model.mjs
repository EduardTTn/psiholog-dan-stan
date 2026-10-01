/**
 * Verifică modelul de conținut, fără să atingă Sanity.
 *
 *   cd sanity && npm run check
 *
 * Un câmp editabil trebuie să existe în trei locuri: schema Sanity (ca să apară
 * în studio), `CONTENT_QUERY` (ca să fie citit) și `frontend/src/data/` (ca
 * valoare implicită). Dacă lipsește din query, editorul îl completează degeaba
 * și nimic nu semnalează problema — de aici scriptul.
 *
 * Verifică și plasa de siguranță: un câmp golit în studio trebuie să cadă pe
 * valoarea din cod, nu să lase pagina goală.
 */
import { readFileSync } from "node:fs";

const FRONTEND = new URL("../../frontend/", import.meta.url);
const read = (path) => readFileSync(new URL(path, FRONTEND), "utf8");

const { pages } = await import(new URL("src/data/pages.js", FRONTEND));
const { site } = await import(new URL("src/data/site.js", FRONTEND));
const { navigation } = await import(new URL("src/data/navigation.js", FRONTEND));
const { merge } = await import(new URL("src/content/merge.js", FRONTEND));
const { LOCAL_CONTENT, fill } = await import(
  new URL("src/content/context.js", FRONTEND)
);

const query = read("src/lib/queries.js");
const inQuery = (name) => query.includes(name);

const problems = [];
const fail = (message) => problems.push(message);

/* ---------- 1. Câmpuri: date ↔ schemă ↔ query ---------- */

const PAGE_SCHEMAS = {
  home: "pageHome",
  about: "pageAbout",
  services: "pageServices",
  pricing: "pagePricing",
  booking: "pageBooking",
  blog: "pageBlog",
};

let fieldCount = 0;

for (const [key, schemaId] of Object.entries(PAGE_SCHEMAS)) {
  const schema = (await import(`../schemas/${schemaId}.js`)).default;
  const schemaFields = schema.fields.map((f) => f.name);
  const dataFields = Object.keys(pages[key]);
  fieldCount += dataFields.length;

  for (const field of dataFields) {
    if (!schemaFields.includes(field)) {
      fail(`${schemaId}: „${field}” are valoare în data/pages.js, dar nu e în schemă`);
    }
    if (!inQuery(field)) {
      fail(`${schemaId}: „${field}” nu e cerut în CONTENT_QUERY`);
    }
  }
  for (const field of schemaFields) {
    if (!dataFields.includes(field)) {
      fail(`${schemaId}: „${field}” e în schemă, dar nu are valoare implicită`);
    }
  }
  // Câmpurile din obiectele imbricate (cta, seo, message) trebuie proiectate.
  for (const [field, value] of Object.entries(pages[key])) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const sub of Object.keys(value)) {
        if (!inQuery(sub)) {
          fail(`${schemaId}: „${field}.${sub}” nu e proiectat în CONTENT_QUERY`);
        }
      }
    }
  }
}

const settingsFields = (await import("../schemas/siteSettings.js")).default.fields
  .map((f) => f.name);
for (const field of Object.keys(site)) {
  fieldCount += 1;
  if (!settingsFields.includes(field)) {
    fail(`siteSettings: „${field}” nu e în schemă`);
  }
  if (!inQuery(field)) {
    fail(`siteSettings: „${field}” nu e cerut în CONTENT_QUERY`);
  }
}

const navFields = (await import("../schemas/navigation.js")).default.fields
  .map((f) => f.name);
for (const field of Object.keys(navigation)) {
  fieldCount += 1;
  if (!navFields.includes(field)) fail(`navigation: „${field}” nu e în schemă`);
  if (!inQuery(field)) fail(`navigation: „${field}” nu e cerut în CONTENT_QUERY`);
}

/* ---------- 2. Rutele din meniu există în aplicație ---------- */

const appRoutes = read("src/App.jsx");
const { ROUTE_OPTIONS } = await import("../schemas/navLink.js");

for (const option of ROUTE_OPTIONS) {
  const path = option.value;
  const declared = path === "/" ? 'path="/"' : `path="${path}"`;
  if (!appRoutes.includes(declared)) {
    fail(`navLink: ruta ${path} e oferită în studio, dar nu există în App.jsx`);
  }
}
for (const link of navigation.primary) {
  if (!ROUTE_OPTIONS.some((o) => o.value === link.path)) {
    fail(`navigation: „${link.label}” trimite la ${link.path}, care nu e în lista de rute`);
  }
}

/* ---------- 3. Plasa de siguranță: un studio pe jumătate completat ---------- */

const sparse = {
  site: { name: "Dan Stan", whatsappLinkLabel: "", whatsappGreeting: null },
  navigation: { primary: [] },
  pages: {
    home: { heroTitle: "Titlu nou", servicesAllLabel: "", seo: { metaTitle: "" } },
    booking: { modalities: ["La sediu"], intervals: [], message: { closing: "" } },
    about: null,
    services: null,
    pricing: null,
    blog: null,
  },
  locations: [],
  companyServices: [],
  services: [],
  posts: [],
};

const merged = merge(LOCAL_CONTENT, sparse);

const expectations = [
  ["site.whatsappLinkLabel", merged.site.whatsappLinkLabel, site.whatsappLinkLabel],
  ["site.whatsappGreeting", merged.site.whatsappGreeting, site.whatsappGreeting],
  ["navigation.primary (emptied)", merged.navigation.primary.length, navigation.primary.length],
  ["pages.home.heroTitle", merged.pages.home.heroTitle, "Titlu nou"],
  ["pages.home.servicesAllLabel", merged.pages.home.servicesAllLabel, pages.home.servicesAllLabel],
  ["pages.home.seo.metaTitle", merged.pages.home.seo.metaTitle, pages.home.seo.metaTitle],
  ["pages.booking.modalities", merged.pages.booking.modalities.join(), "La sediu"],
  ["pages.booking.intervals", merged.pages.booking.intervals.join(), pages.booking.intervals.join()],
  ["pages.booking.message.closing", merged.pages.booking.message.closing, pages.booking.message.closing],
  ["pages.blog.readMoreLabel", merged.pages.blog.readMoreLabel, pages.blog.readMoreLabel],
  ["locations", merged.locations.length, LOCAL_CONTENT.locations.length],
  ["companyServices", merged.companyServices.length, LOCAL_CONTENT.companyServices.length],
];

for (const [label, actual, expected] of expectations) {
  if (actual !== expected) {
    fail(`merge: ${label} = ${JSON.stringify(actual)}, așteptat ${JSON.stringify(expected)}`);
  }
}

// Niciun câmp de text nu are voie să ajungă gol după merge.
const walk = (value, path) => {
  if (typeof value === "string") {
    if (!value && path !== "pages.about.heroLead") fail(`merge: ${path} a rămas gol`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, `${path}[${i}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, sub] of Object.entries(value)) walk(sub, `${path}.${key}`);
  }
};
walk(merged.pages, "pages");

/* ---------- 4. Substituenții se rezolvă ---------- */

for (const [key, copy] of Object.entries(pages)) {
  const resolved = fill(copy.seo?.metaTitle, site);
  if (resolved && resolved.includes("{")) {
    fail(`pages.${key}.seo.metaTitle a rămas cu un substituent nerezolvat: ${resolved}`);
  }
}
const nameLine = fill(pages.booking.message.nameLine, site, { client: "Ana" });
if (nameLine.includes("{")) {
  fail(`message.nameLine a rămas cu un substituent nerezolvat: ${nameLine}`);
}

/* ---------- Raport ---------- */

if (problems.length) {
  console.error(`✖ ${problems.length} problemă(e):\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`✔ ${fieldCount} câmpuri editabile: schemă, query și valoare implicită — toate pe loc.`);
console.log(`✔ ${ROUTE_OPTIONS.length} rute oferite în meniu există în App.jsx.`);
console.log(`✔ ${expectations.length} verificări de fallback pe un dataset incomplet.`);
console.log("✔ Substituenții {nume}/{titlu}/{client} se rezolvă.");
