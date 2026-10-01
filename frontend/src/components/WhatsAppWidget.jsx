import { useLocation } from "react-router-dom";
import { useContent, whatsappLinkFor } from "../content/context.js";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.23 8.3-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.54-3.69 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.3.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

/**
 * Buton flotant de WhatsApp, prezent pe tot site-ul în afară de pagina de
 * programări — acolo formularul compune deja un mesaj mai bun, iar două butoane
 * de WhatsApp pe același ecran s-ar bate cap în cap.
 */
export default function WhatsAppWidget() {
  const { site } = useContent();
  const { pathname } = useLocation();

  if (pathname.startsWith("/programari")) return null;

  const label = site.whatsappLinkLabel || "WhatsApp";

  return (
    <a
      className="waWidget"
      href={whatsappLinkFor(site, site.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Scrie-mi pe ${label}`}
      title={`Scrie-mi pe ${label}`}
    >
      <span className="waWidgetIcon" aria-hidden="true">
        <WhatsAppIcon />
      </span>
    </a>
  );
}
