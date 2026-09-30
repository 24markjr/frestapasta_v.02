"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { site } from "@/data/site";
import { photos } from "@/data/photos";
import { BookButton } from "@/components/ui/BookButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { DishMarquee } from "./DishMarquee";
import { Basil, Chili, Farfalle, Fusilli, Garlic, Parmesan, Penne, Tomato, Wheat } from "./Doodles";

const soft = [0.22, 1, 0.36, 1] as const;
const ring = "pasta fresca · fatta a mano · pasta fresca · fatta a mano · ";

/** Ingredients orbiting the plate. Positions are % of the plate scene; depth drives cursor parallax. */
const garnish = [
  { C: Tomato, cls: "left-[1%] top-[6%] w-[17%]", depth: 26, float: "float-a", rot: -8 },
  { C: Basil, cls: "right-[2%] top-[2%] w-[13%]", depth: 18, float: "float-b", rot: 24 },
  { C: Fusilli, cls: "left-[24%] -top-[5%] w-[8%]", depth: 12, float: "float-c", rot: 38 },
  { C: Penne, cls: "right-[27%] -top-[7%] w-[11%]", depth: 20, float: "float-a", rot: -20 },
  { C: Farfalle, cls: "-left-[5%] bottom-[20%] w-[18%]", depth: 30, float: "float-b", rot: -14 },
  { C: Chili, cls: "-right-[4%] bottom-[24%] w-[16%]", depth: 24, float: "float-c", rot: -6 },
  { C: Garlic, cls: "left-[24%] -bottom-[4%] w-[12%]", depth: 14, float: "float-a", rot: 10 },
  { C: Parmesan, cls: "right-[16%] -bottom-[6%] w-[15%]", depth: 22, float: "float-b", rot: 6 },
];

/**
 * Landing, on the menu card's green. Left: the card's lockup — script "Fresta"
 * over a thin, wide "PASTA". Right: a turning plate of fresh pasta with steam
 * rising and hand-drawn ingredients floating around it; the real dishes scroll
 * past underneath.
 *
 * Phone/tablet: stacked and centred. Laptop+: split 7 / 5. Cursor parallax on
 * mouse devices only; everything stills for reduced motion.
 */
export function Hero() {
  // Cursor, normalised to -1…1 and smoothed.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.8 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section className="relative isolate overflow-hidden bg-verde text-crema">
      {/* Warm glow behind the plate */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_72%,var(--color-verde-soft),transparent_70%)] lg:bg-[radial-gradient(ellipse_55%_55%_at_75%_48%,var(--color-verde-soft),transparent_70%)]"
      />

      <div className="shell grid min-h-[calc(100svh-5.5rem)] items-center gap-14 pt-[calc(var(--nav-h)+3rem)] pb-16 lg:grid-cols-12 lg:gap-6 lg:pt-(--nav-h) lg:pb-10">
        {/* Words */}
        <div className="relative flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
          <Parallax x={sx} y={sy} depth={10} className="pointer-events-none absolute -top-16 -left-2 hidden w-14 lg:block">
            <div className="float-c">
              <Wheat className="w-full -rotate-12" />
            </div>
          </Parallax>

          <motion.p
            className="label flex items-center gap-3 text-crema/75"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: soft }}
          >
            <PastaRibbon waves={4} className="h-1.5 w-8 text-arancio" />
            Cucina italiana
            <PastaRibbon waves={4} className="h-1.5 w-8 text-arancio lg:hidden" />
          </motion.p>

          <h1 className="relative mt-[clamp(2.75rem,8vw,5rem)]">
            <span className="sr-only">
              {site.name} Pasta — {site.tagline}
            </span>
            <span aria-hidden className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="display-xl block text-[clamp(4.25rem,19vw,11rem)] text-arancio lg:text-[clamp(5rem,12vw,11.5rem)]"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.35, ease: soft }}
              >
                Pasta
              </motion.span>
            </span>
            <motion.span
              aria-hidden
              className="script absolute -top-[0.42em] left-1/2 -translate-x-1/2 text-[clamp(3.4rem,14vw,8.5rem)] text-crema drop-shadow-[0_8px_24px_rgba(15,36,20,0.6)] lg:-top-[0.5em] lg:left-[-0.04em] lg:translate-x-0 lg:text-[clamp(4.25rem,9.5vw,9.5rem)]"
              initial={{ opacity: 0, y: -14, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.75, ease: soft }}
            >
              {site.name}
            </motion.span>
          </h1>

          <motion.p
            className="display-md mt-6 text-[clamp(1.1rem,3.2vw,1.9rem)] font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: soft }}
          >
            {site.tagline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: soft }}
          >
            <BookButton variant="solid" />
            <ArrowLink href="/menu">See the menu</ArrowLink>
          </motion.div>
        </div>

        {/* Plate scene */}
        <div className="relative mx-auto aspect-square w-[min(78vw,30rem)] lg:col-span-5 lg:w-full lg:max-w-[33rem]">
          <motion.div
            className="absolute inset-0"
            // Visible from first paint (largest element — good LCP); it only turns and settles in.
            initial={{ scale: 0.9, rotate: -35 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, delay: 0.3, ease: soft }}
          >
            <svg aria-hidden viewBox="0 0 200 200" className="spin-slow-reverse absolute inset-0 size-full">
              <defs>
                <path id="hero-ring" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
              </defs>
              <text className="fill-crema/80 font-display text-[8.2px] tracking-[0.32em] uppercase">
                <textPath href="#hero-ring">{ring}</textPath>
              </text>
            </svg>
            <div className="spin-slow absolute inset-[11%] rounded-full shadow-[0_40px_70px_-20px_rgba(0,0,0,0.65),0_0_0_10px_rgba(254,243,200,0.06)]">
              <Image
                src={photos.heroPlate.src}
                alt={photos.heroPlate.alt}
                fill
                preload
                loading="eager"
                placeholder="blur"
                sizes="(min-width: 64rem) 30rem, 70vw"
                className="rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Steam */}
          <svg
            aria-hidden
            viewBox="0 0 120 80"
            className="pointer-events-none absolute top-[9%] left-1/2 w-[28%] -translate-x-1/2 -translate-y-full"
          >
            {[30, 60, 90].map((x, i) => (
              <path
                key={x}
                d={`M${x} 78 q-8 -12 0 -24 t0 -24 t0 -24`}
                fill="none"
                stroke="var(--color-crema)"
                strokeWidth="3"
                strokeLinecap="round"
                className="steam"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            ))}
          </svg>

          {/* Ingredients */}
          {garnish.map(({ C, cls, depth, float, rot }, i) => (
            <Parallax key={i} x={sx} y={sy} depth={depth} className={`pointer-events-none absolute ${cls}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 1 + i * 0.08, ease: soft }}
              >
                <div className={float}>
                  <div style={{ rotate: `${rot}deg` }}>
                    <C className="w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]" />
                  </div>
                </div>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>

      <DishMarquee />
    </section>
  );
}

/** Shifts its children with the cursor; deeper items move further. */
function Parallax({
  x,
  y,
  depth,
  className,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div aria-hidden className={className} style={{ x: tx, y: ty }}>
      {children}
    </motion.div>
  );
}
