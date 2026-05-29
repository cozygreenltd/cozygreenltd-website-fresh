const REVEAL_SELECTORS = [
  "main section > div:not([class*='absolute'])",
  "main section article",
  "main section form",
  "main section iframe",
  "main section details",
] as const;

const PARALLAX_SELECTOR = "[data-parallax]";
const REVEAL_DISTANCE = 52;
const REVEAL_SCALE_MIN = 0.985;
const REVEAL_START_FACTOR = 0.96;
const REVEAL_END_FACTOR = 0.22;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function applyRevealProgress(element: HTMLElement, progress: number) {
  const eased = easeOutCubic(clamp(progress, 0, 1));
  const offset = REVEAL_DISTANCE * (1 - eased);
  const scale = REVEAL_SCALE_MIN + (1 - REVEAL_SCALE_MIN) * eased;

  let x = 0;
  let y = 0;

  if (element.dataset.reveal === "left") {
    x = -offset;
  } else if (element.dataset.reveal === "right") {
    x = offset;
  } else {
    y = offset;
  }

  element.style.setProperty("--reveal-opacity", eased.toFixed(3));
  element.style.setProperty("--reveal-x", `${x.toFixed(2)}px`);
  element.style.setProperty("--reveal-y", `${y.toFixed(2)}px`);
  element.style.setProperty("--reveal-scale", scale.toFixed(4));
}

function uniqueElements(elements: HTMLElement[]) {
  return Array.from(new Set(elements));
}

function queryElements(root: ParentNode, selectors: readonly string[]) {
  const collected: HTMLElement[] = [];

  selectors.forEach((selector) => {
    root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      collected.push(element);
    });
  });

  return uniqueElements(collected);
}

export function initSiteMotion(root: ParentNode = document) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = queryElements(root, REVEAL_SELECTORS);
  const parallaxTargets = queryElements(root, [PARALLAX_SELECTOR]);

  revealTargets.forEach((element) => {
    if (!element.dataset.reveal) {
      element.dataset.reveal = "up";
    }

    applyRevealProgress(element, 0);
  });

  document.body.classList.add("motion-ready");

  if (reduceMotion) {
    revealTargets.forEach((element) => {
      applyRevealProgress(element, 1);
      element.classList.add("is-visible");
    });
    parallaxTargets.forEach((element) => element.style.removeProperty("--parallax-shift"));
    return () => undefined;
  }

  let frameHandle: number | null = null;

  const updateMotion = () => {
    frameHandle = null;
    const viewportHeight = window.innerHeight;
    const revealStart = viewportHeight * REVEAL_START_FACTOR;
    const revealEnd = viewportHeight * REVEAL_END_FACTOR;
    const revealRange = Math.max(revealStart - revealEnd, 1);
    const viewportMidpoint = window.innerHeight / 2;

    revealTargets.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const anchor = rect.top + Math.min(rect.height * 0.22, 96);
      const progress = clamp((revealStart - anchor) / revealRange, 0, 1);

      applyRevealProgress(element, progress);
      element.classList.toggle("is-visible", progress >= 0.98);
    });

    parallaxTargets.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementMidpoint = rect.top + rect.height / 2;
      const speed = Number.parseFloat(element.dataset.parallax ?? "0.12");
      const shift = Math.max(-56, Math.min(56, (elementMidpoint - viewportMidpoint) * -speed));

      element.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
    });
  };

  const requestMotionUpdate = () => {
    if (frameHandle != null) return;
    frameHandle = window.requestAnimationFrame(updateMotion);
  };

  requestMotionUpdate();
  window.addEventListener("scroll", requestMotionUpdate, { passive: true });
  window.addEventListener("resize", requestMotionUpdate);

  return () => {
    if (frameHandle != null) {
      window.cancelAnimationFrame(frameHandle);
    }

    window.removeEventListener("scroll", requestMotionUpdate);
    window.removeEventListener("resize", requestMotionUpdate);
  };
}