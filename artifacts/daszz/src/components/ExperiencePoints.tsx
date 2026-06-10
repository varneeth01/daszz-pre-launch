const points = [
  { n: "01", title: "Understand", desc: "Discover clearer insights about your skin through intelligent analysis." },
  { n: "02", title: "Track", desc: "Follow meaningful changes over time with precision and clarity." },
  { n: "03", title: "Evolve", desc: "Build a skincare routine that adapts intelligently with you." },
];

export default function ExperiencePoints() {
  return (
    <section className="py-24 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {points.map((pt) => (
            <div
              key={pt.n}
              className="p-10 bg-background hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-xs font-semibold text-primary mb-8 tracking-widest">{pt.n}</div>
              <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">{pt.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
