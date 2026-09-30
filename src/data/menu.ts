// Source of truth: "MENU final print file.pdf" (confirmed accurate by the restaurant).
// Wording, spelling, order and prices are copied verbatim from the card — do not edit
// them here without an updated card. Each line on the card is split at its first
// comma: `name` is the dish, `description` is the rest, exactly as printed.

import type { PhotoKey } from "./photos";

export type Marker = "veg";

export type Dish = {
  name: string;
  description: string;
  /** INR, as printed on the card. Kept as the record — not displayed on the website. */
  price: number;
  markers: Marker[];
};

export type MenuCategory = {
  id: string;
  title: string; // shown in the script face, as on the card
  cover: PhotoKey; // poster image for the visual category entry
  dishes: Dish[];
};

export const markerLabels: Record<Marker, { short: string; label: string }> = {
  veg: { short: "V", label: "Vegetarian" },
};

export const menu: MenuCategory[] = [
  {
    id: "antipasto",
    title: "Antipasto",
    cover: "catAntipasto",
    dishes: [
      { name: "Focaccia", description: "EVOO, Rosemary, House Butter", price: 333, markers: ["veg"] },
      { name: "Patata Bravas", description: "Kashmiri Chilli Emulsion, Yuzu Mayo, Chives", price: 393, markers: ["veg"] },
      { name: "Burrata", description: "Panzanella, Croutons, Charred Peppers, Cherry Tomatoes", price: 497, markers: ["veg"] },
      { name: "Sicilian Fried Chicken", description: "Roquette, Pickles, Saffron Aioli, Chilli Emulsion.", price: 463, markers: [] },
    ],
  },
  {
    id: "pasta-fresta",
    title: "Pasta Fresta",
    cover: "catPasta",
    dishes: [
      { name: "Gnocchi", description: "San Marzano Tomatoes, Burrata", price: 537, markers: ["veg"] },
      { name: "Aglio olio", description: "Slow-infused Garlic, Peperoncino", price: 495, markers: ["veg"] },
      { name: "Fettuccini", description: "Cacio Pepe, Parmesan", price: 537, markers: ["veg"] },
      { name: "Cavatelli", description: "Broccoli, Garlic, Pangrattato", price: 545, markers: ["veg"] },
      { name: "Cappelletti", description: "Pulled Chicken, Ricotta, Romesco", price: 570, markers: [] },
      { name: "Maltagliati", description: "Goat shoulder Ragu, Grana Padano", price: 595, markers: [] },
      { name: "Seafood Linguine", description: "Prawn Bisque, Anchovy crumbs", price: 597, markers: [] },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    cover: "catDesserts",
    dishes: [
      { name: "Dark Chocolate Mouse", description: "Chantilly Cream, Candied Oranges, Chocolate Soil.", price: 380, markers: ["veg"] },
      { name: "Cannoli", description: "Ricotta, Mascarpone, Pistachio and Chocolate.", price: 360, markers: [] },
      { name: "Tiramisu", description: "Marsala, Homemade Mascarpone.", price: 420, markers: [] },
    ],
  },
];
