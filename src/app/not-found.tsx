import Link from "next/link";
import { Chef } from "@/components/ui/Chef";

export default function NotFound() {
  return (
    <section className="shell flex min-h-dvh flex-col items-center justify-center gap-8 pt-(--nav-h) pb-24 text-center">
      <Chef sizes="180px" className="w-40" />
      <h1 className="display-lg">
        Still <span className="script text-[1.3em] text-arancio normal-case">resting</span>
      </h1>
      <p className="max-w-[34ch] text-crema/75">Like good dough, this page isn&rsquo;t ready yet.</p>
      <Link href="/" className="group label inline-flex items-center gap-2 text-accent">
        Back to the kitchen <span aria-hidden className="nudge">→</span>
      </Link>
    </section>
  );
}
