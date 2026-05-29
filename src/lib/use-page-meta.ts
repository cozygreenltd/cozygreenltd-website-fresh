// Keeps the document head in sync with the active page.
import { useEffect, useMemo } from "react";
import { absoluteUrl, normalizeSeoPath, siteConfig, type SeoOptions } from "@/lib/seo";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);

  if (meta == null) {
    meta = document.createElement("meta");
    document.head.appendChild(meta);
  }

  Object.entries(attributes).forEach(([key, value]) => meta?.setAttribute(key, value));
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let link = document.head.querySelector<HTMLLinkElement>(selector);

  if (link == null) {
    link = document.createElement("link");
    document.head.appendChild(link);
  }

  Object.entries(attributes).forEach(([key, value]) => link?.setAttribute(key, value));
}

function upsertStructuredData(serializedStructuredData: string | null) {
  const selector = 'script[data-seo="structured-data"]';
  const existing = document.head.querySelector<HTMLScriptElement>(selector);

  if (serializedStructuredData == null) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement("script");
  script.setAttribute("type", "application/ld+json");
  script.setAttribute("data-seo", "structured-data");
  script.textContent = serializedStructuredData;

  if (existing == null) {
    document.head.appendChild(script);
  }
}

export function usePageMeta({
  title,
  description = siteConfig.defaultDescription,
  path,
  image = siteConfig.defaultImage,
  type = "website",
  noIndex = false,
  structuredData,
}: SeoOptions) {
  const serializedStructuredData = useMemo(
    () => (structuredData == null ? null : JSON.stringify(structuredData)),
    [structuredData],
  );

  useEffect(() => {
    const pathname = normalizeSeoPath(path ?? window.location.pathname);
    const canonicalUrl = absoluteUrl(pathname);
    const socialImage = absoluteUrl(image);

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex,nofollow" : "index,follow",
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: siteConfig.name,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: siteConfig.locale,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: socialImage,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: `${siteConfig.name} preview image`,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: socialImage,
    });
    upsertStructuredData(serializedStructuredData);
  }, [description, image, noIndex, path, serializedStructuredData, title, type]);
}
