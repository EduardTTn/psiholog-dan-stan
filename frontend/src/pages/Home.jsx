import { Link } from "react-router-dom";
import ContactButton from "../components/ContactButton.jsx";
import Reveal from "../components/Reveal.jsx";
import portrait from "../assets/dan-stan.jpg";
import { fill, isTextBadge, useContent } from "../content/context.js";
import { useDocumentMeta } from "../content/useDocumentMeta.js";

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
  </svg>
);

const ScreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4.5" width="18" height="12" rx="2" />
    <path d="M8.5 20h7M12 16.5V20" />
  </svg>
);

/* Editorul alege iconița pe nume; desenul rămâne în cod. */
const ICONS = {
  person: PersonIcon,
  screen: ScreenIcon,
};

export default function Home() {
  const { site, categories, pages } = useContent();
  const copy = pages.home;

  useDocumentMeta(copy.seo, site);

  return (
    <main>
      <section className="hero">
        <div className="page heroGrid">
          <Reveal>
            <h1 className="h1">{copy.heroTitle}</h1>
            <p className="lead">{copy.heroLead}</p>
            <div className="heroActions">
              <Link className="secondaryBtn" to="/servicii">
                {copy.heroSecondaryLabel}
              </Link>
            </div>
          </Reveal>

          <Reveal className="heroImage" as="div" />
        </div>
      </section>

      <section className="section">
        <div className="page">
          <Reveal className="sectionHeader" as="div">
            <div>
              <h2 className="sectionTitle">{copy.aboutTitle}</h2>
              <p className="sectionSubtitle">{copy.aboutSubtitle}</p>
            </div>
          </Reveal>

          <div className="aboutGrid">
            <Reveal className="portrait" as="figure">
              <img
                className="portraitImg"
                src={portrait}
                alt={`${site.name}, ${site.title.toLowerCase()}, la cabinet`}
                width="825"
                height="1100"
                loading="lazy"
              />
            </Reveal>

            <Reveal className="copyCard" as="div">
              {copy.aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{fill(paragraph, site)}</p>
              ))}

              <ul className="featureList">
                {copy.features.map(({ icon, title, body }) => {
                  const Icon = ICONS[icon] || ICONS.person;
                  return (
                  <li className="featureItem" key={title}>
                    <span className="featureIcon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="featureText">
                      <span className="featureTitle">{title}</span>
                      <span className="featureBody">{body}</span>
                    </span>
                  </li>
                  );
                })}
              </ul>

              <Link className="inlineLink" to="/despre">
                {copy.aboutLinkLabel}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <Reveal className="sectionHeader" as="div">
            <div>
              <h2 className="sectionTitle">{copy.servicesTitle}</h2>
              <p className="sectionSubtitle">{copy.servicesSubtitle}</p>
            </div>
          </Reveal>

          <div className="cards4">
            {categories.slice(0, 4).map((d) => (
              <Reveal className="card" as="article" key={d.id}>
                <div
                  className={`cardIcon ${
                    isTextBadge(d.number) ? "cardIconWord" : ""
                  }`.trim()}
                  aria-hidden="true"
                >
                  {d.number}
                </div>
                <h3 className="cardTitle">{d.title || d.label}</h3>
                <p className="cardBody">{d.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="servicesFooterLink" as="div">
            <Link className="secondaryBtn" to="/servicii">
              {copy.servicesAllLabel}
            </Link>
            <Link className="secondaryBtn" to="/tarife">
              {copy.servicesPricesLabel}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <Reveal className="ctaBand" as="div">
            <div>
              <h2 className="ctaBandTitle">{copy.cta.title}</h2>
              <p className="ctaBandBody">{copy.cta.body}</p>
            </div>
            <ContactButton />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
