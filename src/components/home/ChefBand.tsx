import { Chef } from "@/components/ui/Chef";
import { FrestaWordmark } from "@/components/brand/FrestaWordmark";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { BookButton } from "@/components/ui/BookButton";
import { PastaRibbon } from "@/components/ui/PastaRibbon";

type Props = { lines?: string[]; children?: React.ReactNode; tone?: "green" | "cream" };

/** The chef from the menu card, with a closing call to action. Recurs across pages. */
export function ChefBand({ lines = ["Handmade", "daily."], children, tone = "green" }: Props) {
  const cream = tone === "cream";
  return (
    <section className={cream ? "crimp-y bg-crema text-verde" : undefined}>
      <div className="shell pt-24 pb-28 lg:pt-32 lg:pb-40">
        {!cream && <PastaRibbon waves={40} className="mb-20 h-2 w-full text-verde-line lg:mb-28" />}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal className="order-2 justify-self-center md:order-1">
            <Chef sizes="(min-width: 48rem) 380px, 260px" className="w-64 md:w-96" />
          </Reveal>
          <div className="order-1 md:order-2">
            <FrestaWordmark className="mb-4 block h-auto w-36 lg:w-44" />
            <LineReveal lines={lines} className="display-lg text-[clamp(2.25rem,5.2vw,4.5rem)]" />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {children ?? <BookButton variant="solid" />}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
