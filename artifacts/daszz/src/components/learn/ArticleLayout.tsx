import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb, { type BreadcrumbItem } from "@/components/seo/Breadcrumb";
import ArticleCard from "./ArticleCard";
import EarlyAccessCta from "@/components/EarlyAccessCta";
import type { Article } from "@/content/learn";

interface Props {
  article: Article;
  relatedArticles: Article[];
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

export default function ArticleLayout({ article, relatedArticles, breadcrumbs, children }: Props) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedUpdated = new Date(article.updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen" style={{ background: "#07110D", color: "#F4F1E8" }}>
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Breadcrumb items={breadcrumbs} />

          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: "#6FAF91" }}>
            {article.category} &middot; {article.readingTime} read
          </p>

          <h1
            className="text-3xl md:text-4xl font-display tracking-tight mb-6 leading-tight"
            style={{ color: "#F4F1E8" }}
          >
            {article.title}
          </h1>

          <div
            className="flex flex-wrap items-center gap-4 text-sm mb-10 pb-10"
            style={{
              color: "#9DAEA4",
              borderBottom: "1px solid rgba(183,228,199,0.08)",
            }}
          >
            <span>By <span style={{ color: "#C9CEC3" }}>{article.author}</span></span>
            <span aria-label={`Published ${formattedDate}`}>
              Published <time dateTime={article.publishedAt}>{formattedDate}</time>
            </span>
            {article.updatedAt !== article.publishedAt && (
              <span aria-label={`Updated ${formattedUpdated}`}>
                Updated <time dateTime={article.updatedAt}>{formattedUpdated}</time>
              </span>
            )}
          </div>

          <p className="text-lg leading-relaxed mb-10 font-medium" style={{ color: "#C9CEC3" }}>
            {article.intro}
          </p>

          <article
            className="prose-daszz max-w-none space-y-6 text-base leading-relaxed"
            style={{ color: "#9DAEA4" }}
          >
            {children}
          </article>

          {/* Disclaimer */}
          <div
            className="mt-16 pt-8 text-xs leading-relaxed"
            style={{
              borderTop: "1px solid rgba(183,228,199,0.07)",
              color: "#9DAEA4",
              opacity: 0.6,
            }}
          >
            <strong style={{ opacity: 0.9 }}>Medical disclaimer: </strong>
            This article is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Consult a qualified dermatologist or healthcare professional for any skin concerns.
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-6 max-w-3xl mt-16">
          <EarlyAccessCta heading="Understand your skin with Daszz" />
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="container mx-auto px-6 max-w-3xl mt-16">
            <h2
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ color: "#6FAF91" }}
            >
              Related reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
