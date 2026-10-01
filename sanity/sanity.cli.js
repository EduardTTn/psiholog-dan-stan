import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  /* The hostname for `npx sanity deploy` -> https://<studioHost>.sanity.studio
     Change it if the name is already taken. */
  studioHost: "psiholog-stan-dan",
  autoUpdates: true,
});
