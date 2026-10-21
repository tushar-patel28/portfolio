import type { MetadataRoute } from "next";
import { content } from "@/data/content";
import { assetPath } from "@/lib/paths";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const { site, profile } = content;
  return {
    name: site.title,
    short_name: profile.name,
    description: site.description,
    start_url: assetPath("/"),
    scope: assetPath("/"),
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      { src: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: assetPath("/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: assetPath("/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
