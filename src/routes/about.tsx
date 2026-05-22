import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cozy Green Landscaping" },
      { name: "description", content: "Meet the team behind Cozy Green Landscaping — our story, mission, and the values that drive our craft." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Heart, title: "Customer First", text: "We listen, advise honestly, and stand behind our work." },
  { icon: Leaf, title: "Sustainable Craft", text: "Native plantings, water-wise design and eco-friendly methods." },
  { icon: ShieldCheck, title: "Reliable & Insured", text: "Licensed crews, on-time service and a satisfaction guarantee." },
  { icon: Sparkles, title: "Premium Quality", text: "Attention to detail in every cut, every seam, every stone." },
];

const TEAM = [
  { name: "Marcus Reyes", role: "Founder & Lead Designer", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80" },
  { name: "Elena Park", role: "Garden Architect", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
  { name: "James O'Connor", role: "Hardscape Foreman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
];

function About() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Rooted in craft. Grown by trust.</h1>
          <p className="mt-5 text-lg opacity-90 max-w-2xl mx-auto">
            We are a family-run landscaping company on a mission to make outdoor spaces feel like home.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80"
            alt="Landscaping crew at work"
            loading="lazy"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Our Story</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">From one yard to hundreds</h2>
            <p className="mt-4 text-muted-foreground">
              Cozy Green Landscaping started in 2013 with a single push-mower and a love for the outdoors.
              A decade later, we're a full-service design and maintenance team trusted by hundreds of families
              across the region. We've grown by treating every yard like our own — and every client like a neighbor.
            </p>
            <h3 className="mt-6 text-xl font-bold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To create healthy, beautiful, sustainable outdoor spaces that bring people closer to nature — and to each other.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">What we stand for</h2>
            <p className="mt-3 text-muted-foreground">Four values guide every project we take on.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-card rounded-2xl p-6 border border-border">
                <v.icon className="w-8 h-8 text-primary" />
                <h3 className="mt-3 font-bold text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Meet the team</h2>
            <p className="mt-3 text-muted-foreground">Designers, horticulturists and craftspeople you can trust.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl overflow-hidden border border-border bg-card">
                <img src={m.img} alt={m.name} loading="lazy" className="w-full h-72 object-cover" />
                <div className="p-5">
                  <div className="font-bold">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/contact">Work with our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}