import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, SINGLETONS } from "./schemas/index.js";

/**
 * Vine din sanity/.env, încărcat de CLI la pornire. Atenție: se citește o
 * singură dată, la start — după ce modifici .env, repornește `npm run dev`.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error(
    "Lipsește SANITY_STUDIO_PROJECT_ID. Completează-l în sanity/.env (pornind de la .env.example) și repornește `npm run dev`."
  );
}

const singletonTypes = new Set(SINGLETONS.map((s) => s.type));
const topSingletons = SINGLETONS.filter((s) => s.group !== "page");
const pageSingletons = SINGLETONS.filter((s) => s.group === "page");

/** Opens the one document of a singleton type directly, with no list in front. */
const singletonItem = (S, { id, type, title }) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(type).documentId(id).title(title));

export default defineConfig({
  name: "default",
  title: "Cabinet Stan Dan",
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conținut")
          .items([
            ...topSingletons.map((s) => singletonItem(S, s)),
            S.divider(),
            // Textul fiecărei pagini, grupat ca în meniul site-ului.
            S.listItem()
              .title("Textul paginilor")
              .id("pages")
              .child(
                S.list()
                  .title("Textul paginilor")
                  .items(pageSingletons.map((s) => singletonItem(S, s)))
              ),
            S.divider(),
            S.documentTypeListItem("service").title("Servicii și tarife"),
            S.documentTypeListItem("serviceCategory").title("Categorii"),
            S.divider(),
            S.documentTypeListItem("location").title("Cabinete"),
            S.divider(),
            S.documentTypeListItem("post").title("Articole de blog"),
            S.divider(),
            S.documentTypeListItem("timelineEntry").title("Parcurs profesional"),
            S.documentTypeListItem("socialLink").title("Rețele sociale"),
          ]),
    }),
    // Query playground — useful for you, harmless for the editor.
    visionTool({ defaultApiVersion: "2024-10-01" }),
  ],

  schema: {
    types: schemaTypes,
    // Hide singletons from the "create new" menu so there can only be one of each.
    templates: (prev) => prev.filter((t) => !singletonTypes.has(t.schemaType)),
  },

  document: {
    // Same reason: no "duplicate" / "delete" on a singleton.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action)
          )
        : prev,
  },
});
