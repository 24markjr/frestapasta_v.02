"use client";

import { motion } from "motion/react";
import { FrestaWordmark } from "@/components/brand/FrestaWordmark";

const soft = [0.22, 1, 0.36, 1] as const;

/** The menu card's own lockup: script "Fresta" over a thin, wide "MENU". */
export function MenuIntro() {
  return (
    <section className="shell pt-[calc(var(--nav-h)+6rem)] pb-16 text-center lg:pt-[calc(var(--nav-h)+10rem)] lg:pb-24">
      <h1 className="relative inline-block text-[clamp(4.5rem,19vw,15rem)] leading-none">
        <span className="sr-only">Fresta menu</span>
        <span aria-hidden className="block overflow-hidden">
          <motion.span
            className="display-xl block text-[1em] text-arancio"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.15, ease: soft }}
          >
            Menu
          </motion.span>
        </span>
        {/* Same lettering and placement as the printed card */}
        <motion.span
          aria-hidden
          className="absolute top-[-0.36em] left-[6.5%] block w-[35%] text-crema"
          initial={{ opacity: 0, y: -10, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: soft }}
        >
          <FrestaWordmark className="block h-auto w-full" />
        </motion.span>
      </h1>
      <motion.p
        className="mt-8 font-display text-lg font-light lg:text-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: soft }}
      >
        made fresh.
        <br />
        served simply.
      </motion.p>
    </section>
  );
}
