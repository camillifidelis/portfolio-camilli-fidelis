import { Database, Webhook } from "lucide-react";
import armDark from "@/assets/robotic-arm-dark.webp.asset.json";
import armLight from "@/assets/robotic-arm-light.webp.asset.json";
import excel from "@/assets/icons/excel.webp.asset.json";
import word from "@/assets/icons/word.webp.asset.json";
import powerpoint from "@/assets/icons/powerpoint.webp.asset.json";
import powerbi from "@/assets/icons/powerbi.webp.asset.json";
import { STACK, type StackItem } from "@/content/portfolio";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const LOCAL_ICONS = { excel: excel.url, word: word.url, powerpoint: powerpoint.url, powerbi: powerbi.url };

export function Stack() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Robotic arm — complementary background, faded so it never competes with the content */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img src={armDark.url} alt="" loading="lazy" decoding="async" className="absolute right-[-30%] top-16 hidden w-[140%] max-w-none opacity-75 dark:block sm:right-[-10%] sm:w-[90%] lg:right-[-4%] lg:top-10 lg:w-[72%]" />
        <img src={armLight.url} alt="" loading="lazy" decoding="async" className="absolute right-[-30%] top-16 w-[140%] max-w-none opacity-45 dark:hidden sm:right-[-10%] sm:w-[90%] lg:right-[-4%] lg:top-10 lg:w-[72%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container-premium">
        <SectionHeading
          index="03"
          label="Skills"
          title="Stack tecnológica."
          subtitle="Ferramentas e tecnologias utilizadas nos meus estudos e projetos."
        />

        <div data-reveal className="surface-card mt-14 max-w-4xl overflow-hidden rounded-[1.75rem]">
          <div className="flex items-center gap-1.5 border-b border-border px-5 py-3">
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/camilli/stack</span>
          </div>

          <div className="divide-y divide-border">
            {STACK.map((group) => (
              <div key={group.label} className="grid gap-4 px-5 py-6 sm:px-7 md:grid-cols-[180px_1fr] md:items-center">
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary-soft">{group.code}</span>
                  <span className="font-display text-base font-medium">{group.label}</span>
                </p>
                <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {group.items.map((item) => (
                    <StackTile key={item.name} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StackTile({ item }: { item: StackItem }) {
  const iconClass = "size-8 object-contain transition-transform duration-500 group-hover:scale-110";
  let icon: React.ReactNode;
  if (item.icon === "api") icon = <Webhook className={cn(iconClass, "text-lavender")} strokeWidth={1.5} />;
  else if (item.icon === "sql") icon = <Database className={cn(iconClass, "text-lavender")} strokeWidth={1.5} />;
  else
    icon = (
      <img
        src={item.local ? LOCAL_ICONS[item.local] : item.icon}
        alt=""
        width={32}
        height={32}
        loading="lazy"
        decoding="async"
        className={cn(iconClass, item.invertInDark && "dark:invert")}
      />
    );

  return (
    <li className="group flex flex-col items-center gap-2.5 rounded-2xl border border-transparent px-2 py-4 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-border hover:bg-accent/60">
      {icon}
      <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">{item.name}</span>
    </li>
  );
}
