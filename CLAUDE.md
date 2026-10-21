@AGENTS.md

# Portfolio — project guide

Personal portfolio site for Tushar Patel. It is a single page, built as a fully static export.

## Stack

- **Next.js 16 (App Router)** with `output: "export"`. `next build` writes a static site to `out/`.
- **TypeScript** (strict) and **Tailwind CSS v4**. Tokens live in `src/app/globals.css`, and there is no `tailwind.config`.
- **framer-motion** for animation and **lucide-react** for icons.
- Fonts are Geist and Geist Mono, loaded via `next/font/google`.
- **Deploy:** Vercel is the primary target. GitHub Pages works via `NEXT_PUBLIC_BASE_PATH` (see below). There is no CI or deploy workflow yet.

**Dependency rule:** ask before adding any npm dependency beyond the ones above.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # static export to out/
npm run lint    # ESLint (next core-web-vitals + typescript)
npx tsc --noEmit
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build   # GitHub Pages build
```

## Folder structure

```
src/
  app/
    layout.tsx        # fonts, <Providers>, SEO metadata, viewport, JSON-LD (all from content + siteUrl)
    page.tsx          # composes Navbar, the sections and Footer, in order
    not-found.tsx     # 404 page (exported as out/404.html)
    globals.css       # Tailwind import, design tokens (dark default + light), dark: variant, enter keyframes
    og.png/route.tsx  # Open Graph / Twitter image, rendered at build time with next/og
    sitemap.ts  robots.ts  manifest.ts
  components/
    sections/         # one file per page section: Hero, About, Experience, Projects, Skills, Contact
      projects/       #   ProjectGrid (client: category filter) + ProjectCard
    ui/               # design system: Container, Section, SectionHeading, Card, Tag/TagList,
                      #   Button, ExternalLink, Enter, Reveal, ThemeToggle, Navbar, Footer, Providers, icons
  data/
    content.ts        # ALL site content + its TypeScript types
  lib/
    paths.ts          # basePath + assetPath()
    site.ts           # siteUrl + absoluteUrl() — the site's public address
    theme.ts          # theme init script (no-flash) + applyTheme()
    cn.ts             # className joiner
public/
  resume.pdf          # exported resume (see Content)
  icon.svg            # "TP" monogram — source for all icons
  favicon.ico  apple-touch-icon.png  icon-192.png  icon-512.png  icon-maskable-512.png
assets/fonts/         # Geist TTFs (OFL) used only by og.png at build time
```

## Conventions

### Content lives only in `src/data/content.ts`
- Bio, experience, education, projects, skills, links, nav, contact copy and site metadata all live there, typed by the interfaces at the top of the file.
- Components import `content` and render it. Don't hardcode prose in components. Generic UI labels such as "View my work" or "Resume" are fine.
- To add a new kind of content: add or extend the interface, add the data, then render it in a component.
- Entries marked `// TODO` are placeholders. Only `site.url` is left (see SEO).
- Content must be accurate. Don't invent metrics, companies, links or claims. Never add a phone number anywhere, including `public/resume.pdf`.
- Projects: each has a `category` from `projectCategories` (this drives the filter buttons, and empty categories are hidden), a one-line `description`, a single headline `metric`, and optional `details` (shown under "How it's built"). `repo` and `live` are optional, and their icons are hidden when absent. `featured` projects sort first and get a "Featured" label.
- `public/resume.pdf` is exported from a copy of `Resume/Tushar_Patel_Resume_AI_SDE.docx` with the phone number removed, the client name replaced ("a real police department client's"), and author metadata set to "Tushar Patel". Keep all three when re-exporting.

### basePath and `assetPath()`
- `basePath` comes from `NEXT_PUBLIC_BASE_PATH` and defaults to `""` (for Vercel). For a GitHub Pages project site, build with `NEXT_PUBLIC_BASE_PATH=/portfolio`.
- **Every reference to a file in `public/` must go through `assetPath()`** from `@/lib/paths`. That covers `<a href>`, `<img src>`, `next/image` `src`, and download links. Next.js does not prefix these automatically.
  ```tsx
  <a href={assetPath(profile.resume)} download>Resume</a>
  ```
- In `content.ts`, write public paths without the base path (`"/resume.pdf"`). Components apply `assetPath()` when they render.
- `assetPath()` returns external URLs, `#anchors` and `mailto:` links unchanged.
- `next/link` hrefs and Next-generated metadata links (manifest) get the prefix automatically. Don't wrap those. Icons live in `public/` and are declared in `metadata.icons` via `assetPath()`.
- Plain root-relative links to pages (e.g. the 404 page's "Back to home") also use `assetPath("/")`.

### SEO and the site URL
- Anything that needs the site's absolute address uses `siteUrl` / `absoluteUrl(path)` from `@/lib/site`: `metadataBase`, canonical, `og:url`, `og:image`, the sitemap, robots and JSON-LD. Never hardcode a domain.
- `siteUrl` resolves in this order: `content.site.url`, then `VERCEL_PROJECT_PRODUCTION_URL` (set by Vercel at build time), then `http://localhost:3000` + basePath (local builds only). `content.site.url` is the full public URL, including any base path, with no trailing slash.
- `absoluteUrl()` takes a path *without* basePath (`absoluteUrl("/og.png")`). The base path is already part of `siteUrl`.
- The OG image is a route handler at `src/app/og.png/route.tsx`, not the `opengraph-image` file convention. Static export writes the convention files without an extension (`out/opengraph-image`), so hosts would serve the wrong content type. It reads name, tagline, location and GitHub from `content.ts`, so it updates on rebuild. Its colors are copied from the dark tokens, so update both together.
- `sitemap.ts`, `robots.ts`, `manifest.ts` and `og.png` need `export const dynamic = "force-static"` under static export.

### Static export constraints
- No Server Actions, route handlers that read the request, cookies or headers, rewrites, redirects, middleware/proxy, ISR, or dynamic routes without `generateStaticParams`.
- `cacheComponents` and `partialPrefetching` are left off on purpose. Both enable PPR, which fails in export mode.
- `images.unoptimized` is `true`. `next/image` won't optimize images, so size them before adding them.
- `trailingSlash: true` makes every route emit `route/index.html`, which suits static hosts.

### Components
- Use Server Components by default. Add `"use client"` only when a component needs state, effects, or framer-motion APIs directly. Currently that's Navbar, ThemeToggle, Reveal, Providers and ProjectGrid.
- Use named exports (`export function Hero()`), one component per file (small helpers like `TagList` may share a file), with PascalCase filenames.
- Import via the `@/` alias (`@/components/...`, `@/data/content`, `@/lib/paths`).
- Build sections from the `ui/` primitives rather than one-off markup:
  - `<Section id title>`: anchor, vertical rhythm (`py-20 sm:py-28`), `<Container>` and a numbered `<SectionHeading>`. The number is the section's position in `content.nav`, so the `id` must match a nav `href`.
  - `<Container>`: the one content width (`max-w-5xl px-6`). The navbar, sections and footer all use it.
  - `<Card interactive?>`: a bordered surface. `interactive` adds the hover lift for cards that contain links.
  - `<Tag>` / `<TagList items>`: small mono labels for tech and skills.
  - `<Button variant="primary|secondary|ghost" size="sm|md|icon">`: renders `<a>` when given `href`. Primary is inverted foreground/background, not the accent. Icon-only buttons need `aria-label`.
  - `<ExternalLink>`: any link to another site. It adds new tab, `rel="noopener noreferrer"`, a ↗ icon (`showIcon={false}` for icon-only) and a screen-reader "(opens in a new tab)" hint.
- `cn()` only joins class strings and does **not** resolve conflicts. Don't pass `className` utilities that compete with a component's base classes (display, height, padding on Button). Use a prop such as `size`, or wrap the component in a `div` that carries `hidden md:block` or similar.

### Styling
- Use semantic token utilities, not raw palette colors: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `text-accent`, `border-border`. Tokens are defined in `globals.css` for both themes, and every text/background pair meets WCAG AA. Recheck contrast when you change a value.
- **The accent is used sparingly:** section numbers, the active-nav underline, focus rings, hero greeting, small "Featured" labels and bullet dashes. Don't use it for large fills or primary buttons.
- Typography: Geist Sans for body text. Geist Mono (`font-mono`) for small labels, tags, dates and section numbers.
- Layout: everything sits inside `<Container>`. Two-column rows (Experience, Skills) use `md:grid-cols-[10rem_1fr]` with the mono label on the left.

### Theme
- Dark is the default. `data-theme="dark"|"light"` sits on `<html>`, and `dark:` utilities key off it (see `@custom-variant` in `globals.css`).
- `themeInitScript` (in `src/lib/theme.ts`) is inlined in `<head>` and runs before first paint, so there's no flash. It picks the saved choice first, then the system preference, then dark.
- `ThemeToggle` saves an explicit choice to `localStorage["theme"]` and follows OS changes until one is made. Change themes only through `applyTheme()`, which also suppresses transitions during the switch.
- Anything that must look different per theme before hydration (like the toggle icon) should use CSS (`dark:hidden` / `hidden dark:block`), not React state.

### Animation
- Keep animation subtle: short fades and small lifts (≈12px, 0.2–0.5s, `easeOut`).
- **Above the fold (the hero), use `<Enter delay?>`.** It's a CSS-only animation that plays on first paint without waiting for JS, which keeps mobile LCP fast. Don't use framer-motion there.
- **Below the fold, use `<Reveal delay?>`** (framer-motion `whileInView`) rather than one-off motion props. Use small `delay` values to stagger siblings.
- Reveal marks its element with `data-reveal`. Under `prefers-reduced-motion`, and without JS, CSS forces the final state, so content is never stuck invisible. Keep that attribute on any new scroll animation. `.animate-enter` is disabled under reduced motion too.
- framer-motion is loaded through `LazyMotion features={domAnimation} strict` in `<Providers>`. **Use `m.div` / `m.li`, never `motion.*`.** `strict` throws on `motion.*` because it would pull in the full bundle. `domAnimation` has no layout animations (`layout` / `layoutId`), so use CSS transitions for those (see the nav underline).
- `<Providers>` also sets `MotionConfig reducedMotion="user"`. Don't bypass it.

### Performance budget
- First-load JS for `/` is ~178 KB gzip, not counting the `noModule` polyfill chunk that modern browsers skip. About 157 KB of that is the React and Next.js runtime. Keep app code lean, and check `out/index.html` script sizes after adding client code.
- Fonts come only from `next/font`, which self-hosts them with size-adjusted fallbacks (CLS 0). Don't add `<link>` font stylesheets.
- When running Lighthouse locally, serve `out/` with gzip. Python's `http.server` doesn't compress, which inflates mobile LCP by about 2.5s.

### Navbar
- It is sticky and blurred, and the border appears after scrolling. Section links come from `content.nav`.
- The active section is the last one whose top has passed 35% of the viewport, or the last section at the bottom of the page. It is marked with `aria-current="location"`.
- Mobile menu: `aria-expanded`/`aria-controls`. Opening moves focus to the first link. Escape closes it and refocuses the button. Focus leaving the header, or widening to `md`, also closes it.

### Icons
- Content refers to icons by name (`IconName`). Render them with `<Icon name="..." />` from `@/components/ui/icons`.
- To add an icon, import it from lucide-react and add it to the `icons` map. lucide-react v1 has no brand logos, so GitHub and LinkedIn are inline SVGs in the same file. Add other brand logos the same way.
- Icon-only links need an `aria-label`.
