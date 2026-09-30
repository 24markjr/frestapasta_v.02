/**
 * Hand-drawn ingredients in the chef illustration's style: flat brand fills with
 * a dark cartoon outline. Colours are the brand's own — logo pasta yellow, the
 * card's orange and its vegetarian green, cream.
 */

const INK = "#0b1a0f";
const PASTA = "#f8d25c";
const PASTA_DARK = "#e9b93a";
const ARANCIO = "#e54225";
const BASIL = "#afd135";
const BASIL_DARK = "#7e9c1c";
const CREMA = "#fef3c8";

const line = { stroke: INK, strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

type P = { className?: string };

export function Tomato({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="56" r="32" fill={ARANCIO} {...line} />
      <ellipse cx="38" cy="46" rx="7" ry="4" fill={CREMA} opacity=".55" transform="rotate(-30 38 46)" />
      <path d="M50 26 l-14 -6 l8 10 l-14 4 l16 2 l4 10 l4 -10 l16 -2 l-14 -4 l8 -10 z" fill={BASIL} {...line} />
      <path d="M50 24 q2 -10 8 -14" fill="none" {...line} />
    </svg>
  );
}

export function Basil({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M50 8 C82 26 84 66 50 92 C16 66 18 26 50 8 Z" fill={BASIL} {...line} />
      <path d="M50 16 V86 M50 38 L64 30 M50 54 L68 46 M50 70 L64 64 M50 38 L36 30 M50 54 L32 46 M50 70 L36 64" fill="none" stroke={BASIL_DARK} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Farfalle({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M50 50 C38 40 24 22 12 26 C4 40 4 60 12 74 C24 78 38 60 50 50 Z" fill={PASTA} {...line} />
      <path d="M50 50 C62 40 76 22 88 26 C96 40 96 60 88 74 C76 78 62 60 50 50 Z" fill={PASTA} {...line} />
      <path d="M12 30 l4 4 -4 4 4 4 -4 4 4 4 -4 4 4 4 -4 4 4 4 M88 30 l-4 4 4 4 -4 4 4 4 -4 4 4 4 -4 4 4 4 -4 4" fill="none" stroke={PASTA_DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="50" cy="50" rx="7" ry="11" fill={PASTA_DARK} {...line} />
    </svg>
  );
}

export function Fusilli({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <rect x="36" y="8" width="28" height="84" rx="13" fill={PASTA} {...line} />
      <path d="M36 22 L64 12 M36 36 L64 26 M36 50 L64 40 M36 64 L64 54 M36 78 L64 68 M38 90 L64 82" fill="none" stroke={PASTA_DARK} strokeWidth="4" strokeLinecap="round" />
      <path d="M36 22 L64 12 M36 36 L64 26 M36 50 L64 40 M36 64 L64 54 M36 78 L64 68" fill="none" {...line} strokeWidth="1.5" />
    </svg>
  );
}

export function Penne({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M22 30 L58 12 L80 70 L44 88 Z" fill={PASTA} {...line} />
      <ellipse cx="40" cy="21" rx="20" ry="7" transform="rotate(-27 40 21)" fill={PASTA_DARK} {...line} />
      <path d="M30 38 L64 21 M35 50 L68 33 M39 62 L73 45 M44 74 L76 58" fill="none" stroke={PASTA_DARK} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Chili({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M70 22 C86 30 84 52 70 70 C58 86 34 94 16 90 C34 82 50 70 56 52 C60 40 60 28 70 22 Z" fill={ARANCIO} {...line} />
      <path d="M62 56 C58 66 50 74 40 80" fill="none" stroke={CREMA} strokeWidth="3" strokeLinecap="round" opacity=".5" />
      <path d="M70 22 C70 14 76 8 84 8 C80 12 80 18 82 22 C78 26 72 26 70 22 Z" fill={BASIL} {...line} />
    </svg>
  );
}

export function Garlic({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M50 14 C54 24 60 30 72 40 C86 52 84 78 66 86 C58 90 42 90 34 86 C16 78 14 52 28 40 C40 30 46 24 50 14 Z" fill={CREMA} {...line} />
      <path d="M50 30 C44 50 44 70 50 88 M50 30 C58 50 60 70 58 88 M40 44 C32 58 32 74 38 86 M62 46 C70 60 70 74 64 86" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
      <path d="M50 14 L50 6" {...line} fill="none" />
    </svg>
  );
}

export function Parmesan({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M12 72 L78 18 L90 72 Z" fill={PASTA} {...line} />
      <path d="M12 72 L90 72 L90 84 L12 84 Z" fill={PASTA_DARK} {...line} />
      <circle cx="62" cy="52" r="5" fill={PASTA_DARK} />
      <circle cx="78" cy="40" r="3.5" fill={PASTA_DARK} />
      <circle cx="44" cy="62" r="3" fill={PASTA_DARK} />
    </svg>
  );
}

export function Wheat({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M50 96 C50 70 50 40 50 10" fill="none" {...line} />
      {[20, 34, 48, 62].map((y) => (
        <g key={y}>
          <ellipse cx="40" cy={y} rx="6" ry="11" transform={`rotate(-30 40 ${y})`} fill={PASTA} {...line} strokeWidth="2" />
          <ellipse cx="60" cy={y} rx="6" ry="11" transform={`rotate(30 60 ${y})`} fill={PASTA} {...line} strokeWidth="2" />
        </g>
      ))}
      <ellipse cx="50" cy="8" rx="5" ry="9" fill={PASTA} {...line} strokeWidth="2" />
    </svg>
  );
}
