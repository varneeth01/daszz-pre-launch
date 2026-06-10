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
  ["how-to-build-a-skincare-routine", "how-to-track-skin-changes-over-time", "how-to-evaluate-a-skincare-product"].includes(a.slug)
);

const greenLink = { color: "#8FCFB0", textDecoration: "underline", textUnderlineOffset: "4px" };
const h2Style = { color: "#F4F1E8" };
const bodyStyle = { color: "#9DAEA4" };

export default function SkincareIntelligence() {
  const meta = PAGE_META.skincareIntelligence;

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
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Skincare Intelligence", href: "/skincare-intelligence" }]} />

          <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-6" style={{ color: "#F4F1E8" }}>
            Personalized Skincare Intelligence
          </h1>
          <p className="text-lg leading-relaxed mb-12" style={{ ...bodyStyle }}>
            Personalized skincare intelligence means making skincare decisions based on your own skin's history and patterns, not broad generalizations. It is the difference between following general advice and understanding how your specific skin responds over time.
          </p>

          <div className="space-y-12 mb-16">
            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>What makes skincare intelligence "personalized"?</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  Most skincare advice is based on skin types, population averages, and product reviews. These are useful starting points, but they cannot account for the specific ways your skin behaves across seasons, routines, and life circumstances. Personalized skincare intelligence takes a different approach: it builds understanding from your own observed data rather than applying someone else's experience to your skin.
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  This means tracking how your skin responds to specific products over weeks and months, noting the external factors that affect it — stress, sleep, diet, climate — and developing a picture of your skin that is grounded in what you have actually observed, not what you expect based on your skin type category.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>Why observation over time is central</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  Skin changes slowly. A product's effects, whether positive or negative, typically take four to twelve weeks to become visible. Without a reliable way to track these changes over time, it is easy to draw incorrect conclusions — abandoning a product that needed more time, or continuing one that was causing subtle problems.
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  Consistent observation creates a reference point that makes it possible to distinguish genuine progress from day-to-day variation. Learn more about{" "}
                  <Link href="/learn/how-to-track-skin-changes-over-time" style={greenLink}>how to track skin changes over time</Link>.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>How Daszz approaches skincare intelligence</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  Daszz is building a{" "}
                  <Link href="/digital-skin-twin" style={greenLink}>digital skin twin</Link>
                  {" "}— an ongoing model of your skin's state and history that makes it easier to observe patterns, evaluate your routine, and understand what is actually influencing your skin. The platform is designed for the everyday skincare decisions people are already making, providing an intelligence layer that helps those decisions become more informed.
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  Daszz is not a diagnostic tool and is not intended to replace dermatological care. It is a skincare intelligence platform: a way to understand your skin better so that your routine decisions are grounded in your own experience.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>The role of a consistent skincare routine</h2>
              <p className="leading-relaxed" style={bodyStyle}>
                Skincare intelligence depends on consistency. Without a stable routine maintained over a meaningful period, it is difficult to draw reliable observations from your skin's behavior. A consistent baseline — even a simple one — makes changes more legible over time. Explore{" "}
                <Link href="/learn/how-to-build-a-skincare-routine" style={greenLink}>how to build a skincare routine</Link>
                {" "}that is stable enough to generate useful information.
              </p>
            </div>
          </div>

          <EarlyAccessCta heading="Experience personalized skincare intelligence" subheading="Join the Daszz waitlist for the private reveal on June 12, 2026." />

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
