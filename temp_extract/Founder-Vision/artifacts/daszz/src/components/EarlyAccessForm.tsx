import { useState } from "react";
import { submitEarlyAccessLead } from "@/lib/early-access";

export default function EarlyAccessForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    
    try {
      await submitEarlyAccessLead(name, email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="early-access" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure your access</h2>
          <p className="text-muted-foreground">Join the waitlist for the private reveal.</p>
        </div>

        {status === "success" ? (
          <div className="p-8 border border-white/10 bg-white/5 text-center">
            <h3 className="text-xl font-semibold mb-2">You're on the list</h3>
            <p className="text-muted-foreground">We'll be in touch soon with your exclusive access link.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                <input 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full h-12 bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full h-12 bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full h-14 bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Processing..." : "Join the reveal"}
            </button>
            
            {status === "error" && (
              <p className="text-destructive text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
