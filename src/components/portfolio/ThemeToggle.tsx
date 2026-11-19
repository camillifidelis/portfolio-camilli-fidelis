import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={isDark}
      className="relative inline-flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-border-strong hover:text-foreground"
    >
      <Sun className="size-[17px] transition-all duration-500 dark:-translate-y-8 dark:rotate-90 dark:opacity-0" />
      <Moon className="absolute size-[17px] translate-y-8 -rotate-90 opacity-0 transition-all duration-500 dark:translate-y-0 dark:rotate-0 dark:opacity-100" />
    </button>
  );
}
