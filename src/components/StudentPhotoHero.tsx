import type { ReactNode } from "react";
import { ArrowIcon, Badge } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

type StudentPhotoHeroProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  tone?: "paper" | "brand";
};

export function StudentPhotoHero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  actions,
  tone = "paper",
}: StudentPhotoHeroProps) {
  const brand = tone === "brand";

  return (
    <section className={`relative isolate overflow-hidden ${brand ? "bg-highlight text-highlight-foreground" : "bg-surface text-surface-foreground"}`}>
      <img
        src={image}
        alt={imageAlt}
        width={1536}
        height={1024}
        className={`absolute inset-0 -z-20 h-full w-full object-cover object-right ${brand ? "mix-blend-luminosity opacity-35" : ""}`}
      />
      <div className={`absolute inset-0 -z-10 ${brand ? "bg-highlight/70" : "bg-background/65 md:bg-transparent"}`} aria-hidden />
      <ArrowIcon size={280} weight="bold" className={`pointer-events-none absolute -right-16 -top-16 -z-10 ${brand ? "text-accent opacity-20" : "text-highlight opacity-10"}`} />
      <div className="mx-auto flex max-w-7xl items-center px-4 py-24 md:px-8">
        <div className="max-w-2xl">
          <Badge variant={brand ? "accent" : "highlight"} withArrow>{eyebrow}</Badge>
          <h1 className="mt-6 font-display text-display font-semibold">{title}</h1>
          <p className={`mt-5 max-w-xl text-subheading ${brand ? "text-highlight-foreground/85" : "text-foreground"}`}>{subtitle}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}