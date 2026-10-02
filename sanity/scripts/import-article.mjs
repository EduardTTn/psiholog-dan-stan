/**
 * Urcă un articol scris în Markdown direct în Sanity, ca articol de blog.
 *
 *   cd sanity
 *   node scripts/import-article.mjs ../articol.md --cover ../poza.jpg \
 *     --credit "Foto: Nume Autor / Unsplash"
 *
 * Fișierul trebuie să înceapă cu titlul pe un rând `# Titlu`. Apoi:
 *   ## Subtitlu        -> Subtitlu (h2)
 *   ### Subtitlu mic   -> Subtitlu mic (h3)
 *   „text între ghilimele românești, singur pe rând” -> Citat
 *   orice alt rând     -> Paragraf
 *
 * Id-ul documentului se calculează din slug, deci re-rularea actualizează
 * același articol în loc să îl dubleze.
 *
 * Opțiuni: --cover <fișier>, --credit <text>, --slug <slug>, --date <ISO>,
 *          --excerpt <text>, --draft (nu îl publică: dată în viitor)
 */
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { createClient } from "@sanity/client";
import "dotenv/config";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--"));
const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? undefined : argv[i + 1];
};

if (!file) {
  console.error("Lipsește fișierul .md. Vezi comentariul din capul scriptului.");
  process.exit(1);
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error(
    "Lipsesc SANITY_STUDIO_PROJECT_ID / SANITY_WRITE_TOKEN din sanity/.env."
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

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);

/* ---------- Markdown -> Portable Text ---------- */

let keySeq = 0;
const block = (style, text) => {
  keySeq += 1;
  return {
    _key: `b${keySeq}`,
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: `b${keySeq}s0`, _type: "span", text, marks: [] }],
  };
};

const source = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const chunks = source
  .split(/\n\s*\n/)
  .map((c) => c.trim())
  .filter(Boolean);

let title = flag("slug") ? undefined : null;
const body = [];

for (const chunk of chunks) {
  if (chunk.startsWith("# ")) {
    title = chunk.slice(2).trim();
    continue;
  }
  if (chunk.startsWith("### ")) {
    body.push(block("h3", chunk.slice(4).trim()));
    continue;
  }
  if (chunk.startsWith("## ")) {
    body.push(block("h2", chunk.slice(3).trim()));
    continue;
  }
  const text = chunk.replace(/\n+/g, " ").trim();
  // Un rând care e în întregime între ghilimele românești devine citat.
  const quoted = text.startsWith("„") && text.endsWith("”");
  body.push(block(quoted ? "blockquote" : "normal", text));
}

if (!title) {
  console.error("Fișierul nu începe cu un titlu pe un rând „# Titlu”.");
  process.exit(1);
}

const slug = flag("slug") || slugify(title);

/** Primul paragraf, tăiat la finalul unei propoziții, sub 280 de caractere. */
function buildExcerpt() {
  const given = flag("excerpt");
  if (given) return given;
  const first = body.find((b) => b.style === "normal");
  const text = first ? first.children[0].text : "";
  if (text.length <= 280) return text;
  const cut = text.slice(0, 280);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
  return (stop > 120 ? cut.slice(0, stop + 1) : cut.trim() + "…").trim();
}

/* ---------- Imaginea principală ---------- */

async function uploadCover() {
  const path = flag("cover");
  if (!path) return undefined;
  const credit = flag("credit");
  const asset = await client.assets.upload("image", readFileSync(path), {
    filename: basename(path),
    ...(credit ? { creditLine: credit } : {}),
  });
  console.log(`  imagine încărcată: ${asset._id} (${asset.size} octeți)`);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: flag("alt") || "",
  };
}

/* ---------- Scrierea documentului ---------- */

const publishedAt = flag("date")
  ? new Date(flag("date")).toISOString()
  : argv.includes("--draft")
    ? new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString()
    : new Date().toISOString();

const coverImage = await uploadCover();

const doc = {
  _id: `post-${slug}`,
  _type: "post",
  title,
  slug: { _type: "slug", current: slug },
  publishedAt,
  excerpt: buildExcerpt(),
  ...(coverImage ? { coverImage } : {}),
  body,
};

await client.createOrReplace(doc);

const styles = body.reduce((acc, b) => {
  acc[b.style] = (acc[b.style] || 0) + 1;
  return acc;
}, {});

console.log(`\n„${title}”`);
console.log(`  /blog/${slug}`);
console.log(`  publicat: ${publishedAt}`);
console.log(`  blocuri : ${Object.entries(styles).map(([s, n]) => `${n} ${s}`).join(", ")}`);
console.log(`  rezumat : ${doc.excerpt.slice(0, 90)}…`);
