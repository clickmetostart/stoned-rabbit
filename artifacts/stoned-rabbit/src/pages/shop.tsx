import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import GhostWord from "@/components/GhostWord";
import { ALL_PRODUCTS, Product } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

const PAGE_BG = "linear-gradient(160deg, #133732 0%, #000000 100%)";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

interface ShopConfig {
  title: string;
  eyebrow: string;
  desc: string;
  ghost: string;
  heroImg: string;
  filter: (p: Product) => boolean;
  badges?: string[];
}

function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/product/${p.slug}`}
        className="group block relative"
      >
        <div
          className="relative overflow-hidden"
          style={{
            height: "clamp(300px, 28vw, 440px)",
            clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
          }}
        >
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-400" />
          <div className="absolute bottom-0 left-0 right-0 py-3 bg-accent flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-white font-bold uppercase tracking-widest text-xs">Shop Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-white" />
          </div>
        </div>

        {p.badge && (
          <div
            className={`absolute top-3 z-10 text-xs font-bold px-2.5 py-1 uppercase tracking-wider ${
              p.badge === "NEW" || p.badge === "LIMITED" ? "bg-primary text-black" : "bg-accent text-white"
            }`}
            style={{ left: "10%" }}
          >
            {p.badge}
          </div>
        )}

        <div className="mt-4 px-1">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{p.category}</p>
          <p className="font-display font-black italic text-xl uppercase tracking-tight text-white leading-none mb-2 group-hover:text-accent transition-colors duration-200">
            {p.name}
          </p>
          <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">{p.shortDesc}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-accent font-bold text-lg">{p.price}</span>
            {p.was && <span className="text-white/30 text-sm line-through">{p.was}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ShopPage({ config }: { config: ShopConfig }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useSEO({
    title: config.title.replace(/\.$/, ""),
    description: config.desc,
    canonical: `/${config.title.toLowerCase().replace(/[^a-z]/g, "").replace("justdropped", "drop")}`,
    keywords: `stoned rabbit ${config.title.toLowerCase()}, cannabis streetwear, ${config.eyebrow.toLowerCase()}`,
  });

  const products = ALL_PRODUCTS.filter(config.filter);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const badgeFilters = ["ALL", ...(config.badges ?? [])];
  const displayed = activeFilter === "ALL"
    ? products
    : products.filter(p => p.badge?.toUpperCase().includes(activeFilter));

  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: PAGE_BG }}>
      <Navbar />
      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ minHeight: "52vh" }}>
          <div className="absolute inset-0">
            <img src={config.heroImg} alt={config.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(0,0,0,0.97) 30%, rgba(19,55,50,0.82) 65%, rgba(0,0,0,0.5) 100%)" }} />
          </div>

          <div className="relative z-10 container mx-auto px-6 lg:px-16 py-24 flex flex-col justify-end" style={{ minHeight: "52vh" }}>
            <motion.div
              initial="hidden" animate="show" variants={stagger}
              className="max-w-3xl"
            >
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-xs mb-4">
                {config.eyebrow}
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="font-display font-black italic uppercase tracking-tighter leading-none text-white mb-6"
                style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
              >
                {config.title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
                {config.desc}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── FILTERS + GRID ─────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          <GhostWord word={config.ghost} />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">

            {/* filter pills */}
            <div className="flex items-center gap-3 mb-14 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-white/30 mr-1" />
              {badgeFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`h-9 px-5 text-xs font-bold uppercase tracking-widest border transition-colors duration-200 ${
                    activeFilter === f
                      ? "bg-accent border-accent text-white"
                      : "border-white/20 text-white/55 hover:border-accent hover:text-accent"
                  }`}
                >
                  {f}
                </button>
              ))}
              <span className="ml-auto text-white/25 text-xs font-bold uppercase tracking-widest">
                {displayed.length} {displayed.length === 1 ? "item" : "items"}
              </span>
            </div>

            {displayed.length === 0 ? (
              <div className="py-24 text-center text-white/30 font-bold uppercase tracking-widest text-lg">
                No items in this filter.
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16"
              >
                {displayed.map((p, i) => (
                  <ProductCard key={p.slug} p={p} i={i} />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ── COMMUNITY BAND ────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Stoned Rabbit</p>
              <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter text-white leading-none mb-3">
                THE VAULT.
              </h2>
              <p className="text-white/45 text-sm leading-relaxed max-w-md">
                Limited runs. Archive pieces. When it's gone, it's gone — no reprints, no restocks.
              </p>
            </div>
            <Link
              href="/vault"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-white font-black italic uppercase tracking-widest px-10 h-14 text-base hover:bg-white hover:text-black transition-colors duration-200"
            >
              Enter The Vault <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-badge.png" alt="Stoned Rabbit" className="h-9 w-9 object-contain" />
            <span className="font-display font-black italic text-xl tracking-tighter text-white">STONED RABBIT</span>
          </Link>
          <p className="text-white/25 text-xs italic">Graffiti. Glass. Good vibes.</p>
        </div>
      </footer>
    </div>
  );
}

/* ── Named page exports ───────────────────────────────────────── */

export function ApparelPage() {
  return <ShopPage config={{
    title: "APPAREL",
    eyebrow: "Stoned Rabbit — Apparel",
    desc: "Graffiti-inspired tees, heavy hoodies, and streetwear built for the session and the street.",
    ghost: "STREET",
    heroImg: "/Stoned Rabbit Hero Image 1.png",
    filter: p => p.category.toLowerCase().includes("apparel") || p.category.toLowerCase().includes("shirt") || p.category.toLowerCase().includes("hoodie"),
    badges: ["NEW DROP", "BEST SELLER"],
  }} />;
}

export function HeadwearPage() {
  return <ShopPage config={{
    title: "HEADWEAR",
    eyebrow: "Stoned Rabbit — Headwear",
    desc: "Beanies, snapbacks, and buckets to keep the bright lights out.",
    ghost: "LIDS",
    heroImg: "/Stoned Rabbit Hero Image 2.jfif",
    filter: p => p.category.toLowerCase().includes("headwear") || p.category.toLowerCase().includes("hat") || p.category.toLowerCase().includes("beanie"),
    badges: ["NEW DROP", "BEST SELLER"],
  }} />;
}

export function AccessoriesPage() {
  return <ShopPage config={{
    title: "ACCESSORIES",
    eyebrow: "Stoned Rabbit — Accessories",
    desc: "Grinders, rolling trays, lighters, and everyday carry for the elevated individual.",
    ghost: "GEAR",
    heroImg: "/Stoned Rabbit Hero Image 4.png",
    filter: p => p.category.toLowerCase().includes("accessories") || p.category.toLowerCase().includes("accessory") || p.category.toLowerCase().includes("grinder"),
    badges: ["NEW", "CHARITY DROP", "BEST SELLER"],
  }} />;
}

export function GlassPage() {
  return <ShopPage config={{
    title: "GLASSWARE",
    eyebrow: "Stoned Rabbit — Glass",
    desc: "Premium bongs, pipes, and rigs for the perfect hit.",
    ghost: "GLASS",
    heroImg: "/Stoned Rabbit Hero 3.png",
    filter: p => p.category.toLowerCase().includes("glass") || p.category.toLowerCase().includes("bong"),
    badges: ["NEW DROP", "BEST SELLER"],
  }} />;
}

export function DropPage() {
  return <ShopPage config={{
    title: "JUST DROPPED.",
    eyebrow: "The Drop — What's New",
    desc: "Fresh off the rack. The latest Stoned Rabbit gear before it sells out. You snooze, you lose.",
    ghost: "DROPPED",
    heroImg: "/Stoned Rabbit Hero Image 4.png",
    filter: p => !!p.badge,
    badges: ["NEW DROP", "BEST SELLER", "NEW", "CHARITY DROP"],
  }} />;
}
