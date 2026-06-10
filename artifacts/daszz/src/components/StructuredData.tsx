import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo";

export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Daszz",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "Daszz is a personalized skincare intelligence platform built to help you understand your skin, track meaningful changes, and make smarter skincare decisions.",
    founder: [
      { "@type": "Person", name: "Varneeth Varma" },
      { "@type": "Person", name: "Sumanth" },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daszz",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/learn?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Daszz — Personalized Skincare Intelligence and Skin Tracking",
    description:
      "Daszz is a personalized skincare intelligence platform designed to help you understand your skin, track meaningful changes over time, and make smarter skincare decisions.",
    url: SITE_URL,
    publisher: { "@type": "Organization", name: "Daszz", url: SITE_URL },
    inLanguage: "en",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Daszz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daszz is a personalized skincare intelligence platform designed to help users understand their skin, track changes, and make better-informed skincare decisions.",
        },
      },
      {
        "@type": "Question",
        name: "When is Daszz launching?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daszz launches on June 12, 2026, at 10:00 AM IST. Join the early-access list to be notified first.",
        },
      },
      {
        "@type": "Question",
        name: "Is Daszz a replacement for a dermatologist?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Daszz is intended to provide skincare insights and tracking tools. It is not a replacement for professional medical advice, diagnosis, or treatment.",
        },
      },
      {
        "@type": "Question",
        name: "Who is building Daszz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daszz is founded by Varneeth Varma and Sumanth, with a mission to make personalized skincare intelligence more accessible, useful, and human.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      <JsonLd data={webpage} />
      <JsonLd data={faq} />
    </>
  );
}
