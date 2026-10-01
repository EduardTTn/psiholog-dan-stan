const HERO_NOTE =
  "Titlul mare și textul de sub el, în capul paginii.";

export default {
  name: "pageHome",
  title: "Pagina Acasă",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Titlu principal", type: "text", rows: 2, description: HERO_NOTE },
    { name: "heroLead", title: "Text introductiv", type: "text", rows: 3 },
    {
      name: "heroSecondaryLabel",
      title: "Butonul secundar din capul paginii",
      type: "string",
      description: "Lângă butonul de programare. Ex: „Vezi serviciile”.",
    },

    { name: "aboutTitle", title: "Secțiunea „Despre mine” — titlu", type: "string" },
    {
      name: "aboutSubtitle",
      title: "Secțiunea „Despre mine” — subtitlu",
      type: "text",
      rows: 2,
    },
    {
      name: "aboutParagraphs",
      title: "Paragrafe despre mine",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description:
        "Poți folosi {nume}, {titlu} și {titluMic} — se completează automat din „Date cabinet”. Ex: „Sunt {nume}, {titluMic}.”",
    },
    {
      name: "features",
      title: "Puncte forte",
      type: "array",
      of: [{ type: "feature" }],
    },
    {
      name: "aboutLinkLabel",
      title: "Textul linkului către „Despre mine”",
      type: "string",
    },

    { name: "servicesTitle", title: "Secțiunea „Servicii” — titlu", type: "string" },
    {
      name: "servicesSubtitle",
      title: "Secțiunea „Servicii” — subtitlu",
      type: "text",
      rows: 2,
    },
    {
      name: "servicesAllLabel",
      title: "Buton „toate serviciile”",
      type: "string",
    },
    {
      name: "servicesPricesLabel",
      title: "Buton „lista de tarife”",
      type: "string",
    },

    { name: "cta", title: "Banda de final", type: "ctaBand" },
    { name: "seo", title: "Google și titlul din tab", type: "seo" },
  ],
  preview: { prepare: () => ({ title: "Pagina Acasă" }) },
};
