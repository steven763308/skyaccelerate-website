"use client";

import { useState } from "react";
import { serviceDropdownOptions } from "@/lib/site-config";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your preferred form handler / API route / CRM.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-steel-line bg-paper-dim px-8 py-12 text-center">
        <h3 className="text-xl mb-3">Thank You</h3>
        <p className="text-sm text-graphite leading-relaxed max-w-sm mx-auto">
          Your enquiry has been received. Our advisory team will get back
          to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Full Name" name="name" required />
        <Field label="Company Name" name="company" />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Phone Number" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-xs uppercase tracking-wide text-graphite mb-2"
        >
          Service Required
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full border border-steel-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink outline-none"
        >
          <option value="">Select a service</option>
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
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full border border-steel-line bg-paper px-4 py-3 text-sm text-ink focus:border-ink outline-none resize-none"
          placeholder="Tell us briefly about your requirements."
        />
      </div>

      <p className="text-xs text-graphite leading-relaxed">
        By submitting this form, you consent to Sky Accelerate Group Sdn.
        Bhd. collecting and processing the personal data provided above
        for the purpose of responding to your enquiry, in accordance with
        our Privacy Policy.
      </p>

      <button type="submit" className="btn-primary">
        Submit Enquiry
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
