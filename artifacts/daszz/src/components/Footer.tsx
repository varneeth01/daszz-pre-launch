import { Link } from "wouter";

const productLinks = [
  { label: "Personalized Skincare Intelligence", href: "/skincare-intelligence" },
  { label: "Digital Skin Twin", href: "/digital-skin-twin" },
  { label: "Skin Tracking", href: "/skin-tracking" },
  { label: "Personalized Skincare", href: "/personalized-skincare" },
];

const learnLinks = [
  { label: "How to Build a Skincare Routine", href: "/learn/how-to-build-a-skincare-routine" },
  { label: "How to Track Skin Changes", href: "/learn/how-to-track-skin-changes-over-time" },
  { label: "What is a Digital Skin Twin?", href: "/learn/what-is-a-digital-skin-twin" },
  { label: "Understanding Acne-Prone Skin", href: "/learn/understanding-acne-prone-skin" },
  { label: "Understanding Dark Spots", href: "/learn/understanding-dark-spots-and-pigmentation" },
  { label: "Oily, Dry, and Combination Skin", href: "/learn/oily-dry-and-combination-skin" },
  { label: "Why Consistency Matters", href: "/learn/why-consistency-matters-in-skincare" },
  { label: "How to Evaluate a Skincare Product", href: "/learn/how-to-evaluate-a-skincare-product" },
];

const companyLinks = [
  { label: "About Daszz", href: "/about" },
  { label: "Learn", href: "/learn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl font-bold tracking-tight mb-4">DASZZ</div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Personalized skincare intelligence designed to help you understand your skin, track meaningful changes, and make more informed skincare decisions.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">Product</h3>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">Learn</h3>
            <ul className="space-y-2.5">
              {learnLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2.5">
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">Privacy</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">Terms</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-white/5 pt-8">
          <div className="text-xs text-muted-foreground/50">© 2026 Daszz. All rights reserved.</div>
          <div className="text-xs text-muted-foreground/40 max-w-sm text-right">
            Daszz provides skincare insights and tracking tools only. Not a substitute for professional medical advice, diagnosis, or treatment. Founded by Varneeth Varma and Sumanth.
          </div>
        </div>
      </div>
    </footer>
  );
}
