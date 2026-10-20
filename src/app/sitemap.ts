import type { MetadataRoute } from "next";
import { CURATED_PACKAGES } from "@/features/agency/data/agencyData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://voyara.luxury";

  const packageRoutes: MetadataRoute.Sitemap = CURATED_PACKAGES.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...packageRoutes,
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
