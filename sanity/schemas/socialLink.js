export default {
  name: "socialLink",
  title: "Rețea socială",
  type: "document",
  fields: [
    {
      name: "platform",
      title: "Platformă",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "TikTok", value: "tiktok" },
          { title: "Facebook", value: "facebook" },
        ],
        layout: "radio",
      },
      description:
        "Determină iconița afișată. Pentru altă platformă, spune-i dezvoltatorului — iconița trebuie adăugată în cod.",
      validation: (r) => r.required(),
    },
    {
      name: "url",
      title: "Link profil",
      type: "url",
      validation: (r) => r.required(),
    },
    {
      name: "handle",
      title: "Nume utilizator",
      type: "string",
      description: "Ex: @psiholog_dan.stan — apare la hover și pentru cititoarele de ecran.",
    },
    {
      name: "order",
      title: "Ordine",
      type: "number",
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
    select: { title: "platform", subtitle: "handle" },
  },
};
