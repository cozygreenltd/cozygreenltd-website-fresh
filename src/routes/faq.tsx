import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Cozy Green Landscaping" },
      { name: "description", content: "Answers to common questions about pricing, scheduling, service areas, consultations and more." },
    ],
  }),
  component: FAQ,
});

const FAQS = [
  { q: "How much do your services cost?", a: "Pricing depends on the size and scope of your project. Lawn maintenance starts around $79/visit; design and hardscape projects are custom-quoted. We provide transparent, written estimates after a free consultation." },
  { q: "How quickly can you schedule a visit?", a: "Most consultations are scheduled within 3-5 business days. For maintenance, we can typically begin service the same week." },
  { q: "What areas do you serve?", a: "We serve the greater metro area and surrounding suburbs within roughly 30 miles. Drop your address on our contact form and we'll confirm coverage." },
  { q: "Is the consultation really free?", a: "Yes — your first on-site consultation is always complimentary, with no obligation." },
  { q: "Do you offer ongoing maintenance plans?", a: "Absolutely. We offer weekly, bi-weekly and monthly maintenance plans, plus seasonal cleanup packages." },
  { q: "How do I get a written estimate?", a: "After your consultation, we'll send a detailed, itemized estimate via email — usually within 24-48 hours." },
  { q: "Are you licensed and insured?", a: "Yes — we're fully licensed and carry general liability and workers' compensation insurance." },
  { q: "Do you use eco-friendly practices?", a: "We prioritize native plantings, water-wise design and low-impact methods whenever possible." },
];

function FAQ() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Frequently asked questions</h1>
          <p className="mt-5 text-lg opacity-90">Don't see your question? <Link to="/contact" className="underline">Ask us directly</Link>.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-xl px-5">
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-10">
            <Button asChild size="lg"><Link to="/contact">Get a Free Quote</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}