import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { useContent } from "../content/context.js";
import { useDocumentMeta } from "../content/useDocumentMeta.js";
import { formatDate } from "../lib/format.js";
import { POST_QUERY } from "../lib/queries.js";
import { client, isSanityConfigured, urlFor } from "../lib/sanity.js";

/** Renderers for the rich-text blocks authored in the studio. */
const components = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value);
      if (!url) return null;
      return (
        <figure className="postFigure">
          <img src={url.width(1200).url()} alt={value.alt || ""} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const external = /^https?:\/\//.test(value?.href || "");
      return (
        <a
          href={value?.href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const { site, posts, pages } = useContent();
  const copy = pages.blog;

  // The list already carries title/date/cover, so the page can render
  // immediately while the body loads.
  const summary = posts.find((p) => p.slug === slug);

  // Keyed by slug so "still loading" is derived, never set inside the effect.
  const [fetched, setFetched] = useState({ slug: null, post: null, failed: false });

  useEffect(() => {
    if (!isSanityConfigured) return;

    let cancelled = false;
    client
      .fetch(POST_QUERY, { slug })
      .then((data) => {
        if (!cancelled) setFetched({ slug, post: data, failed: false });
      })
      .catch(() => {
        if (!cancelled) setFetched({ slug, post: null, failed: true });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const settled = fetched.slug === slug;
  const loading = isSanityConfigured && !settled;
  const post = settled ? fetched.post : null;
  const shown = post || summary;

  // Articolul își dă propriul titlu și descriere; altfel cad pe cele din „Blog”.
  useDocumentMeta(copy.seo, site, {
    title: shown ? `${shown.title} — ${site.name}` : undefined,
    description: shown?.excerpt,
  });

  if (!loading && !shown) {
    return (
      <main>
        <section className="pageHero">
          <div className="page">
            <h1 className="h1 pageH1">{copy.postNotFoundTitle}</h1>
            <p className="lead">{copy.postNotFoundBody}</p>
            <Link className="secondaryBtn" to="/blog">
              {copy.postBackLabel}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const cover = urlFor(shown?.coverImage);

  return (
    <main>
      <article>
        <section className="pageHero">
          <div className="page postHeader">
            <Link className="inlineLink" to="/blog">
              {copy.postBackLabel}
            </Link>
            <h1 className="h1 pageH1">{shown?.title}</h1>
            {shown?.publishedAt && (
              <time className="postDate" dateTime={shown.publishedAt}>
                {formatDate(shown.publishedAt)}
              </time>
            )}
            {shown?.excerpt && <p className="lead">{shown.excerpt}</p>}
          </div>
        </section>

        <section className="section">
          <div className="page">
            {cover && (
              <Reveal className="postHero" as="figure">
                <img
                  src={cover.width(1400).url()}
                  alt={shown.coverImage?.alt || ""}
                  loading="eager"
                />
              </Reveal>
            )}

            <div className="postContent">
              {post?.body ? (
                <PortableText value={post.body} components={components} />
              ) : loading ? (
                <p className="postLoading">{copy.postLoadingLabel}</p>
              ) : settled && fetched.failed ? (
                <p className="postLoading">{copy.postErrorLabel}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="page">
            <Reveal className="ctaBand" as="div">
              <div>
                <h2 className="ctaBandTitle">{copy.postCta.title}</h2>
                <p className="ctaBandBody">{copy.postCta.body}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </main>
  );
}
