import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/data/content";

/**
 * Open Graph / Twitter card image, served at /og.png and rendered once at build time.
 * A route handler (not the opengraph-image file convention) so the static export writes a real
 * `og.png` with a .png extension — hosts then serve it as image/png. Referenced in layout.tsx.
 * Colors mirror the dark theme tokens in globals.css.
 */
export const dynamic = "force-static";

export const ogImage = {
  path: "/og.png",
  width: 1200,
  height: 630,
  alt: `${content.profile.name} — ${content.profile.tagline}`,
};

const colors = {
  background: "#0a0a0c",
  surface: "#131316",
  foreground: "#ececef",
  muted: "#a0a0ab",
  border: "#26262b",
  accent: "#5eead4",
};

export async function GET() {
  const { profile } = content;
  const [sans, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/GeistMono-Regular.ttf")),
  ]);
  const github = profile.socials.find((s) => s.icon === "github")?.href.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.background,
          color: colors.foreground,
          fontFamily: "Geist",
          borderTop: `6px solid ${colors.accent}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              color: colors.accent,
              fontFamily: "Geist Mono",
              fontSize: 26,
            }}
          >
            TP
          </div>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 26, color: colors.accent }}>
            {profile.greeting}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, letterSpacing: "-0.04em", lineHeight: 1 }}>{profile.name}</div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 900,
              fontSize: 40,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: colors.muted,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: colors.muted,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: colors.accent }} />
            {profile.location}
          </div>
          {github && <div style={{ display: "flex" }}>{github}</div>}
        </div>
      </div>
    ),
    {
      width: ogImage.width,
      height: ogImage.height,
      fonts: [
        { name: "Geist", data: sans, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
