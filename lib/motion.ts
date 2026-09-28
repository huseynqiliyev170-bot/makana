/* Shared motion helpers — rAF-throttled scroll, reduced-motion checks, lerp.
   All animation in the app is transform/opacity only to stay on the compositor. */

let cachedReduced: boolean | null = null;

export function prefersReduced(): boolean {
  if (typeof window === "undefined") return true;
  if (cachedReduced === null) {
    cachedReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return cachedReduced;
}

export function isFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Subscribes a rAF-throttled scroll handler. The callback receives scrollY.
 * Returns the cleanup function (safe to return directly from useEffect).
 */
export function onScrollRaf(cb: (y: number) => void): () => void {
  let ticking = false;
  let raf = 0;
  const run = () => {
    ticking = false;
    cb(window.scrollY);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      raf = window.requestAnimationFrame(run);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => {
    window.removeEventListener("scroll", onScroll);
    if (ticking) window.cancelAnimationFrame(raf);
  };
}

