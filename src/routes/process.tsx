import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MessageSquare, PencilRuler, Hammer, Sparkles } from "lucide-react";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — Cozy Green Landscaping" },
      { name: "description", content: "From consultation to final touch — our 4-step landscaping process." },
    ],
  }),
  component: Process,
});

const STEPS = [
  { icon: MessageSquare, title: "Consultation", text: "We visit your space, listen to your vision, and assess the site — at no cost." },
  { icon: PencilRuler, title: "Planning", text: "We craft a tailored plan with mood boards, layout drawings and a transparent quote." },
  { icon: Hammer, title: "Execution", text: "Our experienced crews build with care, clean as they go and respect your home." },
  { icon: Sparkles, title: "Final Touch", text: "We walk through every detail with you and set up easy ongoing care." },
];

function Process() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">How we work</h1>
          <p className="mt-5 text-lg opacity-90 max-w-2xl mx-auto">
            A simple, transparent 4-step process — designed to make your project stress-free.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex flex-col sm:flex-row gap-6 items-start bg-card border border-border rounded-2xl p-6">
              <div className="shrink-0 w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center">
                <s.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">Step {i + 1}</div>
                <h3 className="text-2xl font-bold mt-1">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg"><Link to="/contact">Start with a Free Consultation</Link></Button>
        </div>
      </section>
    </>
  );
}