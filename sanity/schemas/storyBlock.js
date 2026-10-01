export default {
  name: "storyBlock",
  title: "Capitol",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Titlu capitol",
      type: "string",
      description: "Ex: Cum a început",
      validation: (r) => r.required(),
    },
    {
      name: "paragraphs",
      title: "Paragrafe",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Fiecare rând din listă devine un paragraf separat.",
    },
  ],
  preview: { select: { title: "label", subtitle: "paragraphs.0" } },
};
