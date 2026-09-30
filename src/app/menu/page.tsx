import type { Metadata } from "next";
import { menu } from "@/data/menu";
import { MenuIntro } from "@/components/menu/MenuIntro";
import { CategoryPosters } from "@/components/menu/CategoryPosters";
import { MenuList } from "@/components/menu/MenuList";
import { jsonLd, menuJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Menu",
  description: "Antipasto, fresh pasta and desserts at Fresta. Made fresh, served simply.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  // Only categories with dishes on the card are shown — nothing is padded out.
  const categories = menu.filter((c) => c.dishes.length > 0);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(menuJsonLd())} />
      <MenuIntro />
      <CategoryPosters />
      <MenuList categories={categories} />
    </>
  );
}
