import { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";
import SceneFallback from "./SceneFallback";
import SceneErrorBoundary from "./SceneErrorBoundary";
import { APP_URL } from "@/lib/launch-config";
import { Link } from "wouter";

const DaszzScene = lazy(() => import("./DaszzScene"));

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function HeroSection({ isLive }: { isLive: boolean }) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglAvailable(hasWebGL());
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-50" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-white/10 bg-white/5 text-xs font-semibold tracking-widest text-primary-foreground">
            PRIVATE REVEAL &middot; 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            <span className="block text-gradient">THE NEXT VERSION OF YOU</span>
            <span className="block text-muted-foreground">IS CLOSER THAN YOU THINK.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-lg leading-relaxed">
            A new era of personalized skincare intelligence is about to be revealed.
          </p>
          
          {isLive ? (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">DASZZ IS NOW LIVE / Your skin. Understood.</h2>
              <Link href={APP_URL} className="inline-flex h-14 items-center justify-center px-8 bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                Enter Daszz
              </Link>
            </div>
          ) : (
            <>
              <Countdown />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a href="#early-access" className="inline-flex h-14 items-center justify-center px-8 bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                  Get early access
                </a>
                <a href="#vision" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors underline underline-offset-4">
                  Discover the vision
                </a>
              </div>
            </>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[500px] lg:h-[700px] w-full relative"
        >
          {webglAvailable === null ? (
            <SceneFallback />
          ) : webglAvailable ? (
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
