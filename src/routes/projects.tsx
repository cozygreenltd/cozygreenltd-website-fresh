import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { AnimatedImage } from "@/components/animated-image";
import { usePageMeta } from "@/lib/use-page-meta";
import projectsHero from "@/assets/project-before-after.png";
import projectLawn from "@/assets/service-lawn.png";
import projectGarden from "@/assets/service-garden.png";
import projectHardscape from "@/assets/service-hardscape.png";
import projectLighting from "@/assets/service-lighting.png";
import projectTree from "@/assets/service-tree.png";
import projectCleanup from "@/assets/service-cleanup.png";
import projectHero from "@/assets/hero-landscape.jpg";
import projectHeroPng from "@/assets/hero-landscape.png";

const PROJECTS = [
  { cat: "Lawn", title: "Suburban Lawn Revival", img: projectLawn },
  { cat: "Garden", title: "Pollinator Garden Refresh", img: projectGarden },
  { cat: "Hardscape", title: "Flagstone Patio Build", img: projectHardscape },
  { cat: "Lighting", title: "Modern Path Lighting", img: projectLighting },
  { cat: "Garden", title: "Front Yard Makeover", img: projectHeroPng },
  { cat: "Lawn", title: "Estate Lawn Care", img: projectHero },
  { cat: "Hardscape", title: "Backyard Fire Pit", img: projectsHero },
  { cat: "Garden", title: "Cottage Border Design", img: projectTree },
  { cat: "Lighting", title: "Garden Uplighting", img: projectCleanup },
];

const CATS = ["All", "Lawn", "Garden", "Hardscape", "Lighting"];

export function ProjectsPage() {
  usePageMeta({
    title: "Projects — Cozy Green Landscaping",
    description: "Before-and-after landscaping projects from our portfolio.",
  });

  const [active, setActive] = useState("All");
  const items = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);
  return (
    <>
      <PageHero
        imageSrc={projectsHero}
        title="Before &amp; after"
        description="A look at recent transformations from our portfolio."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  active === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <div key={p.title} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <AnimatedImage
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  zoomDuration={12}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-widest opacity-80">{p.cat}</div>
                    <div className="text-lg font-bold">{p.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
