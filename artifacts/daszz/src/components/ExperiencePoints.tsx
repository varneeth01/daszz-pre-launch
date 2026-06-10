import { motion } from "framer-motion";

const points = [
  {
    n: "01",
    title: "Understand",
    desc: "See your skin more clearly with personalized insights designed to make progress easier to understand.",
    detail: "Observe what your skin is actually doing, not what a generic profile says it should.",
  },
  {
    n: "02",
    title: "Track",
    desc: "Follow meaningful changes over time with a digital skin twin that evolves with your skincare journey.",
    detail: "Build a continuous record of your skin across seasons, routines, and life changes.",
  },
  {
    n: "03",
    title: "Evolve",
    desc: "Build a smarter routine that adapts as your skin, products, and habits change.",
    detail: "Make routine decisions grounded in your own skin's history—not general advice.",
  },
];

export default function ExperiencePoints() {
  return (
    <section className="py-28" style={{ borderBottom: "1px solid rgba(183,228,199,0.07)" }}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section label */}
        <div className="mb-16 flex items-center gap-4">
          <div className="h-px w-10" style={{ background: "rgba(143,207,176,0.35)" }} />
          <span className="text-[9px] font-semibold tracking-[0.22em]" style={{ color: "#6FAF91" }}>CORE EXPERIENCE</span>
        </div>

        {/* Staggered editorial panels */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(183,228,199,0.06)" }}>
          {points.map((pt, i) => (
            <motion.div
              key={pt.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 md:p-10 group transition-colors duration-300"
              style={{ background: "#07110D" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(28,73,57,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#07110D"; }}
            >
              {/* Number + thin contour motif */}
              <div className="flex items-center gap-3 mb-10">
                <span className="text-[9px] font-semibold tracking-[0.2em]" style={{ color: "#2F6B55" }}>{pt.n}</span>
                <div className="h-px flex-1" style={{ background: "rgba(143,207,176,0.12)" }} />
              </div>

              {/* Mini contour lines */}
              <div className="mb-8 opacity-30">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden>
                  <ellipse cx="20" cy="12" rx="18" ry="10" stroke="#8FCFB0" strokeWidth="0.6" />
                  <ellipse cx="20" cy="12" rx="12" ry="7" stroke="#6FAF91" strokeWidth="0.5" />
                  <ellipse cx="20" cy="12" rx="6" ry="4" stroke="#6FAF91" strokeWidth="0.4" />
                </svg>
              </div>

              <h3
                className="font-display text-3xl mb-4"
                style={{ color: "#F4F1E8" }}
              >
                {pt.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#9DAEA4" }}>{pt.desc}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#6FAF91", opacity: 0.7 }}>{pt.detail}</p>

              {/* Hover reveal line */}
              <div
                className="mt-8 h-px transition-all duration-500"
                style={{ background: "linear-gradient(90deg, #2F6B55, transparent)", width: "0%", opacity: 0 }}
                ref={el => {
                  if (!el) return;
                  const parent = el.closest(".group");
                  if (!parent) return;
                  parent.addEventListener("mouseenter", () => { el.style.width = "100%"; el.style.opacity = "1"; });
                  parent.addEventListener("mouseleave", () => { el.style.width = "0%"; el.style.opacity = "0"; });
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
