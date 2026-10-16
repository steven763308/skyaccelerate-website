"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSiteContent } from "@/components/SiteContentProvider";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const inputClass = "w-full border border-steel-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink outline-none";
const labelClass = "block text-xs uppercase tracking-wide text-graphite mb-2";

export default function CareersForm({ positions }: { positions: { slug: string; title: string }[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("CareersForm");
  const { company } = useSiteContent();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const resume = formData.get("resume");
    if (resume instanceof File && resume.size > MAX_RESUME_BYTES) {
      setError(t("fileTooLarge"));
      return;
    }
    formData.set("consent", formData.get("consent") ? "true" : "false");
    formData.set("locale", locale);
    formData.set("pageUrl", window.location.href);

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || t("genericError"));
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("genericError"));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-steel-line bg-paper-dim px-8 py-12 text-center">
        <h3 className="text-xl mb-3">{t("thankYouTitle")}</h3>
        <p className="text-sm text-graphite leading-relaxed max-w-sm mx-auto">{t("thankYouBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — see ContactForm. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />

      <div>
        <label htmlFor="fullName" className={labelClass}>
          {t("fullName")}
          <span className="text-steel"> *</span>
        </label>
        <input id="fullName" name="fullName" required className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phoneNumber")}
            <span className="text-steel"> *</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("email")}
            <span className="text-steel"> *</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="position" className={labelClass}>
          {t("position")}
          <span className="text-steel"> *</span>
        </label>
        <select id="position" name="position" required className={inputClass} defaultValue={positions.length ? "" : t("generalApplication")}>
          <option value="">{t("selectPosition")}</option>
          {positions.map((p) => (
            <option key={p.slug} value={p.title}>
              {p.title}
            </option>
          ))}
          <option value={t("generalApplication")}>{t("generalApplication")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="resume" className={labelClass}>
          {t("resume")}
          <span className="text-steel"> *</span>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
          className="block w-full text-sm text-graphite file:mr-4 file:border file:border-steel-line file:bg-paper-dim file:px-4 file:py-2 file:text-sm file:text-ink"
        />
        <p className="mt-2 text-xs text-graphite">{t("resumeHint")}</p>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      <label className="flex gap-3 text-xs text-graphite leading-relaxed">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-navy-800" />
        <span>{t("consent", { legalName: company.legalName })}</span>
      </label>

      {error && <p className="text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-3">{error}</p>}

      <button type="submit" className="btn-primary disabled:opacity-60" disabled={submitting}>
        {submitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
