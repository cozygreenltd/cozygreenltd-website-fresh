import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Cozy Green Landscaping" },
      { name: "description", content: "Lawn maintenance, garden design, tree trimming, outdoor lighting, hardscaping and yard cleanups." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { name: "Lawn Maintenance", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=1200&q=80", desc: "Mowing, edging, fertilization and seasonal care that keeps your lawn lush, green and weed-free year round." },
  { name: "Garden Design", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80", desc: "Bespoke planting plans with native species, color, texture and bloom cycles tailored to your home." },
  { name: "Tree Trimming", img: "https://images.unsplash.com/photo-1597844808175-3da32d9d3974?w=1200&q=80", desc: "Safe, certified pruning and shaping to keep your trees healthy, beautiful and storm-ready." },
  { name: "Outdoor Lighting", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", desc: "Low-voltage landscape lighting that highlights paths, plants and architecture after dark." },
  { name: "Hardscaping", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80", desc: "Patios, walkways, retaining walls and fire features crafted from premium natural stone." },
  { name: "Yard Cleanups", img: "https://images.unsplash.com/photo-1416862284037-7a96aaeb6a8d?w=1200&q=80", desc: "Spring & fall cleanups, leaf removal, mulching and bed refreshes — we leave your yard pristine." },
];

function Services() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Services that grow with your yard</h1>
          <p className="mt-5 text-lg opacity-90 max-w-2xl mx-auto">
            From weekly upkeep to full-yard transformations — one team, end to end.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <article key={s.name} className="group rounded-2xl overflow-hidden border border-border bg-card flex flex-col">
              <div className="overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold">{s.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{s.desc}</p>
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