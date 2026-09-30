import type { Metadata } from "next";
import { site } from "@/data/site";
import { photos } from "@/data/photos";
import { RollImage } from "@/components/motion/RollImage";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { InfoRow, HoursList } from "@/components/ui/InfoRow";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = {
  title: "Book a table",
  description: "Reserve a table at Fresta.",
  alternates: { canonical: "/book" },
};

/**
 * Booking happens on the restaurant's own booking link (site.booking.url).
 * Until that link is supplied, the page says so plainly — it never pretends to take a booking.
 *
 * Phone: words first, photo below. Tablet: same, wider photo. Laptop: photo pinned left, words right.
 */
export default function BookPage() {
  const { url } = site.booking;
  const { phone } = site.contact;
  return (
    <section className="flex flex-col lg:grid lg:min-h-svh lg:grid-cols-2">
      <div className="order-2 lg:order-1 lg:sticky lg:top-0 lg:h-svh">
        <RollImage
          photo={photos.bookServed}
          trigger="load"
          preload
          delay={0.3}
          sizes="(min-width: 64rem) 50vw, 100vw"
          className="aspect-4/5 sm:aspect-16/10 lg:aspect-auto lg:h-full"
        />
      </div>

      <div className="order-1 flex flex-col justify-center px-(--gutter) pt-[calc(var(--nav-h)+4rem)] pb-20 lg:order-2 lg:px-[clamp(2.5rem,5vw,6rem)] lg:pt-[calc(var(--nav-h)+3rem)]">
        <p className="label flex items-center gap-3 text-crema/70">
          <PastaRibbon waves={4} className="h-1.5 w-8 text-arancio" />
          Book a table
        </p>

        <LineReveal
          as="h1"
          trigger="load"
          delay={0.2}
          className="display-lg mt-6 text-[clamp(2.75rem,7vw,5.5rem)]"
          lines={[
            "Your table",
            <span key="a" className="script normal-case text-[1.2em] text-arancio">
              awaits.
            </span>,
          ]}
        />

        <Reveal delay={0.5} className="mt-6 max-w-md">
          <p className="text-lg leading-relaxed text-crema/80">
            Reserve online in a minute, or give us a call — we’d love to have you.
          </p>
        </Reveal>

        <Reveal delay={0.65} className="mt-10">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group label inline-flex items-center gap-3 rounded-full bg-arancio-deep px-8 py-5 text-sm text-crema transition-colors hover:bg-[#b52c13]"
            >
              Reserve online
              <span aria-hidden className="nudge">
                →
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <p className="label inline-flex items-center gap-3 rounded-full border border-crema/30 px-6 py-4 text-[0.75rem] whitespace-nowrap text-crema/70 sm:px-8 sm:py-5 sm:text-sm">
              Online booking — coming soon
            </p>
          )}
        </Reveal>

        <Reveal delay={0.8} className="mt-12 max-w-lg">
          <dl className="border-t border-verde-line">
            <InfoRow label="By phone">
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="price hover:text-accent">
                  {phone}
                </a>
              ) : (
                <Pending>phone</Pending>
              )}
            </InfoRow>
            <InfoRow label="Email">
              {site.contact.email ? (
                <a href={`mailto:${site.contact.email}`} className="hover:text-accent">
                  {site.contact.email}
                </a>
              ) : (
                <Pending>email</Pending>
              )}
            </InfoRow>
          </dl>
          <h2 className="label mt-10 mb-2 text-crema/60">Opening hours</h2>
          <HoursList />
        </Reveal>
      </div>
    </section>
  );
}
