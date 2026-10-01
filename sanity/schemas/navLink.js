/* Rutele existente în site. O rută nouă se adaugă mai întâi în cod. */
export const ROUTE_OPTIONS = [
  { title: "Acasă (/)", value: "/" },
  { title: "Despre mine (/despre)", value: "/despre" },
  { title: "Servicii (/servicii)", value: "/servicii" },
  { title: "Tarife (/tarife)", value: "/tarife" },
  { title: "Programări (/programari)", value: "/programari" },
  { title: "Blog (/blog)", value: "/blog" },
];

export default {
  name: "navLink",
  title: "Link de meniu",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Text afișat",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "path",
      title: "Pagina",
      type: "string",
      options: { list: ROUTE_OPTIONS },
      description: "Alege dintre paginile existente.",
      validation: (r) => r.required(),
    },
  ],
  preview: { select: { title: "label", subtitle: "path" } },
};
