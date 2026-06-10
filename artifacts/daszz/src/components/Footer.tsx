import { Link } from "wouter";

const navColumns = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Personalized Skincare", href: "/personalized-skincare" },
      { label: "Digital Skin Twin", href: "/digital-skin-twin" },
      { label: "Skin Tracking", href: "/skin-tracking" },
      { label: "Learn", href: "/learn" },
    ],
  },
  {
    heading: "Articles",
    links: [
      { label: "How to Build a Skincare Routine", href: "/learn/how-to-build-a-skincare-routine" },
      { label: "Track Skin Changes Over Time", href: "/learn/how-to-track-skin-changes-over-time" },
      { label: "What is a Digital Skin Twin?", href: "/learn/what-is-a-digital-skin-twin" },
      { label: "Understanding Acne-Prone Skin", href: "/learn/understanding-acne-prone-skin" },
      { label: "Dark Spots and Pigmentation", href: "/learn/understanding-dark-spots-and-pigmentation" },
      { label: "Oily, Dry, and Combination Skin", href: "/learn/oily-dry-and-combination-skin" },
      { label: "Why Consistency Matters", href: "/learn/why-consistency-matters-in-skincare" },
      { label: "How to Evaluate a Product", href: "/learn/how-to-evaluate-a-skincare-product" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(183,228,199,0.10)",
        background: "#0B1712",
      }}
    >
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Top: brand + nav */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              className="text-lg font-semibold tracking-[0.15em] mb-3"
              style={{ color: "#F4F1E8" }}
            >
              DASZZ
            </div>
            <p className="text-sm mb-6" style={{ color: "#6FAF91", fontStyle: "italic" }}>
              Your skin. Understood.
            </p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#9DAEA4", lineHeight: "1.8" }}>
              A new era of personalized skincare intelligence. Launching 12 June 2026.
            </p>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h3
                className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-5"
                style={{ color: "#6FAF91" }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"href" in l && l.href.startsWith("/") && !l.href.startsWith("/#") ? (
                      <Link
                        href={l.href}
                        className="text-sm transition-colors"
                        style={{ color: "#9DAEA4" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#F4F1E8"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "#9DAEA4"; }}
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm transition-colors"
                        style={{ color: "#9DAEA4" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#F4F1E8"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "#9DAEA4"; }}
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          style={{ borderTop: "1px solid rgba(183,228,199,0.07)" }}
        >
          <div className="space-y-1.5">
            <p className="text-xs" style={{ color: "#9DAEA4", opacity: 0.6 }}>
              © 2026 Daszz. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "#9DAEA4", opacity: 0.5 }}>
              Founded by Varneeth Varma and Sumanth.
            </p>
          </div>
          <p className="text-[10px] max-w-xs text-right leading-relaxed" style={{ color: "#9DAEA4", opacity: 0.4 }}>
            Daszz provides skincare insights and tracking tools. It does not provide medical diagnosis or replace professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
