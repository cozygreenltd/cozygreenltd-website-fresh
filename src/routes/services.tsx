// Service catalog page with individual offerings and quote prompts.
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { AnimatedImage } from "@/components/animated-image";
import { Link } from "@/lib/navigation";
import { usePageMeta } from "@/lib/use-page-meta";
import { CheckCircle2 } from "lucide-react";
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
      "Lawn maintenance, garden design, tree trimming, outdoor lighting, hardscaping and yard cleanups.",
  });

  return (
    <>
      <PageHero
        imageSrc={servicesHero}
        title="Services that grow with your yard"
        description="From weekly upkeep to full-yard transformations — one team, end to end."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <article
              key={s.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="overflow-hidden">
                <AnimatedImage
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold">{s.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{s.desc}</p>
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
      </section>
    </>
  );
}
