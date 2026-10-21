export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Order: saved choice → system preference → dark.
 * Kept as a plain string (no imports) because it is inlined into the HTML.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem("${THEME_STORAGE_KEY}"),t=s==="light"||s==="dark"?s:window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})()`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/** Apply a theme without animating every color transition on the page. */
export function applyTheme(theme: Theme, { persist }: { persist: boolean }) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-switching")),
  );
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage blocked (private mode etc.) — the theme still applies for this visit.
    }
  }
}
