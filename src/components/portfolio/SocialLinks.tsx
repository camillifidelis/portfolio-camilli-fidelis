import { Mail } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { cn } from "@/lib/utils";

export function SocialLinks({ withEmail = false, className }: { withEmail?: boolean; className?: string }) {
  const link =
    "inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:bg-accent";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub de Camilli Fidelis" className={link}>
        <GithubIcon className="size-[18px]" />
      </a>
      <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Camilli Fidelis" className={link}>
        <LinkedinIcon className="size-[17px]" />
      </a>
      {withEmail && (
        <a href={`mailto:${PROFILE.email}`} aria-label={`Enviar e-mail para ${PROFILE.email}`} className={link}>
          <Mail className="size-[18px]" />
        </a>
      )}
    </div>
  );
}
