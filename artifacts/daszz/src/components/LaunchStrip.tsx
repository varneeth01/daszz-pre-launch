const stats = [
  { value: "36 HOURS",  label: "Private reveal window" },
  { value: "12 JUN",    label: "Launch date" },
  { value: "10:00 AM",  label: "IST reveal time" },
  { value: "01",        label: "A new era of skincare intelligence" },
];

export default function LaunchStrip() {
  return (
    <div
      className="py-8"
      style={{ borderBottom: "1px solid rgba(183,228,199,0.07)", background: "rgba(11,23,18,0.6)" }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="px-6 py-5 text-center"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(183,228,199,0.07)" : "none",
              }}
            >
              <div
                className="text-xl font-light mb-1 tracking-[0.1em]"
                style={{ color: "#F4F1E8", fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </div>
              <div className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#9DAEA4" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
