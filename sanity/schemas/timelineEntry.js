export default {
  name: "timelineEntry",
  title: "Parcurs profesional",
  type: "document",
  fields: [
    {
      name: "period",
      title: "Perioadă",
      type: "string",
      description: 'Ex: „2026" sau „În curs de finalizare"',
      validation: (r) => r.required(),
    },
    {
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "meta",
      title: "Detalii",
      type: "text",
      rows: 3,
      description: "Instituția, programul de formare, coordonatorul etc.",
    },
    {
      name: "order",
      title: "Ordine",
      type: "number",
      description: "Mai mic = mai sus pe cronologie.",
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
    select: { title: "title", subtitle: "period" },
  },
};
