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
  ["how-to-build-a-skincare-routine", "oily-dry-and-combination-skin", "how-to-evaluate-a-skincare-product"].includes(a.slug)
);

const greenLink = { color: "#8FCFB0", textDecoration: "underline", textUnderlineOffset: "4px" };
const h2Style = { color: "#F4F1E8" };
const bodyStyle = { color: "#9DAEA4" };

export default function PersonalizedSkincare() {
  const meta = PAGE_META.personalizedSkincare;

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
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Personalized Skincare", href: "/personalized-skincare" }]} />

          <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-6" style={{ color: "#F4F1E8" }}>
            Personalized Skincare
          </h1>
          <p className="text-lg leading-relaxed mb-12" style={bodyStyle}>
            Personalized skincare means building a routine based on how your skin actually behaves — not on a skin type category or a product recommendation designed for a broad audience. It requires observation, patience, and a willingness to let your own experience guide your decisions.
          </p>

          <div className="space-y-12 mb-16">
            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>What personalised actually means</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  The word "personalized" appears frequently in skincare marketing, often attached to products that are simply customized versions of standard formulations. True personalization in skincare is more fundamental: it means making routine decisions based on your own skin's observed history — what it has responded to, what it has reacted against, and how it changes across different circumstances.
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  Generic skincare advice is useful as a starting point. A recommendation to use a gentle cleanser, a moisturizer, and SPF is good general guidance. But what works well beyond that baseline varies considerably between individuals, and no generic advice can account for your specific skin's behavior.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>Building a routine that fits your skin</h2>
              <div className="space-y-4">
                <p className="leading-relaxed" style={bodyStyle}>
                  A personalized routine begins with understanding your skin's baseline — how it behaves without any active products, what your skin type is as a general starting point, and what specific concerns matter to you. From there, it involves introducing products methodically, observing the results consistently, and adjusting based on what you observe rather than what you expect.
                </p>
                <p className="leading-relaxed" style={bodyStyle}>
                  This process requires time. Skin responds slowly, and drawing reliable conclusions about a product takes at least four to eight weeks of consistent use. Read our guide on{" "}
                  <Link href="/learn/how-to-build-a-skincare-routine" style={greenLink}>how to build a skincare routine</Link>
                  {" "}for a practical starting framework.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>The role of skin tracking in personalisation</h2>
              <p className="leading-relaxed" style={bodyStyle}>
                Personalized skincare is impossible without consistent observation. Tracking how your skin changes over time — its texture, hydration, breakout frequency, and response to specific products — produces the data that makes genuine personalization possible. Without that data, routine decisions are still based on generalizations, just ones applied to your own impressions rather than population averages. Learn more about{" "}
                <Link href="/skin-tracking" style={greenLink}>skin tracking and skincare progress</Link>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display mb-4" style={h2Style}>Understanding your skin type as a starting point</h2>
              <p className="leading-relaxed" style={bodyStyle}>
                Knowing whether your skin is oily, dry, or combination helps you select appropriate products and formulations to begin with. Explore{" "}
                <Link href="/learn/oily-dry-and-combination-skin" style={greenLink}>oily, dry, and combination skin</Link>
                {" "}to understand what each type typically involves and what that means for your starting routine.
              </p>
            </div>
          </div>

          <EarlyAccessCta heading="Make your skincare truly personal" subheading="Daszz launches June 12, 2026. Join the early-access list to be first." />

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
