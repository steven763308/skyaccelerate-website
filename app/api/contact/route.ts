import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteContent } from "@/lib/site-content";
import { routing, type Locale } from "@/i18n/routing";
import { escapeHtml, getClientIp, isRateLimited } from "@/lib/request-guards";

// Runs on Node.js (not Edge) — required by the Resend SDK and for a
// consistent runtime on Vercel.
export const runtime = "nodejs";
// Leaves headroom over SAG_TIMEOUT_MS below.
export const maxDuration = 15;

// --- Validation & sanitisation -------------------------------------------
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  fullName: 200,
  companyName: 200,
  phone: 50,
  email: 200,
  service: 200,
  message: 5000,
};


const GENERIC_ERROR =
  "We were unable to submit your enquiry. Please try again or contact us directly.";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a field that's invisible to real visitors but that simple
  // bots fill in automatically. Silently pretend success so bots don't
  // learn to avoid it.
  if (String(body.website ?? "").trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const fullName = String(body.fullName ?? "").trim().slice(0, MAX_LENGTHS.fullName);
  const companyName = String(body.companyName ?? "").trim().slice(0, MAX_LENGTHS.companyName);
  const phone = String(body.phone ?? "").trim().slice(0, MAX_LENGTHS.phone);
  const email = String(body.email ?? "").trim().slice(0, MAX_LENGTHS.email);
  const service = String(body.service ?? "").trim().slice(0, MAX_LENGTHS.service);
  const message = String(body.message ?? "").trim().slice(0, MAX_LENGTHS.message);

  if (!fullName || !phone || !email || !service) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const locale = String(body.locale ?? "").trim().slice(0, 10);
  const pageUrl = String(body.pageUrl ?? "").trim().slice(0, 500);

  // Two independent deliveries, run in parallel: into SAG (where it becomes
  // a CRM lead) and an email to the enquiry inbox. The submission succeeds if
  // either lands, so an outage on one side never loses a client's enquiry.
  const sagConfigured = Boolean(process.env.SAG_API_URL && process.env.WEBSITE_API_KEY);
  const emailConfigured = Boolean(process.env.RESEND_API_KEY);

  if (!sagConfigured && !emailConfigured) {
    console.error("Neither SAG (SAG_API_URL / WEBSITE_API_KEY) nor RESEND_API_KEY is configured.");
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const fields = { fullName, companyName, phone, email, service, message };
  const deliveries: Promise<void>[] = [];
  if (sagConfigured) {
    deliveries.push(
      sendToSag({
        ...fields,
        locale,
        pageUrl,
        clientIp: ip,
        userAgent: req.headers.get("user-agent") ?? "",
      })
    );
  }
  if (emailConfigured) deliveries.push(sendEmail(fields));

  const results = await Promise.allSettled(deliveries);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Enquiry delivery failed:", r.reason);
  });

  if (!results.some((r) => r.status === "fulfilled")) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  // Best-effort: the enquiry is already safe, so a failed auto-reply must
  // not turn the visitor's submission into an error.
  await sendAutoReply(fields, locale).catch((err) => console.error("Auto-reply failed:", err));
  return NextResponse.json({ ok: true });
}

// Confirmation email to the client, worded in SAG (Website Content →
// Enquiry Auto-Reply Email), in the language they used. Off unless enabled.
async function sendAutoReply({ fullName, email, service }: EnquiryFields, locale: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { autoReply, company } = await getSiteContent(isLocale(locale) ? locale : routing.defaultLocale);
  if (!autoReply.enabled || !autoReply.subject || !autoReply.body) return;

  const fill = (text: string) => text.replace(/\{name\}/g, fullName).replace(/\{service\}/g, service);
  const paragraphs = fill(autoReply.body)
    .split(/\n\s*\n/)
    .map((p) => `<p style="margin:0 0 16px;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#12182A;">${escapeHtml(p.trim()).replace(/\n/g, "<br/>")}</p>`)
    .join("");

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Sky Accelerate Website <website@skyaccelerate.com>",
    to: email,
    replyTo: company.contact.email,
    subject: fill(autoReply.subject).replace(/[\r\n]+/g, " "),
    html: `<!doctype html><html><body style="margin:0;padding:24px 16px;background:#FAF8F4;"><div style="max-width:600px;margin:0 auto;">${paragraphs}</div></body></html>`,
    text: fill(autoReply.body),
  });
  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}

type EnquiryFields = {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const isLocale = (value: string): value is Locale => (routing.locales as readonly string[]).includes(value);

// Render can take a few seconds to wake an idle instance; past this we give
// up and rely on the email copy rather than leave the visitor waiting.
const SAG_TIMEOUT_MS = 8000;

async function sendToSag(
  payload: EnquiryFields & { locale: string; pageUrl: string; clientIp: string; userAgent: string }
) {
  const baseUrl = process.env.SAG_API_URL!.replace(/\/+$/, "");
  const res = await fetch(`${baseUrl}/api/public/website/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Website-Key": process.env.WEBSITE_API_KEY!,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SAG_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`SAG responded ${res.status}: ${text.slice(0, 300)}`);
  }
}

async function sendEmail({ fullName, companyName, phone, email, service, message }: EnquiryFields) {
  const submittedAt = new Date();
  const timestamp = new Intl.DateTimeFormat("en-MY", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kuala_Lumpur",
  }).format(submittedAt);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress =
    process.env.RESEND_FROM_EMAIL || "Sky Accelerate Website <website@skyaccelerate.com>";

  const html = renderEnquiryEmail({
    fullName: escapeHtml(fullName),
    companyName: escapeHtml(companyName || "—"),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    service: escapeHtml(service),
    message: escapeHtml(message || "—").replace(/\n/g, "<br/>"),
    timestamp,
  });

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: (await getSiteContent("en")).company.contact.email,
    replyTo: email,
    subject: `New Website Enquiry — ${service}`,
    html,
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}

function renderEnquiryEmail(fields: {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
}) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-top:1px solid #DEDBD1;">
        <p style="margin:0 0 4px;font:600 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:0.08em;text-transform:uppercase;color:#8F99AA;">
          ${label}
        </p>
        <p style="margin:0;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:#12182A;">
          ${value}
        </p>
      </td>
    </tr>`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#F1EDE5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F1EDE5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FAF8F4;">
            <tr>
              <td style="background-color:#16223D;padding:28px 32px;">
                <p style="margin:0;font:700 15px/1.2 Arial,Helvetica,sans-serif;letter-spacing:0.02em;color:#FAF8F4;">
                  SKY ACCELERATE GROUP
                </p>
                <p style="margin:8px 0 0;font:600 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:0.1em;text-transform:uppercase;color:#8F99AA;">
                  New Website Enquiry
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 4px;">
                ${row("Full Name", fields.fullName)}
                ${row("Company Name", fields.companyName)}
                ${row("Phone", fields.phone)}
                ${row("Email", fields.email)}
                ${row("Service Required", fields.service)}
                ${row("Message", fields.message)}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;">
                <p style="margin:16px 0 0;padding-top:14px;border-top:1px solid #DEDBD1;font:400 12px/1.5 Arial,Helvetica,sans-serif;color:#57616F;">
                  Submitted ${fields.timestamp} (Malaysia time) via the Sky Accelerate Group website contact form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
