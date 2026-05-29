// Home page with Scapely-inspired section structure and Cozy Green content.
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedImage } from "@/components/animated-image";
import { QuoteForm } from "@/components/quote-form";
import { Link } from "@/lib/navigation";
import { createLocalBusinessSchema, createWebSiteSchema } from "@/lib/seo";
import { usePageMeta } from "@/lib/use-page-meta";
import {
  ArrowPill,
  CtaBand,
  FaqSplit,
  ProofStrip,
  SectionIntro,
  TrustGrid,
} from "@/components/scapely-sections";
import hero from "@/assets/hero-landscape.jpg";
import heroAlt from "@/assets/hero-landscape.png";
import aboutStory from "@/assets/img1.jpg";
import serviceCleanup from "@/assets/service-cleanup.png";
import serviceGarden from "@/assets/service-garden.png";
import serviceHardscape from "@/assets/service-hardscape.png";
import serviceLawn from "@/assets/service-lawn.png";
import serviceTree from "@/assets/service-tree.png";
import serviceLighting from "@/assets/service-lighting.png";
import projectBeforeAfter from "@/assets/project-before-after.png";

const SERVICES = [
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
    name: "Lawn Care",
    text: "Mowing, edging and detail work that keeps your yard crisp.",
    img: serviceLawn,
  },
  {
    name: "Tree Pruning",
    text: "Safe pruning, shaping and tree health maintenance.",
    img: serviceTree,
  },
  {
    name: "Landscape Design",
    text: "Custom outdoor planning and transformation from start to finish.",
    img: hero,
  },
  {
    name: "Landscape Carpentry",
    text: "Wood and stone features that add structure and character.",
    img: serviceHardscape,
  },
];

const PROJECTS = [
  {
    title: "Outdoor Space Renewal",
    text: "A cleaner lawn and garden layout designed for everyday use.",
    img: serviceLawn,
  },
  {
    title: "Residential Outdoor Space",
    text: "A polished outdoor refresh with tidy beds and strong edges.",
    img: heroAlt,
  },
  {
    title: "Paver Patio with Fire Pit",
    text: "A durable hardscape area built for relaxing outside.",
    img: serviceHardscape,
  },
  {
    title: "Garden Renovation",
    text: "Fresh planting, soil, mulch and reshaped garden flow.",
    img: projectBeforeAfter,
  },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    text: "Cozy Green turned our patchy lawn into a backyard oasis. The crew was professional and the pricing was fair.",
  },
  {
    name: "David L.",
    text: "Reliable, on time, and the quality is unmatched. They handle our properties and never disappoint.",
  },
  {
    name: "Maya R.",
    text: "From design to installation, every step was clearly communicated. We love our new garden.",
  },
];

const INSIGHTS = [
  {
    title: "Seasonal Outdoor Care",
    img: serviceTree,
    text: "Simple maintenance ideas for keeping gardens healthy through the season.",
  },
  {
    title: "Sustainable Outdoor Living",
    img: serviceLighting,
    text: "Practical ways to plan outdoor spaces with lower maintenance needs.",
  },
  {
    title: "Small Landscape Solutions",
    img: serviceGarden,
    text: "Smart upgrades that make compact yards feel more useful and polished.",
  },
];

function getServiceQuoteHref(serviceName: string) {
  return `/contact?service=${encodeURIComponent(serviceName)}#quote`;
}

export function HomePage() {
  usePageMeta({
    title: "Cozy Green Landscaping — Free Quote in 24 Hours",
    description:
      "Transform your outdoor space with expert landscaping, lawn care, garden design and hardscaping in Calgary. Request a free quote within 24 hours.",
    image: hero,
    structuredData: [
      createLocalBusinessSchema({
        image: hero,
        description:
          "Transform your outdoor space with expert landscaping, lawn care, garden design and hardscaping in Calgary.",
      }),
      createWebSiteSchema(),
    ],
  });

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pb-10 pt-28 text-white">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={hero}
          alt=""
          aria-hidden="true"
          data-parallax="0.16"
        />
        <div className="absolute inset-0 bg-black/56" />
        <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-8 px-2 sm:px-3 lg:grid-cols-[0.9fr_0.72fr] lg:px-4">
          <div className="pb-4 lg:pb-0">
            <span className="scapely-eyebrow text-white before:bg-white">
              Landscape & Outdoor Care
            </span>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-[68px]">
              We don&apos;t just maintain yards. We transform them.
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium text-white/82 sm:text-base">
              Cozy Green Landscaping designs, builds and maintains stunning outdoor spaces so you
              can relax and enjoy them.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button
                asChild
                variant="outline"
                className="border-white bg-white text-primary hover:bg-white/90"
              >
                <Link to="/contact">
                  Get Started <ArrowPill label="Start" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/45 bg-white/10 text-white hover:bg-white hover:text-primary"
              >
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-[10px] bg-white p-3 text-foreground shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
            <QuoteForm compact />
          </div>
        </div>
      </section>

      <section className="page-section bg-background py-24">
        <div className="mx-auto max-w-[1320px] px-2 sm:px-3 lg:px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="scapely-eyebrow">About Us</span>
              <h2 className="mt-3 max-w-lg text-4xl font-semibold leading-tight sm:text-5xl">
                A team that cares for every blade of grass
              </h2>
              <AnimatedImage
                src={aboutStory}
                alt="Landscaping crew at work"
                className="mt-8 h-[430px] w-full rounded-[10px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:pt-24">
              <p className="text-sm text-muted-foreground sm:text-base">
                For over a decade, Cozy Green Landscaping has helped homeowners and businesses
                create outdoor spaces they love. From weekly lawn care to full-yard transformations,
                we bring craftsmanship, reliability and a friendly local touch to every project.
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <StatCard
                  title="10+"
                  label="Years Experience"
                  text="Experience serving local homes."
                />
                <StatCard
                  title="500+"
                  label="Projects Done"
                  text="Happy yards across the region."
                />
              </div>
              <div className="mt-5">
                <ProofStrip />
              </div>
              <Button asChild className="mt-8">
                <Link to="/about">
                  More About Us <ArrowPill label="About" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section home-services-fixed py-24 pt-8">
        <div className="mx-auto max-w-[1320px] px-2 sm:px-3 lg:px-4">
          <SectionIntro eyebrow="Services" title="Professional Solutions for Outdoor Areas" />
          <div
            className="services-carousel mt-12 -mx-2 sm:-mx-3 lg:-mx-4"
            aria-label="Featured landscaping services"
          >
            <div className="services-carousel-track">
              {[...SERVICES, ...SERVICES].map((service, index) => (
                <ServiceCard
                  key={`${service.name}-${index}`}
                  {...service}
                  ariaHidden={index >= SERVICES.length}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustGrid />

      <section className="page-section bg-background py-24">
        <div className="mx-auto max-w-[1320px] px-2 sm:px-3 lg:px-4">
          <SectionIntro eyebrow="Project" title="Completed Projects for Outdoor Areas" />
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-background py-24">
        <div className="mx-auto max-w-[1320px] px-2 sm:px-3 lg:px-4">
          <SectionIntro eyebrow="Testimonials" title="Trusted Feedback for Outdoor Services" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <article
                key={review.name}
                className="rounded-[10px] bg-card p-7 shadow-[0_18px_45px_rgba(44,74,40,0.08)]"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">{review.text}</p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {review.name[0]}
                  </span>
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-xs text-muted-foreground">Client</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <FaqSplit />

      <section className="page-section bg-background py-24">
        <div className="mx-auto max-w-[1320px] px-2 sm:px-3 lg:px-4">
          <SectionIntro eyebrow="Blog" title="Landscape Insights for Outdoor Living" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INSIGHTS.map((post) => (
              <article
                key={post.title}
                className="rounded-[10px] bg-card p-5 shadow-[0_18px_45px_rgba(44,74,40,0.08)]"
              >
                <AnimatedImage
                  src={post.img}
                  alt={post.title}
                  className="h-48 w-full rounded-[8px] object-cover"
                  loading="lazy"
                />
                <div className="mt-5 text-xs text-muted-foreground">
                  May 27, 2026&nbsp;&nbsp;•&nbsp;&nbsp;Outdoor Care
                </div>
                <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{post.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ title, label, text }: { title: string; label: string; text: string }) {
  return (
    <article className="rounded-[10px] bg-card p-7 shadow-[0_18px_45px_rgba(44,74,40,0.08)]">
      <div className="text-4xl font-semibold">{title}</div>
      <h3 className="mt-4 text-lg font-semibold">{label}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
    </article>
  );
}

function ServiceCard({
  name,
  text,
  img,
  ariaHidden = false,
}: {
  name: string;
  text: string;
  img: string;
  ariaHidden?: boolean;
}) {
  return (
    <Link
      to={getServiceQuoteHref(name)}
      tabIndex={ariaHidden ? -1 : undefined}
      aria-hidden={ariaHidden}
      className="services-carousel-card group flex min-h-[540px] flex-col rounded-[10px] bg-card p-5 text-foreground no-underline shadow-[0_18px_45px_rgba(44,74,40,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Request a quote for ${name}`}
    >
      <div className="h-72 w-full overflow-hidden rounded-[8px] sm:h-80">
        <AnimatedImage
          src={img}
          alt={name}
          className="h-full w-full scale-[1.08] object-cover transition-transform duration-500 ease-out group-hover:scale-100 group-focus-visible:scale-100"
          loading="lazy"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{text}</p>
        </div>
        <span
          className="shrink-0 rounded-full transition-transform group-hover:scale-110"
          aria-hidden="true"
        >
          <ArrowPill label={`Request a quote for ${name}`} />
        </span>
      </div>
    </Link>
  );
}

function ProjectCard({ title, text, img }: { title: string; text: string; img: string }) {
  return (
    <article className="rounded-[10px] bg-card p-5 shadow-[0_18px_45px_rgba(44,74,40,0.08)]">
      <AnimatedImage
        src={img}
        alt={title}
        className="h-72 w-full rounded-[8px] object-cover"
        loading="lazy"
      />
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{text}</p>
        </div>
        <ArrowPill label={title} />
      </div>
    </article>
  );
}
