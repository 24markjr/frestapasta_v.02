"use client";

import { motion } from "motion/react";
import { markerLabels, type MenuCategory } from "@/data/menu";
import { Chef } from "@/components/ui/Chef";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { Marker } from "@/components/ui/Marker";
import { MenuItem } from "./MenuItem";

const soft = [0.22, 1, 0.36, 1] as const;

/**
 * The printed card, brought to the web. Desktop keeps the card's layout —
 * the second category fills the right column, the rest stack on the left —
 * while the DOM stays in menu order so phones and screen readers read it straight.
 */
export function MenuList({ categories }: { categories: MenuCategory[] }) {
  const leftRows = Math.max(categories.length - 1, 1);

  return (
    <div
      id="menu-list"
      // The dishes sit on cream, like the page of a menu held at the table.
      className="crimp-y scroll-mt-(--nav-h) bg-crema pt-20 pb-24 text-verde lg:pt-28 lg:pb-32"
    >
      <div
        className="shell mx-auto flex max-w-6xl flex-col gap-20 lg:grid lg:grid-cols-2 lg:gap-x-24 lg:gap-y-24"
        style={{ gridTemplateRows: `repeat(${leftRows - 1}, auto) 1fr` }}
      >
        {categories.map((category, i) => {
          const isRight = i === 1;
          const section = <CategorySection category={category} />;
          if (!isRight) {
            const row = i === 0 ? 1 : i;
            return (
              <div key={category.id} className="lg:col-start-1 lg:self-start" style={{ gridRowStart: row }}>
                {section}
              </div>
            );
          }
          return (
            <div
              key={category.id}
              className="flex flex-col lg:col-start-2"
              style={{ gridRow: `1 / span ${leftRows}` }}
            >
              {section}
              {/* The card's chef, under the pasta — desktop only (the footer carries him on phones). */}
              <motion.div
                className="mt-auto hidden justify-end pt-16 lg:flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: soft }}
              >
                <Chef sizes="300px" className="w-72" />
              </motion.div>
            </div>
          );
        })}
      </div>

      <p className="shell mx-auto mt-20 flex max-w-6xl items-center gap-3 text-base text-verde/70">
        <Marker type="veg" /> {markerLabels.veg.label}
      </p>

    </div>
  );
}

function CategorySection({ category }: { category: MenuCategory }) {
  return (
    <motion.section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-[calc(var(--nav-h)+2rem)]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
    >
      <motion.h2
        id={`${category.id}-title`}
        className="script text-[clamp(3rem,6vw,4.5rem)] text-verde"
        variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: soft } } }}
      >
        {category.title}
      </motion.h2>
      <motion.div
        className="mt-3 mb-8 w-36 text-arancio"
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)" },
          shown: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: soft } },
        }}
      >
        <PastaRibbon waves={12} className="h-2 w-full" />
      </motion.div>
      <motion.ul variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}>
        {category.dishes.map((dish) => (
          <MenuItem key={dish.name} dish={dish} />
        ))}
      </motion.ul>
    </motion.section>
  );
}
