import { site } from "@/data/site";
import { Pending } from "./Pending";

/** A line from the menu card, reused for details: label ······ value. */
export function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 py-3">
      <dt className="dish shrink-0">{label}</dt>
      <span aria-hidden className="min-w-6 flex-1 -translate-y-1 border-b border-dotted border-current opacity-30" />
      <dd className="text-right">{children}</dd>
    </div>
  );
}

/** Opening hours as menu-card lines, or a visible placeholder until supplied. */
export function HoursList() {
  if (!site.hours) return <Pending>opening hours</Pending>;
  return (
    <dl>
      {site.hours.map((h) => (
        <InfoRow key={h.days} label={h.days}>
          <span className="price">{h.time}</span>
        </InfoRow>
      ))}
    </dl>
  );
}
