import { motion } from "framer-motion";

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative py-36 overflow-hidden"
      style={{ borderTop: "1px solid rgba(183,228,199,0.08)", borderBottom: "1px solid rgba(183,228,199,0.08)" }}
    >
      {/* Subtle skin-texture pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(143,207,176,0.6) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(28,73,57,0.18) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Divider line */}
        <div className="flex items-center gap-4 mb-14">
          <div className="h-px flex-1" style={{ background: "rgba(183,228,199,0.12)" }} />
          <span className="text-[9px] font-semibold tracking-[0.22em]" style={{ color: "#2F6B55" }}>THE VISION</span>
          <div className="h-px flex-1" style={{ background: "rgba(183,228,199,0.12)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <blockquote className="font-display leading-[1.12] tracking-tight mb-10" style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)",
            color: "#F4F1E8",
          }}>
            SKINCARE HAS ALWAYS<br />BEEN PERSONAL.<br />
            <span style={{ color: "#6FAF91" }}>UNDERSTANDING IT<br />SHOULD BE TOO.</span>
          </blockquote>

          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#9DAEA4" }}>
            Daszz is being built to help you observe meaningful changes, understand your skin more clearly, and make better-informed skincare decisions over time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
