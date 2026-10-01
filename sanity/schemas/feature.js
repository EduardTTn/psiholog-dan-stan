export default {
  name: "feature",
  title: "Punct forte",
  type: "object",
  fields: [
    {
      name: "icon",
      title: "Iconiță",
      type: "string",
      options: {
        list: [
          { title: "Persoană", value: "person" },
          { title: "Ecran (online)", value: "screen" },
        ],
        layout: "radio",
      },
      description:
        "Pentru altă iconiță, spune-i dezvoltatorului — desenul se adaugă în cod.",
      initialValue: "person",
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
      rows: 2,
    },
  ],
  preview: { select: { title: "title", subtitle: "body" } },
};
