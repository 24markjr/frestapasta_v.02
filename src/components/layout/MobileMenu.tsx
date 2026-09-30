"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { Chef } from "@/components/ui/Chef";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { BookButton } from "@/components/ui/BookButton";

const STRIPS = 6;
const roll = [0.65, 0, 0.35, 1] as const;

type Props = { id: string; open: boolean; onClose: () => void; pathname: string };

/**
 * Full-screen menu that opens like dough leaving the cutter: six vertical
 * strips roll down one after another, then the links follow.
 */
export function MobileMenu({ id, open, onClose, pathname }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const page = [document.getElementById("content"), document.getElementById("footer")];
    page.forEach((el) => el?.setAttribute("inert", ""));
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("a")?.focus(), 450);
    return () => {
      page.forEach((el) => el?.removeAttribute("inert"));
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 lg:hidden"
          exit={{ transition: { duration: 0.5 } }}
        >
          {/* Pasta strips */}
          <div aria-hidden className="absolute inset-0 flex">
            {Array.from({ length: STRIPS }, (_, i) => (
              <motion.span
                key={i}
                className="h-full flex-1 origin-top bg-verde-deep"
                style={{ marginLeft: i ? -1 : 0 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1, transition: { duration: 0.55, delay: i * 0.045, ease: roll } }}
                exit={{ scaleY: 0, transition: { duration: 0.4, delay: (STRIPS - 1 - i) * 0.035, ease: roll } }}
              />
            ))}
          </div>

          <motion.nav
            aria-label="Main"
            className="shell relative flex h-full flex-col pt-[calc(var(--nav-h)+3.5rem)] pb-8"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              show: { transition: { delayChildren: 0.32, staggerChildren: 0.06 } },
            }}
          >
            <ul className="flex flex-col gap-1">
              {site.nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <motion.li key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="display-md flex items-baseline gap-3 py-2 text-[clamp(1.6rem,8vw,2.6rem)] transition-colors hover:text-arancio aria-[current=page]:text-arancio"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div variants={itemVariants} className="mt-8">
              <BookButton variant="solid" onClick={onClose} />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-auto flex items-end justify-between gap-4">
              <div>
                <p className="label text-crema/70">Follow us</p>
                <SocialIcons size="size-7" className="-ml-1 mt-3 gap-5" />
              </div>
              <Chef sizes="120px" className="w-28 shrink-0" />
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 18, transition: { duration: 0.2 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};
