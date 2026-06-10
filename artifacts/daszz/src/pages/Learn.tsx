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
    <div className="min-h-screen bg-background text-foreground">
      <PageSEO {...meta} />
      <JsonLd data={schema} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Learn", href: "/learn" }]} />

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Skincare Learning Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Practical guides on building a skincare routine, tracking your skin, understanding skin concerns, and making better product decisions.
            </p>
          </div>

          {/* Product vision links */}
          <section className="mb-12 border border-white/5 bg-white/[0.02] p-6" aria-labelledby="explore-heading">
            <h2 id="explore-heading" className="text-xs font-semibold tracking-widest text-primary uppercase mb-5">Explore Daszz</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Personalized Skincare Intelligence", href: "/skincare-intelligence" },
                { label: "Digital Skin Twin", href: "/digital-skin-twin" },
                { label: "Skin Tracking", href: "/skin-tracking" },
                { label: "Personalized Skincare", href: "/personalized-skincare" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block p-4 border border-white/5 hover:bg-white/[0.04] transition-colors text-sm font-medium text-muted-foreground hover:text-white"
                >
                  {l.label} →
                </Link>
              ))}
            </div>
          </section>

          {/* Articles by category */}
          {categories.map((cat) => {
            const catArticles = articles.filter((a) => a.category === cat);
            return (
              <section key={cat} className="mb-14" aria-labelledby={`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}>
                <h2
                  id={`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-lg font-semibold mb-5 pb-3 border-b border-white/5"
                >
                  {cat}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
                </div>
              </section>
            );
          })}

          <div className="mt-4 text-xs text-muted-foreground/50 leading-relaxed">
            All articles are written by the Daszz Editorial Team for informational purposes only. They are not a substitute for professional medical advice, diagnosis, or treatment. Consult a qualified dermatologist for any skin concerns.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
