import Link from "next/link";
import { photos } from "@/data/photos";
import { FeatureBlock } from "@/components/ui/FeatureBlock";
import { LineReveal } from "@/components/motion/LineReveal";

const posters = [
  { photo: photos.handmadePasta, title: "Handmade Pasta", subtitle: "seasonal dishes", href: "/menu#pasta-fresta" },
  { photo: photos.fromTheKitchen, title: "From the Kitchen", subtitle: "signature plates", href: "/menu#antipasto" },
  { photo: photos.dolci, title: "Dolci", subtitle: "something sweet", href: "/menu#desserts" },
];

export function FeaturePosters() {
  return (
    <section className="shell py-24 lg:py-36">
      <div className="mb-12 flex items-end justify-between gap-6 lg:mb-16">
        <LineReveal lines={["On the table"]} className="display-lg" />
        <Link href="/menu" className="group label mb-2 hidden shrink-0 items-center gap-2 text-accent sm:inline-flex">
          Full menu <span aria-hidden className="nudge">→</span>
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {posters.map((p, i) => (
          <FeatureBlock
            key={p.title}
            {...p}
            delay={i * 0.12}
            sizes="(min-width: 48rem) 33vw, 100vw"
            className="aspect-4/5 md:aspect-2/3"
          />
        ))}
      </div>
      <Link href="/menu" className="group label mt-10 inline-flex items-center gap-2 text-accent sm:hidden">
        Full menu <span aria-hidden className="nudge">→</span>
      </Link>
    </section>
  );
}
