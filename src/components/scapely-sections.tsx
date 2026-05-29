import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { siteConfig } from "@/lib/seo";

const TRUST_ITEMS = ["Licensed & Insured", "Local Calgary Team", "Written Estimates"];

const FAQ_ITEMS = [
  {
    question: "How quickly can we start?",
    answer: "Most consultations are scheduled within 3-5 business days.",
  },
  {
    question: "Do you handle maintenance and builds?",
    answer:
      "Yes. We handle seasonal care, garden work, pruning, carpentry, and larger renovations.",
  },
  {
    question: "Can I request a custom service?",
    answer: "Yes. Send the project details and we will confirm the best next step.",
  },
];

export function ArrowPill({ label }: { label: string }) {
  return (
    <span
      className="inline-grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"
      aria-label={label}
    >
      <ArrowRight className="h-4 w-4" />
    </span>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="scapely-eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      {text ? (
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{text}</p>
      ) : null}
    </div>
  );
}

export function ProofStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item}
          className="flex items-center gap-2 rounded-[10px] bg-card p-4 text-sm shadow-[0_12px_30px_rgba(44,74,40,0.06)]"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function TrustGrid() {
  return (
    <section className="page-section bg-primary py-16 text-primary-foreground">
      <div className="mx-auto grid max-w-[1320px] gap-6 px-2 sm:grid-cols-3 sm:px-3 lg:px-4">
        {[
          { value: "10+", label: "Years Experience" },
          { value: "500+", label: "Projects Completed" },
          { value: "24h", label: "Typical Quote Follow-Up" },
        ].map((item) => (
          <div key={item.label} className="rounded-[10px] bg-white/10 p-7">
            <div className="text-4xl font-semibold">{item.value}</div>
            <div className="mt-3 text-sm font-medium text-white/82">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="page-section bg-foreground py-20 text-background">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-2 sm:px-3 lg:flex-row lg:items-center lg:justify-between lg:px-4">
        <div>
          <span className="scapely-eyebrow text-background before:bg-background">Free Quote</span>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            Ready to improve your outdoor space?
          </h2>
          <p className="mt-4 max-w-xl text-sm text-background/75 sm:text-base">
            Share a few details and the {siteConfig.name} team will follow up with the next step.
          </p>
        </div>
        <Button asChild size="lg" variant="secondary" className="w-fit">
          <Link to="/contact">Get a Free Quote</Link>
        </Button>
      </div>
    </section>
  );
}

export function FaqSplit() {
  return (
    <section className="page-section bg-background py-24">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-2 sm:px-3 lg:grid-cols-[0.82fr_1.18fr] lg:px-4">
        <SectionIntro eyebrow="FAQ" title="Answers to Common Questions" />
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <article
              key={item.question}
              className="rounded-[10px] bg-card p-6 shadow-[0_12px_30px_rgba(44,74,40,0.06)]"
            >
              <h3 className="font-semibold">{item.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
