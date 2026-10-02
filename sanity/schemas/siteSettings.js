export default {
  name: "siteSettings",
  title: "Date cabinet",
  type: "document",
  // Singleton — enforced in sanity.config.js, like the page documents.
  fields: [
    {
      name: "name",
      title: "Nume",
      type: "string",
      validation: (r) => r.required(),
    },
    {
      name: "title",
      title: "Titlu profesional",
      type: "string",
      description: "Apare în meniu și în subsol, sub nume.",
      validation: (r) => r.required(),
    },
    {
      name: "cabinet",
      title: "Denumire cabinet",
      type: "string",
    },
    {
      name: "email",
      title: "E-mail",
      type: "string",
    },
    {
      name: "phone",
      title: "Telefon (afișat)",
      type: "string",
      description: "Așa cum vrei să apară pe site, ex: 0740 278 926",
    },
    {
      name: "whatsapp",
      title: "Număr WhatsApp",
      type: "string",
      description:
        "Format internațional, fără + și fără 0 la început. Ex: 40740278926",
      validation: (r) =>
        r
          .required()
          .regex(/^\d{8,15}$/, {
            name: "doar cifre",
            invert: false,
          })
          .error("Doar cifre, fără + sau spații. Ex: 40740278926"),
    },
    {
      name: "address",
      title: "Adresă / mențiune despre locație",
      type: "string",
    },
    {
      name: "hours",
      title: "Program",
      type: "string",
      description: "Ex: Luni–Vineri · 09:00–18:00",
    },
    {
      name: "bookButtonLabel",
      title: "Textul butonului de programare",
      type: "string",
      description: "Butonul din meniu, care duce la pagina de programări.",
    },
    {
      name: "whatsappLinkLabel",
      title: "Textul linkului de WhatsApp din subsol",
      type: "string",
    },
    {
      name: "whatsappGreeting",
      title: "Mesajul implicit de pe WhatsApp",
      type: "text",
      rows: 2,
      description:
        "Cu ce text se deschide WhatsApp din subsol. Mesajul de pe pagina Programări se compune separat, la „Programări”.",
    },
    {
      name: "metaDescription",
      title: "Descrierea implicită pentru Google",
      type: "text",
      rows: 3,
      description:
        "Se folosește pe paginile care nu au o descriere proprie. Sub 160 de caractere.",
    },
    {
      name: "emergencyNote",
      title: "Mențiunea pentru situații de urgență",
      type: "text",
      rows: 2,
      description:
        "Apare în subsolul fiecărei pagini și în cardul de contact de la Programări.",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
  },
};
