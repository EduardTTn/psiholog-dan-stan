import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Locations from "../components/Locations.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  fill,
  locationAddress,
  mapLink,
  useContent,
  whatsappLinkFor,
} from "../content/context.js";
import { useDocumentMeta } from "../content/useDocumentMeta.js";

export default function Programari() {
  const { site, categories, services, locations, pages } = useContent();
  const copy = pages.booking;
  const groups = categories.filter((c) => c.id !== "companii");

  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("serviciu") || "";

  // Ultima opțiune („Flexibil”) e implicită pentru interval, prima pentru
  // modalitate — rămâne așa oricâte opțiuni se definesc în studio.
  const modalities = copy.modalities;
  const intervals = copy.intervals;

  const [serviciu, setServiciu] = useState(preselected);
  const [nume, setNume] = useState("");
  const [modalitate, setModalitate] = useState(modalities[0]);
  const [intervalOrar, setIntervalOrar] = useState(
    intervals[intervals.length - 1]
  );
  const [detalii, setDetalii] = useState("");

  useDocumentMeta(copy.seo, site);

  const t = copy.message;
  const message = [
    t.greeting,
    nume ? fill(t.nameLine, site, { client: nume }) : "",
    t.intro,
    "",
    `${t.serviceLabel}: ${serviciu || t.serviceUnknown}`,
    `${t.modalityLabel}: ${modalitate}`,
    `${t.intervalLabel}: ${intervalOrar}`,
    detalii ? `${t.detailsLabel}: ${detalii}` : "",
    "",
    t.closing,
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n")
    .trim();

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

      <section className="section">
        <div className="page">
          <Reveal className="sectionHeader" as="div">
            <div>
              <h2 className="sectionTitle">{copy.stepsTitle}</h2>
              <p className="sectionSubtitle">{copy.stepsSubtitle}</p>
            </div>
          </Reveal>

          <div className="cards4">
            {copy.steps.map((s) => (
              <Reveal className="card" as="article" key={s.number}>
                <div className="cardIcon" aria-hidden="true">
                  {s.number}
                </div>
                <h3 className="cardTitle">{s.title}</h3>
                <p className="cardBody">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page bookingGrid">
          <Reveal className="bookingForm" as="div">
            <div className="field">
              <label className="label" htmlFor="serviciu">
                {copy.serviceLabel}
              </label>
              <select
                id="serviciu"
                className="input"
                value={serviciu}
                onChange={(e) => setServiciu(e.target.value)}
              >
                <option value="">{copy.serviceUnknownOption}</option>
                {/* A ?serviciu= value that isn't one of the listed services
                    (e.g. the company quote request) still shows up selected. */}
                {serviciu && !services.some((s) => s.title === serviciu) && (
                  <option value={serviciu}>{serviciu}</option>
                )}
                {groups.map((g) => (
                  <optgroup key={g.id} label={g.label}>
                    {services.filter((s) => s.group === g.id).map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="nume">
                {copy.nameLabel}{" "}
                <span className="helper">{copy.optionalNote}</span>
              </label>
              <input
                id="nume"
                className="input"
                value={nume}
                onChange={(e) => setNume(e.target.value)}
                autoComplete="name"
                placeholder={copy.namePlaceholder}
              />
            </div>

            <div className="field">
              <span className="label">{copy.modalityLabel}</span>
              <div className="choiceRow">
                {modalities.map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={modalitate === m}
                    className={`choiceChip ${
                      modalitate === m ? "choiceChipActive" : ""
                    }`}
                    onClick={() => setModalitate(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <span className="label">{copy.intervalLabel}</span>
              <div className="choiceRow">
                {intervals.map((i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={intervalOrar === i}
                    className={`choiceChip ${
                      intervalOrar === i ? "choiceChipActive" : ""
                    }`}
                    onClick={() => setIntervalOrar(i)}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="detalii">
                {copy.detailsLabel}{" "}
                <span className="helper">{copy.optionalNote}</span>
              </label>
              <textarea
                id="detalii"
                className="textarea"
                value={detalii}
                onChange={(e) => setDetalii(e.target.value)}
                placeholder={copy.detailsPlaceholder}
              />
            </div>
          </Reveal>

          <Reveal className="previewCard" as="aside">
            <p className="previewSubtitle">{copy.previewTitle}</p>
            <div className="messagePreview">{message}</div>

            <a
              className="cta whatsappBtn"
              href={whatsappLinkFor(site, message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.sendLabel}
            </a>

            <div className="toast" style={{ marginTop: 14 }}>
              {copy.whatsappNote}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <Reveal className="sectionHeader" as="div">
            <div>
              <h2 className="sectionTitle">{copy.locationsTitle}</h2>
              <p className="sectionSubtitle">{copy.locationsSubtitle}</p>
            </div>
          </Reveal>

          <Locations />
        </div>
      </section>

      <section className="section">
        <div className="page">
          <Reveal className="infoCard" as="aside">
            <h2 className="infoTitle">{copy.contactTitle}</h2>
            <ul className="infoList">
              <li>
                <strong>{copy.contactPhoneLabel}:</strong>{" "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </li>
              <li>
                <strong>{copy.contactEmailLabel}:</strong>{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {locations?.length ? (
                locations.map((loc) => (
                  <li key={loc.id || loc.city}>
                    <strong>
                      {copy.cabinetLabel} {loc.city}:
                    </strong>{" "}
                    <a href={mapLink(loc)} target="_blank" rel="noopener noreferrer">
                      {locationAddress(loc)}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <strong>{copy.cabinetLabel}:</strong> {site.address}
                </li>
              )}
              <li>
                <strong>{copy.contactHoursLabel}:</strong> {site.hours}
              </li>
            </ul>

            <div className="toast" style={{ marginTop: 14 }}>
              {site.emergencyNote}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
