import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { Link } from "wouter";
import { PAGE_META, SITE_URL } from "@/lib/seo";
import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";
import ArticleCard from "@/components/learn/ArticleCard";
import { articles } from "@/content/learn";

const related = articles.filter((a) =>
  ["what-is-a-digital-skin-twin", "how-to-track-skin-changes-over-time", "why-consistency-matters-in-skincare"].includes(a.slug)
);

export default function DigitalSkinTwin() {
  const meta = PAGE_META.digitalSkinTwin;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    description: meta.description,
    url: meta.canonical,
    publisher: { "@type": "Organization", name: "Daszz", url: SITE_URL },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageSEO {...meta} />
      <JsonLd data={schema} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Digital Skin Twin", href: "/digital-skin-twin" }]} />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Digital Skin Twin
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            A digital skin twin is an ongoing record of your skin's state and history—updated over time to capture how your skin changes in response to your routine, environment, and lifestyle. It brings the concept of continuous, data-driven monitoring to personal skincare.
          </p>

          <section className="space-y-10 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">The concept behind a digital skin twin</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In engineering and manufacturing, a digital twin is a virtual model of a physical object or system, continuously updated to reflect the real-world state of that system. Engineers use digital twins to monitor performance, identify patterns, and test changes before applying them to the real system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Applied to skincare, a digital skin twin adapts this idea to personal use: maintaining a structured, evolving picture of your skin that captures its current condition, how it has changed over time, and the factors that appear to influence it. Rather than a static skin type label, it is a living record.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">What a digital skin twin captures</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A useful digital skin twin captures the dimensions of your skin that change over time: hydration levels, visible texture, breakout frequency and location, pigmentation changes, redness, and overall evenness. It also contextualises those observations with external factors—your current routine, sleep quality, stress levels, seasonal conditions, and diet—so that patterns can be understood in context, not in isolation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over months of consistent observation, a digital skin twin makes it possible to see what a day-to-day view cannot: gradual improvements, slow-moving changes, and the factors that reliably correspond to your skin feeling or looking different.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">What it is not</h2>
              <p className="text-muted-foreground leading-relaxed">
                A digital skin twin is not a diagnostic tool. It does not identify, diagnose, or treat skin conditions, and it is not a substitute for evaluation by a qualified dermatologist. It is a tracking and observation system: a way to build better self-knowledge about your skin so that the decisions you are already making about your routine are more grounded in your own experience. For any skin concern that goes beyond routine skincare, a dermatologist consultation is always appropriate.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">The role of consistency</h2>
              <p className="text-muted-foreground leading-relaxed">
                A digital skin twin becomes more useful over time—the longer and more consistently you track, the clearer the patterns become. Sporadic observation produces noisy, inconclusive data. Consistent observation, maintained across seasons and routine changes, produces genuine insight. Learn more about <Link href="/learn/why-consistency-matters-in-skincare" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">why consistency matters in skincare</Link> and <Link href="/learn/how-to-track-skin-changes-over-time" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">how to track skin changes over time</Link>.
              </p>
            </div>
          </section>

          <div className="border border-white/8 bg-white/[0.02] p-8 text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">Early access</p>
            <h2 className="text-2xl font-bold mb-3">Build your digital skin twin with Daszz</h2>
            <p className="text-muted-foreground mb-6 text-sm">Launching June 12, 2026. Join the early-access list to be first.</p>
            <button
              type="button"
              onClick={scrollToEarlyAccess}
              className="inline-flex h-12 items-center justify-center px-8 bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Get early access
            </button>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Related reading</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
              </div>
            </div>
          )}

          <div className="mt-12 text-xs text-muted-foreground/50 leading-relaxed">
            Daszz provides skincare insights and tracking tools only. Not a substitute for professional medical advice, diagnosis, or treatment.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
