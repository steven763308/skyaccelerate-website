import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/site-config";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const companyName = String(body.company ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const service = String(body.service ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !phone || !email || !service) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured yet. Please try WhatsApp or phone instead." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.RESEND_FROM_EMAIL || "Sky Accelerate Group <onboarding@resend.dev>";

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
    );

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: company.contact.email,
      replyTo: email,
      subject: `New Enquiry — ${service} (${name})`,
      html: `
        <h2>New enquiry from the website contact form</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(companyName || "—")}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service Required:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || "—").replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your enquiry right now. Please try WhatsApp or phone instead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your enquiry right now. Please try WhatsApp or phone instead." },
      { status: 500 }
    );
  }
}
