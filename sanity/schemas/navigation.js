export default {
  name: "navigation",
  title: "Meniu",
  type: "document",
  fields: [
    {
      name: "primary",
      title: "Meniul principal (sus)",
      type: "array",
      of: [{ type: "navLink" }],
      description:
        "Ordinea din listă e ordinea din meniu. Butonul de programare apare automat la final.",
    },
    {
      name: "footer",
      title: "Meniul din subsol",
      type: "array",
      of: [{ type: "navLink" }],
    },
  ],
  preview: { prepare: () => ({ title: "Meniu" }) },
};
