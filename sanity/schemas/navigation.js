export default {
  name: "navigation",
  title: "Meniu",
  type: "document",
  fields: [
    {
      name: "primary",
      title: "Linkurile meniului",
      type: "array",
      of: [{ type: "navLink" }],
      description:
        "Aceeași listă apare în bara de sus și în subsol. Ordinea din listă e ordinea de pe site.",
    },
  ],
  preview: { prepare: () => ({ title: "Meniu" }) },
};
