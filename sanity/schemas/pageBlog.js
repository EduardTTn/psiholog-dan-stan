export default {
  name: "pageBlog",
  title: "Pagina Blog",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Titlu principal", type: "text", rows: 2 },
    { name: "heroLead", title: "Text introductiv", type: "text", rows: 3 },
    {
      name: "emptyTitle",
      title: "Când nu există articole — titlu",
      type: "string",
      description:
        "Se vede doar cât timp nu e publicat niciun articol.",
    },
    { name: "emptyBody", title: "Când nu există articole — text", type: "text", rows: 3 },
    {
      name: "readMoreLabel",
      title: "Linkul din cardul de articol",
      type: "string",
      description: "Ex: „Citește articolul →”.",
    },

    {
      name: "postBackLabel",
      title: "Articol — linkul de întoarcere",
      type: "string",
      description: "Ex: „← Toate articolele”.",
    },
    {
      name: "postLoadingLabel",
      title: "Articol — text în timpul încărcării",
      type: "string",
    },
    {
      name: "postErrorLabel",
      title: "Articol — text dacă încărcarea eșuează",
      type: "text",
      rows: 2,
    },
    {
      name: "postNotFoundTitle",
      title: "Articol inexistent — titlu",
      type: "string",
    },
    {
      name: "postNotFoundBody",
      title: "Articol inexistent — text",
      type: "text",
      rows: 2,
    },
    {
      name: "postCta",
      title: "Articol — banda de final",
      type: "ctaBand",
    },
    { name: "seo", title: "Google și titlul din tab", type: "seo" },
  ],
  preview: { prepare: () => ({ title: "Pagina Blog" }) },
};
