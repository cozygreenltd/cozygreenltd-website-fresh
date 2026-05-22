import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, CheckCircle2, Clock, Users, Leaf, Sparkles, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/quote-form";
import hero from "@/assets/hero-landscape.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cozy Green Landscaping — Free Quote in 24 Hours" },
      { name: "description", content: "Transform your outdoor space with expert landscaping, lawn care, garden design and hardscaping. Get a free quote today." },
    ],
  }),
  component: Index,
});

const BADGES = [
  { icon: CheckCircle2, label: "Free Consultation" },
  { icon: Clock, label: "Fast Response" },
  { icon: Users, label: "Professional Team" },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100vh] -mt-16 flex items-center">
        <div className="absolute inset-0">
          <img src={hero} alt="Beautifully landscaped backyard at golden hour" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm">
              <Leaf className="w-4 h-4" /> Local · Licensed · Insured
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Outdoor Space Into Something Beautiful
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Cozy Green Landscaping designs, builds and maintains stunning outdoor
              spaces — so you can relax and enjoy them.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="text-base">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-white/10 text-white border-white/40 hover:bg-white hover:text-primary">
                <a href="tel:+15551234567"><Phone className="w-4 h-4 mr-2" /> Call Us Today</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm text-white/90">
                  <b.icon className="w-5 h-5 text-accent" />
                  {b.label}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <QuoteForm />
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">About Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">A team that cares for every blade of grass</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            For over a decade, Cozy Green Landscaping has helped homeowners and businesses
            create outdoor spaces they love. From weekly lawn care to full-yard transformations,
            we bring craftsmanship, reliability and a friendly local touch to every project.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "10+ Years", text: "Experience serving local homes" },
              { icon: Shield, title: "100% Insured", text: "Fully licensed & insured crews" },
              { icon: Sparkles, title: "500+ Projects", text: "Happy yards across the region" },
            ].map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-border bg-card">
                <s.icon className="w-8 h-8 text-primary mx-auto" />
                <div className="mt-3 font-bold text-xl">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.text}</div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Learn more about us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
