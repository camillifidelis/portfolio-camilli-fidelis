import { useState } from "react";
import { ArrowUpRight, ExternalLink, Maximize2 } from "lucide-react";
import { PROJECTS, type Project } from "@/content/portfolio";
import { GithubIcon } from "./BrandIcons";
import { SectionHeading } from "./SectionHeading";
import { ProjectDialog } from "./ProjectDialog";
import { cn } from "@/lib/utils";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      <div className="container-premium">
        <SectionHeading
          index="02"
          label="Projetos"
          title="Projetos selecionados."
          subtitle="Aplicações, soluções e experiências práticas em desenvolvimento de software."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={i === 0}
              className={i === 0 ? "lg:col-span-6" : "lg:col-span-3"}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <ProjectDialog project={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </section>
  );
}

interface CardProps {
  project: Project;
  featured?: boolean;
  className?: string;
  onOpen: () => void;
}

function ProjectCard({ project, featured, className, onOpen }: CardProps) {
  return (
    <article
      data-reveal
      className={cn(
        "group surface-card glow-hover relative flex flex-col overflow-hidden rounded-[1.75rem] p-7 md:p-9",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full glow-orb opacity-0 transition-opacity duration-700 group-hover:opacity-80" />

      <div className={cn("relative flex flex-1 flex-col", featured && "lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-12")}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-5xl font-semibold leading-none text-gradient md:text-6xl">{project.number}</span>
            <span className="rounded-full border border-border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
              {project.category}
            </span>
          </div>

          <h3 className="mt-8 text-2xl font-semibold leading-tight md:text-[1.7rem]">{project.title}</h3>
          <p className="mt-4 text-[0.97rem] leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Destaques">
            {project.highlights.map((h) => (
              <li key={h} className="text-sm text-foreground/80 before:mr-2 before:text-primary-soft before:content-['/']">
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("mt-8 flex flex-col justify-end", featured && "lg:mt-0")}>
          {featured && <FeaturedTerminal />}
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
            {project.tech.map((t) => (
              <li key={t} className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-lavender"
            >
              <GithubIcon className="size-4" />
              Código
              <ArrowUpRight className="size-3.5" />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-lavender"
              >
                <ExternalLink className="size-4" />
                API em produção
              </a>
            )}
            <button
              type="button"
              onClick={onOpen}
              className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-border-strong hover:text-foreground"
            >
              <Maximize2 className="size-3.5" />
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedTerminal() {
  return (
    <div aria-hidden="true" className="mb-6 hidden overflow-hidden rounded-2xl border border-border bg-background/60 font-mono text-xs lg:block">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-3 text-muted-foreground">todolist-java</span>
      </div>
      <div className="space-y-1.5 p-4 leading-relaxed">
        <p><span className="text-lavender">POST</span> <span className="text-foreground/80">/users</span></p>
        <p><span className="text-lavender">POST</span> <span className="text-foreground/80">/tasks</span></p>
        <p><span className="text-lavender">GET</span>{"  "}<span className="text-foreground/80">/tasks</span></p>
        <p><span className="text-lavender">PUT</span>{"  "}<span className="text-foreground/80">/tasks/{"{id}"}</span></p>
        <p className="pt-1 text-muted-foreground">// Authorization: Basic · BCrypt</p>
      </div>
    </div>
  );
}
