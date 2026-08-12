import { MetadataRoute } from "next";
import { company } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/cidb-advisory",
    "/case-reviews",
    "/insights",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${company.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
