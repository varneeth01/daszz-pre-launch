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
      className="block group p-6 transition-all focus:outline-none focus-visible:ring-1"
      style={{
        border: "1px solid rgba(183,228,199,0.10)",
        background: "rgba(143,207,176,0.02)",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(143,207,176,0.055)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(143,207,176,0.02)"; }}
    >
      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#6FAF91" }}>
        {article.category} &middot; {article.readingTime} read
      </p>
      <h3
        className="font-medium mb-2 leading-snug transition-colors"
        style={{ color: "#F4F1E8" }}
      >
        {article.title}
      </h3>
      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#9DAEA4" }}>
        {article.description}
      </p>
      <p className="text-[10px] mt-4" style={{ color: "#9DAEA4", opacity: 0.5 }}>
        {new Date(article.publishedAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </Link>
  );
}
