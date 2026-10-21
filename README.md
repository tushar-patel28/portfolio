# Tushar Patel — Portfolio

My personal portfolio: a fast, single-page static site covering my experience, projects and skills, with a downloadable resume.

**Live site:** [tusharpatel.vercel.app](https://tusharpatel.vercel.app)

## Stack

- [Next.js 16](https://nextjs.org) (App Router), exported as a fully static site (`output: "export"`)
- TypeScript and [Tailwind CSS v4](https://tailwindcss.com)
- [framer-motion](https://motion.dev) for scroll animations and [lucide-react](https://lucide.dev) for icons
- Geist and Geist Mono, self-hosted via `next/font`

Features:
- Dark and light themes with no flash on load
- An accessible mobile menu and active-section navigation
- A project category filter
- Open Graph, Twitter card, sitemap, robots and web-manifest metadata

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build      # static site in out/
npm run lint
npx tsc --noEmit   # type check
```

To preview the production build, serve `out/` with any static file server. Use one that supports gzip if you're measuring performance.

## Update content

Everything on the site comes from **[`src/data/content.ts`](src/data/content.ts)**: profile, bio, experience, education, projects, skills, links, contact text and site metadata. Edit that file and the components update. There's no need to touch them.

- **Types:** each section's fields are typed at the top of the file. If you add a field, TypeScript points you to every place that needs it.
- **Projects:** each one needs a `category` (`"AI/ML" | "Full-Stack" | "Cloud" | "Data"`), which drives the filter, plus a one-line `description` and a headline `metric`. `details`, `repo`, `live` and `featured` are optional. The GitHub and demo icons only appear when a link is set.
- **Resume:** replace `public/resume.pdf`, keeping the filename.
- **Site URL:** `site.url` is the canonical address (`"https://tusharpatel.vercel.app"`). The canonical URL, Open Graph tags, sitemap and robots.txt all read from it, so update it if the domain changes.

The Open Graph image (`/og.png`) is generated at build time from your name, tagline and location, so it updates whenever you rebuild.

## basePath and `assetPath()`: Vercel vs GitHub Pages

The site can be served from a domain root (Vercel) or from a sub-path (a GitHub Pages project site, `https://tushar-patel28.github.io/portfolio/`).

- `basePath` comes from the `NEXT_PUBLIC_BASE_PATH` environment variable at build time. It defaults to `""`, which is right for Vercel.
- Next.js adds the base path to its own routes and assets automatically, but **not** to plain links to files in `public/`. Those go through `assetPath()` in [`src/lib/paths.ts`](src/lib/paths.ts):

  ```tsx
  <a href={assetPath("/resume.pdf")} download>Resume</a>
  // Vercel:        /resume.pdf
  // GitHub Pages:  /portfolio/resume.pdf
  ```

- In `content.ts`, write public paths without the base path (`"/resume.pdf"`). Components apply `assetPath()` when they render.
- Absolute URLs (canonical, Open Graph, sitemap) come from `siteUrl` in [`src/lib/site.ts`](src/lib/site.ts). It uses `site.url` from content.ts if it's set. Otherwise it falls back to Vercel's production domain during Vercel builds, and to `localhost` for local builds.

## Deploy

### Vercel (primary)

The site is live at **https://tusharpatel.vercel.app**, deployed through Vercel's GitHub integration. Every push to `main` deploys to production automatically. No environment variables are needed.

To set it up from scratch: import `tushar-patel28/portfolio` at [vercel.com/new](https://vercel.com/new), keep the detected Next.js preset and default build settings, and deploy. If you add a custom domain, set `site.url` in `content.ts` to that URL and push.

### GitHub Pages (alternative)

1. In `content.ts`, set `site.url` to `"https://tushar-patel28.github.io/portfolio"`.
2. Build with the base path:

   ```bash
   NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
   ```

3. Publish the contents of `out/` to GitHub Pages, from a `gh-pages` branch or a Pages workflow. `public/.nojekyll` is copied into `out/` so Pages serves the `_next/` folder.

There is no CI or deploy workflow in this repo yet.
