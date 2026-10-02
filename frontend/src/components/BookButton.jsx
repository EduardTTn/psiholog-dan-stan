import { Link } from "react-router-dom";
import { useContent } from "../content/context.js";

/**
 * Buton de programare. Fără `children` afișează eticheta din „Date cabinet”
 * (butonul din meniu); cu `service` duce la pagina de programări având acel
 * serviciu preselectat.
 */
export default function BookButton({
  service = "",
  children,
  className = "cta",
  onClick,
}) {
  const { site } = useContent();
  const to = service
    ? `/programari?serviciu=${encodeURIComponent(service)}`
    : "/programari";

  return (
    <Link className={className} to={to} onClick={onClick}>
      {children || site.bookButtonLabel}
    </Link>
  );
}
