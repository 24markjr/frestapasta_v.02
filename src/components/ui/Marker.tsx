import { markerLabels, type Marker as MarkerType } from "@/data/menu";

/** The card's small circled "V" — kept deliberately quiet. */
export function Marker({ type }: { type: MarkerType }) {
  const { short, label } = markerLabels[type];
  return (
    <abbr
      title={label}
      className="inline-grid size-[1.2rem] shrink-0 place-items-center rounded-full border border-(--veg) font-display text-[0.58rem] leading-none text-(--veg) no-underline"
    >
      <span aria-hidden>{short}</span>
      <span className="sr-only">{label}</span>
    </abbr>
  );
}
