import type { Metadata } from "next";
import Image from "next/image";
import { brand } from "@/data/brand";
import { menu } from "@/data/menu";
import { Logo } from "@/components/ui/Logo";
import { Marker } from "@/components/ui/Marker";
import { BookButton } from "@/components/ui/BookButton";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Style guide", robots: { index: false } };

const swatches = [
  { name: "Verde", token: "verde", hex: "#16301C", note: "Brand background — sampled from the card" },
  { name: "Verde deep", token: "verde-deep", hex: "#0F2414", note: "Footer, overlays" },
  { name: "Verde soft", token: "verde-soft", hex: "#1F3F27", note: "Raised surfaces" },
  { name: "Crema", token: "crema", hex: "#FEF3C8", note: "Type — sampled from the card" },
  { name: "Arancio", token: "arancio", hex: "#E54225", note: "Accent only — sampled from the card" },
  { name: "Basilico", token: "basilico", hex: "#AFD135", note: "Vegetarian marker — sampled from the card" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-verde-line py-16">
      <h2 className="label mb-10 text-crema/60">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleGuide() {
  const sample = menu[1];
  return (
    <div className="shell pt-[calc(var(--nav-h)+6rem)] pb-24">
      <h1 className="display-xl relative mb-16 text-arancio">
        <span className="script absolute -top-[0.3em] left-[0.6em] text-[0.45em] text-crema">Fresta</span>
        Menu
      </h1>

      <Section title="01 — Colour">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {swatches.map((s) => (
            <li key={s.token}>
              <div className="aspect-4/5 rounded-sm ring-1 ring-crema/10" style={{ background: `var(--color-${s.token})` }} />
              <p className="label mt-3">{s.name}</p>
              <p className="text-sm text-crema/60">
                {s.hex} · {s.note}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="02 — Type">
        <div className="space-y-12">
          <div>
            <p className="display-xl">Pasta</p>
            <p className="label mt-3 text-crema/60">Display XL · Unbounded 200</p>
          </div>
          <div>
            <p className="display-lg">
              Italian,
              <br />
              made simple.
            </p>
            <p className="label mt-3 text-crema/60">Display L · Unbounded 300</p>
          </div>
          <div className="flex flex-wrap gap-x-16 gap-y-6">
            {menu.map((c) => (
              <p key={c.id} className="script text-6xl">
                {c.title}
              </p>
            ))}
          </div>
          <p className="label text-crema/60">Script · Mr Dafoe (stand-in for the card&rsquo;s GlamourPalace)</p>
          <div className="max-w-xl space-y-3">
            <p className="dish">Seafood Linguine</p>
            <p className="text-crema/75">Body · Mukta 400. Fresh pasta, rolled every morning and cut to order.</p>
          </div>
        </div>
      </Section>

      <Section title="03 — Pasta motifs">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <PastaRibbon waves={24} className="h-3 w-full text-arancio" />
            <p className="label mt-4 text-crema/60">Tagliatelle ribbon — dividers</p>
          </div>
          <div>
            <a href="#" className="group label relative inline-block text-crema">
              Hover me
              <PastaRibbon mode="draw" waves={6} className="absolute -bottom-2 left-0 h-1.5 w-full text-arancio" />
            </a>
            <p className="label mt-6 text-crema/60">Ribbon underline — rolls in on hover</p>
          </div>
          <div className="flex items-end gap-6">
            <span className="crimp-bottom block bg-crema px-3 pt-3 pb-4">
              <Logo sizes="84px" className="w-21" />
            </span>
            <p className="label text-crema/60">Ravioli-cutter edge — logo plate</p>
          </div>
        </div>
      </Section>

      <Section title="04 — Buttons">
        <div className="flex flex-wrap items-center gap-10">
          <BookButton variant="solid" />
          <BookButton />
        </div>
      </Section>

      <Section title="05 — Menu row (real card data, prices not shown)">
        <p className="script mb-2 text-6xl">{sample.title}</p>
        <PastaRibbon waves={12} className="mb-10 h-2 w-40 text-arancio" />
        <ul className="max-w-2xl space-y-7">
          {sample.dishes.slice(0, 4).map((d, i) => (
            <Reveal key={d.name} as="li" delay={i * 0.06} y={10} className="grid grid-cols-[1.25rem_1fr] items-baseline gap-x-3">
              <span className="self-start pt-0.5">{d.markers.includes("veg") && <Marker type="veg" />}</span>
              <div>
                <p className="dish">{d.name}</p>
                <p className="text-[0.95rem] text-crema/65">{d.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section title="06 — Brand artwork">
        <div className="grid items-end gap-12 md:grid-cols-2">
          <div className="crimp-bottom justify-self-start bg-crema p-6 pb-8">
            <Logo sizes="260px" className="w-65" />
          </div>
          <Image src={brand.chef.src} width={brand.chef.width} height={brand.chef.height} alt="Chef illustration from the menu card" sizes="320px" className="w-72" />
        </div>
      </Section>
    </div>
  );
}
