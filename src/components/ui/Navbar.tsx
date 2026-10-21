"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { content } from "@/data/content";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/paths";
import { Button } from "./Button";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = content.nav.map((item) => item.href.slice(1));

/** Id of the section currently under the navbar, or null above the first section. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(atBottom ? sectionIds[sectionIds.length - 1] : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function Navbar() {
  const { nav, profile } = content;
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Escape closes and returns focus; leaving the header or widening the viewport closes.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!headerRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setOpen(false);

    const header = headerRef.current;
    document.addEventListener("keydown", onKey);
    header?.addEventListener("focusout", onFocusOut);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      header?.removeEventListener("focusout", onFocusOut);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300",
        scrolled || open ? "border-border bg-background/75" : "border-transparent bg-background/0",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          {profile.name}
          <span className="text-accent">_</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-center bg-accent transition-transform duration-300 motion-reduce:transition-none",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <div className="mr-1 hidden md:block">
            <Button
              variant="secondary"
              size="sm"
              href={assetPath(profile.resume)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </Button>
          </div>
          <ThemeToggle />
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </Button>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav aria-label="Mobile">
              <Container>
                <ul className="py-2">
                  {[...nav, { label: "Resume", href: assetPath(profile.resume) }].map((item) => {
                    const isActive = active === item.href.slice(1);
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          {...(!item.href.startsWith("#") && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "flex items-center gap-3 py-3 text-base transition-colors",
                            isActive ? "text-foreground" : "text-muted hover:text-foreground",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn("size-1.5 rounded-full", isActive ? "bg-accent" : "bg-border")}
                          />
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Container>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
