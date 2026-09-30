import Link from "next/link";
import { menu } from "@/data/menu";
import { Farfalle } from "./Doodles";

/**
 * The real dishes from the card, rolling past like pasta through the machine.
 * Pauses on hover; still for reduced motion. The list is duplicated so the loop is seamless.
 */
export function DishMarquee() {
  const dishes = menu.flatMap((c) => c.dishes.map((d) => d.name));
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8 lg:gap-12 lg:pr-12">
      {dishes.map((name) => (
        <li key={name} className="flex items-center gap-8 lg:gap-12">
          <span className="display-md text-[clamp(1.25rem,3vw,2.25rem)] font-light whitespace-nowrap">{name}</span>
          <Farfalle className="w-8 shrink-0 lg:w-10" />
        </li>
      ))}
    </ul>
  );
  return (
    <Link
      href="/menu"
      aria-label="See the full menu"
      className="group block overflow-hidden border-y border-verde-line bg-verde-deep py-5 text-crema lg:py-6"
    >
      <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </Link>
  );
}
