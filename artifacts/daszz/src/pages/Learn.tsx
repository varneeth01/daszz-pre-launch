import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { Link } from "wouter";
import { PAGE_META, SITE_URL } from "@/lib/seo";
import ArticleCard from "@/components/learn/ArticleCard";
import { articles } from "@/content/learn";

const categories = [...new Set(articles.map((a) => a.category))];

const exploreLinks = [
  { label: "Personalized Skincare Intelligence →", href: "/skincare-intelligence" },
  { label: "Digital Skin Twin →", href: "/digital-skin-twin" },
  { label: "Skin Tracking →", href: "/skin-tracking" },
  { label: "Personalized Skincare →", href: "/personalized-skincare" },
];

export default function Learn() {
  const meta = PAGE_META.learn;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.title,
    description: meta.description,
    url: meta.canonical,
    publisher: { "@type": "Organization", name: "Daszz", url: SITE_URL },
    hasPart: articles.map((a) => ({
      "@type": "Article",
      headline: a.title,
      description: a.description,
      url: `${SITE_URL}/learn/${a.slug}`,
      datePublished: a.publishedAt,
      author: { "@type": "Organization", name: a.author },
    })),
  };

  return (
    <div className="min-h-screen" style={{ background: "#07110D", color: "#F4F1E8" }}>
      <PageSEO {...meta} />
      <JsonLd data={schema} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Learn", href: "/learn" }]} />

          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-4" style={{ color: "#F4F1E8" }}>
              Skincare Learning Hub
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: "#9DAEA4" }}>
              Practical guides on building a skincare routine, tracking your skin, understanding skin concerns, and making better product decisions.
            </p>
          </div>

          {/* Explore Daszz links */}
          <section
            className="mb-12 p-6"
            style={{ border: "1px solid rgba(183,228,199,0.10)", background: "rgba(143,207,176,0.02)" }}
            aria-labelledby="explore-heading"
          >
            <h2
              id="explore-heading"
              className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-5"
              style={{ color: "#6FAF91" }}
            >
              EXPLORE DASZZ
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {exploreLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block p-4 text-sm transition-all"
                  style={{
                    border: "1px solid rgba(183,228,199,0.08)",
                    color: "#9DAEA4",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(143,207,176,0.06)";
                    e.currentTarget.style.color = "#F4F1E8";
                    e.currentTarget.style.borderColor = "rgba(183,228,199,0.20)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#9DAEA4";
                    e.currentTarget.style.borderColor = "rgba(183,228,199,0.08)";
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Articles by category */}
          {categories.map((cat) => {
            const catArticles = articles.filter((a) => a.category === cat);
            const catId = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <section key={cat} className="mb-14" aria-labelledby={catId}>
                <h2
                  id={catId}
                  className="text-lg font-medium mb-5 pb-3"
                  style={{
                    color: "#F4F1E8",
                    borderBottom: "1px solid rgba(183,228,199,0.08)",
                  }}
                >
                  {cat}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
                </div>
              </section>
            );
          })}

          <div className="mt-4 text-xs leading-relaxed" style={{ color: "#9DAEA4", opacity: 0.45 }}>
            All articles are written by the Daszz Editorial Team for informational purposes only. They are not a substitute for professional medical advice, diagnosis, or treatment. Consult a qualified dermatologist for any skin concerns.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
