export default {
  name: "step",
  title: "Pas",
  type: "object",
  fields: [
    {
      name: "number",
      title: "Număr",
      type: "string",
      description: "Ex: 01 — apare în pătratul din colțul cardului.",
    },
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
  preview: { select: { title: "title", subtitle: "number" } },
};
