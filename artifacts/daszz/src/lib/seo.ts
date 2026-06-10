export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "https://daszz.com";

export const SITE_NAME = "Daszz";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;
export const DEFAULT_OG_IMAGE_ALT = "Daszz — Personalized Skincare Intelligence, launching June 12 2026";

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
}

export function buildMeta(meta: PageMeta): Required<PageMeta> {
  return {
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical ?? SITE_URL,
    ogTitle: meta.ogTitle ?? meta.title,
    ogDescription: meta.ogDescription ?? meta.description,
    ogImage: meta.ogImage ?? DEFAULT_OG_IMAGE,
    ogImageAlt: meta.ogImageAlt ?? DEFAULT_OG_IMAGE_ALT,
    noindex: meta.noindex ?? false,
  };
}

export const PAGE_META = {
  home: buildMeta({
    title: "Daszz — Personalized Skincare Intelligence and Skin Tracking",
    description:
      "Daszz is a personalized skincare intelligence platform designed to help you understand your skin, track meaningful changes over time, and make smarter skincare decisions.",
    canonical: SITE_URL,
  }),
  about: buildMeta({
    title: "About Daszz | Mission, Founders, and Product Vision",
    description:
      "Learn about the Daszz mission: making personalized skincare intelligence more accessible and useful. Founded by Varneeth Varma and Sumanth.",
    canonical: `${SITE_URL}/about`,
  }),
  skincareIntelligence: buildMeta({
    title: "Personalized Skincare Intelligence | Daszz",
    description:
      "Discover what personalized skincare intelligence means: using consistent observation and tracking to make more informed decisions about your skin.",
    canonical: `${SITE_URL}/skincare-intelligence`,
  }),
  digitalSkinTwin: buildMeta({
    title: "Digital Skin Twin for Skin Progress Tracking | Daszz",
    description:
      "A digital skin twin is a way to track your skin's state and observe changes over time. Learn how this concept applies to personalized skincare.",
    canonical: `${SITE_URL}/digital-skin-twin`,
  }),
  skinTracking: buildMeta({
    title: "Skin Tracking and Skincare Progress Insights | Daszz",
    description:
      "Consistent skin tracking helps you observe how your skin changes in response to your routine. Learn how Daszz approaches skincare progress visibility.",
    canonical: `${SITE_URL}/skin-tracking`,
  }),
  personalizedSkincare: buildMeta({
    title: "Personalized Skincare Routine and Insights | Daszz",
    description:
      "Personalized skincare means making routine decisions based on your own skin's history and patterns, not generic advice. Explore what that looks like.",
    canonical: `${SITE_URL}/personalized-skincare`,
  }),
  learn: buildMeta({
    title: "Skincare Learning Hub — Guides and Articles | Daszz",
    description:
      "Practical skincare guides from Daszz: how to build a routine, track skin changes, understand your skin type, and make better product decisions.",
    canonical: `${SITE_URL}/learn`,
  }),
} as const;
