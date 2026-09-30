// Every photograph on the site, in one place.
// These are PLACEHOLDER stock photos. To swap one, replace the file in
// src/assets/photos with the restaurant's own photo (same name) or change the import.
// Static imports give next/image the size and a blur placeholder automatically.

import type { StaticImageData } from "next/image";
import heroPastaFresca from "@/assets/photos/hero-pasta-fresca.jpg";
import heroPlate from "@/assets/photos/hero-plate.png";
import handmadePasta from "@/assets/photos/handmade-pasta.jpg";
import fromTheKitchen from "@/assets/photos/from-the-kitchen.jpg";
import dolci from "@/assets/photos/dolci.jpg";
import introTwirl from "@/assets/photos/intro-twirl.jpg";
import catAntipasto from "@/assets/photos/cat-antipasto.jpg";
import catPasta from "@/assets/photos/cat-pasta.jpg";
import catDesserts from "@/assets/photos/cat-desserts.jpg";
import storyKitchen from "@/assets/photos/story-kitchen.jpg";
import storyTable from "@/assets/photos/story-table.jpg";
import bookServed from "@/assets/photos/book-served.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const photos = {
  heroPlate: { src: heroPlate, alt: "A bowl of fresh pappardelle in a slow-cooked ragù" },
  heroPastaFresca: { src: heroPastaFresca, alt: "Nests of fresh egg pasta beside ripe cherry tomatoes" },
  handmadePasta: { src: handmadePasta, alt: "Ribbons of fresh pasta tossed in a glossy sauce" },
  fromTheKitchen: { src: fromTheKitchen, alt: "A chef plating a dish under warm kitchen lights" },
  dolci: { src: dolci, alt: "A slice of dark chocolate cake" },
  introTwirl: { src: introTwirl, alt: "Spaghetti twirled on a fork above the plate" },
  catAntipasto: { src: catAntipasto, alt: "Tomatoes, fresh cheese and basil" },
  catPasta: { src: catPasta, alt: "Wide ribbons of fresh pasta in a dark bowl" },
  catDesserts: { src: catDesserts, alt: "Tiramisu dusted with cocoa" },
  storyKitchen: { src: storyKitchen, alt: "A chef working over a flaming pan" },
  storyTable: { src: storyTable, alt: "Fresh vegetables, eggs and herbs on a wooden board" },
  bookServed: { src: bookServed, alt: "A bowl of pasta carried to the table" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
