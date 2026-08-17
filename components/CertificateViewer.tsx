"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

/** Thumbnail + "View Certificate" trigger that opens the full certificate
 * in an on-brand modal (navy header, paper body, chevron mark) instead of
 * a bare new tab. Rendered via a portal so it isn't clipped by the
 * transformed (framer-motion animated) ancestors it sits inside. */
export function CertificateViewer({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("common");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 block relative w-28 aspect-[3/4] border border-steel-line bg-paper-dim overflow-hidden"
        aria-label={t("viewCertificate")}
      >
        <Image src={src} alt={alt} fill sizes="112px" className="object-cover object-top" />
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 inline-block text-xs tracking-wide2 uppercase underline underline-offset-4 text-graphite"
      >
        {t("viewCertificate")}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                role="dialog"
                aria-modal="true"
                aria-label={title}
              >
                <div
                  className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />
                <motion.div
                  className="relative bg-paper w-full h-full md:w-[70vw] md:h-[70vh] flex flex-col shadow-[0_24px_64px_rgba(14,23,41,0.4)]"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between gap-4 bg-navy-800 text-paper pl-5 pr-3 py-3.5 shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="h-2.5 w-2.5 bg-paper mark-chevron shrink-0" aria-hidden />
                      <p className="text-xs tracking-wide2 uppercase truncate">{title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label={t("close")}
                      className="shrink-0 h-8 w-8 flex items-center justify-center border border-paper/30 hover:border-paper hover:bg-paper/10 transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative flex-1 min-h-[320px] bg-paper-dim">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(min-width: 768px) 70vw, 100vw"
                      className="object-contain p-4 md:p-6"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
