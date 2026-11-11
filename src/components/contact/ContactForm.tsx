"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  budgetOptions,
  validateContact,
  type ContactFieldErrors,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-theme border border-surface-border bg-bg-elevated px-4 py-3 text-sm text-fg " +
  "placeholder:text-fg-subtle transition-colors focus:border-accent";

/** Label + control + error message, wired together for screen readers. */
function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-accent">
            *
          </span>
        )}
        {!required && (
          <span className="ml-2 font-mono text-[0.65rem] text-fg-subtle uppercase">
            Optional
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-accent-3">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Enquiry form, posting to Formspree.
 *
 * Progressive enhancement: the `<form>` carries a real `action` and `method`, so
 * with JavaScript disabled the browser posts it directly and Formspree shows its
 * own confirmation page. With JS, `onSubmit` intercepts and posts via fetch so
 * the visitor stays on the page and gets inline feedback.
 */
export function ContactForm({ endpoint }: { endpoint: string }) {
  const baseId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  const fieldId = (name: string) => `${baseId}-${name}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validateContact({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    });

    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      // Move focus to the first field with a problem so keyboard and screen
      // reader users aren't left guessing where the error is.
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      // Formspree reports problems as { errors: [{ field, message }] }.
      const body = await response.json().catch(() => null);
      const message =
        body?.errors?.map((e: { message: string }) => e.message).join(" ") ??
        "Something went wrong sending that.";
      setErrors({ form: message });
      setStatus("error");
    } catch {
      setErrors({
        form: "Couldn't reach the server. Check your connection and try again.",
      });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="glass flex flex-col items-start gap-4 p-8">
        <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-fg">
          <Check size={20} aria-hidden />
        </span>
        <h2 className="text-2xl font-bold tracking-tight">Message sent.</h2>
        <p className="text-sm text-fg-muted">
          We&rsquo;ll come back to you within two working days. If it&rsquo;s
          urgent, reply to the confirmation email and it&rsquo;ll reach us faster.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs tracking-[0.14em] text-accent uppercase hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      action={endpoint}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
      className="glass flex flex-col gap-6 p-8"
    >
      <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        Project enquiry
      </h2>

      {/* Gives the forwarded email a useful subject line instead of the default. */}
      <input type="hidden" name="_subject" value="New project enquiry" />

      {/* Formspree's honeypot: bots fill hidden fields, humans can't see it.
          Submissions with this filled are discarded silently. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Field id={fieldId("name")} label="Your name" error={errors.name} required>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
          className={inputClasses}
        />
      </Field>

      <Field id={fieldId("email")} label="Email" error={errors.email} required>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? `${fieldId("email")}-error` : undefined
          }
          className={inputClasses}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("company")} label="Company">
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClasses}
          />
        </Field>

        <Field id={fieldId("budget")} label="Budget">
          <select
            id={fieldId("budget")}
            name="budget"
            defaultValue=""
            className={cn(inputClasses, "appearance-none")}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={fieldId("message")}
        label="What are you building?"
        error={errors.message}
        required
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          required
          minLength={20}
          placeholder="The problem, who it's for, and any deadline you're working to."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${fieldId("message")}-error` : undefined
          }
          className={cn(inputClasses, "resize-y")}
        />
      </Field>

      {errors.form && (
        <p role="alert" className="text-sm text-accent-3">
          {errors.form}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg",
            "transition-[transform,box-shadow,opacity] duration-300 motion-safe:hover:-translate-y-0.5",
            "hover:shadow-[0_8px_40px_-8px_var(--accent)]",
            "disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          {status !== "submitting" && <ArrowRight size={16} aria-hidden />}
        </button>
        <p className="font-mono text-[0.65rem] tracking-wider text-fg-subtle uppercase">
          Reply within 2 working days
        </p>
      </div>
    </form>
  );
}
