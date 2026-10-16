import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/Bits";
import { HeroIn, Reveal } from "@/components/motion";

export async function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const t = await getTranslations("common");

  return (
    <>
      <section className="bg-navy-800 text-paper">
        <div className="container-content py-24 md:py-28">
          <HeroIn>
            <Eyebrow light>{eyebrow}</Eyebrow>
          </HeroIn>
          <HeroIn delay={0.08}>
            <h1 className="text-3xl md:text-4xl max-w-2xl mt-6">{title}</h1>
          </HeroIn>
          <HeroIn delay={0.16}>
            <p className="mt-5 text-xs text-steel">
              {t("lastUpdated")} {updated}
            </p>
          </HeroIn>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-content max-w-prose mx-auto space-y-10 text-graphite leading-relaxed">
          {children}
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="border-t border-steel-line pt-8">
      <h2 className="text-xl text-ink mb-4">{title}</h2>
      <div className="space-y-4 text-sm">{children}</div>
    </Reveal>
  );
}
