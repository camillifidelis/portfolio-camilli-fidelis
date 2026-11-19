import { Briefcase, GraduationCap, Globe, KanbanSquare, Monitor, Server, Users, type LucideIcon } from "lucide-react";
import { JOURNEY, type JourneyIcon } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const ICONS: Record<JourneyIcon, LucideIcon> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  users: Users,
  kanban: KanbanSquare,
  globe: Globe,
  server: Server,
  monitor: Monitor,
};

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative py-24 md:py-32">
      <div className="container-premium">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="01"
              label="Sobre"
              title="Sobre mim."
              subtitle="Conhecimento, experiências e evolução constante."
            />
            <div data-reveal className="mt-8 space-y-4 text-[1.02rem] leading-relaxed text-muted-foreground">
              <p>
                Minha trajetória na tecnologia combina desenvolvimento de software, suporte técnico, sistemas e
                educação tecnológica. Sou estudante de Sistemas de Informação pela UFRRJ e possuo formação técnica em
                Eletrotécnica pelo SENAI.
              </p>
              <p>
                Tenho experiência com programação, suporte a usuários, configuração de ambientes computacionais e
                resolução de problemas técnicos.
              </p>
              <p className="text-foreground/90">
                Busco constantemente aprofundar meus conhecimentos e desenvolver soluções tecnológicas bem
                estruturadas, funcionais e eficientes.
              </p>
            </div>
          </div>

          <ol className="relative grid gap-4 sm:grid-cols-2">
            {JOURNEY.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <li
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
                  className={cn(
                    "group surface-card glow-hover relative flex flex-col overflow-hidden rounded-3xl p-6",
                    item.highlight && "sm:col-span-2 border-border-strong",
                  )}
                >
                  {item.highlight && (
                    <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full glow-orb opacity-70" />
                  )}
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-accent text-accent-foreground transition-colors duration-500 group-hover:border-border-strong">
                      <Icon className="size-[18px]" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
                  </div>
                  <p className="relative mt-6 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary-soft">
                    {item.category}
                  </p>
                  <h3 className="relative mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
