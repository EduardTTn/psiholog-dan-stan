import { useContent, whatsappLinkFor } from "../content/context.js";

/**
 * Butonul de contact: deschide WhatsApp cu același mesaj ca butonul flotant.
 * Apare în meniu și la finalul paginilor. Eticheta vine din „Date cabinet”.
 */
export default function ContactButton({ className = "cta", children, onClick }) {
  const { site } = useContent();

  return (
    <a
      className={className}
      href={whatsappLinkFor(site, site.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children || site.contactButtonLabel}
    </a>
  );
}
