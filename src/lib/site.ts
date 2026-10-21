import { content } from "@/data/content";
import { basePath } from "./paths";

/**
 * Absolute URL of the site root (no trailing slash). Resolution order:
 *   1. content.site.url                       — set this once the domain is final
 *   2. VERCEL_PROJECT_PRODUCTION_URL          — set by Vercel during builds (production domain)
 *   3. http://localhost:3000 + basePath       — local builds only
 */
function resolveSiteUrl(): string {
  const configured = content.site.url.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}${basePath}`;

  return `http://localhost:3000${basePath}`;
}

export const siteUrl = resolveSiteUrl();

/** Absolute URL for a path on this site, e.g. absoluteUrl("/resume.pdf"). Don't pre-apply basePath. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
