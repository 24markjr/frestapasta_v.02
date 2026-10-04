import Link from "next/link";
import clsx from "clsx";
import { bookingHref, isExternal, site } from "@/data/site";
import { PastaRibbon } from "./PastaRibbon";

type Props = {
  className?: string;
  /** "line": text + ribbon underline. "solid": filled arancio pill for key CTAs. */
  variant?: "line" | "solid";
  onClick?: () => void;
};

/** Goes straight to the reservation page, in the same tab. */
export function BookButton({ className, variant = "line", onClick }: Props) {
  const external = isExternal(bookingHref);
  const Anchor = external ? "a" : Link;
  return (
    <Anchor
      href={bookingHref}
      onClick={onClick}
      className={clsx(
        "group label relative inline-flex items-center gap-2 whitespace-nowrap",
        variant === "solid" &&
          "rounded-full bg-arancio-deep px-5 py-3.5 text-crema transition-colors duration-300 hover:bg-[#b52c13]",
        variant === "line" && "py-2 text-accent",
        className,
      )}
    >
      <span className="relative">
        {site.booking.label}
        {variant === "line" && (
          <PastaRibbon mode="draw" waves={10} className="absolute -bottom-2 left-0 h-1.5 w-full" />
        )}
      </span>
      <span aria-hidden className="nudge">
        →
      </span>
    </Anchor>
  );
}
