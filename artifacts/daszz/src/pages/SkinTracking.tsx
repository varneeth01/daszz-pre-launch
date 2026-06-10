import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { Link } from "wouter";
import { PAGE_META, SITE_URL } from "@/lib/seo";
import EarlyAccessCta from "@/components/EarlyAccessCta";
import ArticleCard from "@/components/learn/ArticleCard";
import { articles } from "@/content/learn";

const related = articles.filter((a) =>
  ["how-to-track-skin-changes-over-time", "why-consistency-matters-in-skincare", "what-is-a-digital-skin-twin"].includes(a.slug)
);

const greenLink = { color: "#8FCFB0", textDecoration: "underline", textUnderlineOffset: "4px" };
const h2Style = { color: "#F4F1E8" };
const bodyStyle = { color: "#9DAEA4" };

export default function SkinTracking() {
  const meta = PAGE_META.skinTracking;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    description: meta.description,
    url: meta.canonical,
    publisher: { "@type": "Organization", name: "Daszz", url: SITE_URL },
  };

  return (
    <div className="min-h-screen" style={{ background: "#07110D", color: "#F4F1E8" }}>
      <PageSEO {...meta} />
      <JsonLd data={schema} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Skin Tracking", href: "/skin-tracking" }]} />

          <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-6" style={{ color: "#F4F1E8" }}>
            Skin Tracking and Skincare Progress
          </h1>
          <p className="text-lg leading-relaxed mb-12" style={bodyStyle}>
            Consistent skin tracking gives you a reliable picture of how your skin changes over time. Without it, gradual progress is almost impossible to notice — and gradual problems are almost impossible to catch early.
          </p>

          <div className="space-y-12 mb-16">
            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>Why tracking matters</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  Skin changes slowly. A product improving your skin's texture over six weeks produces a change that is invisible from one day to the next, but clearly visible when you compare a starting point to the present. Without a documented reference point, it is easy to feel uncertain about whether any progress is real — or to abandon a routine that was actually working.
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  Skin tracking creates that reference point. It transforms a vague sense of "my skin is better" into an observable, comparable record that you can use to make more confident decisions about your routine.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>What skin tracking looks like in practice</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  Effective skin tracking does not have to be complex. At minimum, it involves: consistent periodic photos (same lighting, angle, and time of day), brief notes about what you observe — texture, breakout frequency, hydration, redness — and context about relevant factors like routine changes, sleep quality, or stress.
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  The goal is to make your observations comparable over time. Read our guide on{" "}
                  <Link href="/learn/how-to-track-skin-changes-over-time" style={greenLink}>how to track skin changes over time</Link>
                  {" "}for practical methods.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>The connection between tracking and skincare decisions</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  Skin tracking is most valuable when it informs decisions. After consistently tracking your skin across a product introduction, you can draw more reliable conclusions: did this product change anything? Did changes correlate with specific external factors? Is this concern improving, worsening, or staying stable?
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  These observations translate directly into more grounded skincare decisions — retaining products that are working, reconsidering ones that are not, and understanding your skin well enough to catch patterns before they become problems.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>Skin tracking and the digital skin twin</h2>
              <p className="leading-relaxed" style={bodyStyle}>
                Daszz approaches skin tracking through the concept of a{" "}
                <Link href="/digital-skin-twin" style={greenLink}>digital skin twin</Link>
                {" "}— an ongoing, evolving record of your skin's state and history that grows more insightful the longer you track. Rather than a single snapshot, it is a continuous picture of your skin across time that makes patterns visible and decisions more informed.
              </p>
            </div>
          </div>

          <EarlyAccessCta heading="Start tracking your skin with Daszz" subheading="Join the waitlist for the Daszz private reveal on June 12, 2026." />

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: "#6FAF91" }}>Related reading</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
              </div>
            </div>
          )}

          <div className="mt-12 text-xs leading-relaxed" style={{ color: "#9DAEA4", opacity: 0.45 }}>
            Daszz provides skincare insights and tracking tools only. Not a substitute for professional medical advice, diagnosis, or treatment.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
