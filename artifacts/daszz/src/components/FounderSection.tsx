export default function FounderSection() {
  return (
    <section
      className="py-24"
      style={{ borderTop: "1px solid rgba(183,228,199,0.07)" }}
    >
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="w-16 h-px mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(143,207,176,0.40), transparent)" }} />

        <p className="text-xs font-semibold tracking-[0.2em] mb-7" style={{ color: "#6FAF91" }}>
          BUILT WITH A CLEAR VISION
        </p>

        <p className="text-lg leading-relaxed" style={{ color: "#9DAEA4" }}>
          Daszz is founded by{" "}
          <span className="font-medium" style={{ color: "#F4F1E8" }}>Varneeth Varma</span>
          {" "}and{" "}
          <span className="font-medium" style={{ color: "#F4F1E8" }}>Sumanth</span>
          {" "}with a mission to make personalized skincare intelligence more accessible, useful, and human.
        </p>

        <div className="w-16 h-px mx-auto mt-8" style={{ background: "linear-gradient(90deg, transparent, rgba(143,207,176,0.40), transparent)" }} />
      </div>
    </section>
  );
}
