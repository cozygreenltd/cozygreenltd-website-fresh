import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Cozy Green Landscaping" },
      { name: "description", content: "Hear from homeowners who love their outdoor spaces — and our team." },
    ],
  }),
  component: Testimonials,
});

const REVIEWS = [
  { name: "Sarah M.", role: "Homeowner", rating: 5, text: "Cozy Green turned our patchy lawn into a backyard oasis. The crew was professional and the pricing was fair." },
  { name: "David L.", role: "Property Manager", rating: 5, text: "Reliable, on time, and the quality is unmatched. They handle three of our properties and never disappoint." },
  { name: "Maya R.", role: "Homeowner", rating: 5, text: "From design to installation, every step was clearly communicated. We love our new garden!" },
  { name: "Chris P.", role: "Homeowner", rating: 5, text: "The hardscape patio is gorgeous and built to last. Worth every penny." },
  { name: "Aiko T.", role: "Homeowner", rating: 5, text: "Outdoor lighting transformed our evenings. Absolutely magical." },
  { name: "Jordan F.", role: "Small Business Owner", rating: 5, text: "Professional, friendly and creative. Our storefront has never looked better." },
];

function Testimonials() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Loved by our neighbors</h1>
          <p className="mt-5 text-lg opacity-90">5-star reviews from across the community.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-card border border-border rounded-2xl p-6 flex flex-col">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground flex-1">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="font-bold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}