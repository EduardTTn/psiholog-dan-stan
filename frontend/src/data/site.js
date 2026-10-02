export const site = {
  name: "Dan Stan",
  title: "Psiholog clinician",
  cabinet: "Cabinet Individual de Psihologie Dan Stan",
  email: "psih.danstan@gmail.com",
  phone: "0740 278 926",
  whatsapp: "40740278926",
  address: "Constanța · Strada Zburătorului 4 · Mangalia · Strada Ștefan cel Mare 8",
  hours: "Luni–Vineri · 09:00–18:00",
  emergencyNote:
    "În situații de urgență sau criză, contactați imediat serviciile de urgență (112).",
  // Butonul de contact din meniu și din benzile de final: deschide WhatsApp.
  contactButtonLabel: "Contact",
  // Linkul de WhatsApp din subsol și mesajul cu care se deschide.
  whatsappLinkLabel: "WhatsApp",
  whatsappGreeting: "Bună ziua! Aș dori o programare.",
  // Descrierea implicită pentru Google, când o pagină nu are una proprie.
  metaDescription:
    "Cabinet de psihologie Dan Stan — evaluare psihologică clinică, consiliere psihologică, psihologia muncii și evaluări pentru domeniul securității naționale.",
};

export const socials = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@psiholog_dan.stan",
    url: "https://www.instagram.com/psiholog_dan.stan",
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@psiholog_dan.stan",
    url: "https://www.tiktok.com/@psiholog_dan.stan",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "psiholog.danstan",
    url: "https://www.facebook.com/psiholog.danstan/",
  },
];

/**
 * Cabinetele fizice. `mapQuery` este textul trimis către Google Maps — ține-l
 * cât mai aproape de adresa exactă, ca harta să nu aterizeze pe oraș.
 */
export const locations = [
  {
    id: "constanta",
    city: "Constanța",
    street: "Strada Zburătorului 4",
    mapQuery: "Strada Zburătorului 4, Constanța, România",
    note: "Cabinetul principal — evaluări și ședințe de consiliere.",
  },
  {
    id: "mangalia",
    city: "Mangalia",
    street: "Strada Ștefan cel Mare 8",
    mapQuery: "Strada Ștefan cel Mare 8, Mangalia, România",
    note: "Program pe zile stabilite; intervalul se confirmă la programare.",
  },
];

export function whatsappLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
