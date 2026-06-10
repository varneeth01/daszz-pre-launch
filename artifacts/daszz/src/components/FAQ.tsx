import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is Daszz?", a: "Daszz is a personalized skincare intelligence platform designed to help users understand their skin, track changes, and make better-informed skincare decisions." },
  { q: "When is Daszz launching?", a: "Daszz launches on June 12, 2026, at 10:00 AM IST. Join the early-access list to be notified first." },
  { q: "Is Daszz a replacement for a dermatologist?", a: "No. Daszz is intended to provide skincare insights and tracking tools. It is not a replacement for professional medical advice, diagnosis, or treatment." },
  { q: "Who is building Daszz?", a: "Daszz is founded by Varneeth Varma and Sumanth, with a mission to make personalized skincare intelligence more accessible, useful, and human." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-12 tracking-tight">Frequently asked questions</h2>
        <div className="divide-y divide-white/5">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <span className="font-medium text-white group-hover:text-white/80 transition-colors">{faq.q}</span>
                <ChevronDown
                  className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {open === i && (
                <p className="pb-6 text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
