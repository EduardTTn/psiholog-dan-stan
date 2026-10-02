import { Link } from "react-router-dom";

/**
 * Buton de programare pentru un serviciu anume: duce la pagina de programări
 * cu acel serviciu preselectat. Contactul general se face din butonul „Contact”
 * și din butonul flotant de WhatsApp.
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
