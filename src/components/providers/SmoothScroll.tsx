"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/**
 * Lenis smooth scrolling — laptops/desktops with a mouse only. Touch devices
 * keep native scrolling, and it's off entirely for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    lenis = new Lenis({ duration: 1.05, anchors: { offset: -80 }, autoRaf: true });
    // Lenis animates scroll itself; CSS smooth scrolling would fight it.
    document.documentElement.style.scrollBehavior = "auto";
    return () => {
      lenis?.destroy();
      lenis = null;
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // New page starts at the top.
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
