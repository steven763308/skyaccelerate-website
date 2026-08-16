"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeroIn } from "@/components/motion";
import { company } from "@/lib/site-config";

// Tiny blurred preview of hero-skyline.jpg, shown instantly while the full
// photo streams in so the banner never pops in from blank.
const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAX/xAAhEAACAgIABwEAAAAAAAAAAAABAwIRAAQFEhMhQVJxkf/EABQBAQAAAAAAAAAAAAAAAAAAAAT/xAAXEQEAAwAAAAAAAAAAAAAAAAABAAIR/9oADAMBAAIRAxEAPwB2tu6pAEQ0356MgP2sk8VcgudUWXzehwa3zXKQgSB9Jwe02c2EyN98UmMJXLE//9k=";

/** The site's primary banner: a full-bleed skyline photograph blended into
 * the brand navy, with a slow Ken Burns drift on the image and a staggered
 * text entrance. This is the "cover" treatment — used once, on the
 * homepage, so it keeps its full visual weight. */
export function HomeHero() {
  const reduce = useReducedMotion();
  const t = useTranslations();

  return (
    <section className="relative bg-navy-800 text-paper overflow-hidden">
      <div className="absolute inset-0 -scale-x-100">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={reduce ? undefined : { scale: 1.09 }}
          transition={
            reduce
              ? undefined
              : { duration: 24, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
          }
        >
          <Image
            src="/brand/hero-skyline.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={80}
            placeholder="blur"
            blurDataURL={HERO_BLUR_DATA_URL}
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Gradient blend: photograph visible on the left, solid navy on the
          right so the headline stays fully legible. Mobile falls back to a
          single darker wash across the whole frame. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/45 via-navy-800/88 to-navy-800 md:from-navy-900/35 md:via-navy-800/[0.82] md:to-navy-800" />
      <div className="absolute inset-0 bg-navy-900/35 md:hidden" />

      <div className="container-content relative pt-28 pb-20 md:pt-40 md:pb-36">
        <HeroIn>
          <p className="eyebrow-light">
            <span className="h-1.5 w-1.5 rounded-full bg-steel" />
            {t("homeHero.eyebrow")}
          </p>
        </HeroIn>
        <HeroIn delay={0.08}>
          <h1 className="font-display uppercase font-bold text-[2.5rem] leading-[1.05] tracking-tight md:text-[4.25rem] md:leading-[1.02] max-w-3xl mt-7">
            {t("homeHero.titleLine1")}
            <br />
            {t("homeHero.titleLine2")}
          </h1>
        </HeroIn>
        <HeroIn delay={0.16}>
          <p className="mt-6 text-lg md:text-xl text-steel max-w-xl">
            {t("homeHero.forPrefix")}{" "}
            <span className="text-paper font-medium">{t("homeHero.industries")}</span>
          </p>
        </HeroIn>
        <HeroIn delay={0.24}>
          <p className="mt-6 text-steel/90 max-w-2xl leading-relaxed">
            {t("homeHero.description")}
          </p>
        </HeroIn>
        <HeroIn delay={0.32}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary bg-paper text-ink hover:bg-steel/40">
              {t("common.requestConsultation")}
            </Link>
            <Link href="/services" className="btn-outline-light">
              {t("common.exploreServices")}
            </Link>
          </div>
        </HeroIn>

        <HeroIn delay={0.4}>
          <p className="mt-16 md:mt-20 text-[11px] tracking-wide2 uppercase text-steel/70 md:text-right">
            {company.legalName} · {company.registrationNo}
          </p>
        </HeroIn>
      </div>
    </section>
  );
}
