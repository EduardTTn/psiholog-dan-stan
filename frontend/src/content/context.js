import { createContext, useContext } from "react";
import { PARCURS } from "../data/about.js";
import { navigation as localNavigation } from "../data/navigation.js";
import { pages as localPages } from "../data/pages.js";
import {
  COMPANY_SERVICES,
  DOMAINS,
  GROUPS,
  SERVICES,
} from "../data/services.js";
import {
  locations as localLocations,
  site as localSite,
  socials as localSocials,
} from "../data/site.js";

/**
 * The content baked into the bundle. It renders immediately on first paint,
 * so there is no loading flash and no blank page if Sanity is unreachable.
 */
export const LOCAL_CONTENT = {
  site: localSite,
  socials: localSocials,
  locations: localLocations,
  pages: localPages,
  navigation: localNavigation,
  categories: DOMAINS.map((d) => ({
    id: d.id,
    label: GROUPS.find((g) => g.id === d.id)?.label || d.title,
    title: d.title,
    number: d.number,
    body: d.body,
    highlights: d.highlights,
  })),
  services: SERVICES,
  companyServices: COMPANY_SERVICES,
  timeline: PARCURS,
  posts: [],
  source: "local",
};

export const ContentContext = createContext(LOCAL_CONTENT);

export function useContent() {
  return useContext(ContentContext);
}

/** Numeric value behind a price label ("de la 400 lei" -> 400). */
export function priceValue(price) {
  const match = String(price ?? "").match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

/**
 * Eticheta unei categorii poate fi un număr („01”) sau un cuvânt („PACHET”).
 * Un cuvânt nu încape la corpul de literă al numerelor, așa că primește altul —
 * cutia rămâne identică.
 */
export function isTextBadge(value) {
  const text = String(value ?? "").trim();
  return text.length > 0 && !/^\d{1,2}$/.test(text);
}

/** Services of one category, cheapest first. */
export function servicesOf(services, categoryId) {
  return services
    .filter((s) => s.group === categoryId)
    .sort((a, b) => priceValue(a.price) - priceValue(b.price));
}

/**
 * Completează substituenții din textele editabile: {nume}, {titlu}, {titluMic}.
 * Așa numele și titlul profesional se schimbă într-un singur loc („Date
 * cabinet”), fără să fie rescrise în fiecare paragraf.
 */
export function fill(text, site, extra) {
  if (typeof text !== "string" || !text.includes("{")) return text;
  let out = text
    .replace(/\{nume\}/g, site?.name ?? "")
    .replace(/\{titluMic\}/g, (site?.title ?? "").toLowerCase())
    .replace(/\{titlu\}/g, site?.title ?? "");
  for (const [key, value] of Object.entries(extra || {})) {
    out = out.split(`{${key}}`).join(value ?? "");
  }
  return out;
}

/** Full one-line address of a cabinet ("Strada X 1, Oraș"). */
export function locationAddress(location) {
  return [location.street, location.city].filter(Boolean).join(", ");
}

/** What we hand to Google Maps — the explicit query, or the address itself. */
function mapQueryOf(location) {
  return location.mapQuery || `${locationAddress(location)}, România`;
}

/** Embeddable map for an <iframe>. The keyless endpoint, so nothing to rotate. */
export function mapEmbedUrl(location) {
  const q = encodeURIComponent(mapQueryOf(location));
  return `https://www.google.com/maps?q=${q}&hl=ro&z=16&output=embed`;
}

/** "Deschide în Google Maps" — the pin, on maps.google.com. */
export function mapLink(location) {
  const q = encodeURIComponent(mapQueryOf(location));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Turn-by-turn directions to a cabinet, from wherever the visitor is. */
export function directionsLink(location) {
  const q = encodeURIComponent(mapQueryOf(location));
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

/** WhatsApp deep link for the configured number. */
export function whatsappLinkFor(site, message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
