import { useEffect } from "react";
import { fill } from "./context.js";

/** Creează <meta name="..."> dacă lipsește, apoi îi scrie conținutul. */
function setMeta(name, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Titlul din tab și descrierea pentru Google, luate din câmpurile SEO ale
 * paginii. Acceptă substituenții {nume}, {titlu}, {titluMic}.
 *
 * `override` e pentru titlurile care depind de date încărcate (ex. un articol).
 */
export function useDocumentMeta(seo, site, override) {
  const title = override?.title || seo?.metaTitle;
  const description = override?.description || seo?.metaDescription;

  useEffect(() => {
    const resolved = fill(title, site);
    if (resolved) document.title = resolved;
    setMeta("description", fill(description, site) || site?.metaDescription);
  }, [title, description, site]);
}
