import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";
import SceneFallback from "./SceneFallback";
import SceneErrorBoundary from "./SceneErrorBoundary";
import { APP_URL } from "@/lib/launch-config";
import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";
import { GA_EVENTS } from "@/lib/analytics";

const DaszzScene = lazy(() => import("./DaszzScene"));

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch { return false; }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroSection({ isLive }: { isLive: boolean }) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setWebglAvailable(hasWebGL());
    setReducedMotion(prefersReducedMotion());
  }, []);

  const handleCta = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in e && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    GA_EVENTS.earlyAccessCtaClick();
    scrollToEarlyAccess();
  };

  const showScene = webglAvailable && !reducedMotion;

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 65% 42%, rgba(47,107,85,0.22) 0%, transparent 70%)"
      }} />

      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 py-16 lg:py-0">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          {/* Label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 text-[9px] font-semibold tracking-[0.22em] border"
            style={{ borderColor: "rgba(183,228,199,0.18)", color: "#6FAF91", background: "rgba(143,207,176,0.04)" }}
          >
            PRIVATE REVEAL · DASZZ 2026
          </div>

          {/* Headline */}
          <h1 className="font-display mb-6 leading-[1.02] tracking-tight" style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)" }}>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #F4F1E8 0%, #8FCFB0 60%, #6FAF91 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              YOUR SKIN.
            </span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #F4F1E8 20%, #8FCFB0 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              UNDERSTOOD.
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="text-base leading-relaxed mb-3 max-w-md" style={{ color: "#C9CEC3" }}>
            A new era of personalized skincare intelligence is about to be revealed.
          </p>
          <p className="text-sm leading-relaxed mb-6 sm:mb-12 max-w-md" style={{ color: "#9DAEA4" }}>
            Track meaningful changes. Understand your skin more clearly. Build a routine that evolves with you.
          </p>

          {isLive ? (
            <div className="mb-12">
              <p className="text-xs font-semibold tracking-widest mb-6" style={{ color: "#8FCFB0" }}>
                DASZZ IS NOW LIVE
              </p>
              <h2 className="text-2xl font-display mb-6" style={{ color: "#F4F1E8" }}>Your skin. Understood.</h2>
              <a
                href={APP_URL}
                className="inline-flex h-12 items-center justify-center px-8 text-xs font-semibold tracking-widest border transition-all"
                style={{ background: "#8FCFB0", borderColor: "#8FCFB0", color: "#07110D" }}
              >
                ENTER DASZZ
              </a>
            </div>
          ) : (
            <>
              <Countdown />

              {/* Launch line */}
              <div
                className="flex items-center gap-3 mb-8 text-[9px] font-semibold tracking-[0.2em]"
                style={{ color: "#6FAF91" }}
              >
                <span className="block w-6 h-px" style={{ background: "#2F6B55" }} />
                REVEALING · 12 JUNE 2026 · 10:00 AM IST
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={handleCta}
                  aria-label="Get early access — scroll to sign-up form"
                  className="inline-flex h-12 items-center justify-center px-8 text-xs font-semibold tracking-widest border transition-all focus:outline-none focus-visible:ring-1"
                  style={{ background: "#8FCFB0", borderColor: "#8FCFB0", color: "#07110D" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#B7E4C7"; e.currentTarget.style.borderColor = "#B7E4C7"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#8FCFB0"; e.currentTarget.style.borderColor = "#8FCFB0"; }}
                >
                  GET EARLY ACCESS
                </button>
                <a
                  href="#vision"
                  className="text-xs font-medium tracking-widest transition-opacity hover:opacity-60"
                  style={{ color: "#9DAEA4", textDecoration: "underline", textUnderlineOffset: "4px" }}
                >
                  DISCOVER THE VISION
                </a>
              </div>
            </>
          )}
        </motion.div>

        {/* Right column — 3D scene (desktop only; hidden on mobile to avoid blank space) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="hidden lg:block lg:h-[640px] w-full relative"
          aria-hidden
        >
          {webglAvailable === null ? (
            <SceneFallback />
          ) : showScene ? (
            <SceneErrorBoundary>
              <Suspense fallback={<SceneFallback />}>
                <DaszzScene />
              </Suspense>
            </SceneErrorBoundary>
          ) : (
            <SceneFallback />
          )}
        </motion.div>
      </div>
    </section>
  );
}
