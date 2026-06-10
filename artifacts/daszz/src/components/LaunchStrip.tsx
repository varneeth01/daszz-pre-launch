const stats = [
  { value: "36 HRS", label: "Private reveal window" },
  { value: "12 JUN", label: "Launch date" },
  { value: "10:00 AM", label: "IST reveal time" },
  { value: "01", label: "A new era" },
];

export default function LaunchStrip() {
  return (
    <div className="py-10 border-b border-white/5 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-4 text-center">
              <div className="text-xl font-light mb-1 tracking-widest">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
