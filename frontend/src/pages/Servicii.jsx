import { Link } from "react-router-dom";
import ContactButton from "../components/ContactButton.jsx";
import Reveal from "../components/Reveal.jsx";
import { isTextBadge, useContent } from "../content/context.js";
import { useDocumentMeta } from "../content/useDocumentMeta.js";

export default function Servicii() {
  const { site, categories, pages } = useContent();
  const copy = pages.services;

  useDocumentMeta(copy.seo, site);

  return (
    <main>
      <section className="pageHero">
        <div className="page">
          <Reveal>
            <h1 className="h1 pageH1">{copy.heroTitle}</h1>
            <p className="lead">{copy.heroLead}</p>
            <div className="heroActions">
              <Link className="secondaryBtn" to="/tarife">
                {copy.heroSecondaryLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="page domainList">
          {categories.map((d) => (
            <Reveal className="domainCard" as="article" key={d.id}>
              <div className="domainSide">
                <span
                  className={`domainNumber ${
                    isTextBadge(d.number) ? "domainNumberWord" : ""
                  }`.trim()}
                >
                  {d.number}
                </span>
              </div>
              <div className="domainMain">
                <h2 className="domainTitle">{d.title || d.label}</h2>
                <p className="domainBody">{d.body}</p>
                <ul className="checkList">
                  {(d.highlights || []).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <Link className="inlineLink" to={`/tarife#${d.id}`}>
                  {copy.categoryLinkLabel}
                </Link>
              </div>
            </Reveal>
          ))}
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
