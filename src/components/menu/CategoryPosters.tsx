import { menu } from "@/data/menu";
import { photos } from "@/data/photos";
import { FeatureBlock } from "@/components/ui/FeatureBlock";

/** Visual entry points — one poster per category that actually has dishes. */
export function CategoryPosters() {
  const categories = menu.filter((c) => c.dishes.length > 0);
  return (
    <section aria-label="Menu categories" className="shell pb-24 lg:pb-32">
      <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {categories.map((c, i) => (
          <FeatureBlock
            key={c.id}
            photo={photos[c.cover]}
            title={c.title}
            titleStyle="script"
            subtitle={`${c.dishes.length} dishes`}
            href={`#${c.id}`}
            delay={i * 0.12}
            sizes="(min-width: 48rem) 33vw, 100vw"
            className="aspect-4/3 md:aspect-3/4"
          />
        ))}
      </div>
    </section>
  );
}
