import { useEffect, useState } from "react";
import { CONTENT_QUERY } from "../lib/queries.js";
import { client, isSanityConfigured } from "../lib/sanity.js";
import { ContentContext, LOCAL_CONTENT } from "./context.js";
import { merge } from "./merge.js";

export function ContentProvider({ children }) {
  const [content, setContent] = useState(LOCAL_CONTENT);

  useEffect(() => {
    if (!isSanityConfigured) return;

    let cancelled = false;
    client
      .fetch(CONTENT_QUERY)
      .then((data) => {
        if (cancelled) return;
        setContent({ ...merge(LOCAL_CONTENT, data), source: "sanity" });
      })
      .catch((err) => {
        // Keep the local content rather than breaking the page.
        console.error("Sanity fetch failed, using local content:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
  );
}
