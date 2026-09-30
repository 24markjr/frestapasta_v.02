import { site } from "@/data/site";
import { menu } from "@/data/menu";

/** Serialises JSON-LD safely for a <script> tag. */
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });

/** Restaurant schema — only includes details the restaurant has supplied. */
export function restaurantJsonLd() {
  const { address, phone, email } = site.contact;
  const sameAs = site.social.map((s) => s.url).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/fresta-logo.png`,
    image: `${site.url}/opengraph-image.jpg`,
    servesCuisine: "Italian",
    priceRange: "₹₹",
    hasMenu: `${site.url}/menu`,
    acceptsReservations: true,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No. F-28, First Floor, R-Galleria, Runwal Greens, Mulund - Goregaon Link Road, Nahur West",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400080",
        addressCountry: "IN",
      },
    }),
    ...(site.hours && { openingHours: site.hoursSchema }),
    ...(phone && { telephone: phone }),
    ...(email && { email }),
    ...(sameAs.length && { sameAs }),
  };
}

/** Menu schema, built from the same data as the menu page (prices are not published). */
export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} menu`,
    url: `${site.url}/menu`,
    inLanguage: "en",
    hasMenuSection: menu
      .filter((c) => c.dishes.length)
      .map((c) => ({
        "@type": "MenuSection",
        name: c.title,
        hasMenuItem: c.dishes.map((d) => ({
          "@type": "MenuItem",
          name: d.name,
          description: d.description,
          ...(d.markers.includes("veg") && { suitableForDiet: "https://schema.org/VegetarianDiet" }),
        })),
      })),
  };
}
