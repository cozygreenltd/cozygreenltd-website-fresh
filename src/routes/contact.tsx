// Contact page with the quote form and contact details.
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { siteConfig } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";
import hero from "@/assets/hero-landscape.jpg";

export function ContactPage() {
  usePageMeta({
    title: "Contact — Cozy Green Landscaping",
    description: "Request a free quote from Cozy Green Landscaping.",
  });

  const requestedService = new URLSearchParams(window.location.search).get("service") ?? undefined;

  return (
    <>
      <PageHero
        imageSrc={hero}
        title="Get a free quote"
        description="Tell us about your yard and we will be in touch within 24 hours."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contact Us
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Let's talk about your outdoor space
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cozy Green Landscaping can help with clean ups, bed maintenance, renovations,
              landscape construction, carpentry, pruning, and snow removal.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <a
                href={`tel:${siteConfig.contactPhoneHref}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:text-primary"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>{siteConfig.contactPhone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:text-primary"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>{siteConfig.contactEmail}</span>
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{siteConfig.serviceArea}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-lg sm:p-6">
            <QuoteForm variant="plain" defaultService={requestedService} />
          </div>
        </div>
      </section>
    </>
  );
}
