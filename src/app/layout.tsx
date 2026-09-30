import type { Metadata, Viewport } from "next";
import { Mr_Dafoe, Mukta, Unbounded } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/data/site";
import { jsonLd, restaurantJsonLd } from "@/lib/seo";
import "./globals.css";

// The menu card's families: Unbounded (display + dish names), Mukta (text + ₹ prices).
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], display: "swap" });
const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "latin-ext"], // latin-ext carries the ₹ glyph
  weight: ["400", "600", "700"],
  display: "swap",
});
// The card's script is GlamourPalace (not on Google Fonts). Mr Dafoe is the closest
// free brush-signature stand-in; to use the licensed file, swap this for next/font/local.
const script = Mr_Dafoe({ variable: "--font-script", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { title: site.name, description: site.description, type: "website", locale: "en_IN", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport: Viewport = { themeColor: "#16301c", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unbounded.variable} ${mukta.variable} ${script.variable}`}>
      <body className="min-h-dvh">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(restaurantJsonLd())} />
        <a href="#content" className="label sr-only fixed top-4 left-4 z-100 bg-arancio-deep px-4 py-3 text-crema focus:not-sr-only">
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="content" tabIndex={-1} className="relative outline-none">
            {children}
          </main>
          <Footer />
          <PageTransition />
          <SmoothScroll />
        </Providers>
      </body>
    </html>
  );
}
