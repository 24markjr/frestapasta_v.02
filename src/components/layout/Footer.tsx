import Link from "next/link";
import { site, mapLinkUrl } from "@/data/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Chef } from "@/components/ui/Chef";
import { Logo } from "@/components/ui/Logo";
import { BookButton } from "@/components/ui/BookButton";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { Pending } from "@/components/ui/Pending";
import { HoursList } from "@/components/ui/InfoRow";

export function Footer() {
  const { address, phone, email } = site.contact;
  return (
    <footer id="footer" className="crimp-top relative -mt-1.5 overflow-hidden bg-verde-deep pt-20 pb-8 lg:pt-28">
      <div className="shell">
        <p className="display-lg max-w-[14ch]">
          A little <span className="script text-[1.35em] text-arancio">Italy,</span>
          <br />
          at your table.
        </p>

        <PastaRibbon waves={40} className="my-14 h-2 w-full text-verde-line lg:my-20" />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr] lg:gap-16">
          <Link href="/" aria-label={`${site.name} — home`} className="justify-self-start">
            <span className="crimp-bottom block bg-crema px-4 pt-4 pb-5">
              <Logo sizes="132px" className="w-33" />
            </span>
          </Link>

          <nav aria-label="Footer">
            <h2 className="label mb-5 text-crema/60">Visit</h2>
            <ul className="space-y-3.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group label nav-label relative inline-block text-crema">
                    {item.label}
                    <PastaRibbon mode="draw" waves={6} className="absolute -bottom-1.5 left-0 h-1.5 w-full text-arancio" />
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <BookButton className="nav-label" />
              </li>
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className="label mb-5 text-crema/60">Find us</h2>
            <p className="max-w-[30ch]">{address ?? <Pending>address</Pending>}</p>
            {address && (
              <ArrowLink href={mapLinkUrl(address)} className="mt-2">
                Directions
              </ArrowLink>
            )}
            <p className="mt-3">
              {phone ? <a href={`tel:${phone.replace(/\s/g, "")}`} className="price hover:text-accent">{phone}</a> : <Pending>phone</Pending>}
            </p>
            <p>{email ? <a href={`mailto:${email}`}>{email}</a> : <Pending>email</Pending>}</p>
          </address>

          <div>
            <h2 className="label mb-5 text-crema/60">Hours</h2>
            <div className="max-w-xs">
              <HoursList />
            </div>
          </div>
        </div>

        <div className="relative mt-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Same line and order as the printed card */}
          <p className="text-base text-crema/80">
            Follow us on{" "}
            {site.social.map((s, i) => (
              <span key={s.label}>
                {i > 0 && " | "}
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {s.label}
                  </a>
                ) : (
                  <span className="text-accent">{s.label}</span>
                )}
              </span>
            ))}
            <span className="mt-2 block text-crema/60">
              © {new Date().getFullYear()} {site.name}
            </span>
          </p>

          <Chef sizes="(min-width: 64rem) 260px, 180px" className="-mb-8 w-44 self-end lg:w-64" />
        </div>
      </div>
    </footer>
  );
}
