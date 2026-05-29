// Service catalog page with individual offerings and quote prompts.
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { AnimatedImage } from "@/components/animated-image";
import { Link } from "@/lib/navigation";
import { createLocalBusinessSchema } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";
import { CheckCircle2 } from "lucide-react";
import { ArrowPill, CtaBand, SectionIntro, TrustGrid } from "@/components/scapely-sections";
import servicesHero from "@/assets/hero-landscape.jpg";
import serviceLawn from "@/assets/snow.png";
import serviceGarden from "@/assets/service-garden.png";
import serviceTree from "@/assets/service-tree.png";
import serviceHardscape from "@/assets/carpentry.png";
import serviceCleanup from "@/assets/service-cleanup.png";
import projectBeforeAfter from "@/assets/project-before-after.png";

const SERVICES = [
  // Each service card pairs an image with short summary copy and bullet highlights.
  {
    name: "Garden Clean Ups",
    img: serviceCleanup,
    desc: "Seasonal cleanup work that keeps your yard tidy, fresh and ready for the next season.",
    bullets: [
      "Leaf and debris removal",
      "Bed edging and mulch refreshes",
      "Final haul-off and detailing",
    ],
  },
  {
    name: "Garden Bed Maintenance",
    img: serviceGarden,
    desc: "Ongoing upkeep that keeps planting beds healthy, neat and consistently beautiful.",
    bullets: [
      "Weeding and Bed Maintenance ",
      "Pruning and Trimming",
      "Seasonal Planting and Enhancement",
    ],
  },
  {
    name: "Garden Renovations",
    img: projectBeforeAfter,
    desc: "Refresh tired outdoor spaces with improved planting, structure and visual flow.",
    bullets: ["New planting layouts", "Soil and mulch replacement", "Bed reshaping and cleanup"],
  },
  {
    name: "Landscape Design & Construction",
    img: servicesHero,
    desc: "Custom landscape planning and installation from concept to finished outdoor space.",
    bullets: [
      "Hardscape installation",
      "Softscape planning",
      "Project management from start to finish",
    ],
  },
  {
    name: "Landscape Carpentry",
    img: serviceHardscape,
    desc: "Wood and stone features that add structure, privacy and character to your yard.",
    bullets: ["Pergolas and arbors", "Privacy screens", "Custom planters and borders"],
  },
  {
    name: "Tree Pruning",
    img: serviceTree,
    desc: "Professional pruning and shaping to support healthy growth and long-term tree health.",
    bullets: ["Deadwood removal", "Crown shaping", "Seasonal health checks"],
  },
  {
    name: "Snow Removal",
    img: serviceLawn,
    desc: "Reliable winter service to keep driveways and walkways clear, safe and accessible.",
    bullets: ["Driveway clearing", "Walkway shoveling", "Ice management"],
  },
];

export function ServicesPage() {
  // This page highlights the service menu so users can jump straight to a quote request.
  usePageMeta({
    title: "Services — Cozy Green Landscaping",
    description:
      "Garden clean ups, bed maintenance, tree pruning, design-build landscaping, carpentry and snow removal in Calgary.",
    image: servicesHero,
    structuredData: [
      createLocalBusinessSchema({
        url: "/services",
        image: servicesHero,
        description:
          "Garden clean ups, bed maintenance, tree pruning, design-build landscaping, carpentry and snow removal in Calgary.",
      }),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cozy Green Landscaping services",
        itemListElement: SERVICES.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.name,
            description: service.desc,
            areaServed: "Calgary and surrounding communities",
          },
        })),
      },
    ],
  });

  return (
    <>
      <PageHero imageSrc={servicesHero} title="Services" description="Services" />

      <section className="page-section bg-background py-24">
        <div className="mx-auto max-w-[1320px] px-2 sm:px-3 lg:px-4">
          <SectionIntro eyebrow="Services" title="Professional Solutions for Outdoor Areas" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.name}
                className="group rounded-[10px] bg-card p-5 shadow-[0_18px_45px_rgba(44,74,40,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{s.name}</h2>
                    <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                  <ArrowPill label={s.name} />
                </div>
                <AnimatedImage
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="mt-5 h-48 w-full rounded-[8px] object-cover"
                />
                <div className="flex flex-col">
                  <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                    {s.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-5 w-full">
                    <Link to="/contact">Request a Quote</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustGrid />

      <section className="page-section bg-background py-24">
        <div className="mx-auto max-w-[1320px] px-2 sm:px-3 lg:px-4">
          <SectionIntro eyebrow="Pricing" title="Flexible Pricing for Garden Maintenance" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Basic Plan",
                price: "$49",
                items: [
                  "Lawn and surface cleanup",
                  "Basic plant care",
                  "Light trimming",
                  "Garden inspection",
                  "Waste removal",
                ],
              },
              {
                name: "Standard Care",
                price: "$99",
                items: [
                  "Lawn maintenance",
                  "Plant trimming and shaping",
                  "Soil and plant health check",
                  "Garden detailing",
                  "Waste cleanup",
                ],
              },
              {
                name: "Complete Care",
                price: "Custom",
                items: [
                  "Full garden maintenance",
                  "Advanced trimming and shaping",
                  "Seasonal plant care",
                  "Garden health assessment",
                  "Complete cleanup",
                ],
              },
            ].map((plan) => (
              <article
                key={plan.name}
                className="rounded-[10px] bg-card p-7 shadow-[0_18px_45px_rgba(44,74,40,0.08)]"
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-5 text-4xl font-semibold">
                  {plan.price}
                  <span className="text-sm font-medium text-muted-foreground"> / Visit</span>
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link to="/contact">Get Started</Link>
                </Button>
                <div className="mt-6 text-sm font-semibold">Includes:</div>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
