import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

/**
 * Sanity is optional: until a project id is set, the site renders the local
 * content in src/data/ and never calls the API. This keeps the site working
 * before the studio exists — and if Sanity is ever unreachable.
 */
export const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      // Pin the API date — never leave it floating, or a Sanity release can
      // change response shapes under you.
      apiVersion: "2024-10-01",
      // Cached edge reads: fast, and changes appear within about a minute.
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

/** Build a sized image URL from a Sanity image reference. */
export function urlFor(source) {
  return builder && source ? builder.image(source) : null;
}
