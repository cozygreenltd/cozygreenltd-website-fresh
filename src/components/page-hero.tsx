import { AnimatedImage } from "@/components/animated-image";

type PageHeroProps = {
  imageSrc: string;
  title: string;
  description: string;
};

export function PageHero({ imageSrc, title, description }: PageHeroProps) {
  return (
    <section className="relative pb-16 sm:pb-20">
      <div className="relative h-[340px] sm:h-[440px]">
        <div className="absolute inset-0">
          <AnimatedImage
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/30" />
        </div>
      </div>

      <div className="relative z-10 -mt-20 px-4 sm:-mt-24 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl min-h-[190px] items-center justify-center rounded-[1.75rem] bg-primary px-6 py-10 text-center text-primary-foreground shadow-[0_20px_70px_rgba(0,0,0,0.2)] sm:px-10 sm:py-12">
          <div>
            <h1 className="text-4xl font-bold drop-shadow-sm sm:text-5xl">{title}</h1>
            <p className="mt-5 text-lg text-white/90 drop-shadow-sm">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
