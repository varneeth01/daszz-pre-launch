import { Link } from "wouter";
import type { Article } from "@/content/learn";

interface Props {
  article: Article;
  onClick?: () => void;
}

export default function ArticleCard({ article, onClick }: Props) {
  return (
    <Link
      href={`/learn/${article.slug}`}
      onClick={onClick}
      className="block group border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      <p className="text-[10px] font-semibold tracking-widest text-primary uppercase mb-3">
        {article.category} &middot; {article.readingTime} read
      </p>
      <h3 className="font-semibold text-white group-hover:text-white/80 transition-colors mb-2 leading-snug">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {article.description}
      </p>
      <p className="text-xs text-white/30 mt-4">
        {new Date(article.publishedAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </Link>
  );
}
