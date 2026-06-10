export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Daszz",
    "description": "Daszz is a personalized skincare intelligence platform built to help you understand your skin, track meaningful changes, and make smarter skincare decisions.",
    "url": "https://daszz.com",
    "founder": [
      { "@type": "Person", "name": "Varneeth Varma" },
      { "@type": "Person", "name": "Sumanth vasilanka" }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
