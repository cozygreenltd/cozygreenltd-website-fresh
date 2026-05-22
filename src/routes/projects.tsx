import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Cozy Green Landscaping" },
      { name: "description", content: "Before-and-after landscaping projects from our portfolio." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  { cat: "Lawn", title: "Suburban Lawn Revival", img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1000&q=80" },
  { cat: "Garden", title: "Pollinator Garden Refresh", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&q=80" },
  { cat: "Hardscape", title: "Flagstone Patio Build", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1000&q=80" },
  { cat: "Lighting", title: "Modern Path Lighting", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" },
  { cat: "Garden", title: "Front Yard Makeover", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1000&q=80" },
  { cat: "Lawn", title: "Estate Lawn Care", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=1000&q=80" },
  { cat: "Hardscape", title: "Backyard Fire Pit", img: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=1000&q=80" },
  { cat: "Garden", title: "Cottage Border Design", img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=1000&q=80" },
  { cat: "Lighting", title: "Garden Uplighting", img: "https://images.unsplash.com/photo-1601928320104-066bb541ade2?w=1000&q=80" },
];

const CATS = ["All", "Lawn", "Garden", "Hardscape", "Lighting"];

function Projects() {
  const [active, setActive] = useState("All");
  const items = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Before &amp; after</h1>
          <p className="mt-5 text-lg opacity-90">A look at recent transformations from our portfolio.</p>
        </div>
      </section>

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
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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