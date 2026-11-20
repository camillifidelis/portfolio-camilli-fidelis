import { ArrowDownRight, Download } from "lucide-react";
import { MEDIA } from "@/content/media";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "./SocialLinks";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-16 md:pt-[72px]">
      <HeroBackdrop />

      <div className="container-premium grid min-h-[calc(88svh-72px)] items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10 max-w-xl">
          <p data-reveal className="eyebrow">Desenvolvimento • Tecnologia • Sistemas</p>

          <h1 id="hero-title" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties} className="mt-6 text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.1rem]">
            Olá, sou <span className="text-gradient">Camilli Fidelis.</span>
          </h1>

          <p data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties} className="mt-6 font-display text-xl font-medium leading-snug text-foreground/90 sm:text-2xl">
            Desenvolvimento Backend com <span className="text-lavender">Java</span> e{" "}
            <span className="text-lavender">Spring Boot</span>.
          </p>

          <p data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties} className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            Graduanda em Sistemas de Informação pela UFRRJ, com foco em desenvolvimento backend. Tenho interesse em
            construir aplicações bem estruturadas, desenvolver APIs REST, trabalhar com integração de sistemas e
            aprofundar meus conhecimentos em arquitetura de software.
          </p>

          <div data-reveal style={{ "--reveal-delay": "320ms" } as React.CSSProperties} className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#projetos">
                Explorar projetos
                <ArrowDownRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={MEDIA.cv} download="Curriculo-CamilliFidelis.pdf">
                <Download />
                Baixar currículo
              </a>
            </Button>
            <SocialLinks className="ml-1" />
          </div>
        </div>

        <HeroVisual src={MEDIA.profile} horizon={MEDIA.heroHorizon} />
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-atmosphere" />
      <div className="absolute inset-0 bg-grid opacity-70" />
      <svg className="absolute -bottom-24 left-1/2 h-[420px] w-[160%] -translate-x-1/2 animate-horizon md:w-[120%]" viewBox="0 0 1600 420" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="horizon-line" x1="0" x2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--lavender)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 400 Q800 40 1600 400" stroke="url(#horizon-line)" strokeWidth="1.2" />
        <path d="M0 410 Q800 90 1600 410" stroke="url(#horizon-line)" strokeWidth="0.6" opacity="0.4" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

function HeroVisual({ src, horizon }: { src: string; horizon: string }) {
  return (
    <div data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties} className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
      {/* glow + horizon behind the device */}
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full glow-orb" />
      <img
        src={horizon}
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-[44%] hidden w-[115%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80 mix-blend-screen [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_75%)] dark:block"
        decoding="async"
      />

      {/* orbit lines — network / architecture motif */}
      <svg aria-hidden="true" viewBox="0 0 500 500" className="absolute inset-0 h-full w-full text-primary-soft/40" fill="none">
        <circle cx="250" cy="250" r="238" stroke="currentColor" strokeWidth="0.6" className="animate-dash" />
        <circle cx="250" cy="250" r="190" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
        <circle cx="12" cy="250" r="3" fill="var(--lavender)" />
        <circle cx="440" cy="110" r="2.5" fill="var(--lavender)" />
        <circle cx="330" cy="476" r="2" fill="var(--lavender)" />
      </svg>

      <div className="relative animate-float-slow">
        <img
          src={src}
          alt="Camilli Fidelis em frente a um notebook com seu nome na tela"
          width={864}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="relative mx-auto aspect-[864/1080] w-[92%] scale-[1.12] object-contain shadow-photo"
        />
      </div>

      {/* floating interface details */}
      <div className="surface-card absolute left-0 top-[18%] hidden rounded-2xl px-4 py-3 sm:block">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">stack.focus</p>
        <p className="mt-1 font-mono text-sm text-foreground">
          <span className="text-lavender">Java</span> · Spring Boot
        </p>
      </div>

      <div className="surface-card absolute bottom-[16%] right-0 hidden rounded-2xl px-4 py-3 sm:block">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">GET /api/projects</p>
        <p className="mt-1 flex items-center gap-2 font-mono text-sm">
          <span className="size-2 rounded-full bg-success animate-pulse-dot" />
          <span className="text-success">200</span>
          <span className="text-muted-foreground">OK</span>
        </p>
      </div>
    </div>
  );
}
