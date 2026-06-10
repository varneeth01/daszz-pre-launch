import { useState } from "react";

const faqs = [
  {
    q: "What is Daszz?",
    a: "Daszz is a personalized skincare intelligence platform designed to help you understand your skin, track meaningful changes over time, and make better-informed skincare decisions.",
  },
  {
    q: "When is Daszz launching?",
    a: "Daszz launches on June 12, 2026, at 10:00 AM IST. Join the early-access list to receive a personal notification when the platform goes live.",
  },
  {
    q: "Is Daszz a replacement for a dermatologist?",
    a: "No. Daszz is designed to provide skincare insights and tracking tools. It does not provide medical diagnosis or replace professional medical advice, diagnosis, or treatment.",
  },
  {
    q: "Who is building Daszz?",
    a: "Daszz is founded by Varneeth Varma and Sumanth, with a mission to make personalized skincare intelligence more accessible, useful, and human.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="py-28"
      style={{ borderTop: "1px solid rgba(183,228,199,0.07)", borderBottom: "1px solid rgba(183,228,199,0.07)" }}
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex items-center gap-4 mb-14">
          <div className="h-px w-8" style={{ background: "rgba(143,207,176,0.30)" }} />
          <h2
            id="faq-heading"
            className="text-[9px] font-semibold tracking-[0.22em]"
            style={{ color: "#6FAF91" }}
          >
            FREQUENTLY ASKED
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(183,228,199,0.08)" }}>
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group focus:outline-none focus-visible:ring-1"
                style={{ "--tw-ring-color": "rgba(143,207,176,0.4)" } as React.CSSProperties}
              >
                <span
                  className="text-base font-medium transition-colors"
                  style={{ color: open === i ? "#F4F1E8" : "#C9CEC3" }}
                >
                  {faq.q}
                </span>
                <span
                  className="ml-4 shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-250"
                  style={{
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    color: "#6FAF91",
                  }}
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "300px" : "0", opacity: open === i ? 1 : 0 }}
              >
                <p className="pb-7 text-sm leading-relaxed" style={{ color: "#9DAEA4" }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
