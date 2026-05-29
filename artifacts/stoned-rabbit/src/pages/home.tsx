import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ArrowRight, ChevronLeft, ChevronRight, Heart, Shirt, Zap, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import GhostWord from "@/components/GhostWord";
import { RegisterModal } from "@/components/RegisterModal";
import { ContactModal } from "@/components/ContactModal";
import { ALL_PRODUCTS } from "@/data/products";

const PAGE_BG = "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)";

/* ── animated countup ─────────────────────────────────────────── */
function CountUp({ to, prefix = "", suffix = "", duration = 2200 }: {
  to: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(to);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  const display = to >= 1000 ? `${Math.floor(count / 1000)}K` : `${count}`;

  return (
    <span ref={ref} className="font-display font-black italic text-5xl md:text-7xl text-accent leading-none tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

function AccentLine({ className = "" }: { className?: string }) {
  return <div className={`h-1 bg-accent ${className}`} />;
}

/* ── product data ─────────────────────────────────────────────── */
const PRODUCTS_DROPPED = [...ALL_PRODUCTS, ...ALL_PRODUCTS.map(p => ({ ...p, slug: p.slug + "-b" })), ...ALL_PRODUCTS.map(p => ({ ...p, slug: p.slug + "-c" }))];
const PRODUCTS_COLLECTION = [...ALL_PRODUCTS.slice().reverse(), ...ALL_PRODUCTS.slice().reverse().map(p => ({ ...p, slug: p.slug + "-b" }))];

/* ── SKEWED product row ───────────────────────────────────────── */
function SkewedProductRow({
  products,
  title,
  href,
  watermark,
  ghostSubtitle,
}: {
  products: typeof PRODUCTS_DROPPED;
  title: string;
  href: string;
  watermark: string;
  ghostSubtitle?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (d: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = 400;
    if (d === "right") {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - step;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    } else {
      const atStart = el.scrollLeft <= step;
      if (atStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -step, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <GhostWord word={watermark} />

      {/* Ghost word behind section title — large, same opacity as section ghosts */}
      {ghostSubtitle && (
        <div className="absolute inset-x-0 top-6 pointer-events-none select-none overflow-hidden z-0">
          <span
            className="font-display font-black italic uppercase text-white leading-none block pl-6 lg:pl-16"
            style={{
              fontSize: "clamp(6rem, 22vw, 22rem)",
              opacity: 0.032,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {ghostSubtitle}
          </span>
        </div>
      )}

      <div className="relative z-10">
        <div className="px-6 lg:px-16 mb-2">
          <AccentLine className="w-16 mb-5" />
        </div>
        <div className="px-6 lg:px-16 flex items-end justify-between">
          <a
            href={href}
            className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter text-white hover:text-accent transition-colors leading-none"
          >
            {title}
          </a>
          <div className="flex gap-2">
            {(["left", "right"] as const).map((d) => (
              <button
                key={d}
                onClick={() => scroll(d)}
                className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-accent hover:text-accent transition-colors"
              >
                {d === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>


        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto scrollbar-hide px-6 lg:px-16 pb-6 mt-8"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {products.map((p, i) => (
            <Link
              key={i}
              href={`/product/${p.slug}`}
              className="group flex-shrink-0 relative"
              style={{ scrollSnapAlign: "start", width: "clamp(260px, 22vw, 360px)" }}
            >
              {/* Diagonal image */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: "clamp(340px, 28vw, 480px)",
                  clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transform: "scale(1.08) skewX(0deg)" }}
                />
                {/* Hover orange wash */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-400" />
                {/* Bottom "Shop Now" slide-up */}
                <div className="absolute bottom-0 left-0 right-0 py-3 bg-accent flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Shop Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-white" />
                </div>
              </div>

              {/* Badge — sits above image, offset so it lands inside the clip area */}
              {p.badge && (
                <div className="absolute top-3 z-10 bg-accent text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider" style={{ left: "12%" }}>
                  {p.badge}
                </div>
              )}

              {/* Top-right corner accent (visible — parallelogram keeps top-right corner) */}
              <div className="absolute top-0 right-0 w-0.5 h-12 bg-accent opacity-80 pointer-events-none" />
              <div className="absolute top-0 right-0 w-10 h-0.5 bg-accent opacity-80 pointer-events-none" />

              {/* Product info */}
              <div className="mt-3 px-[9%]">
                <p className="font-bold text-base text-white leading-tight group-hover:text-accent transition-colors">{p.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-white">{p.price}</span>
                  {p.was && (
                    <>
                      <span className="text-white/35 line-through text-sm">{p.was}</span>
                      <span className="text-accent text-xs font-bold">
                        Save ${parseInt(p.was.replace("$", "")) - parseInt(p.price.replace("$", ""))}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── collab brands ────────────────────────────────────────────── */
const COLLAB_BRANDS = [
  { name: "RAW PAPERS",     tag: "Natural unrefined rolling papers", accent: "#d4af37", bg: "#1a120b", img: "/classic-vibe-drinks.jpg" },
  { name: "COOKIES",        tag: "Bay Area Flavor. Street Legend.",  accent: "#00aef0", bg: "#0a1520", img: "/product-polo.png" },
  { name: "ZIG-ZAG",        tag: "The Classic Slow Burn Since 1879.",accent: "#df7b29", bg: "#1a100a", img: "/product-hat.png" },
  { name: "GRAV LABS",      tag: "Scientific Glass. High Art.",      accent: "#e5e5e5", bg: "#0e1217", img: "/graffiti_bong.png" },
  { name: "SANTA CRUZ SHREDDER", tag: "Medical Grade. Perfect Shred.",accent: "#5a8c3c", bg: "#0c140a", img: "/street_grinder.png" },
  { name: "BOVEDA",         tag: "Perfect Humidity. Fresh Sessions.", accent: "#7b583a", bg: "#14100c", img: "/classic_stash_jar.png" },
];

function CollabBrands() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: "left" | "right") =>
    ref.current?.scrollBy({ left: d === "right" ? 370 : -370, behavior: "smooth" });

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute -top-16 right-6 lg:right-16 pointer-events-none select-none z-0 overflow-hidden leading-none">
        <span className="font-display font-black italic uppercase text-white" style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.032 }}>STREET</span>
      </div>
      <div className="relative z-10">
        <div className="px-6 lg:px-16 mb-2"><AccentLine className="w-16 mb-5" /></div>
        <div className="px-6 lg:px-16 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Limited Collab Drops</p>
            <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none text-white">
              STREET COLLABS.<br /><span className="text-accent">SESSION READY.</span>
            </h2>
            <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
              From premium papers to scientific glass, we partner with the brands that define the culture. Limited gear, custom drops, and session essentials.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            {(["left", "right"] as const).map((d) => (
              <button key={d} onClick={() => scroll(d)} className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-accent hover:text-accent transition-colors">
                {d === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>
        <div ref={ref} className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-16 pb-4" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {COLLAB_BRANDS.map((brand, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="group flex-shrink-0 w-[300px] md:w-[340px] cursor-pointer" style={{ scrollSnapAlign: "start" }}>
              <div className="relative overflow-hidden flex flex-col" style={{ height: "420px", background: brand.bg, clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}>
                <div className="h-1.5 w-full" style={{ background: brand.accent }} />
                <div className="px-6 pt-5 pb-3 z-10 relative">
                  <p className="font-display font-black italic text-3xl uppercase tracking-tighter text-white leading-none">{brand.name}</p>
                  <p className="text-white/50 text-xs mt-1 font-medium uppercase tracking-widest">{brand.tag}</p>
                </div>
                <div className="flex-1 relative overflow-hidden mx-6">
                  <img src={brand.img} alt={brand.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-6 py-5 flex items-center justify-between border-t z-10" style={{ borderColor: `${brand.accent}30` }}>
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Shop the Collab</span>
                  <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: brand.accent }}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: brand.accent }} />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1" style={{ color: brand.accent, border: `1px solid ${brand.accent}40`, background: `${brand.accent}10` }}>Limited Drop</span>
                <span className="text-white/30 text-xs uppercase tracking-wider">x Stoned Rabbit</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── shop by category ─────────────────────────────────────────── */
const SHOP_CATEGORIES = [
  { label: "APPAREL",     sub: "Streetwear with Attitude",             img: "/acid_wash_hoodie.png",    href: "/apparel" },
  { label: "HEADWEAR",    sub: "Bold Beanies & Structured Snapbacks",  img: "/rabbit_hole_beanie.png",  href: "/headwear" },
  { label: "ACCESSORIES", sub: "Premium Grinders & Stash Jars",        img: "/street_grinder.png",      href: "/accessories" },
  { label: "GLASSWARE",   sub: "Artisan Glass & Smoking Rigs",         img: "/graffiti_bong.png",       href: "/glass" },
];

const SKEW = -9;

function ShopByCategory() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-16 overflow-hidden">
      {/* Header */}
      <div className="px-6 lg:px-16 mb-2">
        <AccentLine className="w-16 mb-5" />
      </div>
      <div className="px-6 lg:px-16 mb-8 flex items-end justify-between">
        <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter text-white leading-none">
          SHOP BY CATEGORY
        </h2>
      </div>

      {/* Skewed floating panels */}
      <div className="px-6 lg:px-16">
      <div
        className="flex gap-0.5 bg-accent"
        style={{ height: "72vh" }}
      >
        {SHOP_CATEGORIES.map((cat, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-pointer"
            style={{
              flex: active === i ? "4 0 0%" : "1 0 0%",
              transform: `skewX(${SKEW}deg)`,
              transition: "flex 0.55s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(0)}
          >
            {/* Image — counter-skewed & wider to fill diagonal gaps */}
            <div
              className="absolute inset-0"
              style={{
                transform: `skewX(${-SKEW}deg)`,
                left: "-12%",
                right: "-12%",
                width: "124%",
              }}
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: active === i ? "scale(1.06)" : "scale(1)" }}
              />
            </div>

            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: active === i
                  ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.3) 100%)",
              }}
            />

            {/* Orange top accent bar — visible on active */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-accent transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0 }}
            />

            {/* Collapsed: vertical label */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10"
              style={{ opacity: active === i ? 0 : 1 }}
            >
              <span
                className="font-display font-black italic text-white text-3xl uppercase tracking-widest select-none"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {cat.label}
              </span>
            </div>

            {/* Ghost watermark — bleeds from bottom-right on hover */}
            <div
              className="absolute bottom-0 right-[-5%] pointer-events-none select-none z-[2]"
              style={{
                opacity: active === i ? 1 : 0,
                transition: "opacity 0.55s ease",
              }}
            >
              <span
                className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap block"
                style={{
                  fontSize: "clamp(4rem, 11vw, 13rem)",
                  opacity: 0.12,
                  transform: `skewX(${-SKEW}deg)`,
                  transformOrigin: "bottom right",
                }}
              >
                {cat.label}
              </span>
            </div>

            {/* Expanded: full content — counter-skewed */}
            <div
              className="absolute inset-0 flex flex-col justify-between z-10"
              style={{
                transform: `skewX(${-SKEW}deg)`,
                left: "-8%",
                right: "-8%",
                width: "116%",
                padding: "2rem 22% 2.5rem 18%",
                opacity: active === i ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <div>
                <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">
                  Stoned Rabbit
                </p>
                <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter text-white leading-none mb-3">
                  {cat.label}
                </h2>
                <div className="w-12 h-1 bg-accent mb-3" />
                <p className="text-white/75 text-sm font-medium leading-snug max-w-[180px]">
                  {cat.sub}
                </p>
              </div>
              <a
                href={cat.href}
                className="inline-block bg-accent text-white font-bold uppercase tracking-widest text-xs px-5 py-2.5 w-fit hover:bg-white hover:text-black transition-colors duration-200"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: PAGE_BG }}>
      <Navbar />
      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative h-[92vh] w-full flex items-end justify-center overflow-hidden pb-16">
          <div className="absolute inset-0 z-0">
            <img src="/lifestyle-celebrating.jpg" alt="Stoned Rabbit crew" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto">
              <motion.h1 variants={fadeInUp} className="font-display font-black italic text-7xl md:text-[10rem] uppercase leading-[0.82] tracking-tighter mb-4">
                STONED RABBIT.
              </motion.h1>
              <motion.h1 variants={fadeInUp} className="font-display font-black italic text-7xl md:text-[10rem] uppercase leading-[0.82] tracking-tighter mb-8 text-accent">
                TOTALLY WORTH IT.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
                Graffiti-inspired gear. Street-approved attitude.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-accent hover:bg-white hover:text-black text-white font-bold tracking-wider rounded-none h-14 px-12 text-base uppercase transition-colors">
                  Shop The Drop
                </Button>
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white hover:text-black rounded-none h-14 px-12 text-base uppercase font-bold bg-transparent transition-colors">
                  Find Out More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── MARQUEE ───────────────────────────────────────────── */}
        <div className="bg-accent overflow-hidden py-5">
          <div className="whitespace-nowrap flex font-display font-black italic text-3xl md:text-4xl tracking-widest uppercase">
            <motion.div className="flex gap-10 items-center" animate={{ x: [0, -1800] }} transition={{ repeat: Infinity, ease: "linear", duration: 18 }}>
              {["STONED RABBIT","•","GRAFFITI. GLASS. GOOD VIBES.","•","THE WARREN > THE SCORE","•","STAY LIFTED. STAY GROUNDED.","•","NOT FOR EVERYONE. FOR US.","•","STONED RABBIT","•","GRAFFITI. GLASS. GOOD VIBES.","•","THE WARREN > THE SCORE","•"].map((t, i) => (
                <span key={i} className="text-white">{t}</span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── JUST DROPPED — skewed images ──────────────────────── */}
        <SkewedProductRow products={PRODUCTS_DROPPED} title="JUST DROPPED" href="/drop" watermark="DROP" ghostSubtitle="FRESH" />

        {/* ── ON COURSE / IN THE BAG ────────────────────────────── */}
        <section className="relative py-16 overflow-hidden">
          <div className="relative z-10 px-6 lg:px-16 flex flex-col md:flex-row gap-4" style={{ minHeight: "80vh" }}>
            {[
              {
                title: "On the Street",
                sub: "What you wear when you're actually out there.",
                cta: "Shop Apparel",
                img: "/acid_wash_hoodie.png",
                href: "/apparel",
                ghost: "STREET",
                align: "items-end",
                clip: "polygon(0 0, 100% 0, 96% 100%, 0 100%)",
              },
              {
                title: "In the Stash",
                sub: "Headwear, grinders, and gear from the shop to the session.",
                cta: "Shop Essentials",
                img: "/rabbit_hole_beanie.png",
                href: "/accessories",
                ghost: "STASH",
                align: "items-end",
                clip: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)",
              },
            ].map((panel, i) => (
              <Link
                key={i}
                href={panel.href}
                className="group relative overflow-hidden flex-1 flex flex-col justify-end cursor-pointer"
                style={{ minHeight: "72vh", clipPath: panel.clip }}
              >
                {/* Photo */}
                <div className="absolute inset-0">
                  <img
                    src={panel.img}
                    alt={panel.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/10" />
                </div>

                {/* Ghost watermark */}
                <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden leading-none z-[1]">
                  <span
                    className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap"
                    style={{ fontSize: "clamp(5rem, 16vw, 16rem)", opacity: 0.07 }}
                  >
                    {panel.ghost}
                  </span>
                </div>

                {/* Orange top accent bar on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 bg-accent transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
                />

                {/* Content */}
                <div className="relative z-10 p-10 pb-12">
                  <div className="w-10 h-1 bg-accent mb-5 transition-all duration-500 group-hover:w-24" />
                  <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Stoned Rabbit</p>
                  <h2 className="font-display font-black italic text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-4 text-white">
                    {panel.title}
                  </h2>
                  <p className="text-white/60 mb-8 text-base max-w-sm leading-relaxed">{panel.sub}</p>
                  <span className="inline-block bg-accent text-white font-black italic uppercase tracking-widest text-sm px-8 py-3.5 group-hover:bg-white group-hover:text-black transition-colors duration-200">
                    {panel.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── COLLAB BRANDS ─────────────────────────────────────── */}
        <CollabBrands />

        {/* ── THE WARREN ─────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <GhostWord word="THE WARREN" />

          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <AccentLine className="w-16 mb-6" />
                <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">For the Night Owls</motion.p>
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-8">
                  THE WARREN<br />WELCOMES<br />YOU.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/65 text-lg leading-relaxed mb-4">
                  Not everyone fits in the mainstream. Most of us thrive where the lights are neon, the music is loud, and the session is just getting started.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/65 text-lg leading-relaxed mb-10">
                  And that's exactly where the best stories happen. Stoned Rabbit is built for the crew that shows up night after night — chasing better vibes, better art, and better connections.
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Button size="lg" className="bg-accent hover:bg-white hover:text-black text-white font-bold tracking-wider rounded-none h-14 px-12 text-base uppercase transition-colors">
                    Enter The Warren
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative" style={{ height: "560px" }}>
                <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)" }}>
                  <img src="/drop-editorial.png" alt="Streetwear model" className="w-full h-full object-cover object-center" />
                </div>
                <div className="absolute bottom-0 left-0 w-1 h-24 bg-accent" />
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-accent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────── */}
        <div className="relative py-2 overflow-hidden">
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-3">
              {[
                { to: 10000, prefix: "",  suffix: "+", label: "Stoned Rabbits",  delay: 0 },
                { to: 47,    prefix: "",  suffix: "",  label: "Cities Represented", delay: 200 },
                { to: 250,   prefix: "$", suffix: "K+",label: "Expungement Funds", delay: 400 },
              ].map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  className="text-center py-10 px-4">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} duration={2200} />
                  <p className="text-white/45 uppercase tracking-widest text-xs mt-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LOYALTY ghost — bridges stats → pillars ───────────── */}
        <div className="relative h-0 overflow-visible pointer-events-none select-none" style={{ zIndex: 0 }}>
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black italic uppercase text-white leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.032 }}>LOYALTY</span>
        </div>

        {/* ── BRAND PILLARS ─────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="mb-12">
              <AccentLine className="w-16 mb-5" />
              <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter text-white">
                WHAT WE'RE ABOUT.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {[
                { icon: <Shirt className="w-6 h-6" />, title: "The Look",   body: "Intentional design. Quiet personality. Gear crafted to stand apart without trying too hard." },
                { icon: <Zap   className="w-6 h-6" />, title: "The Feel",   body: "Soft enough for lounging. Built enough for playing. Performance without feeling like performance wear." },
                { icon: <Heart className="w-6 h-6" />, title: "The Energy", body: "We don't just make polos, we make statements. Show up confident, comfortable, and unapologetically yourself." },
              ].map((p, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative">
                  <span className="absolute -top-6 -left-2 font-display font-black italic text-[9rem] text-white/[0.04] leading-none select-none pointer-events-none">
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <div className="text-accent mb-4">{p.icon}</div>
                    <AccentLine className="w-10 mb-5" />
                    <h3 className="font-display font-bold italic text-2xl uppercase tracking-wide mb-3 text-white">{p.title}</h3>
                    <p className="text-white/50 leading-relaxed">{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOP THE COLLECTION — skewed ──────────────────────── */}
        <SkewedProductRow products={PRODUCTS_COLLECTION} title="SHOP THE COLLECTION" href="/apparel" watermark="COLLECTION" ghostSubtitle="SIGNATURE" />

        {/* ── SHOP BY CATEGORY ──────────────────────────────────── */}
        <ShopByCategory />

        {/* ── BRAND STORY ───────────────────────────────────────── */}
        <section className="relative py-28 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/hero.png" alt="For those who appreciate the culture" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
          </div>
          {/* Watermark overlaid on photo — bottom right */}
          <div className="absolute bottom-0 right-0 z-[1] overflow-hidden pointer-events-none select-none leading-none">
            <span className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap" style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.055 }}>
              RABBIT
            </span>
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="max-w-3xl">
              <AccentLine className="w-16 mb-6" />
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Built for the Nights That Matter Most</motion.p>
              <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8">
                FOR THOSE WHO APPRECIATE THE ART — AND THE CULTURE.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/80 leading-relaxed max-w-2xl mb-6">
                This isn't gear for corporate boardrooms and country clubs. It's for late nights, underground shows, weekend sessions, and the hangout that somehow turns into a core memory.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-display font-black italic text-3xl uppercase tracking-wide text-accent">
                You might not be famous... But you're definitely a legend in The Warren.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── COMMUNITY INITIATIVE ────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <GhostWord word="COMMUNITY" className="justify-end" />

          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Diagonal photo left */}
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative" style={{ height: "580px" }}>
                <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "polygon(0 0, 92% 0, 100% 100%, 0 100%)" }}>
                  <img src="/charity-outing-1.jpg" alt="Community support" className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute top-0 right-0 w-1 h-20 bg-accent" />
                <div className="absolute top-0 right-0 w-20 h-1 bg-accent" />
                <div className="absolute bottom-8 right-4 bg-accent px-4 py-3 z-10">
                  <p className="font-display font-black italic text-white text-sm uppercase tracking-wider leading-none">Expungement</p>
                  <p className="font-display font-black italic text-white text-sm uppercase tracking-wider leading-none">Support</p>
                  <p className="text-white/80 text-xs uppercase tracking-widest mt-1">Community Fund</p>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <AccentLine className="w-16 mb-6" />
                <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Stoned Rabbit Community Fund</motion.p>
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-6">
                  BECAUSE THE CULTURE DESERVES MORE THAN JUST MERCH.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/60 text-lg leading-relaxed mb-5">
                  We believe in giving back to the community that inspired us. The war on drugs disproportionately affected our neighborhoods, and it's time to help make it right.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/60 text-lg leading-relaxed mb-8">
                  We partner with expungement nonprofits to dedicate a portion of every drop toward clearing records and giving people their lives back.
                </motion.p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { step: "01", label: "Buy Gear",       desc: "A portion of every sale goes to the fund." },
                    { step: "02", label: "Fund Legal Teams",  desc: "We sponsor pro-bono lawyers for expungement." },
                    { step: "03", label: "Clear Records",        desc: "Helping individuals get a clean slate." },
                    { step: "04", label: "Wear the Story",        desc: "You represent a movement, not just a brand." },
                  ].map((s, i) => (
                    <motion.div key={i} variants={fadeInUp} className="p-4 border-l-2 border-accent/40 bg-white/[0.03]">
                      <p className="text-accent font-bold text-xs tracking-widest mb-1">{s.step}</p>
                      <p className="font-bold uppercase text-sm mb-1 text-white">{s.label}</p>
                      <p className="text-white/45 text-xs leading-relaxed">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div variants={fadeInUp}>
                  <Link href="/community">
                    <Button size="lg" className="bg-accent hover:bg-white hover:text-black text-white font-bold tracking-wider rounded-none h-14 px-12 text-base uppercase transition-colors">
                      Learn About The Fund <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FEATURED CHARITY EVENT ────────────────────────────── */}
        <section className="relative py-24 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/charity-outing-2.jpg" alt="Community Outing" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/65" />
          </div>
          {/* Watermark — JOIN bleeds from center-right */}
          <div className="absolute inset-0 z-[1] flex items-center overflow-hidden pointer-events-none select-none">
            <span className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap" style={{ fontSize: "clamp(6rem, 18vw, 18rem)", opacity: 0.06, marginLeft: "22%" }}>
              JOIN
            </span>
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <AccentLine className="w-20 mx-auto mb-6" />
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Featured Initiative — Project Clean Slate</p>
              <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6">
                FIGHTING<br />FOR FAIRNESS.
              </h2>
              <p className="text-white/55 text-base mb-3 tracking-wider uppercase font-semibold">Ongoing — Nationwide</p>
              <p className="text-white/75 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                A nationwide push to fund legal representation for those with non-violent cannabis convictions. Stoned Rabbit brings a limited-edition{" "}
                <span className="text-accent font-bold">Freedom Tag</span> drop to life — designed with purpose, worn with pride.
              </p>
              <p className="text-white/45 text-sm mb-10">
                Supporting <span className="text-white font-bold">The Last Prisoner Project</span>
              </p>
              <Button
                size="lg"
                onClick={() => setRegisterOpen(true)}
                className="bg-accent hover:bg-white hover:text-black text-white font-black italic tracking-wider rounded-none h-14 px-14 text-base uppercase transition-colors"
              >
                Claim Your Freedom Tag
              </Button>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ──────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <GhostWord word="STONED RABBIT" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="mb-14">
              <AccentLine className="w-16 mb-5" />
              <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter text-white">
                WORD ON<br />THE STREET.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "The quality of the hoodie is insane. Thick, heavy, and the embroidery pops perfectly.", author: "Mike T.", handicap: "Verified Buyer" },
                { quote: "Finally, a brand that actually represents the culture without feeling cheesy.", author: "Sarah J.", handicap: "Day One" },
                { quote: "The stash jar works perfectly. And the grinder? Smoothest I've ever owned.", author: "Dave R.", handicap: "Collector" },
              ].map((r, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                  className="relative p-8 border-l-4 border-accent bg-white/[0.04] border-t border-r border-b border-white/10">
                  <div className="flex text-accent mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lg italic mb-6 text-white/80">"{r.quote}"</p>
                  <p className="font-bold uppercase tracking-wider text-sm text-white">{r.author}</p>
                  <p className="text-xs text-white/35 mt-0.5">{r.handicap}</p>
                  <div className="absolute top-4 right-6 font-display italic text-8xl text-white/[0.04] leading-none select-none">"</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM GRID ────────────────────────────────────── */}
        <section className="pb-0">
          <div className="container mx-auto px-6 lg:px-16 py-12">
            <AccentLine className="w-16 mb-5" />
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display font-black italic text-4xl uppercase tracking-tighter text-white">FOLLOW THE CREW</h2>
              <a href="https://instagram.com/stonedrabbit" target="_blank" rel="noreferrer" className="text-accent font-bold hover:underline tracking-widest uppercase text-sm">@STONEDRABBIT</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
            {["/lifestyle-thumbsup.jpg","/insta-1.png","/clubhouse-legend-hat.jpg","/classic-vibe-drinks.jpg","/insta-3.png","/lifestyle-celebrating.jpg"].map((img, i) => (
              <a key={i} href="#" className="relative aspect-square group block overflow-hidden">
                <img src={img} alt={`Crew post ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent/85 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase text-xs border-b border-white/50 pb-0.5">View Post</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── JOIN THE CREW + REWARDS ───────────────────────────── */}
        <section className="relative text-white overflow-hidden">
          {/* Full-bleed background */}
          <div className="absolute inset-0 z-0">
            <img src="/classic-vibe-drinks.jpg" alt="Join the Stoned Rabbit crew" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/95" />
          </div>

          {/* Ghost word */}
          <div className="absolute inset-0 z-[1] flex items-center overflow-hidden pointer-events-none select-none">
            <span className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.045, letterSpacing: "-0.04em" }}>
              CREW
            </span>
          </div>

          <div className="relative z-10 container mx-auto px-4 max-w-6xl py-24">

            {/* Header */}
            <div className="text-center mb-16">
              <AccentLine className="w-20 mx-auto mb-6" />
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">10,000+ Legends Already In</p>
              <h2 className="font-display font-black italic text-6xl md:text-8xl uppercase tracking-tighter mb-5">JOIN THE WARREN</h2>
              <p className="text-lg text-white/55 max-w-2xl mx-auto">
                Sign up. Earn points. Unlock perks. Every dollar you spend moves you closer to the inner circle.
              </p>
            </div>

            {/* Tier cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16" style={{ background: "rgba(255,255,255,0.06)" }}>
              {[
                {
                  name: "The Looker",
                  range: "0 – 499 pts",
                  color: "#94a3b8",
                  icon: "👀",
                  tagline: "Welcome to the crew.",
                  perks: [
                    "Early access to new drops",
                    "5% member discount",
                    "Monthly newsletter",
                    "Community updates",
                  ],
                },
                {
                  name: "The Regular",
                  range: "500 – 999 pts",
                  color: "hsl(32 90% 55%)",
                  icon: "🔥",
                  tagline: "Now we're talking.",
                  featured: true,
                  perks: [
                    "10% member discount",
                    "Free standard shipping",
                    "VIP drop access",
                    "Priority restock alerts",
                  ],
                },
                {
                  name: "The Legend",
                  range: "1,000+ pts",
                  color: "#facc15",
                  icon: "👑",
                  tagline: "Inner circle status.",
                  perks: [
                    "15% member discount",
                    "Free express shipping",
                    "Exclusive drops — never public",
                    "1 free accessory per season",
                    "Featured in The Warren",
                  ],
                },
              ].map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative p-8 flex flex-col"
                  style={{
                    background: tier.featured
                      ? `linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)`
                      : "rgba(0,0,0,0.35)",
                    borderTop: `2px solid ${tier.color}`,
                  }}
                >
                  {tier.featured && (
                    <div
                      className="absolute top-0 right-6 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest px-3 py-1"
                      style={{ background: tier.color, color: "#0b1a14" }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="text-3xl mb-4">{tier.icon}</div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <h3
                      className="font-display font-black italic text-2xl uppercase tracking-tighter leading-none"
                      style={{ color: tier.color }}
                    >
                      {tier.name}
                    </h3>
                  </div>
                  <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest mb-2">{tier.range}</p>
                  <p className="text-white/50 text-sm italic mb-6">{tier.tagline}</p>

                  <ul className="space-y-3 flex-1">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                        <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* Points bar decoration */}
                  <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${tier.color}60, transparent)` }} />
                  <p className="mt-3 text-white/20 text-[10px] uppercase tracking-widest">
                    $1 spent = 1 pt
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Email signup */}
            <div className="max-w-md mx-auto text-center">
              <p className="text-white/40 text-sm mb-4">Join free. Start earning from your first purchase.</p>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="h-14 rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/35 focus-visible:ring-accent focus-visible:border-accent"
                  required
                />
                <Button
                  type="submit"
                  className="h-14 px-8 rounded-none bg-accent hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider shrink-0 transition-colors"
                >
                  Join Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-white/20 text-xs mt-4 italic">
                No spam. Only drops, perks, and the occasional graffiti piece.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="pt-20 pb-10 border-t border-white/10" style={{ background: PAGE_BG }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Logo column */}
            <div className="md:col-span-1 flex flex-col items-start">
              <img src="/logo-badge.png" alt="Stoned Rabbit" className="h-32 w-32 object-contain mb-4" />
              <AccentLine className="w-12 mb-4" />
              <p className="text-white/40 max-w-xs text-sm leading-relaxed mb-2">
                Graffiti-inspired gear. Street-approved attitude. For those who appreciate the art and the culture.
              </p>
              <p className="text-white/25 text-xs italic">Graffiti. Glass. Good Vibes.</p>
            </div>

            {[
              { title: "Shop",           links: ["Apparel","Headwear","Accessories","Glass","The Drop"] },
              { title: "Community", links: ["About The Fund","Partner With Us","Featured Initiatives","Fight For Fairness","Expungement"] },
              { title: "Support",        links: ["FAQ","Shipping & Returns","Size Guide","Contact Us","Our Story"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold uppercase tracking-wider mb-2 text-sm text-white">{col.title}</h4>
                <AccentLine className="w-8 mb-5" />
                <ul className="space-y-3 text-white/40 text-sm">
                  {col.links.map((l, j) => <li key={j}><Link href="#" className="hover:text-accent transition-colors">{l}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/25">
            <p>&copy; {new Date().getFullYear()} Stoned Rabbit™ — The Culture.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {registerOpen && <RegisterModal onClose={() => setRegisterOpen(false)} />}
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
