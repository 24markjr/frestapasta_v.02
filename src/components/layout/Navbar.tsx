"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import clsx from "clsx";
import { site, type NavItem } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { BookButton } from "@/components/ui/BookButton";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";

const MENU_ID = "mobile-menu";
// Split the links either side of the logo (the larger half on the left).
const half = Math.ceil(site.nav.length / 2);
const left = site.nav.slice(0, half);
const right = site.nav.slice(half);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Tuck away while reading down the page; return on any scroll up.
    if (y <= 320 || y < prev - 2) setHidden(false);
    else if (y > prev + 2) setHidden(true);
  });

  const tucked = hidden && !open;

  const close = useCallback(() => setOpen(false), []);

  // Close the mobile menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <motion.header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 h-(--nav-h) transition-[background-color,box-shadow,color] duration-500",
          "text-crema",
          scrolled && !open ? "bg-verde/95 shadow-[0_1px_0_var(--color-verde-line)] backdrop-blur-sm" : "bg-transparent",
        )}
        animate={{ y: tucked ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="shell grid h-full grid-cols-[auto_1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <nav aria-label="Primary" className="hidden lg:block">
            <NavList items={left} pathname={pathname} />
          </nav>

          <LogoTab compact={scrolled} />

          <div className="col-start-3 flex items-center justify-end gap-8">
            <nav aria-label="Secondary" className="hidden lg:block">
              <NavList items={right} pathname={pathname} />
            </nav>
            <div className="hidden lg:block">
              <BookButton className="nav-label" />
            </div>
            <div className="lg:hidden">
              <MenuToggle open={open} onClick={() => setOpen((o) => !o)} controls={MENU_ID} />
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu id={MENU_ID} open={open} onClose={close} pathname={pathname} />
    </>
  );
}

function NavList({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <ul className="flex items-center gap-7 xl:gap-10">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="group label nav-label relative inline-block py-2 text-current transition-colors aria-[current=page]:text-accent"
            >
              {item.label}
              <PastaRibbon
                mode="draw"
                waves={Math.max(4, Math.round(item.label.length * 0.9))}
                className="absolute -bottom-1 left-0 h-1.5 w-full text-arancio"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The logo hangs from the top edge on a cream plate with a crimped,
 * ravioli-cutter bottom — like a tag pinned to the pass.
 */
function LogoTab({ compact }: { compact: boolean }) {
  return (
    <motion.div
      className="col-start-1 row-start-1 self-start justify-self-start lg:col-start-2 lg:justify-self-center"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="/" aria-label={`${site.name} — home`} className="block">
        <span
          className={clsx(
            "crimp-bottom block bg-crema shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition-[padding] duration-500 ease-out-soft",
            compact ? "px-2 pt-1.5 pb-3" : "px-2.5 pt-2.5 pb-4 lg:px-4 lg:pt-4 lg:pb-5",
          )}
        >
          <Logo
            preload
            sizes="84px"
            className={clsx("transition-[width] duration-500 ease-out-soft", compact ? "w-12 lg:w-14" : "w-16 lg:w-21")}
          />
        </span>
      </Link>
    </motion.div>
  );
}
