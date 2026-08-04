"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Loader2, AlertCircle } from "lucide-react";
import { IDENTITY, CONTACT_LINKS } from "@/data/portfolio";
import { submitContact } from "@/actions/contact";
import { EASE, DURATION } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/masked-heading";
import { Magnetic } from "@/components/effects/magnetic";

export function Contact() {
  const [state, formAction] = useActionState(submitContact, { status: "idle" });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative section-spacing border-t border-line"
    >
      <div className="container-editorial">
        <SectionHeader
          index="06"
          label="Contact"
          title="Let's start a conversation."
          accentWords={["conversation"]}
          supporting="Open to applied-AI and full-stack engineering roles. I read every message and reply within a few days."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-12 lg:gap-16 items-stretch">
          {/* Left: closing statement + channels */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.reveal, ease: EASE.primary }}
              className="font-display text-statement text-balance"
            >
              Send a note about{" "}
              <span
                className="font-serif-editorial"
                style={{ color: "var(--accent)" }}
              >
                a role
              </span>
              , a project, or a research idea.
            </motion.p>

            <ul className="mt-10 flex flex-col gap-4">
              {CONTACT_LINKS.map((link) => (
                <li
                  key={link.label}
                  className="flex items-baseline justify-between border-b border-line pb-3"
                >
                  <span className="font-mono-label text-secondary">{link.label}</span>
                  {link.href && !link.pending ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      data-cursor={link.label === "Email" ? "mail" : link.label === "GitHub" ? "code" : "view"}
                      className="text-[15px] text-foreground transition-colors hover:text-accent"
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="text-[15px] text-secondary">
                      {link.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              <span className="font-mono-label text-secondary">
                Reply window · a few days · {IDENTITY.location}
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            <ContactForm state={state} action={formAction} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm({
  state,
  action,
}: {
  state: Awaited<ReturnType<typeof submitContact>>;
  action: (payload: FormData) => void;
}) {
  const success = state.status === "success";
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (success) formRef.current?.reset();
  }, [success]);

  return (
    <div className="border border-line glass">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
            style={{ background: "var(--accent)" }}
          />
          <span className="font-mono-label text-secondary">Secure form</span>
        </div>
        <span className="font-mono-label text-secondary">Honeypot · Rate-limited</span>
      </div>
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: DURATION.reveal, ease: EASE.primary }}
              className="flex flex-col items-start gap-5 py-10"
              role="status"
              aria-live="polite"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-full"
                style={{
                  background: "color-mix(in oklab, var(--accent) 16%, transparent)",
                  color: "var(--accent)",
                }}
              >
                <Check className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-[28px] leading-tight tracking-tight">
                Message received.
              </h3>
              <p className="max-w-md text-body text-secondary text-pretty">
                {state.status === "success" ? state.message : ""}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-magnetic btn-ghost"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              action={action}
              noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
            aria-describedby="form-status"
          >
            <Field
              id="name"
              label="Name"
              type="text"
              autoComplete="name"
              required
              error={state.status === "error" ? state.fields?.name : undefined}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              error={state.status === "error" ? state.fields?.email : undefined}
            />
            <Field
              id="subject"
              label="Subject"
              type="text"
              required
              error={state.status === "error" ? state.fields?.subject : undefined}
            />
            <FieldArea
              id="message"
              label="Message"
              required
              error={state.status === "error" ? state.fields?.message : undefined}
            />

            {/* Honeypot — visually hidden, must remain empty */}
            <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {state.status === "error" && state.message && (
              <p
                id="form-status"
                role="alert"
                className="flex items-center gap-2 text-[13px]"
                style={{ color: "var(--accent-warm)" }}
              >
                <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                {state.message}
              </p>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="font-mono-label text-secondary">
                Reply within a few days
              </p>
              <Magnetic strength={0.18}>
                <SubmitButton />
              </Magnetic>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      data-cursor="mail"
      className="btn-magnetic btn-primary disabled:opacity-60"
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Sending…
        </>
      ) : (
        <>
          Send message
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </>
      )}
    </button>
  );
}

function Field({
  id,
  label,
  type,
  required,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono-label text-secondary">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 border border-line bg-transparent px-4 text-[15px] text-foreground transition-colors focus:border-accent focus:outline-none"
        style={{ borderRadius: 8 }}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="text-[12.5px]"
          style={{ color: "var(--accent-warm)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function FieldArea({
  id,
  label,
  required,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono-label text-secondary">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="border border-line bg-transparent px-4 py-3 text-[15px] text-foreground transition-colors focus:border-accent focus:outline-none"
        style={{ borderRadius: 8, minHeight: 132, resize: "vertical" }}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="text-[12.5px]"
          style={{ color: "var(--accent-warm)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
