"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { applyTheme, getStoredTheme, getTheme } from "@/lib/theme";
import { Button } from "./Button";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  // Server snapshot matches the SSR default ("dark"); the real value takes over after hydration.
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as const);
  const next = theme === "dark" ? "light" : "dark";

  // Follow OS changes until the visitor makes an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (!getStoredTheme()) applyTheme(media.matches ? "light" : "dark", { persist: false });
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => applyTheme(next, { persist: true })}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {/* Icon is chosen by CSS (data-theme) so it is correct on first paint, before hydration. */}
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
      <Moon size={18} aria-hidden="true" className="dark:hidden" />
    </Button>
  );
}
