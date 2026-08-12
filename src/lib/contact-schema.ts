import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please share your name (2 characters minimum).")
    .max(120, "That name is too long. Please keep it under 120 characters."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .min(3, "Subject should be at least 3 characters.")
    .max(200, "Subject is too long (200 characters max)."),
  message: z
    .string()
    .min(10, "Please add a little more detail (10 characters minimum).")
    .max(4000, "Message is too long (4000 characters max)."),
  // Honeypot — must remain empty
  company: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fields?: Partial<Record<keyof ContactInput, string>> };
