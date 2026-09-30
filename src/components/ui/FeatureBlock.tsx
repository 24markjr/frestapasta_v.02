import Link from "next/link";
import clsx from "clsx";
import type { Photo } from "@/data/photos";
import { RollImage } from "@/components/motion/RollImage";

type Props = {
  photo: Photo;
  title: string;
  subtitle: string;
  href: string;
  sizes: string;
  delay?: number;
  className?: string; // frame size / aspect ratio
  /** "display": wide uppercase title. "script": handwritten title, as on the menu card. */
  titleStyle?: "display" | "script";
};

/**
 * Editorial poster: a large photo with the title set over it.
 * Hover: photo zooms 3%, text lifts, an arrow slides in.
 */
export function FeatureBlock({ photo, title, subtitle, href, sizes, delay, className, titleStyle = "display" }: Props) {
  // In-page "#id" links use a plain anchor so the browser fires `hashchange`
  // (Next's Link uses pushState, which doesn't) — the menu's category bar listens for it.
  const Anchor = href.startsWith("#") ? "a" : Link;
  return (
    <Anchor href={href} className="group relative block">
      <RollImage photo={photo} sizes={sizes} delay={delay} hoverZoom className={className} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-verde/85 via-verde/15 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-center transition-transform duration-500 ease-out-soft group-hover:-translate-y-1.5 lg:p-8">
        <p
          className={clsx(
            titleStyle === "display" ? "display-md" : "script text-[clamp(2.75rem,5vw,4.25rem)]",
            "text-crema",
          )}
        >
          {title}
        </p>
        <p className="label mt-3 flex items-center gap-2 text-crema/85">
          {subtitle}
          <span
            aria-hidden
            className="-translate-x-2 text-arancio opacity-0 transition-all duration-500 ease-out-soft group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          >
            →
          </span>
        </p>
      </div>
    </Anchor>
  );
}
