import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const MENUS = {
  MEN: {
    featured: {
      img: "/product-polo.png",
      label: "The Range Wrangler",
      sub: "Built for golfers who treat every round like they've got something to prove.",
      href: "/men/range-wrangler",
    },
    categories: [
      { label: "Just Dropped", img: "/drop-editorial.png", href: "/drop" },
      { label: "Polos", img: "/product-polo.png", href: "/men/polos" },
      { label: "Pullovers", img: "/product-womens.png", href: "/men/pullovers" },
      { label: "Shorts", img: "/product-hat.png", href: "/men/shorts" },
    ],
    links: ["View All Men's", "New Arrivals", "Best Sellers", "Sale"],
  },
  WOMEN: {
    featured: {
      img: "/product-womens.png",
      label: "The Backwoods Fade",
      sub: "Camo built for early tee times, questionable decisions, and rounds that drift off course in the best way.",
      href: "/women/backwoods-fade",
    },
    categories: [
      { label: "Just Dropped", img: "/drop-editorial.png", href: "/drop" },
      { label: "Polos", img: "/product-womens.png", href: "/women/polos" },
      { label: "Pullovers", img: "/product-polo.png", href: "/women/pullovers" },
      { label: "Skorts", img: "/product-hat.png", href: "/women/skorts" },
    ],
    links: ["View All Women's", "New Arrivals", "Best Sellers", "Sale"],
  },
  HATS: {
    featured: {
      img: "/product-hat.png",
      label: "Headcover Rebellion",
      sub: "Golf doesn't have a dress code anymore. This is for the bags that don't behave.",
      href: "/hats/headcover-rebellion",
    },
    categories: [
      { label: "Snapbacks", img: "/product-hat.png", href: "/hats/snapbacks" },
      { label: "Fitted", img: "/drop-editorial.png", href: "/hats/fitted" },
      { label: "Visors", img: "/product-polo.png", href: "/hats/visors" },
      { label: "Beanies", img: "/product-womens.png", href: "/hats/beanies" },
    ],
    links: ["View All Hats", "New Arrivals", "Limited Runs", "Sale"],
  },
  ACCESSORIES: {
    featured: {
      img: "/drop-editorial.png",
      label: "Grip It & Rip It",
      sub: "Hold it loose, swing it loud. For the ones who don't aim to be perfect — just dangerous.",
      href: "/accessories/grip-it",
    },
    categories: [
      { label: "Gloves", img: "/product-hat.png", href: "/accessories/gloves" },
      { label: "Towels", img: "/product-polo.png", href: "/accessories/towels" },
      { label: "Tees & Balls", img: "/product-womens.png", href: "/accessories/tees" },
      { label: "Bags", img: "/drop-editorial.png", href: "/accessories/bags" },
    ],
    links: ["View All Accessories", "New Arrivals", "Gift Ideas", "Sale"],
  },
};

type MenuKey = keyof typeof MENUS;

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const menu = activeMenu ? MENUS[activeMenu] : null;

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs font-bold tracking-widest uppercase">
        Free Shipping on Orders Over $100&nbsp;&nbsp;•&nbsp;&nbsp;Municipal Legends Welcome&nbsp;&nbsp;•&nbsp;&nbsp;Play Hard. Laugh Harder.
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 w-full bg-background/98 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile: hamburger + wordmark */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/" className="font-display font-black italic text-2xl tracking-tighter">
              ALMOST ELITE
            </Link>
          </div>

          {/* Desktop: wordmark */}
          <Link href="/" className="hidden lg:block font-display font-black italic text-3xl tracking-tighter mr-8 hover:text-primary transition-colors">
            ALMOST ELITE
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1" onMouseLeave={handleLeave}>
            {(Object.keys(MENUS) as MenuKey[]).map((key) => (
              <button
                key={key}
                onMouseEnter={() => handleEnter(key)}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-colors ${
                  activeMenu === key ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {key} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === key ? "rotate-180" : ""}`} />
              </button>
            ))}
            <Link
              href="/drop"
              className="px-4 py-2 text-sm font-bold tracking-wider uppercase text-accent hover:text-accent/80 transition-colors"
            >
              THE DROP
            </Link>
            <Link
              href="/charity"
              className="px-4 py-2 text-sm font-bold tracking-wider uppercase hover:text-primary transition-colors"
            >
              CHARITY ROUNDS
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden sm:flex"><Search className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex"><User className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><ShoppingCart className="h-5 w-5" /></Button>
          </div>
        </div>

        {/* Mega dropdown */}
        <AnimatePresence>
          {activeMenu && menu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full bg-background border-b-2 border-primary shadow-2xl z-40"
              onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
              onMouseLeave={handleLeave}
            >
              <div className="container mx-auto px-6 py-8 grid grid-cols-12 gap-8">

                {/* Featured image panel */}
                <Link
                  href={menu.featured.href}
                  className="col-span-4 group relative overflow-hidden block"
                  style={{ aspectRatio: "4/3" }}
                  onClick={() => setActiveMenu(null)}
                >
                  <img
                    src={menu.featured.img}
                    alt={menu.featured.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Featured</p>
                    <p className="font-display font-black italic text-2xl uppercase tracking-tight leading-none mb-2">
                      {menu.featured.label}
                    </p>
                    <p className="text-white/75 text-sm leading-snug">{menu.featured.sub}</p>
                  </div>
                </Link>

                {/* Category grid */}
                <div className="col-span-5 grid grid-cols-2 gap-4">
                  {menu.categories.map((cat, i) => (
                    <Link
                      key={i}
                      href={cat.href}
                      className="group block relative overflow-hidden"
                      style={{ aspectRatio: "5/4" }}
                      onClick={() => setActiveMenu(null)}
                    >
                      <img
                        src={cat.img}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute inset-0 flex items-end p-3">
                        <div>
                          <p className="text-white font-display font-bold italic text-lg uppercase tracking-tight leading-none">
                            {cat.label}
                          </p>
                          <p className="text-white/70 text-xs mt-0.5 font-bold uppercase tracking-wider group-hover:text-accent transition-colors">
                            Shop Now →
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Quick links column */}
                <div className="col-span-3 pt-2 border-l border-border pl-8">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-4">Quick Links</p>
                  <ul className="space-y-3">
                    {menu.links.map((l, i) => (
                      <li key={i}>
                        <Link
                          href="#"
                          className="font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-2 group"
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="w-4 h-0.5 bg-accent inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 bg-primary text-primary-foreground">
                    <p className="font-display font-bold italic text-lg uppercase tracking-tight mb-1">Charity Rounds</p>
                    <p className="text-primary-foreground/75 text-xs leading-relaxed mb-3">Partner with us to create custom event merch for your next charity scramble.</p>
                    <Link
                      href="/charity"
                      className="text-accent text-xs font-bold uppercase tracking-wider hover:underline"
                      onClick={() => setActiveMenu(null)}
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile slide-out */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-background z-50 overflow-y-auto flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="font-display font-black italic text-2xl tracking-tighter">ALMOST ELITE</span>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 p-5 space-y-1">
                {[
                  { label: "MEN", href: "/men" },
                  { label: "WOMEN", href: "/women" },
                  { label: "HATS", href: "/hats" },
                  { label: "ACCESSORIES", href: "/accessories" },
                  { label: "THE DROP", href: "/drop", accent: true },
                  { label: "CHARITY ROUNDS", href: "/charity" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-3 px-2 font-bold text-lg uppercase tracking-wider border-b border-border/40 ${item.accent ? "text-accent" : "hover:text-primary"} transition-colors`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-5 border-t border-border">
                <p className="text-muted-foreground text-xs">You might not be elite... But you're definitely Almost.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
