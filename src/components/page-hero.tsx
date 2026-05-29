// Shared hero banner used across content pages to keep heading layouts consistent.
import { ChevronRight } from "lucide-react";
import { AnimatedImage } from "@/components/animated-image";

type PageHeroProps = {
  imageSrc: string;
  title: string;
  description: string;
};

export function PageHero({ imageSrc, title, description }: PageHeroProps) {
  return (
    <section className="relative -mt-32 flex min-h-[360px] items-center justify-center overflow-hidden pt-32 text-center lg:-mt-40 lg:pt-40">
      <div className="absolute inset-0">
        <AnimatedImage
          src={imageSrc}
          alt=""
          aria-hidden="true"
          data-parallax="0.12"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/58" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-white sm:px-6 lg:px-8">
        <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 text-xs font-semibold text-white/86">
          <span>Home</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{description}</span>
        </p>
      </div>
    </section>
  );
}
