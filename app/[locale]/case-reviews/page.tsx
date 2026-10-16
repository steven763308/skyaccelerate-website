import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/Bits";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CertificateViewer } from "@/components/CertificateViewer";
import { getSiteContent } from "@/lib/site-content";
import { withSeo } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

// Images uploaded from SAG are full https URLs; built-in ones are files
// under /public, which may not have been added yet.
function imageAvailable(src: string) {
  if (/^https:\/\//.test(src)) return true;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CaseReviewsPage" });
  return withSeo(locale, "caseReviews", {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: { canonical: "/case-reviews" },
  });
}

export default async function CaseReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("CaseReviewsPage");
  const tCommon = await getTranslations("common");
  const { caseReviews } = await getSiteContent(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="section-pad">
        <div className="container-content">
          <Reveal className="border border-steel-line bg-paper-dim px-6 py-5 mb-16 max-w-3xl">
            <p className="text-sm text-graphite leading-relaxed">
              {t("confidentialityNote")}
            </p>
          </Reveal>

          <Stagger className="space-y-16">
            {caseReviews.map((c) => {
              const hasThumb = c.image && imageAvailable(c.image);
              return (
                <StaggerItem
                  key={c.ref}
                  as="article"
                  className="grid md:grid-cols-12 gap-8 border-t border-steel-line pt-10"
                >
                  <div className="md:col-span-3">
                    <h2 className="text-xl leading-snug">{c.category}</h2>
                    {hasThumb && (
                      <CertificateViewer
                        src={c.image as string}
                        alt={c.category}
                        title={c.category}
                      />
                    )}
                  </div>
                  <div className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-6">
                    <div>
                      <p className="eyebrow mb-2">{t("labels.situation")}</p>
                      <p className="text-sm text-graphite leading-relaxed">
                        {c.situation}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow mb-2">{t("labels.requirement")}</p>
                      <p className="text-sm text-graphite leading-relaxed">
                        {c.requirement}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow mb-2">{t("labels.role")}</p>
                      <p className="text-sm text-graphite leading-relaxed">
                        {c.role}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow mb-2">{t("labels.outcome")}</p>
                      <p className="text-sm text-graphite leading-relaxed">
                        {c.outcome}
                      </p>
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <p className="text-xs text-graphite/70 italic">
                        {t("importantNote")}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-24 bg-navy-800 text-paper">
        <Reveal className="container-content text-center">
          <h2 className="text-2xl md:text-3xl mb-6 max-w-lg mx-auto">
            {t("cta.title")}
          </h2>
          <Link href="/contact" className="btn-primary bg-paper text-ink hover:bg-steel/40">
            {tCommon("requestConsultation")}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
