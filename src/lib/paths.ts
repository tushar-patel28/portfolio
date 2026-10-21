/**
 * basePath is inlined at build time from NEXT_PUBLIC_BASE_PATH.
 * Empty on Vercel; "/portfolio" for a GitHub Pages project site.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a path to a file in public/ with the basePath.
 * Use this for every reference to public/ assets (plain <a>, <img>, next/image src),
 * because Next.js does not prefix those automatically.
 * External URLs, in-page anchors and mailto:/tel: links are returned unchanged.
 *
 *   assetPath("/resume.pdf") -> "/resume.pdf" or "/portfolio/resume.pdf"
 */
export function assetPath(path: string): string {
  if (/^([a-z][a-z\d+.-]*:|#|\/\/)/i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
