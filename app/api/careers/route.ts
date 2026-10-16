import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteContent } from "@/lib/site-content";
import { escapeHtml, getClientIp, isRateLimited } from "@/lib/request-guards";

// Careers-page applications. Forwarded to SAG, where each becomes a Talent
// Pool candidate with the resume attached. If SAG can't be reached, the
// application (resume attached) is emailed to the enquiry inbox instead so
// it isn't lost.
export const runtime = "nodejs";
export const maxDuration = 30;

// Vercel caps a function's request body at ~4.5MB.
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const SAG_TIMEOUT_MS = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_EXTENSIONS = /\.(pdf|docx?|jpe?g|png)$/i;

const GENERIC_ERROR = "We were unable to submit your application. Please try again or email us directly.";

const field = (form: FormData, key: string, max: number) => String(form.get(key) ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot (see ContactForm).
  if (field(form, "website", 200)) return NextResponse.json({ ok: true });

  const fullName = field(form, "fullName", 200);
  const email = field(form, "email", 200);
  const phone = field(form, "phone", 50);
  const position = field(form, "position", 200);
  const message = field(form, "message", 5000);
  const locale = field(form, "locale", 10);
  const pageUrl = field(form, "pageUrl", 500);
  const consent = form.get("consent") === "true";
  const resume = form.get("resume");

  if (!fullName || !email || !phone || !position || !(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: "Please fill in all required fields and attach your resume." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "Please confirm your consent to proceed." }, { status: 400 });
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: "Your resume must be 4MB or smaller." }, { status: 400 });
  }
  if (!ALLOWED_EXTENSIONS.test(resume.name)) {
    return NextResponse.json({ error: "Resume must be a PDF, Word document, JPG or PNG." }, { status: 400 });
  }

  const fields = { fullName, email, phone, position, message, locale, pageUrl };
  const fileBuffer = Buffer.from(await resume.arrayBuffer());

  try {
    await sendToSag(fields, resume.name, fileBuffer, ip, req.headers.get("user-agent") ?? "");
    return NextResponse.json({ ok: true });
  } catch (err) {
    // SAG rejected the file itself (type/size) — that's for the applicant to fix.
    if (err instanceof SagRejected) return NextResponse.json({ error: err.message }, { status: 400 });
    console.error("Careers: SAG delivery failed, falling back to email:", err);
  }

  try {
    await sendFallbackEmail(fields, resume.name, fileBuffer);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Careers: fallback email failed:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
}

class SagRejected extends Error {}

type ApplicationFields = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  locale: string;
  pageUrl: string;
};

async function sendToSag(fields: ApplicationFields, filename: string, file: Buffer, clientIp: string, userAgent: string) {
  const baseUrl = process.env.SAG_API_URL?.replace(/\/+$/, "");
  const key = process.env.WEBSITE_API_KEY;
  if (!baseUrl || !key) throw new Error("SAG_API_URL / WEBSITE_API_KEY not configured");

  const body = new FormData();
  for (const [k, v] of Object.entries({ ...fields, clientIp, userAgent, consent: "true" })) body.append(k, v);
  body.append("resume", new Blob([new Uint8Array(file)]), filename);

  const res = await fetch(`${baseUrl}/api/public/website/applications`, {
    method: "POST",
    headers: { "X-Website-Key": key },
    body,
    signal: AbortSignal.timeout(SAG_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const msg = typeof data?.message === "string" ? data.message : "";
    if (res.status === 400 && /^Resume must/.test(msg)) throw new SagRejected(msg);
    throw new Error(`SAG responded ${res.status}: ${msg}`);
  }
}

async function sendFallbackEmail(fields: ApplicationFields, filename: string, file: Buffer) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const { company } = await getSiteContent("en");
  const rows = [
    ["Full Name", fields.fullName],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Position", fields.position],
    ["Message", fields.message || "—"],
  ]
    .map(([k, v]) => `<p><b>${k}:</b><br/>${escapeHtml(v).replace(/\n/g, "<br/>")}</p>`)
    .join("");

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Sky Accelerate Website <website@skyaccelerate.com>",
    to: company.contact.email,
    replyTo: fields.email,
    subject: `Job Application — ${fields.position} (not saved in SAG)`,
    html: `<p>This application could not be saved into SAG automatically. Please add it to Talent Pool manually.</p>${rows}`,
    attachments: [{ filename, content: file }],
  });
  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}
