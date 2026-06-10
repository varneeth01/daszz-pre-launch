import { useEffect, useState } from "react";
import { LAUNCH_TIME } from "@/lib/launch-config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, LAUNCH_TIME.getTime() - Date.now());
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: Array<{ key: keyof TimeLeft; label: string }> = [
    { key: "days", label: "DAYS" },
    { key: "hours", label: "HRS" },
    { key: "minutes", label: "MIN" },
    { key: "seconds", label: "SEC" },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs sm:max-w-sm mb-10"
      aria-label="Countdown to launch"
    >
      {units.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center justify-center p-3 sm:p-5 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
        >
          <span className="countdown-digit text-3xl sm:text-4xl font-light tracking-tighter text-white leading-none">
            {timeLeft[key].toString().padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground tracking-widest mt-1.5">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
