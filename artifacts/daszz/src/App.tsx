import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import SkincareIntelligence from "@/pages/SkincareIntelligence";
import DigitalSkinTwin from "@/pages/DigitalSkinTwin";
import SkinTracking from "@/pages/SkinTracking";
import PersonalizedSkincare from "@/pages/PersonalizedSkincare";
import Learn from "@/pages/Learn";
import ArticlePage from "@/pages/learn/ArticlePage";
import StructuredData from "@/components/StructuredData";
import { useEffect } from "react";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/skincare-intelligence" component={SkincareIntelligence} />
      <Route path="/digital-skin-twin" component={DigitalSkinTwin} />
      <Route path="/skin-tracking" component={SkinTracking} />
      <Route path="/personalized-skincare" component={PersonalizedSkincare} />
      <Route path="/learn" component={Learn} />
      <Route path="/learn/:slug">
        {(params) => <ArticlePage slug={params.slug ?? ""} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("bg-grain");
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StructuredData />
          <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
