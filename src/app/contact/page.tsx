import type { Metadata } from "next";
import { site, mapEmbedUrl, mapLinkUrl } from "@/data/site";
import { Chef } from "@/components/ui/Chef";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { InfoRow, HoursList } from "@/components/ui/InfoRow";
import { Pending } from "@/components/ui/Pending";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BookButton } from "@/components/ui/BookButton";
import { ChefBand } from "@/components/home/ChefBand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Fresta — address, opening hours, phone and email.",
  alternates: { canonical: "/contact" },
};

/** Phone + tablet: details, then map. Laptop: details left (5 cols), map right (7 cols). */
export default function ContactPage() {
  const { address, phone, email } = site.contact;
  return (
    <>
      <PageHero label="Contact" title="Find" script="us" intro={["Come hungry.", "Stay a while."]} />

      <section className="shell grid gap-14 pb-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <h2 className="label mb-3 text-crema/60">Address</h2>
          <address className="display-md max-w-[18ch] text-[clamp(1.35rem,2.6vw,2rem)] not-italic">
            {address ?? <Pending>address</Pending>}
          </address>
          {address && (
            <ArrowLink href={mapLinkUrl(address)} className="mt-4">
              Open in Google Maps
            </ArrowLink>
          )}

          <dl className="mt-10 border-t border-verde-line">
            <InfoRow label="Phone">
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="price hover:text-accent">
                  {phone}
                </a>
              ) : (
                <Pending>phone</Pending>
              )}
            </InfoRow>
            <InfoRow label="Email">
              {email ? (
                <a href={`mailto:${email}`} className="hover:text-accent">
                  {email}
                </a>
              ) : (
                <Pending>email</Pending>
              )}
            </InfoRow>
            {site.social.map((s) => (
              <InfoRow key={s.label} label={s.label}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="label text-accent hover:underline">
                    Follow →
                  </a>
                ) : (
                  <Pending>link</Pending>
                )}
              </InfoRow>
            ))}
          </dl>

          <h2 className="label mt-12 mb-2 text-crema/60">Opening hours</h2>
          <HoursList />

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <BookButton variant="solid" />
            <ArrowLink href="/menu">See the menu</ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="crimp-y relative aspect-4/5 overflow-hidden bg-verde-soft sm:aspect-4/3 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:aspect-auto lg:h-[min(40rem,75svh)]">
            {address ? (
              <iframe
                title={`Map showing ${site.name}`}
                src={mapEmbedUrl(address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 [filter:grayscale(0.55)_sepia(0.15)_contrast(1.05)]"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                <Chef sizes="200px" className="w-40 opacity-90" />
                <p className="max-w-[26ch] text-crema/70">The map appears here as soon as the address is added.</p>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <ChefBand lines={["See you", "at the table."]} />
    </>
  );
}
