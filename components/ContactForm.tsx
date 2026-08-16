"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getSiteConfig } from "@/lib/get-site-config";
import type { Locale } from "@/i18n/routing";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations("ContactForm");
  const { company, serviceDropdownOptions } = getSiteConfig(locale);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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
        <p className="text-sm text-graphite leading-relaxed max-w-sm mx-auto">
          {t("thankYouBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t("fullName")} name="name" required />
        <Field label={t("companyName")} name="company" />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label={t("phoneNumber")} name="phone" type="tel" required />
        <Field label={t("email")} name="email" type="email" required />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-xs uppercase tracking-wide text-graphite mb-2"
        >
          {t("serviceRequired")}
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full border border-steel-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink outline-none"
        >
          <option value="">{t("selectService")}</option>
          {serviceDropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wide text-graphite mb-2"
        >
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full border border-steel-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink outline-none resize-none"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      <p className="text-xs text-graphite leading-relaxed">
        {t("consent", { legalName: company.legalName })}
      </p>

      {error && (
        <p className="text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-3">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary disabled:opacity-60" disabled={submitting}>
        {submitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs uppercase tracking-wide text-graphite mb-2"
      >
        {label}
        {required && <span className="text-steel"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border border-steel-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink outline-none"
      />
    </div>
  );
}
