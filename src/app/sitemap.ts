import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wdc-summit.org";
  const currentDate = new Date().toISOString();

  const routes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/summit", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/declaration", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/programme", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/packages", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/partners", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/apply", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/payment", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
