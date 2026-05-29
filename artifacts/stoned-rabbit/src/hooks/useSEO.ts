import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  /** Canonical path, e.g. "/collections". Defaults to current pathname. */
  canonical?: string;
  /** OG image URL — defaults to /opengraph.jpg */
  image?: string;
  /** "website" | "product" | "article" — defaults to "website" */
  type?: string;
  /** Extra keywords string */
  keywords?: string;
  /** noindex pages (404, private) */
  noindex?: boolean;
}

const SITE_NAME = "Stoned Rabbit";
const BASE_URL  = "https://stoned-rabbit-api-server.vercel.app";
const OG_IMAGE  = `${BASE_URL}/opengraph.jpg`;
const TWITTER_HANDLE = "@stonedrabbit";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  title,
  description,
  canonical,
  image = OG_IMAGE,
  type = "website",
  keywords,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${BASE_URL}${canonical ?? window.location.pathname}`;

    // ── Document title ──────────────────────────────────────────
    document.title = fullTitle;

    // ── Basic meta ──────────────────────────────────────────────
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", noindex ? "noindex,nofollow" : "index,follow");

    // ── Open Graph ──────────────────────────────────────────────
    setMeta("og:site_name",   SITE_NAME,   "property");
    setMeta("og:type",        type,        "property");
    setMeta("og:title",       fullTitle,   "property");
    setMeta("og:description", description, "property");
    setMeta("og:url",         canonicalUrl,"property");
    setMeta("og:image",       image,       "property");
    setMeta("og:image:width",  "1200",     "property");
    setMeta("og:image:height", "630",      "property");

    // ── Twitter Card ────────────────────────────────────────────
    setMeta("twitter:card",        "summary_large_image");
    setMeta("twitter:site",        TWITTER_HANDLE);
    setMeta("twitter:title",       fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image",       image);

    // ── Canonical link ──────────────────────────────────────────
    setLink("canonical", canonicalUrl);
  }, [title, description, canonical, image, type, keywords, noindex]);
}
