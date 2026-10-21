import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { content } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { assetPath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <header className="border-b border-border">
        <Container className="flex h-16 items-center justify-between">
          {/* Plain <a> + assetPath: the home page's in-page anchors don't exist here */}
          <a href={assetPath("/")} className="font-mono text-sm font-medium tracking-tight">
            {content.profile.name}
            <span className="text-accent">_</span>
          </a>
          <ThemeToggle />
        </Container>
      </header>
      <main id="main" className="flex flex-1 items-center py-24">
        <Container>
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Page not found</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="mt-10">
            <Button href={assetPath("/")}>
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
