import Reveal from "./Reveal.jsx";
import {
  directionsLink,
  locationAddress,
  mapEmbedUrl,
  mapLink,
  useContent,
} from "../content/context.js";

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s6.5-5.4 6.5-10.1a6.5 6.5 0 0 0-13 0C5.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.4" />
  </svg>
);

/**
 * The cabinets, each with an embedded Google map. The maps load lazily — two
 * iframes above the fold would otherwise cost more than the section is worth.
 */
export default function Locations() {
  const { locations, pages } = useContent();
  const copy = pages.booking;
  if (!locations?.length) return null;

  return (
    <div className="locationGrid">
      {locations.map((loc) => {
        const address = locationAddress(loc);
        return (
          <Reveal className="locationCard" as="article" key={loc.id || address}>
            <div className="locationMap">
              <iframe
                src={mapEmbedUrl(loc)}
                title={`Hartă — cabinet ${loc.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="locationBody">
              <p className="locationCity">
                <span className="locationPin" aria-hidden="true">
                  <PinIcon />
                </span>
                {copy.cabinetLabel} {loc.city}
              </p>

              <address className="locationAddress">{address}</address>

              {loc.note && <p className="locationNote">{loc.note}</p>}

              <div className="locationActions">
                <a
                  className="locationLink"
                  href={mapLink(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.mapLinkLabel}
                </a>
                <a
                  className="locationLink"
                  href={directionsLink(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.directionsLinkLabel}
                </a>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
