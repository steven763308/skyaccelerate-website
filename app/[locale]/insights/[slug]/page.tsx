import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/Bits";
import { HeroIn, Reveal } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteContent, isPublishedArticle } from "@/lib/site-content";

// Full Insights articles, written and published in SAG (Website Content →
// Insights: an item with a slug and an article body). Articles published
// after the last deploy are rendered on first visit and then cached.

export const dynamicParams = true;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { insightPlaceholders } = await getSiteContent(params.locale as Locale);
  return insightPlaceholders.filter(isPublishedArticle).map((a) => ({ slug: a.slug }));
}

// An article that exists only in the other language is shown rather than a
// 404, so the language switcher never leads to a dead end.
async function findArticle(locale: Locale, slug: string) {
  for (const l of [locale, ...routing.locales.filter((x) => x !== locale)]) {
    const { insightPlaceholders } = await getSiteContent(l);
    const article = insightPlaceholders.find((a) => isPublishedArticle(a) && a.slug === slug);
    if (article && isPublishedArticle(article)) return article;
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await findArticle(locale as Locale, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { title: article.title, description: article.summary, type: "article" },
  };
}

type Block = { kind: "heading" | "paragraph"; text: string } | { kind: "list"; items: string[] };

// Plain text → blocks: blank line between paragraphs, "## " for a
// sub-heading, "- " lines for a bullet list. Rendered as text (never HTML).
function parseBody(body: string): Block[] {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { kind: "heading", text: chunk.slice(3).trim() };
      const lines = chunk.split("\n").map((l) => l.trim());
      if (lines.every((l) => l.startsWith("- "))) return { kind: "list", items: lines.map((l) => l.slice(2).trim()) };
      return { kind: "paragraph", text: chunk };
    });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("InsightsPage");
  const article = await findArticle(locale as Locale, slug);
  if (!article) notFound();

  return (
    <>
      <section className="bg-navy-800 text-paper">
        <div className="container-content py-20 md:py-28">
          <HeroIn>
            <Eyebrow light>{article.category}</Eyebrow>
          </HeroIn>
          <HeroIn delay={0.08}>
            <h1 className="text-3xl md:text-5xl max-w-3xl mt-6 leading-tight">{article.title}</h1>
          </HeroIn>
          {(article.date || article.summary) && (
            <HeroIn delay={0.16}>
              {article.summary && <p className="text-steel mt-6 max-w-2xl leading-relaxed">{article.summary}</p>}
              {article.date && <p className="text-steel/70 mt-6 text-xs uppercase tracking-wide">{article.date}</p>}
            </HeroIn>
          )}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-content">
          <Reveal className="max-w-2xl space-y-6 text-[17px] leading-relaxed text-ink">
            {parseBody(article.body).map((block, i) =>
              block.kind === "heading" ? (
                <h2 key={i} className="text-2xl pt-6">
                  {block.text}
                </h2>
              ) : block.kind === "list" ? (
                <ul key={i} className="list-disc pl-6 space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="whitespace-pre-line">
                  {block.text}
                </p>
              )
            )}
          </Reveal>

          <div className="max-w-2xl mt-16 pt-8 border-t border-steel-line flex flex-wrap items-center justify-between gap-4">
            <Link href="/insights" className="text-sm underline underline-offset-4">
              ← {t("backToInsights")}
            </Link>
            <Link href="/contact" className="btn-primary">
              {t("discussWithUs")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
