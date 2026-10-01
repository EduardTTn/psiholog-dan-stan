export default {
  name: "seo",
  title: "Google și titlul din tab",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: "metaTitle",
      title: "Titlu în tab / în Google",
      type: "string",
      description:
        "Poate folosi {nume} și {titlu}. Ex: „Tarife — {nume}”. Ideal sub 60 de caractere.",
      validation: (r) =>
        r.max(70).warning("Peste ~60 de caractere Google taie titlul."),
    },
    {
      name: "metaDescription",
      title: "Descriere în Google",
      type: "text",
      rows: 3,
      description:
        "1–2 propoziții, sub 160 de caractere. Dacă e gol, se folosește descrierea din „Date cabinet”.",
      validation: (r) =>
        r.max(180).warning("Peste ~160 de caractere Google taie descrierea."),
    },
  ],
};
