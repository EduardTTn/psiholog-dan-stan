import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks.jsx";
import logo from "../assets/logo.png";
import {
  locationAddress,
  mapLink,
  useContent,
  whatsappLinkFor,
} from "../content/context.js";

export default function Footer() {
  const { site, locations, navigation } = useContent();

  return (
    <footer className="footer">
      <div className="page footerInner">
        <div>
          <img className="footerLogo" src={logo} alt="" width="400" height="349" />
          <p className="footerBrand">{site.name}</p>
          <p className="footerMeta">{site.title}</p>
          <p className="footerMeta">{site.cabinet}</p>
          <SocialLinks className="footerSocials" />
        </div>

        <nav className="footerNav" aria-label="Navigare secundară">
          {navigation.primary.map((l) => (
            <Link key={l.path} to={l.path}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="footerContact">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a
            href={whatsappLinkFor(site, site.whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.whatsappLinkLabel}
          </a>
          {locations?.map((loc) => (
            <a
              key={loc.id || loc.city}
              href={mapLink(loc)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {loc.city} — {locationAddress(loc)}
            </a>
          ))}
          <span className="footerMeta">{site.hours}</span>
        </div>
      </div>

      <div className="page footerBottom">
        <span>
          © {new Date().getFullYear()} {site.cabinet}
        </span>
        <span>{site.emergencyNote}</span>
      </div>
    </footer>
  );
}
