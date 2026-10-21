import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/ui/Providers";
import { content } from "@/data/content";
import { assetPath } from "@/lib/paths";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import { ogImage } from "./og.png/route";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { site, profile } = content;

// Everything that needs the site's address comes from siteUrl (content.site.url → Vercel → localhost).
export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: site.title, template: `%s — ${profile.name}` },
  description: site.description,
  authors: [{ name: profile.name, url: absoluteUrl("/") }],
  creator: profile.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "profile",
    url: absoluteUrl("/"),
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    images: [{ ...ogImage, url: absoluteUrl(ogImage.path), type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [{ url: absoluteUrl(ogImage.path), alt: ogImage.alt }],
  },
  icons: {
    icon: [
      { url: assetPath("/favicon.ico"), sizes: "32x32" },
      { url: assetPath("/icon.svg"), type: "image/svg+xml" },
    ],
    apple: { url: assetPath("/apple-touch-icon.png"), sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

// schema.org Person, so search engines can connect the site to the profiles in content.ts.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: absoluteUrl("/"),
  jobTitle: profile.role,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  alumniOf: content.education.map((edu) => ({ "@type": "CollegeOrUniversity", name: edu.school })),
  sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is rewritten by themeInitScript before paint, hence suppressHydrationWarning.
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
