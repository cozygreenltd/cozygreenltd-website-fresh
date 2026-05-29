export const siteConfig = {
  name: "Cozy Green Landscaping",
  url: "https://cozygreen.com",
  locale: "en_CA",
  defaultTitle: "Cozy Green Landscaping",
  defaultDescription:
    "Transform your outdoor space with expert landscaping, lawn care, garden design and hardscaping in Calgary.",
  defaultImage: "/logo.jpg",
  contactEmail: "info@cozygreenltd.ca",
  contactPhone: "+1 (825) 305-1192",
  contactPhoneHref: "+18253051192",
  serviceArea: "Calgary and surrounding communities",
  addressLocality: "Calgary",
  addressRegion: "AB",
  addressCountry: "CA",
  businessHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
} as const;

export type SeoOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export const marketingRoutes = [
  "/",
  "/about",
  "/services",
  "/faq",
  "/contact",
] as const;

export function normalizeSeoPath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

export function absoluteUrl(pathOrUrl: string | undefined) {
  const value = pathOrUrl == null || pathOrUrl === "" ? "/" : pathOrUrl;
  return new URL(value, `${siteConfig.url}/`).toString();
}

export function createLocalBusinessSchema(options?: {
  url?: string;
  image?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: options?.description ?? siteConfig.defaultDescription,
    url: absoluteUrl(options?.url ?? "/"),
    image: absoluteUrl(options?.image ?? siteConfig.defaultImage),
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    areaServed: siteConfig.serviceArea,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry,
    },
    openingHoursSpecification: siteConfig.businessHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      ...hours,
    })),
    priceRange: "$$",
  };
}

export function createWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
  };
}