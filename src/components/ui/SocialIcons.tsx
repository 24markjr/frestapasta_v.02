import clsx from "clsx";
import { site } from "@/data/site";

type Network = "Instagram" | "Facebook";

const glyphs: Record<Network, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </>
  ),
  Facebook: (
    <path
      d="M13.5 21v-7.5h2.6l.4-3.1h-3v-2c0-.9.3-1.5 1.6-1.5h1.6V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H7.9v3.1h2.6V21h3z"
      fill="currentColor"
    />
  ),
};

/**
 * Instagram + Facebook icons. Each links to the restaurant's page once its URL
 * is set in src/data/site.ts; until then it shows dimmed and isn't clickable,
 * so we never point visitors at a guessed account.
 */
export function SocialIcons({ className, size = "size-[1.15rem]" }: { className?: string; size?: string }) {
  const networks = site.social.filter((s): s is (typeof site.social)[number] & { label: Network } =>
    s.label === "Instagram" || s.label === "Facebook",
  );
  return (
    <ul className={clsx("flex items-center gap-2.5", className)}>
      {networks.map((s) => {
        const icon = (
          <svg viewBox="0 0 24 24" aria-hidden className={size}>
            {glyphs[s.label]}
          </svg>
        );
        return (
          <li key={s.label}>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on ${s.label} (opens in a new tab)`}
                // Outlined disc so the icon reads over anything behind the transparent navbar
                className="grid size-10 place-items-center rounded-full border border-crema/45 bg-verde/70 text-crema backdrop-blur-sm transition-[background-color,color,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-crema hover:bg-crema hover:text-verde"
              >
                {icon}
              </a>
            ) : (
              <span
                title={`${s.label} link coming soon`}
                className="grid size-10 place-items-center rounded-full border border-crema/25 bg-verde/70 text-crema/55 backdrop-blur-sm"
              >
                {icon}
                <span className="sr-only">{s.label} link coming soon</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
