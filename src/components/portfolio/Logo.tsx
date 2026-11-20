import { MEDIA } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Official logo (498×111). logo-light on the dark theme, logo-dark on the light theme.
 * Both are rendered and swapped with CSS so the correct file shows before hydration.
 */
export function Logo({ className }: { className?: string }) {
  const base = "h-full w-auto object-contain";
  return (
    <span className={cn("relative inline-flex aspect-[498/111]", className)}>
      <img
        src={MEDIA.logoDark}
        alt="Camilli Fidelis"
        width={498}
        height={111}
        className={cn(base, "dark:hidden")}
      />
      <img
        src={MEDIA.logoLight}
        alt="Camilli Fidelis"
        width={498}
        height={111}
        className={cn(base, "hidden dark:block")}
      />
    </span>
  );
}
