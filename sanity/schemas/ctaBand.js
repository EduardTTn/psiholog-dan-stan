export default {
  name: "ctaBand",
  title: "Banda de final (îndemn)",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "body",
      title: "Text",
      type: "text",
      rows: 3,
    },
  ],
  preview: { select: { title: "title", subtitle: "body" } },
};
