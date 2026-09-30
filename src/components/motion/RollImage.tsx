"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion } from "motion/react";
import type { Photo } from "@/data/photos";

type Props = {
  photo: Photo;
  sizes: string;
  className?: string; // sets the frame's size / aspect ratio
  preload?: boolean;
  /** "load": plays on mount (hero). "view": plays when scrolled into view. */
  trigger?: "load" | "view";
  delay?: number;
  duration?: number;
  /** Adds the 1 → 1.03 hover zoom when a parent `.group` is hovered. */
  hoverZoom?: boolean;
  imageClassName?: string;
};

const roll = [0.65, 0, 0.35, 1] as const;

/**
 * Image that rolls out top-to-bottom like a pasta sheet leaving the machine.
 * A thin arancio "roller" rides the reveal edge — the red roller from the logo.
 */
export function RollImage({
  photo,
  sizes,
  className,
  preload,
  trigger = "view",
  delay = 0,
  duration = 1.1,
  hoverZoom,
  imageClassName,
}: Props) {
  const play = trigger === "load" ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, amount: 0.25 } };
  const t = { duration, delay, ease: roll };

  const img = (
    <Image
      src={photo.src}
      alt={photo.alt}
      sizes={sizes}
      preload={preload}
      placeholder="blur"
      fill
      className={clsx("object-cover", imageClassName)}
    />
  );

  return (
    // Same markup for everyone (server and client must match); reduced motion
    // is handled in CSS by neutralising .roll-clip / .roll-scale / .roll-bar.
    <motion.div className={clsx("relative overflow-hidden", className)} initial="hidden" {...play}>
      <motion.div
        className="roll-clip absolute inset-0"
        variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, shown: { clipPath: "inset(0 0 0% 0)", transition: t } }}
      >
        <motion.div
          className="roll-scale absolute inset-0"
          variants={{ hidden: { scale: 1.05 }, shown: { scale: 1, transition: { ...t, duration: duration + 0.5, ease: [0.22, 1, 0.36, 1] } } }}
        >
          <div className={clsx("absolute inset-0", hoverZoom && "zoom-on-hover")}>{img}</div>
        </motion.div>
      </motion.div>
      <motion.span
        aria-hidden
        className="roll-bar absolute inset-x-0 h-0.75 bg-arancio"
        variants={{
          hidden: { top: "0%", opacity: 1 },
          shown: {
            top: "100%",
            opacity: [1, 1, 0],
            transition: { top: t, opacity: { duration: duration + 0.2, delay, times: [0, 0.85, 1] } },
          },
        }}
      />
    </motion.div>
  );
}
