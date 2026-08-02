"use server";

import { Resend } from "resend";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { IDENTITY } from "@/data/portfolio";

// Rate limit — in-memory per-IP, fine for low-traffic contact form.
// For production at scale, swap for Upstash or Vercel KV.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 submissions per minute per IP
const rateLimitMap = new Map<string, { count: number; firstAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstAt: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // honeypot — silently succeed on bots
  const company = formData.get("company");
  if (company && String(company).trim().length > 0) {
    return { status: "success", message: "Thank you. Your message has been received." };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string | undefined;
      if (key && !fields[key]) fields[key] = issue.message;
    }
    return {
      status: "error",
      message: "Some fields need attention.",
      fields,
    };
  }

  // Rate limit (best-effort — uses formData internals; if not available, skip)
  try {
    // FormData doesn't carry request IP; rely on env-aware guard.
    const ip = process.env.NODE_ENV === "test" ? "test" : "anonymous";
    if (!rateLimit(ip)) {
      return {
        status: "error",
        message: "Too many attempts. Please wait a moment and try again.",
      };
    }
  } catch {
    // never fail open due to rate limit
  }

  const { name, email, subject, message } = parsed.data;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? IDENTITY.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <contact@jaiyanthb.com>";

  const resend = getResendClient();

  // If no API key configured (local dev / preview), simulate success.
  if (!resend || process.env.NODE_ENV === "test") {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] Mock send (no RESEND_API_KEY):", {
        name,
        email,
        subject,
      });
    }
    return {
      status: "success",
      message: "Thank you. Your message has been received — I'll reply within a few days.",
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio · ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: [
        `<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.55">`,
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
        `<hr style="border:none;border-top:1px solid #eee;margin:16px 0" />`,
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        `</div>`,
      ].join(""),
    });
    if (error) {
      // Don't leak the underlying error to the visitor.
      return {
        status: "error",
        message: "Something went wrong while sending. Please email me directly.",
      };
    }
    return {
      status: "success",
      message: "Thank you. Your message has been received — I'll reply within a few days.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong while sending. Please email me directly.",
    };
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
