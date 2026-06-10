import { useRef, useState } from "react";
import { submitEarlyAccessLead } from "@/lib/early-access";
import { GA_EVENTS } from "@/lib/analytics";

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
    GA_EVENTS.earlyAccessFormSubmit();
    const result = await submitEarlyAccessLead({ name, email });
    setStatus(result.status);
    if (result.status === "success") GA_EVENTS.earlyAccessFormSuccess();
  };

  const inputBase: React.CSSProperties = {
    background: "rgba(143,207,176,0.04)",
    border: "1px solid rgba(183,228,199,0.16)",
    color: "#F4F1E8",
    outline: "none",
    width: "100%",
    height: "48px",
    padding: "0 16px",
    fontSize: "14px",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="early-access"
      className="py-32 relative overflow-hidden"
      aria-labelledby="early-access-heading"
      style={{ borderTop: "1px solid rgba(183,228,199,0.08)" }}
    >
      {/* Green spotlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
          width: "60%",
          height: "140%",
          background: "radial-gradient(ellipse 50% 50% at 70% 50%, rgba(47,107,85,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: "rgba(143,207,176,0.35)" }} />
              <span className="text-[9px] font-semibold tracking-[0.22em]" style={{ color: "#6FAF91" }}>PRIVATE REVEAL</span>
            </div>

            <h2
              id="early-access-heading"
              className="font-display mb-6 leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#F4F1E8" }}
            >
              BE FIRST TO<br />EXPERIENCE<br />
              <span style={{ color: "#8FCFB0" }}>DASZZ</span>
            </h2>

            <p className="text-base leading-relaxed mb-8 max-w-sm" style={{ color: "#9DAEA4" }}>
              Join the private reveal and receive an update when Daszz goes live.
            </p>

            {/* Feature list */}
            <div className="space-y-3">
              {["Early access to the full platform", "Personalized onboarding priority", "Updates on the reveal"].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full" style={{ background: "#8FCFB0" }} />
                  <span className="text-sm" style={{ color: "#9DAEA4" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="p-12 text-center"
                style={{ border: "1px solid rgba(183,228,199,0.14)", background: "rgba(11,23,18,0.6)" }}
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ border: "1px solid rgba(143,207,176,0.35)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
                      <path
                        d="M5 12l5 5L19 7"
                        stroke="#8FCFB0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="check-path"
                      />
                    </svg>
                  </div>
                </div>
                <p className="font-display text-2xl mb-3" style={{ color: "#F4F1E8" }}>You're on the list.</p>
                <p className="text-sm" style={{ color: "#9DAEA4" }}>We'll let you know when Daszz is revealed.</p>
              </div>
            )}

            {status === "duplicate" && (
              <div
                role="status"
                aria-live="polite"
                className="p-12 text-center"
                style={{ border: "1px solid rgba(183,228,199,0.14)", background: "rgba(11,23,18,0.6)" }}
              >
                <p className="font-display text-2xl mb-3" style={{ color: "#F4F1E8" }}>Already on the list.</p>
                <p className="text-sm" style={{ color: "#9DAEA4" }}>You're already on the Daszz early-access list.</p>
              </div>
            )}

            {(status === "idle" || status === "loading" || status === "error") && (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 p-10"
                style={{ border: "1px solid rgba(183,228,199,0.12)", background: "rgba(11,23,18,0.5)" }}
              >
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="ea-name" className="block text-xs font-semibold tracking-widest" style={{ color: "#9DAEA4" }}>
                    NAME <span aria-hidden className="ml-0.5" style={{ color: "#6FAF91" }}>*</span>
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
                    placeholder="Your name"
                    style={inputBase}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(143,207,176,0.45)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(183,228,199,0.16)"; }}
                  />
                  {nameError && (
                    <p id="ea-name-error" role="alert" className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
                      {nameError}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="ea-email" className="block text-xs font-semibold tracking-widest" style={{ color: "#9DAEA4" }}>
                    EMAIL <span aria-hidden className="ml-0.5" style={{ color: "#6FAF91" }}>*</span>
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
                    placeholder="you@example.com"
                    style={inputBase}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(143,207,176,0.45)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(183,228,199,0.16)"; }}
                  />
                  {emailError && (
                    <p id="ea-email-error" role="alert" className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-12 text-xs font-semibold tracking-widest transition-all focus:outline-none focus-visible:ring-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "#8FCFB0", color: "#07110D", border: "none" }}
                    onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "#B7E4C7"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#8FCFB0"; }}
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
                        </svg>
                        Processing…
                      </span>
                    ) : "JOIN THE REVEAL"}
                  </button>
                </div>

                {status === "error" && (
                  <p role="alert" aria-live="assertive" className="text-xs text-center" style={{ color: "hsl(var(--destructive))" }}>
                    We could not save your request. Please try again.
                  </p>
                )}

                <p className="text-[10px] text-center" style={{ color: "#9DAEA4", opacity: 0.6 }}>
                  No spam. One update when Daszz launches.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
