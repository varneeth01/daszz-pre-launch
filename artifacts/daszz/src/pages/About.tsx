import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { Link } from "wouter";
import { PAGE_META, SITE_URL } from "@/lib/seo";
import EarlyAccessCta from "@/components/EarlyAccessCta";

const greenLink = {
  color: "#8FCFB0",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
};

export default function About() {
  const meta = PAGE_META.about;

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: meta.title,
    description: meta.description,
    url: meta.canonical,
    publisher: { "@type": "Organization", name: "Daszz", url: SITE_URL },
  };

  return (
    <div className="min-h-screen" style={{ background: "#07110D", color: "#F4F1E8" }}>
      <PageSEO {...meta} />
      <JsonLd data={schema} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />

          <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-6" style={{ color: "#F4F1E8" }}>
            About Daszz
          </h1>
          <p className="text-lg leading-relaxed mb-16" style={{ color: "#9DAEA4" }}>
            Daszz is a personalized skincare intelligence platform built around a simple idea: that understanding your skin begins with consistent observation over time, not generic advice.
          </p>

          <section className="mb-16" aria-labelledby="mission-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-5" style={{ background: "rgba(143,207,176,0.40)" }} />
              <h2 id="mission-heading" className="text-2xl font-display" style={{ color: "#F4F1E8" }}>Our mission</h2>
            </div>
            <div className="space-y-4">
              <p className="leading-relaxed" style={{ color: "#9DAEA4" }}>
                Skincare is deeply individual. Two people with similar skin types can have entirely different responses to the same product or routine. Yet most skincare advice is built around generalisations — broad categories, population averages, and one-size-fits-all recommendations.
              </p>
              <p className="leading-relaxed" style={{ color: "#9DAEA4" }}>
                Daszz is built on the belief that better skincare decisions come from better personal data: tracking how your skin actually behaves, observing how it responds to your routine over time, and developing an understanding of your skin that is grounded in your own history rather than a generic profile.
              </p>
              <p className="leading-relaxed" style={{ color: "#9DAEA4" }}>
                Our mission is to make that kind of personalized skincare intelligence more accessible, more useful, and more human.
              </p>
            </div>
          </section>

          <section className="mb-16" aria-labelledby="founders-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-5" style={{ background: "rgba(143,207,176,0.40)" }} />
              <h2 id="founders-heading" className="text-2xl font-display" style={{ color: "#F4F1E8" }}>Founders</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Varneeth Varma",
                  bio: "Co-founder of Daszz, building personalized skincare intelligence that puts individual skin history at the center of every decision.",
                },
                {
                  name: "Sumanth",
                  bio: "Co-founder of Daszz, focused on making skincare insights practical, accessible, and built for real people.",
                },
              ].map(f => (
                <div
                  key={f.name}
                  className="p-6"
                  style={{ border: "1px solid rgba(183,228,199,0.10)", background: "rgba(143,207,176,0.03)" }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "#F4F1E8" }}>{f.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9DAEA4" }}>{f.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16" aria-labelledby="vision-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-5" style={{ background: "rgba(143,207,176,0.40)" }} />
              <h2 id="vision-heading" className="text-2xl font-display" style={{ color: "#F4F1E8" }}>The product vision</h2>
            </div>
            <div className="space-y-4">
              <p className="leading-relaxed" style={{ color: "#9DAEA4" }}>
                Daszz is building a platform around the concept of a{" "}
                <Link href="/digital-skin-twin" style={greenLink}>digital skin twin</Link>
                {" "}— a continuously updated model of your skin's state and history. Rather than telling you what to do, Daszz gives you visibility into what your skin is actually doing, so you can make decisions that are grounded in your own experience.
              </p>
              <p className="leading-relaxed" style={{ color: "#9DAEA4" }}>
                The platform supports{" "}
                <Link href="/skin-tracking" style={greenLink}>consistent skin tracking</Link>
                {" "}over time, helping users identify patterns, evaluate what is working in their routine, and understand how external factors — sleep, stress, diet, climate — interact with their skin.
              </p>
              <p className="leading-relaxed" style={{ color: "#9DAEA4" }}>
                Daszz is not a diagnostic tool and is not intended to replace dermatological care. It is an intelligence layer for the everyday skincare decisions that people are already making — designed to make those decisions more informed.
              </p>
            </div>
          </section>

          <EarlyAccessCta heading="Join the Daszz reveal" subheading="Daszz launches June 12, 2026. Join the early-access list to be the first to know." />

          <div className="mt-12 text-xs leading-relaxed" style={{ color: "#9DAEA4", opacity: 0.45 }}>
            Daszz provides skincare insights and tracking tools only. It does not provide medical diagnosis or replace professional medical advice.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
