import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const routes = ["", "/menu", "/about", "/book", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/menu" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/menu" ? 0.9 : 0.7,
  }));
}
