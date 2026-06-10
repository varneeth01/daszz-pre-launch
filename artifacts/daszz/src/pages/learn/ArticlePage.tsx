import { useEffect } from "react";
import { useLocation } from "wouter";
import ArticleLayout from "@/components/learn/ArticleLayout";
import PageSEO from "@/components/seo/PageSEO";
import JsonLd from "@/components/seo/JsonLd";
import { getArticleBySlug, getRelatedArticles } from "@/content/learn";
import { SITE_URL } from "@/lib/seo";
import { GA_EVENTS } from "@/lib/analytics";
import NotFound from "@/pages/not-found";

interface Props {
  slug: string;
}

export default function ArticlePage({ slug }: Props) {
  const article = getArticleBySlug(slug);

  useEffect(() => {
    if (article) GA_EVENTS.articleView(article.slug);
  }, [article]);

  if (!article) return <NotFound />;

  const relatedArticles = getRelatedArticles(article.relatedSlugs);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/learn/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "Daszz",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/learn/${article.slug}` },
    inLanguage: "en",
    keywords: article.keywords.join(", "),
  };

  return (
    <>
      <PageSEO
        title={`${article.title} | Daszz`}
        description={article.description}
        canonical={`${SITE_URL}/learn/${article.slug}`}
        ogType="article"
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
      />
      <JsonLd data={schema} />
      <ArticleLayout
        article={article}
        relatedArticles={relatedArticles}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn" },
          { label: article.title, href: `/learn/${article.slug}` },
        ]}
      >
        {article.body.map((section) => (
          <div key={section.heading} className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">{section.heading}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}
      </ArticleLayout>
    </>
  );
}
