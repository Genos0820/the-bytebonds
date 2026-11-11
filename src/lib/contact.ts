/**
 * Contact form configuration.
 *
 * Formspree needs no server code and no secret: the form ID is embedded in the
 * page by design, which is why it lives in a `NEXT_PUBLIC_` variable. Submissions
 * land in the Formspree dashboard and are forwarded to the address registered
 * on the form.
 *
 * Set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local` — see `.env.example`.
 */

/** The form's POST endpoint, or null when no form ID is configured. */
export function formspreeEndpoint(): string | null {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();
  if (!id) return null;
  return `https://formspree.io/f/${id}`;
}

/**
 * Budget bands offered in the enquiry form.
 *
 * Stating ranges filters out bad-fit enquiries before they reach the inbox —
 * edit these to match what the team actually takes on, or remove the field.
 */
export const budgetOptions = [
  "Under £5k",
  "£5k – £15k",
  "£15k – £50k",
  "£50k+",
  "Not sure yet",
] as const;

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message" | "form", string>
>;

/**
 * Validation mirrored from the field constraints in the markup.
 *
 * The browser enforces `required`, `type="email"` and `minLength` natively; this
 * runs the same rules in JS so the submit handler can show all problems at once
 * rather than letting the browser stop at the first one. Neither is a security
 * boundary — Formspree validates server-side, which is the check that counts.
 */
export function validateContact(data: {
  name: string;
  email: string;
  message: string;
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  // Deliberately permissive. Anything stricter rejects valid addresses, and the
  // only real test of an address is whether mail to it arrives.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
    errors.email = "Please enter an email address we can reply to.";
  }

  if (data.message.trim().length < 20) {
    errors.message = "A sentence or two about the project, please.";
  }

  return errors;
}
