const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

type GtagCommand = "config" | "event" | "js" | "set";

declare global {
  interface Window {
    gtag?: (command: GtagCommand, target: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

let initialized = false;

export function initAnalytics() {
  if (!GA_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: Parameters<NonNullable<typeof window.gtag>>) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date().toISOString());
  window.gtag("config", GA_ID, { send_page_view: true });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export const GA_EVENTS = {
  earlyAccessCtaClick: () => trackEvent("early_access_cta_click"),
  earlyAccessFormSubmit: () => trackEvent("early_access_form_submit"),
  earlyAccessFormSuccess: () => trackEvent("early_access_form_success"),
  articleView: (slug: string) => trackEvent("article_view", { article_slug: slug }),
  relatedArticleClick: (slug: string) => trackEvent("related_article_click", { article_slug: slug }),
};
