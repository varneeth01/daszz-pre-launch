import { useState, useEffect } from "react";
import { Link } from "wouter";
import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";

const navLinks = [
  { label: "Vision", href: "/#vision" },
  { label: "Skin Twin", href: "/digital-skin-twin" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleCta = () => {
    setMobileOpen(false);
    scrollToEarlyAccess();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
      style={{
        background: scrolled ? "rgba(7,17,13,0.85)" : "transparent",
        borderBottomColor: scrolled ? "rgba(183,228,199,0.10)" : "transparent",
      }}
    >
      <div className="container mx-auto px-6 h-[72px] flex items-center justify-between max-w-7xl">
        {/* Wordmark */}
        <Link href="/" className="text-lg font-semibold tracking-[0.12em] transition-opacity hover:opacity-70" style={{ color: "#F4F1E8", letterSpacing: "0.15em" }}>
          DASZZ
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            l.href.startsWith("/#") ? (
              <a
                key={l.label}
                href={l.href}
                className="text-xs font-medium tracking-widest transition-colors"
                style={{ color: "#9DAEA4" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F4F1E8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9DAEA4")}
              >
                {l.label.toUpperCase()}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs font-medium tracking-widest transition-colors"
                style={{ color: "#9DAEA4" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F4F1E8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9DAEA4")}
              >
                {l.label.toUpperCase()}
              </Link>
            )
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-[10px] font-medium tracking-[0.18em]" style={{ color: "#9DAEA4" }}>
            12 JUNE 2026
          </span>
          <button
            type="button"
            onClick={handleCta}
            aria-label="Get early access — scroll to sign-up form"
            className="hidden md:flex h-9 items-center px-5 text-[10px] font-semibold tracking-widest border transition-all focus:outline-none focus-visible:ring-1"
            style={{
              background: "rgba(143,207,176,0.08)",
              borderColor: "rgba(183,228,199,0.28)",
              color: "#8FCFB0",
            }}
            onMouseEnter={e => {
              const t = e.currentTarget;
              t.style.background = "rgba(143,207,176,0.16)";
              t.style.borderColor = "rgba(183,228,199,0.55)";
              t.style.color = "#F4F1E8";
            }}
            onMouseLeave={e => {
              const t = e.currentTarget;
              t.style.background = "rgba(143,207,176,0.08)";
              t.style.borderColor = "rgba(183,228,199,0.28)";
              t.style.color = "#8FCFB0";
            }}
          >
            GET EARLY ACCESS
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus-visible:ring-1"
            style={{ color: "#9DAEA4" }}
          >
            <span
              className="block h-px w-5 transition-all duration-200 origin-center"
              style={{
                background: "#8FCFB0",
                transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "",
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-200"
              style={{
                background: "#8FCFB0",
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? "scaleX(0)" : "",
              }}
            />
            <span
              className="block h-px w-5 transition-all duration-200 origin-center"
              style={{
                background: "#8FCFB0",
                transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div
          className="md:hidden mobile-menu-open border-t"
          style={{
            background: "rgba(7,17,13,0.97)",
            backdropFilter: "blur(20px)",
            borderTopColor: "rgba(183,228,199,0.10)",
          }}
        >
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-6" aria-label="Mobile navigation">
            {navLinks.map((l) => (
              l.href.startsWith("/#") ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium tracking-widest transition-opacity hover:opacity-70"
                  style={{ color: "#F4F1E8" }}
                >
                  {l.label.toUpperCase()}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium tracking-widest transition-opacity hover:opacity-70"
                  style={{ color: "#F4F1E8" }}
                >
                  {l.label.toUpperCase()}
                </Link>
              )
            ))}
            <div className="pt-2 border-t" style={{ borderTopColor: "rgba(183,228,199,0.10)" }}>
              <button
                type="button"
                onClick={handleCta}
                className="w-full h-12 text-xs font-semibold tracking-widest border transition-all"
                style={{
                  background: "rgba(143,207,176,0.10)",
                  borderColor: "rgba(183,228,199,0.30)",
                  color: "#8FCFB0",
                }}
              >
                GET EARLY ACCESS
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
