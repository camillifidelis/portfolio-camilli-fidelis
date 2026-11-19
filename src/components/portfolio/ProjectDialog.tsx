import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "./BrandIcons";

interface Props {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ project, onOpenChange }: Props) {
  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] max-w-2xl overflow-y-auto rounded-3xl border-border bg-popover p-0 sm:rounded-3xl">
        {project && (
          <>
            <div className="relative overflow-hidden border-b border-border px-7 pb-7 pt-9 md:px-9">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full glow-orb opacity-70" />
              <DialogHeader className="relative text-left">
                <p className="eyebrow">
                  Projeto {project.number} · {project.category}
                </p>
                <DialogTitle className="mt-3 font-display text-2xl leading-tight md:text-3xl">{project.title}</DialogTitle>
                <DialogDescription className="mt-3 text-[0.97rem] leading-relaxed text-muted-foreground">
                  {project.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="space-y-8 px-7 py-8 md:px-9">
              <DetailBlock title="Objetivo">
                <p className="text-muted-foreground">{project.detail.objective}</p>
              </DetailBlock>

              <DetailBlock title="Funcionalidades">
                <DetailList items={project.detail.features} />
              </DetailBlock>

              <DetailBlock title="Estrutura técnica">
                <DetailList items={project.detail.structure} mono />
              </DetailBlock>

              <DetailBlock title="Tecnologias">
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li key={t} className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </DetailBlock>

              <DetailBlock title="Contexto">
                <p className="text-muted-foreground">{project.detail.context}</p>
              </DetailBlock>

              <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                <Button asChild variant="hero" size="lg">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <GithubIcon />
                    Ver código no GitHub
                    <ArrowUpRight />
                  </a>
                </Button>
                {project.demo && (
                  <Button asChild variant="glass" size="lg">
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <ExternalLink />
                      API em produção
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary-soft">{title}</h3>
      <div className="text-[0.95rem] leading-relaxed">{children}</div>
    </section>
  );
}

function DetailList({ items, mono }: { items: string[]; mono?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-foreground/85">
          <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary-soft" />
          <span className={mono ? "font-mono text-[0.85rem]" : undefined}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
