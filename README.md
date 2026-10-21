# Portfolio

Personal portfolio site. It is built with Next.js (App Router), TypeScript, Tailwind CSS and framer-motion, and exported as a fully static site.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit content

All content lives in [`src/data/content.ts`](src/data/content.ts). Replace `public/resume.pdf` with your resume.

## Build and deploy

```bash
npm run build    # static site in out/
```

- **Vercel:** import the repo. No configuration is needed.
- **GitHub Pages** (project site at `/portfolio`): build with `NEXT_PUBLIC_BASE_PATH=/portfolio npm run build`, then publish `out/`.
