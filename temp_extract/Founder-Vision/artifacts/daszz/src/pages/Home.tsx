import { useEffect, useState } from "react";
import { LAUNCH_TIME } from "@/lib/launch-config";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import ExperiencePoints from "@/components/ExperiencePoints";
import LaunchStrip from "@/components/LaunchStrip";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import FAQ from "@/components/FAQ";
import FounderSection from "@/components/FounderSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLiveStatus = () => {
      if (new Date().getTime() >= LAUNCH_TIME.getTime()) {
        setIsLive(true);
      }
    };
    
    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans antialiased selection:bg-primary/30">
      <Header />
      <main className="flex-1">
        <HeroSection isLive={isLive} />
        <LaunchStrip />
        <VisionSection />
        <ExperiencePoints />
        {!isLive && <EarlyAccessForm />}
        <FAQ />
        <FounderSection />
      </main>
      <Footer />
    </div>
  );
}
