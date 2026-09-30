import Image from "next/image";
import clsx from "clsx";
import { brand } from "@/data/brand";

type Props = { sizes: string; className?: string; alt?: string };

/**
 * The chef from the menu card — the site's recurring character. The artwork is
 * never altered; the whole figure just rocks gently from his feet, as if
 * turning the pasta machine's crank. Stops for reduced motion.
 */
export function Chef({ sizes, className, alt = brand.chef.alt }: Props) {
  return (
    <span className={clsx("block", className)}>
      <Image
        src={brand.chef.src}
        width={brand.chef.width}
        height={brand.chef.height}
        alt={alt}
        sizes={sizes}
        className="chef-crank h-auto w-full"
      />
    </span>
  );
}
