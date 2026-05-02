import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Charity from "@/pages/charity";
import ProductDetail from "@/pages/product";
import { MenPage, WomenPage, HatsPage, AccessoriesPage, DropPage } from "@/pages/shop";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/CartSidebar";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/charity" component={Charity} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/men" component={MenPage} />
      <Route path="/women" component={WomenPage} />
      <Route path="/hats" component={HatsPage} />
      <Route path="/accessories" component={AccessoriesPage} />
      <Route path="/drop" component={DropPage} />
      <Route path="/men/:sub" component={MenPage} />
      <Route path="/women/:sub" component={WomenPage} />
      <Route path="/hats/:sub" component={HatsPage} />
      <Route path="/accessories/:sub" component={AccessoriesPage} />
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
          </WouterRouter>
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
