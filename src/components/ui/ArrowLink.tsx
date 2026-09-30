import Link from "next/link";
import clsx from "clsx";
import { isExternal } from "@/data/site";
import { PastaRibbon } from "./PastaRibbon";

type Props = { href: string; children: React.ReactNode; className?: string };

/** Small uppercase link: ribbon rolls in underneath, arrow nudges forward. */
export function ArrowLink({ href, children, className }: Props) {
  const external = isExternal(href);
  return (
    <Link
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={clsx("group label inline-flex items-center gap-2 py-2 text-accent", className)}
    >
      <span className="relative">
        {children}
        <PastaRibbon mode="draw" waves={8} className="absolute -bottom-2 left-0 h-1.5 w-full" />
      </span>
      <span aria-hidden className="nudge">
        →
      </span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </Link>
  );
}

