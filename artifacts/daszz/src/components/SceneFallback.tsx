export default function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden select-none">
      <div className="relative w-64 h-80 md:w-80 md:h-96">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        {/* SVG face topology lines */}
        <svg
          viewBox="0 0 200 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="faceGlow" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Glow background */}
          <ellipse cx="100" cy="120" rx="90" ry="110" fill="url(#faceGlow)" />

          {/* Outer head silhouette */}
          <ellipse cx="100" cy="110" rx="72" ry="95" stroke="url(#lineGrad)" strokeWidth="0.8" strokeOpacity="0.5" />
          {/* Inner face oval */}
          <ellipse cx="100" cy="115" rx="52" ry="78" stroke="url(#lineGrad)" strokeWidth="0.6" strokeOpacity="0.35" />
          {/* Mid face oval */}
          <ellipse cx="100" cy="118" rx="35" ry="58" stroke="url(#lineGrad)" strokeWidth="0.4" strokeOpacity="0.25" />

          {/* Jawline */}
          <path d="M 50 155 Q 75 200 100 208 Q 125 200 150 155" stroke="url(#lineGrad)" strokeWidth="0.7" strokeOpacity="0.5" fill="none" />

          {/* Left brow */}
          <path d="M 60 90 Q 78 84 90 87" stroke="#a5b4fc" strokeWidth="0.9" strokeOpacity="0.55" fill="none" />
          {/* Right brow */}
          <path d="M 140 90 Q 122 84 110 87" stroke="#a5b4fc" strokeWidth="0.9" strokeOpacity="0.55" fill="none" />

          {/* Left eye */}
          <ellipse cx="78" cy="100" rx="18" ry="8" stroke="#a5b4fc" strokeWidth="0.7" strokeOpacity="0.5" />
          {/* Right eye */}
          <ellipse cx="122" cy="100" rx="18" ry="8" stroke="#a5b4fc" strokeWidth="0.7" strokeOpacity="0.5" />

          {/* Nose bridge */}
          <path d="M 100 92 L 96 118 Q 100 122 104 118 L 100 92" stroke="#a5b4fc" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />

          {/* Nose wings */}
          <path d="M 96 120 Q 88 122 86 128" stroke="#a5b4fc" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />
          <path d="M 104 120 Q 112 122 114 128" stroke="#a5b4fc" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />

          {/* Mouth */}
          <path d="M 84 148 Q 100 155 116 148" stroke="#a5b4fc" strokeWidth="0.8" strokeOpacity="0.45" fill="none" />
          <path d="M 84 148 Q 100 143 116 148" stroke="#a5b4fc" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />

          {/* Horizontal topology lines */}
          <line x1="40" y1="75" x2="160" y2="75" stroke="url(#lineGrad)" strokeWidth="0.4" strokeOpacity="0.2" />
          <line x1="35" y1="100" x2="165" y2="100" stroke="url(#lineGrad)" strokeWidth="0.4" strokeOpacity="0.2" />
          <line x1="42" y1="125" x2="158" y2="125" stroke="url(#lineGrad)" strokeWidth="0.4" strokeOpacity="0.2" />
          <line x1="50" y1="148" x2="150" y2="148" stroke="url(#lineGrad)" strokeWidth="0.4" strokeOpacity="0.2" />

          {/* Animated scan line */}
          <line
            x1="28" y1="0" x2="172" y2="0"
            stroke="#a5b4fc" strokeWidth="0.9" strokeOpacity="0.7"
            className="scan-line-animate"
            style={{ transformOrigin: "100px 130px" }}
          />

          {/* Rim-light dots */}
          <circle cx="28" cy="110" r="1.5" fill="#818cf8" fillOpacity="0.6" />
          <circle cx="172" cy="110" r="1.5" fill="#818cf8" fillOpacity="0.6" />
          <circle cx="100" cy="15" r="1.2" fill="#a5b4fc" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
