export default {
  name: "serviceCategory",
  title: "Categorie de servicii",
  type: "document",
  fields: [
    {
      name: "label",
      title: "Denumire scurtă (tab Tarife)",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "slug",
      title: "Identificator (slug)",
      type: "slug",
      description:
        "Folosit în linkuri, ex: /tarife#consiliere. Nu îl schimba după publicare — linkurile existente se strică.",
      options: { source: "label", maxLength: 40 },
      validation: (r) => r.required(),
    },
    {
      name: "title",
      title: "Titlu lung (pagina Servicii)",
      type: "string",
      description:
        "Opțional. Dacă e gol, se folosește denumirea scurtă de mai sus.",
    },
    {
      name: "number",
      title: "Număr afișat",
      type: "string",
      description: 'Apare pe cardul din pagina Servicii. Ex: „01"',
    },
    {
      name: "body",
      title: "Descriere (pagina Servicii)",
      type: "text",
      rows: 4,
    },
    {
      name: "highlights",
      title: "Ce include",
      type: "array",
      of: [{ type: "string" }],
      description: "Lista bifată de sub descriere, în pagina Servicii.",
      options: { layout: "list" },
    },
    {
      name: "order",
      title: "Ordine",
      type: "number",
      description: "Mai mic = mai sus în listă.",
      initialValue: 10,
    },
  ],
  orderings: [
    {
      title: "Ordine",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "label", subtitle: "slug.current" },
  },
};
