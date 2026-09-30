"use client";

import { MotionConfig } from "motion/react";

/** `reducedMotion="user"` turns transforms off for visitors who ask for less motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
