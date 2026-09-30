import clsx from "clsx";

/** Wavy strand path: `waves` half-waves of a quadratic curve, 10 units apart. */
function strandPath(waves: number, amp = 3.2) {
  return `M1 5 q5 ${-amp} 10 0` + " t10 0".repeat(Math.max(waves - 1, 0));
}

type Props = {
  waves?: number;
  className?: string;
  /** "draw": hidden until a parent `.group` is hovered or marked aria-current. */
  mode?: "static" | "draw";
  strokeWidth?: number;
};

/**
 * A single tagliatelle ribbon — Fresta's divider and underline.
 * Colour comes from `currentColor`.
 */
export function PastaRibbon({ waves = 8, className, mode = "static", strokeWidth = 1.6 }: Props) {
  const width = waves * 10 + 2;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} 10`}
      preserveAspectRatio="none"
      className={clsx("block overflow-visible", className)}
    >
      <path
        d={strandPath(waves)}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={mode === "draw" ? "ribbon-path" : undefined}
      />
    </svg>
  );
}
