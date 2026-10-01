export default {
  name: "whatsappMessage",
  title: "Mesajul trimis pe WhatsApp",
  type: "object",
  options: { collapsible: true, collapsed: true },
  description:
    "Rândurile din care se compune mesajul. Ordinea e fixă; textul e al tău.",
  fields: [
    { name: "greeting", title: "Salut", type: "string" },
    {
      name: "nameLine",
      title: "Rândul cu numele",
      type: "string",
      description:
        "{client} este numele scris de vizitator. Rândul apare doar dacă l-a completat. Ex: „Mă numesc {client}.”",
    },
    { name: "intro", title: "Rândul de introducere", type: "string" },
    { name: "serviceLabel", title: "Eticheta „Serviciu”", type: "string" },
    {
      name: "serviceUnknown",
      title: "Text când nu a ales un serviciu",
      type: "string",
    },
    { name: "modalityLabel", title: "Eticheta „Modalitate”", type: "string" },
    { name: "intervalLabel", title: "Eticheta „Interval”", type: "string" },
    { name: "detailsLabel", title: "Eticheta „Detalii”", type: "string" },
    { name: "closing", title: "Rândul de final", type: "string" },
  ],
};
