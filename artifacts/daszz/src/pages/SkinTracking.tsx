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
  ["how-to-track-skin-changes-over-time", "why-consistency-matters-in-skincare", "what-is-a-digital-skin-twin"].includes(a.slug)
);

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
    <div className="min-h-screen bg-background text-foreground">
      <PageSEO {...meta} />
      <JsonLd data={schema} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Skin Tracking", href: "/skin-tracking" }]} />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Skin Tracking and Skincare Progress
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Consistent skin tracking gives you a reliable picture of how your skin changes over time. Without it, gradual progress is almost impossible to notice—and gradual problems are almost impossible to catch early.
          </p>

          <section className="space-y-10 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Why tracking matters</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Skin changes slowly. A product improving your skin's texture over six weeks produces a change that is invisible from one day to the next, but clearly visible when you compare a starting point to the present. Without a documented reference point, it is easy to feel uncertain about whether any progress is real—or to abandon a routine that was actually working.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Skin tracking creates that reference point. It transforms a vague sense of "my skin is better" into an observable, comparable record that you can use to make more confident decisions about your routine.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">What skin tracking looks like in practice</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Effective skin tracking does not have to be complex. At minimum, it involves: consistent periodic photos (same lighting, angle, and time of day), brief notes about what you observe—texture, breakout frequency, hydration, redness—and context about relevant factors like routine changes, sleep quality, or stress.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The goal is to make your observations comparable over time. Read our guide on <Link href="/learn/how-to-track-skin-changes-over-time" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">how to track skin changes over time</Link> for practical methods.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">The connection between tracking and skincare decisions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Skin tracking is most valuable when it informs decisions. After consistently tracking your skin across a product introduction, you can draw more reliable conclusions: did this product change anything? Did changes correlate with specific external factors? Is this concern improving, worsening, or staying stable?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These observations translate directly into more grounded skincare decisions—retaining products that are working, reconsidering ones that are not, and understanding your skin well enough to catch patterns before they become problems.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Skin tracking and the digital skin twin</h2>
              <p className="text-muted-foreground leading-relaxed">
                Daszz approaches skin tracking through the concept of a <Link href="/digital-skin-twin" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">digital skin twin</Link>—an ongoing, evolving record of your skin's state and history that grows more insightful the longer you track. Rather than a single snapshot, it is a continuous picture of your skin across time that makes patterns visible and decisions more informed.
              </p>
            </div>
          </section>

          <div className="border border-white/8 bg-white/[0.02] p-8 text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">Early access</p>
            <h2 className="text-2xl font-bold mb-3">Start tracking your skin with Daszz</h2>
            <p className="text-muted-foreground mb-6 text-sm">Join the waitlist for the Daszz private reveal on June 12, 2026.</p>
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
