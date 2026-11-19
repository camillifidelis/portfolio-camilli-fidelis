import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
export const THEME_STORAGE_KEY = "theme";

/** Inline script run before paint: applies the saved theme (dark is the brand default). */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t?t==='dark':true;var c=document.documentElement.classList;c.toggle('dark',d);c.add('js-reveal');}catch(e){document.documentElement.classList.add('dark');}})();`;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
