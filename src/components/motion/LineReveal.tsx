"use client";

import { motion } from "motion/react";
import clsx from "clsx";

type Props = {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "load" | "view";
  as?: "h1" | "h2" | "p";
};

/** Each line rises out of its own mask, one after another. */
export function LineReveal({ lines, className, lineClassName, delay = 0, stagger = 0.1, trigger = "view", as = "h2" }: Props) {
  const Tag = motion[as];
  const play = trigger === "load" ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, amount: 0.4 } };
  return (
    <Tag
      className={className}
      initial="hidden"
      {...play}
      variants={{ hidden: {}, shown: { transition: { delayChildren: delay, staggerChildren: stagger } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className={clsx("block overflow-hidden pb-[0.08em]", lineClassName)}>
          <motion.span
            className="block"
            variants={{
              hidden: { y: "105%" },
              shown: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
