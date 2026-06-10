import { Link } from "wouter";
import { motion } from "framer-motion";
import SceneFallback from "./SceneFallback";

const dataLabels = [
  { label: "SKIN PROGRESS",    side: "left",  top: "22%" },
  { label: "ROUTINE INSIGHTS", side: "left",  top: "48%" },
  { label: "VISIBLE CHANGES",  side: "right", top: "32%" },
  { label: "PRODUCT CONTEXT",  side: "right", top: "60%" },
];

export default function DigitalSkinTwinSection() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(183,228,199,0.08)" }}
      aria-labelledby="dst-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(28,73,57,0.14) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section label */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: "rgba(143,207,176,0.30)" }} />
            <span className="text-[9px] font-semibold tracking-[0.22em]" style={{ color: "#6FAF91" }}>DIGITAL SKIN TWIN</span>
            <div className="h-px w-8" style={{ background: "rgba(143,207,176,0.30)" }} />
          </div>

          <h2
            id="dst-heading"
            className="font-display mb-6 tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", color: "#F4F1E8" }}
          >
            MEET YOUR DIGITAL<br />SKIN TWIN
          </h2>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "#9DAEA4" }}>
            A living view of your skincare journey. Track visible changes, understand patterns, and build a clearer picture of how your skin evolves over time.
          </p>
        </div>

        {/* Composition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl mx-auto"
        >
          {/* Face visual */}
          <div
            className="relative h-96 w-full"
            style={{ border: "1px solid rgba(183,228,199,0.08)", background: "rgba(11,23,18,0.5)" }}
          >
            <SceneFallback />

            {/* Data labels overlay */}
            {dataLabels.map((dl) => (
              <div
                key={dl.label}
                className="absolute data-label-pulse"
                style={{
                  [dl.side]: dl.side === "left" ? "8px" : "8px",
                  top: dl.top,
                  left: dl.side === "left" ? "12px" : undefined,
                  right: dl.side === "right" ? "12px" : undefined,
                }}
              >
                <div
                  className="flex items-center gap-1.5"
                  style={{ flexDirection: dl.side === "right" ? "row-reverse" : "row" }}
                >
                  <div className="w-1 h-1 rounded-full" style={{ background: "#8FCFB0" }} />
                  <span className="text-[8px] font-semibold tracking-[0.18em]" style={{ color: "#6FAF91" }}>
                    {dl.label}
                  </span>
                </div>
                <div
                  className="mt-1 h-px"
                  style={{
                    width: "40px",
                    background: "rgba(143,207,176,0.25)",
                    marginLeft: dl.side === "left" ? "10px" : "0",
                    marginRight: dl.side === "right" ? "10px" : "0",
                  }}
                />
              </div>
            ))}
          </div>

          {/* CTA beneath visual */}
          <div className="mt-8 text-center">
            <Link
              href="/digital-skin-twin"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest transition-opacity hover:opacity-70"
              style={{ color: "#8FCFB0", textDecoration: "underline", textUnderlineOffset: "5px" }}
            >
              EXPLORE THE VISION
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
