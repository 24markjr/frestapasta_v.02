// Restaurant details. Anything set to `null` is still to be provided by the
// restaurant and renders as a visible placeholder, never as invented data.

export type NavItem = { label: string; href: string };
export type Hours = { days: string; time: string };

export const site = {
  name: "Fresta",
  /** Public URL — set NEXT_PUBLIC_SITE_URL when the domain is live. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3102",
  tagline: "Italian, made simple.",
  description: "Fresh handmade pasta, antipasto and dolci. Italian, made simple.",
  statement: ["A little Italy,", "at your table."],

  nav: [
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  booking: {
    label: "Book a table",
    /** Restaurant's reservation page (TableOS). Every "Book a table" button goes here. */
    url: "https://tableos.restoqr-arcaisys.com/reserve/fresta-pasta?src=website" as string | null,
  },

  contact: {
    address:
      "Shop No. F-28, First Floor, R-Galleria, Runwal Greens, Mulund - Goregaon Link Road, Nahur West, Mulund West, Mumbai, Maharashtra 400080" as string | null,
    phone: "+91 89767 97655" as string | null,
    email: "frestapasta@gmail.com" as string | null,
  },

  hours: [
    { days: "Tue – Sun", time: "5:30 pm – 11:00 pm" },
    { days: "Monday", time: "Closed" },
  ] as Hours[] | null,
  /** Same hours in schema.org format, for Google. */
  hoursSchema: ["Tu-Su 17:30-23:00"],

  // Instagram | Facebook (LinkedIn removed at the owner's request).
  // Paste the full profile URL (e.g. "https://www.instagram.com/<handle>/") to switch the icons on.
  social: [
    { label: "Instagram", url: "https://www.instagram.com/fresta.pasta/" as string | null },
    { label: "Facebook", url: null as string | null },
  ],
};

/** Where every "Book a table" button points until the real link is supplied. */
export const bookingHref = site.booking.url ?? "/book";
/** Google Maps embed + link, derived from the address once it's supplied. */
export const mapEmbedUrl = (address: string) => `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
export const mapLinkUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
export const isExternal = (href: string) => /^https?:\/\//.test(href);
