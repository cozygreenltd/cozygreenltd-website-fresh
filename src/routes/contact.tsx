import { Mail, Phone, Clock, MapPin, Instagram, Facebook } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { PageHero } from "@/components/page-hero";
import { usePageMeta } from "@/lib/use-page-meta";
import contactHero from "@/assets/service-garden.png";

function InfoItem({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
      <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="font-bold">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-muted-foreground">{l}</div>
        ))}
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-90">{content}</a> : content;
}

export function ContactPage() {
  usePageMeta({
    title: "Contact — Cozy Green Landscaping",
    description:
      "Get in touch with Cozy Green Landscaping. Phone, email, business hours and free quote form.",
  });

  return (
    <>
      <PageHero
        imageSrc={contactHero}
        title="Let's talk about your yard"
        description="Free quotes within 24 hours."
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <QuoteForm variant="card" />
          <div className="space-y-4">
            <InfoItem icon={Phone} title="Call us" lines={["(555) 123-4567"]} href="tel:+15551234567" />
            <InfoItem icon={Mail} title="Email" lines={["hello@cozygreen.com"]} href="mailto:hello@cozygreen.com" />
            <InfoItem icon={Clock} title="Business hours" lines={["Monday – Saturday · 8am – 6pm", "Sunday · Closed"]} />
            <InfoItem icon={MapPin} title="Service area" lines={["Greater metro area + 30 miles"]} />
            <div className="flex gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              title="Cozy Green Landscaping location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.95%2C40.75&amp;layer=mapnik"
              className="w-full h-[400px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
