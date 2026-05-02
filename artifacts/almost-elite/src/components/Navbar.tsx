import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_BG = "#0b1a14";
const MENU_BG = "#0c1920";

const MENUS = {
  MEN: {
    featured: {
      img: "/product-polo.png",
      label: "The Range Wrangler",
      sub: "Built for golfers who treat every round like they've got something to prove.",
      href: "/men/range-wrangler",
    },
    categories: [
      { label: "Just Dropped", img: "/drop-editorial.png",  href: "/drop" },
      { label: "Polos",        img: "/product-polo.png",    href: "/men/polos" },
      { label: "Pullovers",    img: "/product-womens.png",  href: "/men/pullovers" },
      { label: "Shorts",       img: "/product-hat.png",     href: "/men/shorts" },
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
      { label: "Just Dropped", img: "/drop-editorial.png",  href: "/drop" },
      { label: "Polos",        img: "/product-womens.png",  href: "/women/polos" },
      { label: "Pullovers",    img: "/product-polo.png",    href: "/women/pullovers" },
      { label: "Skorts",       img: "/product-hat.png",     href: "/women/skorts" },
    ],
    links: ["View All Women's", "New Arrivals", "Best Sellers", "Sale"],
  },
  HATS: {
    featured: {
      img: "/scramble-specialist-hat.jpg",
      label: "Headcover Rebellion",
      sub: "Golf doesn't have a dress code anymore. This is for the bags that don't behave.",
      href: "/hats/headcover-rebellion",
    },
    categories: [
      { label: "Snapbacks", img: "/scramble-specialist-hat.jpg",  href: "/hats/snapbacks" },
      { label: "Fitted",    img: "/clubhouse-legend-hat.jpg",     href: "/hats/fitted" },
      { label: "Visors",    img: "/product-polo.png",             href: "/hats/visors" },
      { label: "Beanies",   img: "/product-womens.png",           href: "/hats/beanies" },
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
      { label: "Gloves",      img: "/product-hat.png",     href: "/accessories/gloves" },
      { label: "Towels",      img: "/product-polo.png",    href: "/accessories/towels" },
      { label: "Tees & Balls",img: "/product-womens.png",  href: "/accessories/tees" },
      { label: "Bags",        img: "/drop-editorial.png",  href: "/accessories/bags" },
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
      {/* ── PROMO BANNER ──────────────────────────────────────── */}
      <div className="bg-accent text-white text-center py-2 text-xs font-bold tracking-widest uppercase">
        Free Shipping on Orders Over $100&nbsp;&nbsp;•&nbsp;&nbsp;Municipal Legends Welcome&nbsp;&nbsp;•&nbsp;&nbsp;Play Hard. Laugh Harder.
      </div>

      {/* ── MAIN NAV ──────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-sm border-b border-white/10"
        style={{ background: `${NAV_BG}ee` }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile: hamburger + logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setMobileOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/">
              <img src="/logo-badge.png" alt="Almost Elite" className="h-10 w-10 object-contain" />
            </Link>
          </div>

          {/* Desktop: badge logo + wordmark */}
          <Link href="/" className="hidden lg:flex items-center gap-3 mr-8 group">
            <img src="/logo-badge.png" alt="Almost Elite" className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="font-display font-black italic text-2xl tracking-tighter text-white group-hover:text-accent transition-colors leading-none">
              ALMOST ELITE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1" onMouseLeave={handleLeave}>
            {(Object.keys(MENUS) as MenuKey[]).map((key) => (
              <button
                key={key}
                onMouseEnter={() => handleEnter(key)}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-colors ${
                  activeMenu === key ? "text-accent" : "text-white/80 hover:text-accent"
                }`}
              >
                {key}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === key ? "rotate-180 text-accent" : ""}`} />
              </button>
            ))}
            <Link href="/drop" className="px-4 py-2 text-sm font-bold tracking-wider uppercase text-accent hover:text-white transition-colors">
              THE DROP
            </Link>
            <Link href="/charity" className="px-4 py-2 text-sm font-bold tracking-wider uppercase text-white/80 hover:text-accent transition-colors">
              CHARITY ROUNDS
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
          </div>
        </div>

        {/* ── MEGA DROPDOWN ─────────────────────────────────────── */}
        <AnimatePresence>
          {activeMenu && menu && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full border-b-2 border-accent shadow-2xl z-40"
              style={{ background: MENU_BG }}
              onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
              onMouseLeave={handleLeave}
            >
              <div className="container mx-auto px-6 py-8 grid grid-cols-12 gap-6">

                {/* Featured — diagonal right cut */}
                <Link
                  href={menu.featured.href}
                  className="col-span-4 group relative block overflow-hidden"
                  style={{ aspectRatio: "4/3", clipPath: "polygon(0 0, 94% 0, 100% 100%, 0 100%)" }}
                  onClick={() => setActiveMenu(null)}
                >
                  <img
                    src={menu.featured.img}
                    alt={menu.featured.label}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-10 text-white">
                    <div className="w-8 h-0.5 bg-accent mb-2" />
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Featured</p>
                    <p className="font-display font-black italic text-2xl uppercase tracking-tight leading-none mb-2">
                      {menu.featured.label}
                    </p>
                    <p className="text-white/70 text-sm leading-snug">{menu.featured.sub}</p>
                  </div>
                </Link>

                {/* Category grid — parallelogram clips */}
                <div className="col-span-5 grid grid-cols-2 gap-3">
                  {menu.categories.map((cat, i) => (
                    <Link
                      key={i}
                      href={cat.href}
                      className="group relative block overflow-hidden"
                      style={{ aspectRatio: "5/4" }}
                      onClick={() => setActiveMenu(null)}
                    >
                      {/* Outer wrapper for clip */}
                      <div
                        className="w-full h-full relative overflow-hidden"
                        style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
                      >
                        <img
                          src={cat.img}
                          alt={cat.label}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                          style={{ transform: "scale(1)", transition: "transform 0.5s ease" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-colors duration-300" />
                      </div>
                      {/* Text overlay — outside clip */}
                      <div className="absolute inset-0 flex items-end p-3 pb-4 pointer-events-none">
                        <div>
                          <div className="w-5 h-0.5 bg-accent mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <p className="text-white font-display font-bold italic text-lg uppercase tracking-tight leading-none">
                            {cat.label}
                          </p>
                          <p className="text-accent text-xs mt-0.5 font-bold uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Shop <ArrowUpRight className="w-3 h-3" />
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Quick links */}
                <div className="col-span-3 pt-2 border-l border-white/10 pl-6">
                  <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-5">Quick Links</p>
                  <ul className="space-y-3.5">
                    {menu.links.map((l, i) => (
                      <li key={i}>
                        <Link
                          href="#"
                          className="font-bold text-sm uppercase tracking-wider text-white/70 hover:text-accent transition-colors flex items-center gap-2 group"
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="w-5 h-0.5 bg-accent inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 border-l-4 border-accent bg-white/[0.04]">
                    <p className="font-display font-bold italic text-lg uppercase tracking-tight text-white mb-1">Charity Rounds</p>
                    <p className="text-white/50 text-xs leading-relaxed mb-3">Custom event merch for your next charity scramble.</p>
                    <Link
                      href="/charity"
                      className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      Learn More <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── MOBILE SLIDE-OUT ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] z-50 overflow-y-auto flex flex-col lg:hidden border-r border-white/10"
              style={{ background: NAV_BG }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img src="/logo-badge.png" alt="Almost Elite" className="h-9 w-9 object-contain" />
                  <span className="font-display font-black italic text-xl tracking-tighter text-white">ALMOST ELITE</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 p-5 space-y-0.5">
                {[
                  { label: "MEN",           href: "/men" },
                  { label: "WOMEN",         href: "/women" },
                  { label: "HATS",          href: "/hats" },
                  { label: "ACCESSORIES",   href: "/accessories" },
                  { label: "THE DROP",      href: "/drop",    accent: true },
                  { label: "CHARITY ROUNDS",href: "/charity" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between py-3.5 px-2 font-bold text-base uppercase tracking-wider border-b border-white/8 transition-colors ${
                      item.accent ? "text-accent" : "text-white/80 hover:text-accent"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight className="w-4 h-4 opacity-30" />
                  </Link>
                ))}
              </nav>
              <div className="p-5 border-t border-white/10">
                <p className="text-white/30 text-xs italic">You might not be elite... But you're definitely Almost.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
