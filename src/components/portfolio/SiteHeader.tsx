import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/content/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export function SiteHeader() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled || open ? "border-b border-border bg-header" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Navegação principal" className="container-premium flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <a href="#inicio" aria-label="Camilli Fidelis — voltar ao início" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Logo className="h-6 md:h-7" />
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 rounded-full border border-border bg-card/40 p-1 backdrop-blur-md md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-1.5 text-sm transition-colors duration-300",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[var(--ease-premium)] md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <ul className="container-premium min-h-0 space-y-1 pb-0" inert={!open}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.id} className={cn(i === NAV_ITEMS.length - 1 && "pb-5")}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg transition-colors",
                  active === item.id ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent",
                )}
              >
                {item.label}
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
