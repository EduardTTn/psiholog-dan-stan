import { Link } from "react-router-dom";
import BookButton from "../components/BookButton.jsx";
import Reveal from "../components/Reveal.jsx";
import { useContent } from "../content/context.js";
import { useDocumentMeta } from "../content/useDocumentMeta.js";
import { formatDate } from "../lib/format.js";
import { urlFor } from "../lib/sanity.js";

export default function Blog() {
  const { site, posts, pages } = useContent();
  const copy = pages.blog;

  useDocumentMeta(copy.seo, site);

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
          {posts.length === 0 ? (
            <Reveal className="emptyState" as="div">
              <h2 className="infoTitle">{copy.emptyTitle}</h2>
              <p className="priceCardBody">{copy.emptyBody}</p>
              <BookButton>{copy.emptyCtaLabel}</BookButton>
            </Reveal>
          ) : (
            <div className="postGrid">
              {posts.map((post) => {
                const cover = urlFor(post.coverImage);
                return (
                  <Reveal className="postCard" as="article" key={post.slug}>
                    <Link className="postLink" to={`/blog/${post.slug}`}>
                      {cover && (
                        <img
                          className="postCover"
                          src={cover.width(720).height(420).fit("crop").url()}
                          alt={post.coverImage?.alt || ""}
                          width="720"
                          height="420"
                          loading="lazy"
                        />
                      )}
                      <div className="postBody">
                        <time className="postDate" dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <h2 className="postTitle">{post.title}</h2>
                        {post.excerpt && (
                          <p className="postExcerpt">{post.excerpt}</p>
                        )}
                        <span className="inlineLink">{copy.readMoreLabel}</span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
