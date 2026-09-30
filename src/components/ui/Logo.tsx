import Image from "next/image";
import clsx from "clsx";
import { brand } from "@/data/brand";

type Props = {
  /** Width comes from className (e.g. "w-16 lg:w-20"); height follows the logo's own aspect ratio. */
  className?: string;
  /** Rendered width hint for next/image, e.g. "84px". */
  sizes: string;
  preload?: boolean;
};

/**
 * The official Fresta logo, never redrawn or recoloured.
 * While the supplied file has a white background, it sits on a cream plate and
 * `multiply` drops the white into the cream.
 */
export function Logo({ className, sizes, preload }: Props) {
  const { src, width, height, alt, hasBackground } = brand.logo;
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      preload={preload}
      loading={preload ? "eager" : undefined}
      sizes={sizes}
      className={clsx("h-auto select-none", hasBackground && "mix-blend-multiply", className)}
      draggable={false}
    />
  );
}
