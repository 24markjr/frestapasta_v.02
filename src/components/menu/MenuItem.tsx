"use client";

import { motion } from "motion/react";
import type { Dish } from "@/data/menu";
import { Marker } from "@/components/ui/Marker";

const soft = [0.22, 1, 0.36, 1] as const;

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: soft } },
};

/**
 * One line of the card: marker · dish name, ingredients underneath.
 * Prices are not shown on the website. Hover: the name steps in and a short
 * arancio strand draws beside it; the ingredients sharpen.
 */
export function MenuItem({ dish }: { dish: Dish }) {
  return (
    <motion.li variants={itemVariants} className="group/dish grid grid-cols-[1.2rem_1fr] gap-x-3 py-3.5 sm:gap-x-4">
      <span className="pt-[0.15rem]">{dish.markers.includes("veg") && <Marker type="veg" />}</span>
      <div>
        <h3 className="dish flex items-center gap-3 transition-transform duration-500 ease-out-soft group-hover/dish:translate-x-1.5">
          {dish.name}
          <span
            aria-hidden
            className="h-0.5 w-0 rounded-full bg-arancio transition-[width] duration-500 ease-out-soft group-hover/dish:w-8"
          />
        </h3>
        <p className="mt-1 max-w-[42ch] text-[1.05rem] leading-snug text-verde/70 transition-colors duration-500 group-hover/dish:text-verde">
          {dish.description}
        </p>
      </div>
    </motion.li>
  );
}
