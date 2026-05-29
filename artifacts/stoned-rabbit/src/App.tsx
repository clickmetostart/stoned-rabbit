import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Community from "@/pages/community";
import ProductDetail from "@/pages/product";
import { ApparelPage, HeadwearPage, AccessoriesPage, GlassPage, DropPage } from "@/pages/shop";
import CrewWall from "@/pages/crew-wall";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/CartSidebar";
import { RewardsBanner } from "@/components/RewardsBanner";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/community" component={Community} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/apparel" component={ApparelPage} />
      <Route path="/headwear" component={HeadwearPage} />
      <Route path="/accessories" component={AccessoriesPage} />
      <Route path="/glass" component={GlassPage} />
      <Route path="/drop" component={DropPage} />
      <Route path="/apparel/:sub" component={ApparelPage} />
      <Route path="/headwear/:sub" component={HeadwearPage} />
      <Route path="/accessories/:sub" component={AccessoriesPage} />
      <Route path="/glass/:sub" component={GlassPage} />
      <Route path="/the-warren" component={CrewWall} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <CartSidebar />
            <RewardsBanner />
          </WouterRouter>
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
