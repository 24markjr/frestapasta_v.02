"use client";

import { motion } from "motion/react";
import type { Photo } from "@/data/photos";
import { RollImage } from "@/components/motion/RollImage";
import { PastaRibbon } from "./PastaRibbon";

const soft = [0.22, 1, 0.36, 1] as const;

type Props = {
  label: string;
  /** Large display word(s), e.g. "Private". */
  title: string;
  /** Script word set over the title, as on the menu card, e.g. "dining". */
  script?: string;
  intro?: string[];
  photo?: Photo;
};

/**
 * Opening block shared by the inner pages — the same lockup as the menu card:
 * thin, wide display type with a handwritten word over it, then the photo
 * rolling out like a pasta sheet.
 */
export function PageHero({ label, title, script, intro, photo }: Props) {
  return (
    <section className="shell pt-[calc(var(--nav-h)+4rem)] pb-16 lg:pt-[calc(var(--nav-h)+5.5rem)] lg:pb-24">
      <motion.p
        className="label flex items-center gap-3 text-crema/70"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: soft }}
      >
        <PastaRibbon waves={4} className="h-1.5 w-8 text-arancio" />
        {label}
      </motion.p>

      <h1 className="relative mt-6 inline-block pr-[0.3em]">
        <span className="block overflow-hidden">
          <motion.span
            className="display-xl block text-arancio"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 0.2, ease: soft }}
          >
            {title}
          </motion.span>
        </span>
        {script && (
          <motion.span
            className="script absolute right-0 -bottom-[0.35em] text-[clamp(2.6rem,9vw,7.5rem)] text-crema"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: soft }}
          >
            {script}
          </motion.span>
        )}
      </h1>

      {intro && (
        <motion.p
          className="mt-14 font-display text-[clamp(1.1rem,2.2vw,1.6rem)] leading-snug font-light"
          initial="hidden"
          animate="shown"
          variants={{ hidden: {}, shown: { transition: { delayChildren: 0.8, staggerChildren: 0.08 } } }}
        >
          {intro.map((line) => (
            <motion.span
              key={line}
              className="block"
              variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: soft } } }}
            >
              {line}
            </motion.span>
          ))}
        </motion.p>
      )}

      {photo && (
        <RollImage
          photo={photo}
          trigger="load"
          preload
          delay={0.6}
          sizes="(min-width: 96rem) 90rem, 100vw"
          className="mt-12 aspect-4/5 sm:aspect-16/10 lg:aspect-21/9"
        />
      )}
    </section>
  );
}
