import { cn } from "@/lib/utils";

interface Props {
  index: string;
  label: string;
  title: string;
  subtitle: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ index, label, title, subtitle, className, align = "left" }: Props) {
  return (
    <header
      data-reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      <p className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="text-muted-foreground">{index}</span>
        <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
        {label}
      </p>
      <h2 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>
    </header>
  );
}
