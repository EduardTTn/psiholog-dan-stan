export default {
  name: "service",
  title: "Serviciu / tarif",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Denumire serviciu",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "category",
      title: "Categorie",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (r) => r.required(),
    },
    {
      name: "body",
      title: "Descriere",
      type: "text",
      rows: 5,
    },
    {
      name: "price",
      title: "Tarif",
      type: "string",
      description:
        'Scrie-l așa cum vrei să apară: „400 lei" sau „de la 400 lei". Ordonarea pe site se face automat, de la cel mai mic.',
      validation: (r) => r.required(),
    },
    {
      name: "duration",
      title: "Durată",
      type: "string",
      description: "Opțional. Ex: 50 minute",
    },
    {
      name: "footnote",
      title: "Notă de subsol",
      type: "text",
      rows: 2,
      description:
        "Opțional. Apare cu asterisc sub descriere, pentru precizări despre tarif.",
    },
  ],
  orderings: [
    {
      title: "Denumire",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "price", category: "category.label" },
    prepare({ title, subtitle, category }) {
      return { title, subtitle: [category, subtitle].filter(Boolean).join(" · ") };
    },
  },
};
