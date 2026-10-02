import { Link } from "react-router-dom";
import ContactButton from "../components/ContactButton.jsx";
import Reveal from "../components/Reveal.jsx";
import portrait from "../assets/dan-stan.jpg";
import { useContent } from "../content/context.js";
import { useDocumentMeta } from "../content/useDocumentMeta.js";

export default function Despre() {
  const { site, timeline, pages } = useContent();
  const copy = pages.about;

  useDocumentMeta(copy.seo, site);

  return (
    <main>
      <section className="pageHero">
        <div className="page">
          <Reveal>
            <h1 className="h1 pageH1">{copy.heroTitle}</h1>
            {copy.heroLead && <p className="lead">{copy.heroLead}</p>}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="page storyLayout">
          <div className="storyAside">
            <Reveal className="portrait" as="figure">
              <img
                className="portraitImg"
                src={portrait}
                alt={`${site.name}, ${site.title.toLowerCase()}, la cabinet`}
                width="825"
                height="1100"
              />
            </Reveal>
            <p className="portraitPlate">
              <span className="portraitPlateName">{site.name}</span>
              <span className="portraitPlateRole">{site.title}</span>
            </p>
          </div>

          <div className="storyBlocks">
            {copy.story.map((block) => (
              <Reveal className="storyBlock" as="section" key={block.label}>
                <h2 className="storyLabel">{block.label}</h2>
                {(block.paragraphs || []).map((p) => (
                  <p className="storyText" key={p.slice(0, 40)}>
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}

            <Reveal className="storyQuote" as="p">
              {copy.closing}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <Reveal className="sectionHeader" as="div">
            <div>
              <h2 className="sectionTitle">{copy.timelineTitle}</h2>
              <p className="sectionSubtitle">{copy.timelineSubtitle}</p>
            </div>
          </Reveal>

          <div className="timeline">
            {timeline.map((p) => (
              <Reveal className="timelineItem" as="div" key={p.title}>
                <span className="timelineDot" aria-hidden="true" />
                <p className="timelinePeriod">{p.period}</p>
                <h3 className="timelineTitle">{p.title}</h3>
                <p className="timelineMeta">{p.meta}</p>
              </Reveal>
            ))}
          </div>
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
