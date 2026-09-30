// Page copy for the About page.
// PLACEHOLDER COPY — short, general, and free of facts (no dates, names or
// claims). Replace with the restaurant's own words. Anything `null` renders
// as a visible [ placeholder ] until supplied.

import type { PhotoKey } from "./photos";

export const about = {
  hero: {
    statements: ["Made by hand.", "Rooted in Italy.", "Made for the table."],
    photo: "heroPastaFresca" as PhotoKey,
  },
  intro:
    "Fresta is an Italian kitchen built around fresh pasta — rolled, cut and cooked by hand. Simple recipes, good ingredients, and a table worth lingering at.",
  story: [
    {
      photo: "storyKitchen" as PhotoKey,
      title: "The dough comes first.",
      text: "Flour, eggs and a pasta machine. The dough is rolled, rested and cut by hand into the shapes on our menu — the way it has been done in Italian kitchens for generations.",
    },
    {
      photo: "storyTable" as PhotoKey,
      title: "Then, restraint.",
      text: "A few good ingredients, cooked with care and served simply, so the pasta can speak for itself.",
    },
  ],
};
