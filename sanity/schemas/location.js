export default {
  name: "location",
  title: "Cabinet",
  type: "document",
  fields: [
    {
      name: "city",
      title: "Oraș",
      type: "string",
      description: "Apare ca titlu al cardului: „Cabinet Constanța”.",
      validation: (r) => r.required(),
    },
    {
      name: "street",
      title: "Stradă și număr",
      type: "string",
      description: "Ex: Strada Zburătorului 4",
      validation: (r) => r.required(),
    },
    {
      name: "mapQuery",
      title: "Adresă pentru Google Maps",
      type: "string",
      description:
        "Opțional. Textul căutat pe hartă, dacă adresa de mai sus nu nimerește locul exact. Ex: Strada Zburătorului 4, Constanța, România",
    },
    {
      name: "note",
      title: "Mențiune",
      type: "text",
      rows: 2,
      description: "Un rând despre program sau acces, afișat sub adresă.",
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
    select: { title: "city", subtitle: "street" },
  },
};
