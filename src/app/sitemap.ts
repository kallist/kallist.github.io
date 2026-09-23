import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kallist.github.io";
  return ["/", "/resume/", ...projects.map(({ slug }) => `/work/${slug}/`)].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.7,
    }),
  );
}
