import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";
import SceneFallback from "./SceneFallback";
import SceneErrorBoundary from "./SceneErrorBoundary";
import { APP_URL } from "@/lib/launch-config";
import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";

const DaszzScene = lazy(() => import("./DaszzScene"));

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
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

  const handleEarlyAccess = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in e && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    scrollToEarlyAccess();
  };

  const showScene = webglAvailable && !reducedMotion;

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 items-center relative z-10 py-12 lg:py-0">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-white/10 bg-white/[0.04] text-[10px] font-semibold tracking-widest text-white/60 uppercase">
            PRIVATE REVEAL &middot; 2026
          </div>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.05] mb-6">
            <span className="block text-gradient">THE NEXT VERSION</span>
            <span className="block text-gradient">OF YOU</span>
            <span className="block text-white/40 mt-1">IS CLOSER THAN</span>
            <span className="block text-white/40">YOU THINK.</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
            A new era of personalized skincare intelligence is about to be revealed.
          </p>

          {isLive ? (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 tracking-tight">DASZZ IS NOW LIVE<br /><span className="text-muted-foreground">Your skin. Understood.</span></h2>
              <a
                href={APP_URL}
                className="inline-flex h-14 items-center justify-center px-8 bg-white text-black font-semibold hover:bg-white/90 transition-colors"
              >
                Enter Daszz
              </a>
            </div>
          ) : (
            <>
              <Countdown />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <button
                  type="button"
                  onClick={handleEarlyAccess}
                  onKeyDown={handleEarlyAccess}
                  aria-label="Get early access — scroll to sign-up form"
                  className="inline-flex h-14 items-center justify-center px-8 bg-white text-black font-semibold hover:bg-white/90 active:bg-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Get early access
                </button>
                <a
                  href="#vision"
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors underline underline-offset-4"
                >
                  Discover the vision
                </a>
              </div>
            </>
          )}
        </motion.div>

        {/* Right column — 3D scene */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="h-[420px] lg:h-[680px] w-full relative"
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
