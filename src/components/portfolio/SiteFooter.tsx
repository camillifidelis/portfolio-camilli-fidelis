import { NAV_ITEMS } from "@/content/portfolio";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border">
      <div className="container-premium py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#inicio" aria-label="Camilli Fidelis — voltar ao início" className="inline-block">
              <Logo className="h-7" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Desenvolvimento backend com Java e Spring Boot.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks withEmail />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} Camilli Fidelis. Todos os direitos reservados.</p>
          <p>Desenvolvido com dedicação por Camilli Fidelis.</p>
        </div>
      </div>
    </footer>
  );
}
