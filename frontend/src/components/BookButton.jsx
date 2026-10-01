import { Link } from "react-router-dom";
import { useContent } from "../content/context.js";

/**
 * Primary booking action — goes to the Programări page.
 * Pass `service` to preselect it there (the page composes the WhatsApp message).
 * Without children, the label comes from „Date cabinet”.
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
