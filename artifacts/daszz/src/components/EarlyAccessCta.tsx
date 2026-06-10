import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";

interface Props {
  heading?: string;
  subheading?: string;
  label?: string;
}

export default function EarlyAccessCta({
  heading = "Understand your skin with Daszz",
  subheading = "Join the private reveal and receive an update when Daszz goes live on 12 June 2026.",
  label = "GET EARLY ACCESS",
}: Props) {
  return (
    <div
      className="p-8 text-center"
      style={{
        border: "1px solid rgba(183,228,199,0.14)",
        background: "rgba(11,23,18,0.5)",
      }}
    >
      <p className="text-[9px] font-semibold tracking-[0.22em] mb-5" style={{ color: "#6FAF91" }}>
        PRIVATE REVEAL
      </p>
      <h2 className="font-display text-2xl mb-3" style={{ color: "#F4F1E8" }}>
        {heading}
      </h2>
      <p className="text-sm leading-relaxed mb-7 max-w-sm mx-auto" style={{ color: "#9DAEA4" }}>
        {subheading}
      </p>
      <button
        type="button"
        onClick={scrollToEarlyAccess}
        className="inline-flex h-11 items-center justify-center px-8 text-xs font-semibold tracking-widest transition-all focus:outline-none focus-visible:ring-1"
        style={{ background: "#8FCFB0", color: "#07110D", border: "none" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#B7E4C7"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#8FCFB0"; }}
      >
        {label}
      </button>
    </div>
  );
}
