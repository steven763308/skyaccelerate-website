import { ReactNode } from "react";
import { HeroIn, ParallaxWatermark, Reveal } from "@/components/motion";

/** The signature mark: a small triangular peak lifted from the "A" in the
 * Sky Accelerate Group wordmark. Reused as a bullet, divider and hero
 * watermark rather than a decorative reference code. */
export function Chevron({
  className = "h-2.5 w-2.5",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper" | "steel";
}) {
  const color =
    tone === "paper" ? "bg-paper" : tone === "steel" ? "bg-steel" : "bg-ink";
  return <span className={`${className} ${color} mark-chevron inline-block shrink-0`} />;
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={light ? "eyebrow-light" : "eyebrow"}>
      <Chevron tone={light ? "steel" : "ink"} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mb-14">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`text-3xl md:text-4xl mt-5 ${light ? "text-paper" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl leading-relaxed ${
            light ? "text-steel" : "text-graphite"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative bg-navy-800 text-paper overflow-hidden">
      {/* Faint oversized chevron watermark, bleeding off the edge — drifts
          slowly on scroll for a subtle parallax touch. */}
      <ParallaxWatermark className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] bg-paper/[0.035] mark-chevron" />
      <div className="container-content relative py-24 md:py-32">
        <HeroIn>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </HeroIn>
        <HeroIn delay={0.08}>
          <h1 className="text-4xl md:text-5xl max-w-3xl mt-6">{title}</h1>
        </HeroIn>
        <HeroIn delay={0.16}>
          <p className="text-steel mt-6 max-w-xl leading-relaxed">{subtitle}</p>
        </HeroIn>
      </div>
    </section>
  );
}

export function NoteBox({ children }: { children: ReactNode }) {
  return (
    <Reveal className="border border-steel-line bg-paper-dim px-6 py-5 flex gap-4">
      <Chevron className="h-3 w-3 mt-1.5" tone="steel" />
      <p className="text-sm text-graphite leading-relaxed">{children}</p>
    </Reveal>
  );
}
