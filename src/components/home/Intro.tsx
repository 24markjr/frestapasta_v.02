import { photos } from "@/data/photos";
import { LineReveal } from "@/components/motion/LineReveal";
import { RollImage } from "@/components/motion/RollImage";
import { Reveal } from "@/components/motion/Reveal";
import { PastaRibbon } from "@/components/ui/PastaRibbon";

const notes = ["Seasonal ingredients.", "Handmade pasta.", "Long lunches.", "Late dinners."];

/** Cream follow-on to the green hero, crimped top and bottom like a cut sheet of ravioli. */
export function Intro() {
  return (
    <section id="intro" className="crimp-y scroll-mt-(--nav-h) bg-crema py-24 text-verde lg:py-36">
      <div className="shell grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <LineReveal
            lines={["Italian,", "with a modern", "touch."]}
            className="display-lg"
            stagger={0.12}
          />
          <PastaRibbon waves={14} className="mt-10 mb-8 h-2 w-44 text-arancio" />
          <ul className="grid max-w-md grid-cols-2 gap-x-8 gap-y-2">
            {notes.map((n, i) => (
              <Reveal as="li" key={n} delay={0.1 + i * 0.07} y={10} className="font-display text-base font-medium tracking-wide">
                {n}
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <RollImage photo={photos.introTwirl} sizes="(min-width: 64rem) 30vw, 90vw" className="aspect-4/5" />
        </div>
      </div>
    </section>
  );
}
