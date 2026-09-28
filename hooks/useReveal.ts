"use client";

import { useEffect, useRef, useState } from "react";

/** Marks an element as revealed once it scrolls into view (respects reduced motion). */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/** Joins a base class with the reveal state class. */
export function revealClass(base: string, shown: boolean): string {
  return `${base} ${shown ? "in" : ""}`.trim();
}