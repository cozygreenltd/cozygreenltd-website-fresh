import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let activeLenis: Lenis | null = null;

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => undefined;
  }

  const lenis = new Lenis({
    duration: 1.35,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    autoResize: true,
    anchors: true,
    stopInertiaOnNavigate: true,
  });

  activeLenis = lenis;

  const handleLenisScroll = () => {
    ScrollTrigger.update();
  };

  const unsubscribeScroll = lenis.on("scroll", handleLenisScroll);
  const handleTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(handleTicker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    unsubscribeScroll();
    gsap.ticker.remove(handleTicker);

    if (activeLenis === lenis) {
      activeLenis = null;
    }

    lenis.destroy();
  };
}

export function scrollToTopImmediately() {
  if (typeof window === "undefined") {
    return;
  }

  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true, force: true });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}