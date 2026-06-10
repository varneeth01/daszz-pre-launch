import { Link } from "wouter";
import { scrollToEarlyAccess } from "@/lib/scroll-to-early-access";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          DASZZ
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <Link
            href="/learn"
            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden md:block"
          >
            Learn
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden md:block"
          >
            About
          </Link>
          <span className="text-sm font-medium text-muted-foreground hidden sm:block tracking-widest">
            12 JUNE 2026
          </span>
          <button
            onClick={scrollToEarlyAccess}
            type="button"
            aria-label="Get early access — scroll to sign-up form"
            className="text-xs font-semibold px-5 py-2.5 bg-white text-black hover:bg-white/90 active:bg-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get early access
          </button>
        </nav>
      </div>
    </header>
  );
}
