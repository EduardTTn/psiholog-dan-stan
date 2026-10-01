export default {
  name: "post",
  title: "Articol de blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "slug",
      title: "Link (slug)",
      type: "slug",
      description:
        'Adresa articolului. Apasă „Generate" ca să îl creezi din titlu.',
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    },
    {
      name: "publishedAt",
      title: "Data publicării",
      type: "datetime",
      description:
        "Articolele cu dată în viitor nu apar pe site până la acea dată.",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    },
    {
      name: "excerpt",
      title: "Rezumat",
      type: "text",
      rows: 3,
      description:
        "2–3 rânduri. Apar în lista de articole și în rezultatele Google.",
      validation: (r) => r.max(300).warning("Peste 300 de caractere se taie în listă."),
    },
    {
      name: "coverImage",
      title: "Imagine principală",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Text alternativ",
          type: "string",
          description:
            "Descrie imaginea pentru persoanele care folosesc cititoare de ecran.",
        },
      ],
    },
    {
      name: "body",
      title: "Conținut",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraf", value: "normal" },
            { title: "Subtitlu", value: "h2" },
            { title: "Subtitlu mic", value: "h3" },
            { title: "Citat", value: "blockquote" },
          ],
          lists: [
            { title: "Listă cu puncte", value: "bullet" },
            { title: "Listă numerotată", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Îngroșat", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "Adresă" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Text alternativ", type: "string" },
            { name: "caption", title: "Legendă", type: "string" },
          ],
        },
      ],
    },
  ],
  orderings: [
    {
      title: "Cele mai noi",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        media,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Fără dată",
      };
    },
  },
};
