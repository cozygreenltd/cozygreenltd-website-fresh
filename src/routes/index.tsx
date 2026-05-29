// Home page with hero, featured services, trust signals, and project highlights.
import { motion } from "framer-motion";
import {
  Phone,
  CheckCircle2,
  Clock,
  Users,
  Leaf,
  Sparkles,
  Shield,
  Award,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedImage } from "@/components/animated-image";
import { QuoteForm } from "@/components/quote-form";
import { Link } from "@/lib/navigation";
import { usePageMeta } from "@/lib/use-page-meta";
import { siteConfig } from "@/lib/seo";
import hero from "@/assets/hero-landscape.jpg";
import serviceCleanup from "@/assets/service-cleanup.png";
import serviceGarden from "@/assets/service-garden.png";
import serviceHardscape from "@/assets/service-hardscape.png";
import serviceLawn from "@/assets/service-lawn.png";
import serviceTree from "@/assets/service-tree.png";

const BADGES = [
  // Quick trust markers shown in the hero section.
  { icon: CheckCircle2, label: "Free Consultation" },
  { icon: Clock, label: "Fast Response" },
  { icon: Users, label: "Professional Team" },
];

const WHY_CHOOSE = [
  // Short value statements that reinforce the brand promise.
  {
    icon: Award,
    title: "Proven Experience",
    text: "Over 10 years creating clean, healthy, and beautiful outdoor spaces.",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    text: "Your property is protected with fully insured and professional crews.",
  },
  {
    icon: Sparkles,
    title: "Premium Finish",
    text: "We pay attention to the details that make the whole yard feel polished.",
  },
];

const PROJECT_SAMPLES = [
  // Featured projects used to preview the portfolio without loading the full gallery.
  {
    title: "Outdoor Space Renewal",
    category: "Lawn",
    img: serviceLawn,
  },
  {
    title: "Pollinator Garden Refresh",
    category: "Garden",
    img: serviceGarden,
  },
  {
    title: "Paver Patio with Fire Pit",
    category: "Hardscape",
    img: serviceHardscape,
  },
];

const SERVICES = [
  // Landing-page service cards that lead visitors toward the quote form.
  {
    name: "Garden Clean Ups",
    text: "Seasonal leaf removal, bed cleanups, mulch refreshes and pruning.",
    img: serviceCleanup,
  },
  {
    name: "Garden Bed Maintenance",
    text: "Routine mowing, edging, weeding and ongoing garden care.",
    img: serviceGarden,
  },
  {
    name: "Landscape Design & Construction",
    text: "Custom outdoor planning, installation and transformation from start to finish.",
    img: hero,
  },
  {
    name: "Tree Pruning",
    text: "Safe pruning, shaping and tree health maintenance for year-round growth.",
    img: serviceTree,
  },
];

export function HomePage() {
  // The home page sets the SEO metadata for the landing experience.
  usePageMeta({
    title: "Cozy Green Landscaping — Free Quote in 24 Hours",
    description:
      "Transform your outdoor space with expert landscaping, lawn care, garden design and hardscaping. Get a free quote today.",
  });

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100vh] -mt-16 flex items-center">
        <div className="absolute inset-0">
          <AnimatedImage
            src={hero}
            alt="Beautifully landscaped backyard at golden hour"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            zoomDuration={14}
          />
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
              <Leaf className="w-4 h-4" /> Local · Licensed · Insured · Bonded
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              We dont just maintain yards we transform them
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Cozy Green Landscaping designs, builds and maintains stunning outdoor spaces — so you
              can relax and enjoy them.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="text-base">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base bg-white/10 text-white border-white/40 hover:bg-white hover:text-primary"
              >
                <a href={`tel:${siteConfig.contactPhoneHref}`}>
                  <Phone className="w-4 h-4 mr-2" /> Call Us Today
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm text-white/90">
                  <b.icon className="w-5 h-5 text-primary" />
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
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            About Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
            A team that cares for every blade of grass
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            For over a decade, Cozy Green Landscaping has helped homeowners and businesses create
            outdoor spaces they love. From weekly lawn care to full-yard transformations, we bring
            craftsmanship, reliability and a friendly local touch to every project.
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

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              The simple reason clients keep coming back
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We keep the process easy, the work clean, and the results consistent.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <item.icon className="w-10 h-10 text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SAMPLES */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              Project Samples
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">A few recent transformations</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Here are three examples of the kind of work we do for local homes and businesses.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {PROJECT_SAMPLES.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <AnimatedImage
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    zoomDuration={11}
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                    {project.category}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              Services
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Everything your yard needs</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From weekly upkeep to full redesigns, we handle the work from start to finish.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <AnimatedImage
                  src={service.img}
                  alt={service.name}
                  className="h-36 w-full object-cover"
                  zoomDuration={12}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              Find Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Google Map Listing</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Check our location and service area below.
            </p>
          </div>
          <div className="mt-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
            <div className="overflow-hidden rounded-2xl border border-border min-h-[420px]">
              <iframe
                title="Cozy Green Landscaping Google Map"
                src="https://www.google.com/maps?q=Cozy+Green+Landscaping&output=embed"
                className="h-full w-full min-h-[420px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <MapPin className="w-4 h-4" />
                  Google Map Listing
                </div>
                <h3 className="mt-4 text-2xl font-bold">Cozy Green Landscaping</h3>
                <p className="mt-3 text-muted-foreground">
                  Open Monday to Saturday, 8am to 6pm. Serving distinguished properties throughout
                  Calgary and surrounding areas.
                </p>
              </div>
              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link to="/contact">Get Directions / Request Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
