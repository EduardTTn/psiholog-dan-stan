import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ContactButton from "./ContactButton.jsx";
import logo from "../assets/logo.png";
import { useContent } from "../content/context.js";

export default function NavBar() {
  const { site, navigation } = useContent();
  const links = navigation.primary;
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="page navInner">
        <Link className="brand" to="/" aria-label={`${site.name} — acasă`}>
          <img className="brandLogo" src={logo} alt="" width="400" height="349" />
          <span className="brandText">
            <span className="brandName">{site.name}</span>
            <span className="brandMeta">{site.title}</span>
          </span>
        </Link>

        <nav className="navLinks" aria-label="Navigare principală">
          {links.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              end={l.path === "/"}
              className={({ isActive }) => (isActive ? "navLinkActive" : "")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <ContactButton className="cta navCta" />

        <button
          type="button"
          className="menuBtn"
          aria-expanded={open}
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`menuBars ${open ? "menuBarsOpen" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="mobileMenu">
          <div className="page mobileMenuInner">
            {links.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mobileLink ${isActive ? "mobileLinkActive" : ""}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <ContactButton className="cta mobileCta" onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
