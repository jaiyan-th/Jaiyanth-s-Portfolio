"use server";

import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { IDENTITY } from "@/data/portfolio";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
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

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
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

  try {
    const ip = "anonymous";
    if (!rateLimit(ip)) {
      return {
        status: "error",
        message: "Too many attempts. Please wait a moment and try again.",
      };
    }
  } catch {
    // skip
  }

  const { name, email, subject, message } = parsed.data;

  // Log submission in dev or non-production
  if (process.env.NODE_ENV !== "production") {
    console.log("[contact] Submission received:", { name, email, subject, message });
  }

  return {
    status: "success",
    message: "Thank you. Your message has been received — I'll reply within a few days.",
  };
}
