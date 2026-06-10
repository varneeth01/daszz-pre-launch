export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-black/60">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <div className="text-xl font-bold tracking-tight mb-4">DASZZ</div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Daszz provides skincare insights and tracking tools. It does not provide medical diagnosis or replace professional medical advice.
            </p>
          </div>
          <div className="flex md:justify-end items-start gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/50 border-t border-white/5 pt-8">
          <div>© 2026 Daszz. All rights reserved.</div>
          <div>Founded by Varneeth Varma and Sumanth.</div>
        </div>
      </div>
    </footer>
  );
}
