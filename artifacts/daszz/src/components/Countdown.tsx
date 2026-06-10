import { useEffect, useRef, useState } from "react";
import { CAMPAIGN_START, LAUNCH_TIME } from "@/lib/launch-config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, LAUNCH_TIME.getTime() - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
  };
}

function revealProgress(): number {
  const total = LAUNCH_TIME.getTime() - CAMPAIGN_START.getTime();
  const elapsed = Date.now() - CAMPAIGN_START.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

const UNITS: Array<{ key: keyof TimeLeft; label: string }> = [
  { key: "days",    label: "DAYS"    },
  { key: "hours",   label: "HOURS"   },
  { key: "minutes", label: "MINUTES" },
  { key: "seconds", label: "SECONDS" },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [progress, setProgress] = useState(revealProgress);
  const prevRef = useRef<TimeLeft>(timeLeft);
  const [changed, setChanged] = useState<Set<keyof TimeLeft>>(new Set());

  useEffect(() => {
    const id = setInterval(() => {
      const next = getTimeLeft();
      const now = prevRef.current;
      const changed = new Set<keyof TimeLeft>();
      (Object.keys(next) as Array<keyof TimeLeft>).forEach(k => {
        if (next[k] !== now[k]) changed.add(k);
      });
      setChanged(changed);
      prevRef.current = next;
      setTimeLeft(next);
      setProgress(revealProgress());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mb-10" aria-label="Countdown to launch">
      {/* Timer grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[rgba(183,228,199,0.08)] mb-5 max-w-sm sm:max-w-none">
        {UNITS.map(({ key, label }) => (
          <div
            key={key}
            className={`flex flex-col items-center justify-center py-5 px-3 bg-[#07110D] transition-colors duration-300 ${changed.has(key) ? "bg-[rgba(143,207,176,0.06)]" : ""}`}
          >
            <span
              className="countdown-digit text-4xl sm:text-5xl font-light leading-none mb-2 text-cream"
              style={{ color: "#F4F1E8", fontFamily: "var(--app-font-sans)" }}
            >
              {timeLeft[key].toString().padStart(2, "0")}
            </span>
            <span className="text-[9px] font-semibold tracking-[0.18em] leading-none" style={{ color: "#9DAEA4" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Reveal progress */}
      <div className="max-w-sm sm:max-w-none">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-semibold tracking-[0.18em]" style={{ color: "#9DAEA4" }}>REVEAL PROGRESS</span>
          <span className="text-[9px] font-semibold tracking-[0.12em]" style={{ color: "#8FCFB0" }}>{progress.toFixed(1)}%</span>
        </div>
        <div className="h-px w-full overflow-hidden" style={{ background: "rgba(183,228,199,0.10)" }}>
          <div
            className="h-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #2F6B55, #8FCFB0)" }}
          />
        </div>
      </div>
    </div>
  );
}
