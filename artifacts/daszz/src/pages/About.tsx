import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/seo/PageSEO";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { Link } from "wouter";
import { PAGE_META, SITE_URL } from "@/lib/seo";
import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";

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
    <div className="min-h-screen bg-background text-foreground">
      <PageSEO {...meta} />
      <JsonLd data={schema} />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            About Daszz
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-16">
            Daszz is a personalized skincare intelligence platform built around a simple idea: that understanding your skin begins with consistent observation over time, not generic advice.
          </p>

          <section className="mb-16" aria-labelledby="mission-heading">
            <h2 id="mission-heading" className="text-2xl font-semibold mb-5">Our mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Skincare is deeply individual. Two people with similar skin types can have entirely different responses to the same product or routine. Yet most skincare advice is built around generalisations—broad categories, population averages, and one-size-fits-all recommendations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Daszz is built on the belief that better skincare decisions come from better personal data: tracking how your skin actually behaves, observing how it responds to your routine over time, and developing an understanding of your skin that is grounded in your own history rather than a generic profile.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to make that kind of personalized skincare intelligence more accessible, more useful, and more human.
            </p>
          </section>

          <section className="mb-16" aria-labelledby="founders-heading">
            <h2 id="founders-heading" className="text-2xl font-semibold mb-6">Founders</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-white/5 bg-white/[0.02] p-6">
                <h3 className="font-semibold text-white mb-2">Varneeth Varma</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Co-founder of Daszz, building personalized skincare intelligence that puts individual skin history at the center of every decision.
                </p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-6">
                <h3 className="font-semibold text-white mb-2">Sumanth</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Co-founder of Daszz, focused on making skincare insights practical, accessible, and built for real people.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16" aria-labelledby="vision-heading">
            <h2 id="vision-heading" className="text-2xl font-semibold mb-5">The product vision</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Daszz is building a platform around the concept of a <Link href="/digital-skin-twin" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">digital skin twin</Link>—a continuously updated model of your skin's state and history. Rather than telling you what to do, Daszz gives you visibility into what your skin is actually doing, so you can make decisions that are grounded in your own experience.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The platform supports <Link href="/skin-tracking" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">consistent skin tracking</Link> over time, helping users identify patterns, evaluate what is working in their routine, and understand how external factors—sleep, stress, diet, climate—interact with their skin.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Daszz is not a diagnostic tool and is not intended to replace dermatological care. It is an intelligence layer for the everyday skincare decisions that people are already making—designed to make those decisions more informed.
            </p>
          </section>

          <section className="border border-white/8 bg-white/[0.02] p-8 text-center" aria-labelledby="cta-heading">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">Early access</p>
            <h2 id="cta-heading" className="text-2xl font-bold mb-3">Join the Daszz reveal</h2>
            <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">Daszz launches June 12, 2026. Join the early-access list to be the first to know.</p>
            <button
              type="button"
              onClick={scrollToEarlyAccess}
              className="inline-flex h-12 items-center justify-center px-8 bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Get early access
            </button>
          </section>

          <div className="mt-16 text-xs text-muted-foreground/50 leading-relaxed">
            Daszz provides skincare insights and tracking tools only. It does not provide medical diagnosis or replace professional medical advice.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
