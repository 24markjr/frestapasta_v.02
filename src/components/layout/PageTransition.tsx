"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

const glide = [0.76, 0, 0.24, 1] as const;
const COVER = 0.6;
const REVEAL = 0.7;

const titles: Record<string, string> = {
  "/": site.name,
  "/book": "Your table",
  ...Object.fromEntries(site.nav.map((n) => [n.href, n.label])),
};
const labelFor = (path: string) => titles[path] ?? site.name;

type Phase = "idle" | "cover" | "reveal";

/**
 * Page change as one smooth sheet of pasta: a green panel with crimped,
 * ravioli-cutter edges slides down over the page, the next page's name
 * appears in script over the red roller, then the sheet carries on down and
 * away to reveal the new page (~1.3s, one continuous GPU transform).
 *
 * Catches internal link clicks in the capture phase and prevents the default —
 * Next's <Link> then skips its own navigation (it checks defaultPrevented) but
 * still runs its onClick — covers, then router.push(). Skipped for reduced
 * motion, modified clicks, new tabs, external and same-page links.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const target = useRef<string | null>(null);
  const fromPath = useRef(pathname);

  useEffect(() => {
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / hash links scroll normally
      e.preventDefault();
      target.current = url.pathname + url.search + url.hash;
      fromPath.current = window.location.pathname;
      router.prefetch(url.pathname);
      setLabel(labelFor(url.pathname));
      setPhase("cover");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce, router]);

  // New page has rendered under the sheet — carry on down and away.
  useEffect(() => {
    if (phase === "cover" && pathname !== fromPath.current) {
      if (!target.current?.includes("#")) window.scrollTo(0, 0);
      setPhase("reveal");
    }
  }, [pathname, phase]);

  // Safety: never leave the page covered if navigation stalls.
  useEffect(() => {
    if (phase !== "cover") return;
    const t = setTimeout(() => setPhase("reveal"), 4000);
    return () => clearTimeout(t);
  }, [phase]);

  const onDone = () => {
    if (phase === "cover") {
      if (target.current) router.push(target.current);
    } else if (phase === "reveal") {
      setPhase("idle");
      // Keyboard users land at the start of the new page, not on a stale link.
      const el = document.activeElement;
      if (!el || el === document.body || !el.isConnected) document.getElementById("content")?.focus({ preventScroll: true });
    }
  };

  return (
    <div
      aria-hidden
      className={phase === "idle" ? "pointer-events-none fixed inset-0 z-[70] overflow-hidden" : "fixed inset-0 z-[70] overflow-hidden"}
    >
      <motion.div
        className="crimp-y absolute inset-x-0 -top-3 -bottom-3 bg-verde-deep will-change-transform"
        initial={false}
        animate={{ y: phase === "cover" ? "0%" : phase === "reveal" ? "106%" : "-106%" }}
        transition={phase === "idle" ? { duration: 0 } : { duration: phase === "cover" ? COVER : REVEAL, ease: glide }}
        onAnimationComplete={onDone}
      >
        <AnimatePresence>
          {phase === "cover" && (
            <motion.div
              key={label}
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <p className="script text-[clamp(3.5rem,12vw,8rem)] text-crema">{label}</p>
              <motion.span
                className="mt-3 block h-0.75 w-24 origin-left rounded-full bg-arancio"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, transition: { duration: 0.5, delay: 0.35, ease: glide } }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
