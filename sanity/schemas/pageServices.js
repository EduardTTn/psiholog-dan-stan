export default {
  name: "pageServices",
  title: "Pagina Servicii",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Titlu principal", type: "text", rows: 2 },
    {
      name: "heroLead",
      title: "Text introductiv",
      type: "text",
      rows: 3,
      description:
        "Lista de servicii vine din „Categorii” și „Servicii și tarife”.",
    },
    {
      name: "heroSecondaryLabel",
      title: "Butonul secundar din capul paginii",
      type: "string",
      description: "Ex: „Vezi tarifele”.",
    },
    {
      name: "categoryLinkLabel",
      title: "Linkul de sub fiecare categorie",
      type: "string",
      description: "Duce la tarifele categoriei. Ex: „Vezi tarifele… →”.",
    },
    { name: "cta", title: "Banda de final", type: "ctaBand" },
    { name: "seo", title: "Google și titlul din tab", type: "seo" },
  ],
  preview: { prepare: () => ({ title: "Pagina Servicii" }) },
};
