import type { Metadata } from "next";
import { about } from "@/data/content";
import { photos } from "@/data/photos";
import { LineReveal } from "@/components/motion/LineReveal";
import { RollImage } from "@/components/motion/RollImage";
import { Reveal } from "@/components/motion/Reveal";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { BookButton } from "@/components/ui/BookButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ChefBand } from "@/components/home/ChefBand";

export const metadata: Metadata = {
  title: "About",
  description: "Fresta — fresh pasta, made by hand, rooted in Italy, made for the table.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const [first, second, third] = about.hero.statements;
  return (
    <>
      {/* Statement + photo */}
      <section className="shell pt-[calc(var(--nav-h)+4rem)] pb-20 lg:pt-[calc(var(--nav-h)+5.5rem)] lg:pb-28">
        <p className="label mb-8 flex items-center gap-3 text-crema/70">
          <PastaRibbon waves={4} className="h-1.5 w-8 text-arancio" />
          About
        </p>
        <LineReveal
          as="h1"
          trigger="load"
          delay={0.15}
          stagger={0.14}
          className="display-lg text-[clamp(2.6rem,8.5vw,7.5rem)]"
          lines={[
            first,
            <span key="2" className="text-arancio">{second}</span>,
            <span key="3">
              {third.replace(/table\.$/, "")}
              <span className="script normal-case text-[1.15em] text-crema">table.</span>
            </span>,
          ]}
        />
        <RollImage
          photo={photos[about.hero.photo]}
          trigger="load"
          preload
          delay={0.7}
          sizes="(min-width: 96rem) 90rem, 100vw"
          className="mt-14 aspect-4/5 sm:aspect-16/10 lg:aspect-21/9"
        />
        <Reveal className="mt-14 ml-auto max-w-xl">
          <p className="text-lg leading-relaxed text-crema/85 lg:text-xl">{about.intro}</p>
        </Reveal>
      </section>

      {/* Our story — magazine spread on cream */}
      <section className="crimp-y bg-crema py-24 text-verde lg:py-36">
        <div className="shell">
          <h2 className="relative mb-16 inline-block pr-[0.4em] lg:mb-24">
            <span className="display-xl block">Our</span>
            <span className="script absolute right-0 -bottom-[0.3em] text-[clamp(2.6rem,9vw,7.5rem)] text-arancio">
              story
            </span>
          </h2>

          <div className="space-y-24 lg:space-y-36">
            {about.story.map((chapter, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={chapter.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className={flip ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}>
                    <RollImage
                      photo={photos[chapter.photo]}
                      sizes="(min-width: 64rem) 45vw, 100vw"
                      className={flip ? "aspect-4/3" : "aspect-4/5"}
                    />
                  </div>
                  <Reveal
                    className={flip ? "lg:order-1 lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8"}
                  >
                    <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display-md mt-4">{chapter.title}</h3>
                    <PastaRibbon waves={10} className="my-6 h-2 w-28 text-arancio" />
                    <p className="max-w-md text-lg leading-relaxed text-verde/80">{chapter.text}</p>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ChefBand lines={["Pull up", "a chair."]}>
        <BookButton variant="solid" />
        <ArrowLink href="/menu">See the menu</ArrowLink>
      </ChefBand>
    </>
  );
}
