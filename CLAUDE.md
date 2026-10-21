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
    layout.tsx        # fonts, <Providers>, metadata (read from content.site)
    page.tsx          # composes Navbar, the sections and Footer, in order
    globals.css       # Tailwind import + design tokens (light/dark)
    favicon.ico
  components/
    sections/         # one file per page section: Hero, About, Experience, Projects, Skills, Contact
    ui/               # shared building blocks: Section, Reveal, Tag, Navbar, Footer, Providers, icons
  data/
    content.ts        # ALL site content + its TypeScript types
  lib/
    paths.ts          # basePath + assetPath()
public/
  resume.pdf          # placeholder; replace with the real resume
```

## Conventions

### Content lives only in `src/data/content.ts`
- Bio, experience, education, projects, skills, links, nav, contact copy and site metadata all live there, typed by the interfaces at the top of the file.
- Components import `content` and render it. Don't hardcode prose in components. Generic UI labels such as "View my work" or "Resume" are fine.
- To add a new kind of content: add or extend the interface, add the data, then render it in a component.
- Entries marked `// TODO` are placeholders.

### basePath and `assetPath()`
- `basePath` comes from `NEXT_PUBLIC_BASE_PATH` and defaults to `""` (for Vercel). For a GitHub Pages project site, build with `NEXT_PUBLIC_BASE_PATH=/portfolio`.
- **Every reference to a file in `public/` must go through `assetPath()`** from `@/lib/paths`. That covers `<a href>`, `<img src>`, `next/image` `src`, and download links. Next.js does not prefix these automatically.
  ```tsx
  <a href={assetPath(profile.resume)} download>Resume</a>
  ```
- In `content.ts`, write public paths without the base path (`"/resume.pdf"`). Components apply `assetPath()` when they render.
- `assetPath()` returns external URLs, `#anchors` and `mailto:` links unchanged.
- `next/link` hrefs and files under `src/app/` (favicon, metadata files) get the prefix automatically. Don't wrap those.

### Static export constraints
- No Server Actions, route handlers that read the request, cookies or headers, rewrites, redirects, middleware/proxy, ISR, or dynamic routes without `generateStaticParams`.
- `cacheComponents` and `partialPrefetching` are left off on purpose. Both enable PPR, which fails in export mode.
- `images.unoptimized` is `true`. `next/image` won't optimize images, so size them before adding them.
- `trailingSlash: true` makes every route emit `route/index.html`, which suits static hosts.

### Components
- Use Server Components by default. Add `"use client"` only when a component needs state, effects, or framer-motion APIs directly. Currently that's Hero, Navbar, Reveal and Providers.
- Use named exports (`export function Hero()`), one component per file, with PascalCase filenames.
- Import via the `@/` alias (`@/components/...`, `@/data/content`, `@/lib/paths`).
- Each section wraps itself in `<Section id title>`. The `id` must match an `href` in `content.nav`.

### Styling
- Use semantic token utilities, not raw palette colors: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `text-accent`, `border-border`. To change the palette, edit the CSS variables in `globals.css`. Dark mode follows the OS (`prefers-color-scheme`), and there is no toggle.
- Content width is `max-w-5xl` with `px-6`. Section spacing comes from `<Section>`.
- Use Geist Mono (`font-mono`) for small meta text: dates, tags, the hero greeting.

### Animation
- Keep animation subtle: short fades and small lifts (≈16px, 0.2–0.5s, `easeOut`).
- For scroll-in effects, wrap content in `<Reveal delay?>` rather than writing one-off `motion` props. Use small `delay` values to stagger siblings.
- `<Providers>` sets `MotionConfig reducedMotion="user"`. Don't bypass it.

### Icons
- Content refers to icons by name (`IconName`). Render them with `<Icon name="..." />` from `@/components/ui/icons`.
- To add an icon, import it from lucide-react and add it to the `icons` map. lucide-react v1 has no brand logos, so GitHub and LinkedIn are inline SVGs in the same file. Add other brand logos the same way.
- Icon-only links need an `aria-label`.
