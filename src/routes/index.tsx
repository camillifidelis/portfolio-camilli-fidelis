import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Stack } from "@/components/portfolio/Stack";
import { Contact } from "@/components/portfolio/Contact";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { VLibras } from "@/components/portfolio/VLibras";
import { useReveal } from "@/hooks/use-reveal";

const TITLE = "Camilli Fidelis — Desenvolvedora Backend Java & Spring Boot";
const DESCRIPTION =
  "Portfólio de Camilli Fidelis, graduanda em Sistemas de Informação pela UFRRJ com foco em desenvolvimento backend: APIs REST com Java, Spring Boot e bancos de dados.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <SiteFooter />
      <VLibras />
    </>
  );
}
