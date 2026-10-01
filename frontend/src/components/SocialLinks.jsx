import { useContent } from "../content/context.js";

/* Sanity stores the platform as a lowercase value; these are the display names. */
const LABELS = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
};

const ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3h-2.7v12.1a2.5 2.5 0 1 1-2-2.45V9.9a5.5 5.5 0 1 0 4.7 5.44V9.01a6.3 6.3 0 0 0 3.5 1.07V7.35a3.6 3.6 0 0 1-3.5-3.5V3Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.38 0-4.02 1.46-4.02 4.13V9.9H7.5V13h2.77v8h3.23Z" />
    </svg>
  ),
};

export default function SocialLinks({ className = "", showLabels = false }) {
  const { socials } = useContent();

  return (
    <ul
      className={`socials ${showLabels ? "socialsLabeled" : ""} ${className}`
        .replace(/\s+/g, " ")
        .trim()}
    >
      {socials.map((s) => {
        const label = LABELS[s.id] || s.label || s.id;
        return (
        <li key={s.id}>
          <a
            className="socialBtn"
            href={s.url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={s.handle ? `${label} — ${s.handle}` : label}
            title={s.handle ? `${label} · ${s.handle}` : label}
          >
            <span className="socialIcon" aria-hidden="true">
              {ICONS[s.id]}
            </span>
            {showLabels && <span className="socialLabel">{label}</span>}
          </a>
        </li>
        );
      })}
    </ul>
  );
}
