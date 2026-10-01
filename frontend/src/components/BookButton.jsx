import { Link } from "react-router-dom";

/**
 * Booking action for one specific service — goes to the Programări page with
 * it preselected, and that page composes the WhatsApp message. Contactul
 * general se face din butonul flotant de WhatsApp.
 */
export default function BookButton({
  service = "",
  children,
  className = "cta",
  onClick,
}) {
  const to = service
    ? `/programari?serviciu=${encodeURIComponent(service)}`
    : "/programari";

  return (
    <Link className={className} to={to} onClick={onClick}>
      {children}
    </Link>
  );
}
