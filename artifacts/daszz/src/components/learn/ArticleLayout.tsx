import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb, { type BreadcrumbItem } from "@/components/seo/Breadcrumb";
import ArticleCard from "./ArticleCard";
import type { Article } from "@/content/learn";
import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";

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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Breadcrumb items={breadcrumbs} />

          <p className="text-[10px] font-semibold tracking-widest text-primary uppercase mb-4">
            {article.category} &middot; {article.readingTime} read
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-10 pb-10 border-b border-white/5">
            <span>By <span className="text-white/70">{article.author}</span></span>
            <span aria-label={`Published ${formattedDate}`}>
              Published{" "}
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </span>
            {article.updatedAt !== article.publishedAt && (
              <span aria-label={`Updated ${formattedUpdated}`}>
                Updated{" "}
                <time dateTime={article.updatedAt}>{formattedUpdated}</time>
              </span>
            )}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-medium">
            {article.intro}
          </p>

          <article className="prose-daszz">
            {children}
          </article>

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-white/5 text-xs text-muted-foreground/60 leading-relaxed">
            <strong className="text-muted-foreground/80">Medical disclaimer:</strong>{" "}
            This article is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Consult a qualified dermatologist or healthcare professional for any skin concerns.
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-6 max-w-3xl mt-16">
          <div className="border border-white/8 bg-white/[0.02] p-8 text-center">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">Early access</p>
            <h2 className="text-2xl font-bold mb-3">Understand your skin with Daszz</h2>
            <p className="text-muted-foreground mb-6 text-sm">Join the waitlist for personalized skincare intelligence, launching June 12, 2026.</p>
            <Link
              href="/#early-access"
              onClick={(e) => { e.preventDefault(); scrollToEarlyAccess(); }}
              className="inline-flex h-12 items-center justify-center px-8 bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Get early access
            </Link>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="container mx-auto px-6 max-w-3xl mt-16">
            <h2 className="text-lg font-semibold mb-6">Related reading</h2>
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
