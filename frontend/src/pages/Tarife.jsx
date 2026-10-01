import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookButton from "../components/BookButton.jsx";
import Reveal from "../components/Reveal.jsx";
import { servicesOf, useContent } from "../content/context.js";
import { useDocumentMeta } from "../content/useDocumentMeta.js";

export default function Tarife() {
  const { site, categories, services, companyServices, pages } = useContent();
  const copy = pages.pricing;
  // "companii" has no priced services — it renders as its own card below.
  const groups = categories.filter((c) => c.id !== "companii");
  const tabs = [{ id: "toate", label: copy.allTabLabel }, ...groups];

  const { hash } = useLocation();
  // Deep link from /servicii, e.g. /tarife#consiliere
  const target = hash ? decodeURIComponent(hash.slice(1)) : "";
  const isGroup = groups.some((g) => g.id === target);

  const [activeTab, setActiveTab] = useState(isGroup ? target : "toate");

  // A new hash selects its category, while still letting the user click the
  // tabs freely afterwards. Adjusting state during render (rather than in an
  // effect) avoids rendering the old tab for a frame.
  const [lastTarget, setLastTarget] = useState(target);
  if (target !== lastTarget) {
    setLastTarget(target);
    if (isGroup) setActiveTab(target);
  }

  // Scroll once the selected category has been committed to the DOM.
  useEffect(() => {
    if (!target) return;

    const t = setTimeout(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => clearTimeout(t);
  }, [target]);

  useDocumentMeta(copy.seo, site);

  const visibleGroups =
    activeTab === "toate" ? groups.map((g) => g.id) : [activeTab];

  return (
    <main>
      <section className="pageHero">
        <div className="page">
          <Reveal>
            <h1 className="h1 pageH1">{copy.heroTitle}</h1>
            <p className="lead">{copy.heroLead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section tarifeSection">
        <div className="page">
          <Reveal className="tabRow" as="div" role="tablist" aria-label="Categorii de servicii">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={activeTab === t.id}
                className={`tabChip ${activeTab === t.id ? "tabChipActive" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </Reveal>

          {visibleGroups.map((groupId) => {
            const group = groups.find((g) => g.id === groupId);
            const items = servicesOf(services, groupId);

            return (
              <div className="tarifeGroup" id={groupId} key={groupId}>
                <Reveal as="h2" className="tarifeGroupTitle">
                  {group?.label}
                </Reveal>

                <div className="priceGrid">
                  {items.map((s) => (
                    <Reveal className="priceCard" as="article" key={s.title}>
                      <div className="priceCardTop">
                        <h3 className="priceCardTitle">{s.title}</h3>
                        <span className="priceTag">{s.price}</span>
                      </div>
                      {s.duration && (
                        <span className="durationTag">{s.duration}</span>
                      )}
                      <p className="priceCardBody">{s.body}</p>
                      {s.footnote && (
                        <p className="priceCardFootnote">* {s.footnote}</p>
                      )}
                      <BookButton className="priceCardLink" service={s.title}>
                        {copy.bookLabel}
                      </BookButton>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}

          <Reveal className="companyCard" as="article" id="companii">
            <div className="companyCardHead">
              <h2 className="tarifeGroupTitle companyTitle">
                {copy.companyTitle}
              </h2>
              <span className="customQuote">{copy.companyQuote}</span>
            </div>
            <p className="priceCardBody">{copy.companyIntro}</p>
            <ul className="checkList companyList">
              {companyServices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <BookButton
              className="secondaryBtn"
              service={copy.companyQuoteService}
            >
              {copy.companyCtaLabel}
            </BookButton>
          </Reveal>

          <Reveal className="infoNote" as="div">
            <h2 className="infoNoteTitle">{copy.infoTitle}</h2>
            {copy.infoParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p className="infoNoteContact">{copy.infoContact}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
