import type { MetadataRoute } from "next";

const BASE = "https://makanabyruh.az";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/#contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
