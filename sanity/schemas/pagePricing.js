export default {
  name: "pagePricing",
  title: "Pagina Tarife",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Titlu principal", type: "text", rows: 2 },
    { name: "heroLead", title: "Text introductiv", type: "text", rows: 3 },
    {
      name: "companyTitle",
      title: "Card companii — titlu",
      type: "string",
      description:
        "Lista de servicii din acest card vine din categoria „Companii și organizații”.",
    },
    { name: "companyQuote", title: "Card companii — etichetă preț", type: "string" },
    { name: "companyIntro", title: "Card companii — rând introductiv", type: "string" },
    { name: "infoTitle", title: "Notă despre tarife — titlu", type: "string" },
    {
      name: "infoParagraphs",
      title: "Notă despre tarife — paragrafe",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "infoContact",
      title: "Notă despre tarife — rândul de final",
      type: "text",
      rows: 2,
    },
    {
      name: "allTabLabel",
      title: "Eticheta primului tab",
      type: "string",
      description: "Tabul care arată toate categoriile. Ex: „Toate”.",
    },
    {
      name: "bookLabel",
      title: "Butonul din cardul de tarif",
      type: "string",
      description: "Ex: „Programează →”.",
    },
    {
      name: "companyCtaLabel",
      title: "Butonul din cardul pentru companii",
      type: "string",
    },
    {
      name: "companyQuoteService",
      title: "Serviciul precompletat la cererea de ofertă",
      type: "string",
      description:
        "Apare în mesajul de pe WhatsApp când cineva cere ofertă pentru companii.",
    },
    { name: "seo", title: "Google și titlul din tab", type: "seo" },
  ],
  preview: { prepare: () => ({ title: "Pagina Tarife" }) },
};
