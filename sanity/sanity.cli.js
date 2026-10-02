import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  /* The hostname for `npx sanity deploy` -> https://<studioHost>.sanity.studio
     Change it if the name is already taken. */
  studioHost: "psiholog-stan-dan",
  /* Studioul e găzduit pe domeniul propriu (/studio), nu pe sanity.studio.
     Cu auto-updates, build-ul lasă importurile „sanity” nerezolvate și se
     bazează pe un import map injectat de core.sanity-cdn.com — ceea ce nu
     funcționează self-hosted. Dezactivat, build-ul include tot runtime-ul. */
  deployment: { autoUpdates: false },
});
