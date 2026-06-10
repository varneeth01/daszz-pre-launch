import { useRef, useState } from "react";
import { submitEarlyAccessLead } from "@/lib/early-access";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EarlyAccessForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function validate(name: string, email: string) {
    let ok = true;
    if (!name.trim()) { setNameError("Name is required."); ok = false; } else setNameError("");
    if (!email.trim()) { setEmailError("Email is required."); ok = false; }
    else if (!validateEmail(email)) { setEmailError("Please enter a valid email address."); ok = false; }
    else setEmailError("");
    return ok;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    if (!validate(name, email)) return;

    setStatus("loading");
    const result = await submitEarlyAccessLead({ name, email });
    setStatus(result.status);
  };

  return (
    <section
      id="early-access"
      className="py-32 relative"
      aria-labelledby="early-access-heading"
    >
      <div className="container mx-auto px-6 max-w-xl">
        <div className="text-center mb-12">
          <h2
            id="early-access-heading"
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            Secure your access
          </h2>
          <p className="text-muted-foreground">Join the waitlist for the private reveal.</p>
        </div>

        {/* Success state */}
        {status === "success" && (
          <div
            role="status"
            aria-live="polite"
            className="p-10 border border-white/10 bg-white/[0.03] text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
                  <path
                    d="M5 12l5 5L19 7"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-path"
                  />
                </svg>
              </div>
            </div>
            <p className="text-white font-medium text-lg mb-2">You're on the list.</p>
            <p className="text-muted-foreground text-sm">We'll let you know when Daszz is revealed.</p>
          </div>
        )}

        {/* Duplicate state */}
        {status === "duplicate" && (
          <div
            role="status"
            aria-live="polite"
            className="p-10 border border-white/10 bg-white/[0.03] text-center"
          >
            <p className="text-white font-medium text-lg mb-2">Already on the list.</p>
            <p className="text-muted-foreground text-sm">You're already on the Daszz early-access list.</p>
          </div>
        )}

        {/* Form */}
        {(status === "idle" || status === "loading" || status === "error") && (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="ea-name" className="block text-sm font-medium text-muted-foreground">
                Name <span aria-hidden>*</span>
              </label>
              <input
                ref={nameRef}
                id="ea-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                aria-describedby={nameError ? "ea-name-error" : undefined}
                aria-invalid={nameError ? "true" : undefined}
                className="w-full h-12 bg-white/[0.04] border border-white/10 px-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                placeholder="Your name"
              />
              {nameError && (
                <p id="ea-name-error" role="alert" className="text-xs text-destructive mt-1">
                  {nameError}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="ea-email" className="block text-sm font-medium text-muted-foreground">
                Email <span aria-hidden>*</span>
              </label>
              <input
                ref={emailRef}
                id="ea-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-describedby={emailError ? "ea-email-error" : undefined}
                aria-invalid={emailError ? "true" : undefined}
                className="w-full h-12 bg-white/[0.04] border border-white/10 px-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/60 transition-colors"
                placeholder="you@example.com"
              />
              {emailError && (
                <p id="ea-email-error" role="alert" className="text-xs text-destructive mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-14 bg-white text-black font-semibold hover:bg-white/90 active:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Processing…
                </span>
              ) : "Join the reveal"}
            </button>

            {/* Error message */}
            {status === "error" && (
              <p role="alert" aria-live="assertive" className="text-destructive text-sm text-center">
                We could not save your request. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
