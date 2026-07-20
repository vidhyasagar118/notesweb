import { useEffect } from "react";

const SITE = "https://thenotes.online";

function setMeta(name, content, attribute = "name") {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function PageSEO({
  title,
  description,
  path = "/",
  noindex = false,
  type = "website",
  schemaType = "WebPage",
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE}${path === "/" ? "/" : path}`;
    document.title = title;

    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("googlebot", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    let structuredData = document.head.querySelector("#notesweb-page-schema");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.id = "notesweb-page-schema";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": schemaType,
      name: title,
      description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "NotesWeb",
        url: `${SITE}/`,
      },
      publisher: {
        "@type": "Organization",
        name: "NotesWeb",
        url: `${SITE}/`,
      },
    });
  }, [title, description, path, noindex, type, schemaType]);

  return null;
}
