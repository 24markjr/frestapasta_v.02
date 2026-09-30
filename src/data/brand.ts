// Official brand artwork. Swap a file here and it updates everywhere.

export const brand = {
  /**
   * Official Fresta logo, used exactly as supplied.
   * Temporary: the current file has a white background, so it is shown on a
   * cream plate with `mix-blend-mode: multiply`, which makes the white disappear
   * without altering the artwork. When the transparent version arrives, replace
   * the file and set `hasBackground: false`.
   */
  logo: {
    src: "/brand/fresta-logo.png",
    width: 1254,
    height: 1254,
    alt: "Fresta — chef rolling fresh pasta",
    hasBackground: true,
  },
  /** Cream chef illustration, extracted from the printed menu card. */
  chef: {
    src: "/brand/chef-cream.png",
    width: 1088,
    height: 1136,
    alt: "",
  },
} as const;
