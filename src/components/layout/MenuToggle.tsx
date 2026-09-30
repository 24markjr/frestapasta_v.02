"use client";

import { motion } from "motion/react";

const strand = "M1 5 q3.5 -2.4 7 0 t7 0 t7 0 t7 0";
const ease = [0.65, 0, 0.35, 1] as const;

/** Hamburger drawn as three wavy pasta strands that cross into an X. */
export function MenuToggle({ open, onClick, controls }: { open: boolean; onClick: () => void; controls: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative -mr-2 grid size-12 place-items-center text-current"
    >
      <svg aria-hidden viewBox="0 0 30 22" className="w-8 overflow-visible">
        {[3, 11, 19].map((y, i) => (
          <motion.path
            key={y}
            d={strand}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
            initial={false}
            animate={
              i === 1
                ? { y: y - 5, opacity: open ? 0 : 1, scaleX: open ? 0.2 : 1 }
                : { y: y - 5 + (open ? (i === 0 ? 8 : -8) : 0), rotate: open ? (i === 0 ? 40 : -40) : 0 }
            }
            transition={{ duration: 0.45, ease }}
          />
        ))}
      </svg>
    </button>
  );
}
