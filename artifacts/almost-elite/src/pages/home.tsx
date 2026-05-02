import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ArrowRight, ChevronLeft, ChevronRight, Heart, Shirt, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const PRODUCTS_DROPPED = [
  { name: "Skull & Crossclubs", price: "$58", was: "$78", img: "/polo-skull.png", badge: "NEW DROP", slug: "skull-crossclubs" },
  { name: "The Range Wrangler", price: "$50", was: "$75", img: "/product-hat.png", badge: "BEST SELLER", slug: "range-wrangler" },
  { name: "Retro Static", price: "$58", was: "$78", img: "/polo-retro.png", badge: "NEW DROP", slug: "retro-static" },
  { name: "Fly It 300", price: "$50", was: "$75", img: "/product-womens.png", badge: "", slug: "fly-it-300" },
  { name: "Flamingo Country", price: "$58", was: "$78", img: "/polo-flamingo.png", badge: "LIMITED", slug: "flamingo-country" },
];

const PRODUCTS_COLLECTION = [
  { name: "Skull & Crossclubs", price: "$58", img: "/polo-skull.png", badge: "", slug: "skull-crossclubs-2" },
  { name: "The Cool Crowd", price: "$68", img: "/product-polo.png", badge: "BEST SELLER", slug: "cool-crowd" },
  { name: "Retro Static", price: "$58", img: "/polo-retro.png", badge: "", slug: "retro-static-2" },
  { name: "Scramble Specialist", price: "$45", img: "/scramble-specialist-hat.jpg", badge: "CHARITY", slug: "scramble-specialist-hat" },
  { name: "Clubhouse Legend Cap", price: "$42", img: "/clubhouse-legend-hat.jpg", badge: "NEW", slug: "clubhouse-legend-cap" },
];

/* ─── Skewed colored panel ─────────────────────────────────────── */
function SkewPanel({
  children,
  bg,
  className = "",
}: {
  children: React.ReactNode;
  bg: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute pointer-events-none left-0 right-0"
        style={{ background: bg, transform: "skewY(-3deg)", top: "-10%", bottom: "-10%" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── SVG diagonal slash between sections ──────────────────────── */
function SlashDivider({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <div className="relative h-16 overflow-hidden pointer-events-none" style={{ marginTop: -1, marginBottom: -1 }}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {flip
          ? <polygon points="0,0 1440,64 1440,0" fill={fill} />
          : <polygon points="0,64 1440,0 0,0" fill={fill} />}
      </svg>
    </div>
  );
}

/* ─── Product slider ────────────────────────────────────────────── */
function ProductSlider({
  products,
  title,
  href,
}: {
  products: typeof PRODUCTS_DROPPED;
  title: string;
  href: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 overflow-hidden">
      <div className="px-6 lg:px-16 mb-6 flex items-end justify-between">
        <a
          href={href}
          className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter text-white hover:text-accent transition-colors leading-none"
        >
          {title}
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            data-testid="slider-prev"
            className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-accent hover:text-accent transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            data-testid="slider-next"
            className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-accent hover:text-accent transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-6 lg:px-16 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((p, i) => (
          <Link
            key={i}
            href={`/product/${p.slug}`}
            data-testid={`card-product-${p.slug}`}
            className="group flex-shrink-0 w-[260px] md:w-[290px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden bg-zinc-800" style={{ aspectRatio: "9.6/13" }}>
              {p.badge && (
                <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
                  {p.badge}
                </div>
              )}
              <div
                className="w-full h-full"
                style={{ transform: "skewX(-15deg) translateX(18%)", transformOrigin: "center" }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ transform: "skewX(15deg) translateX(-18%)" }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent">
                <p className="text-white text-center font-bold uppercase tracking-wider text-sm">Quick Add</p>
              </div>
            </div>
            <div className="mt-3 px-1">
              <p className="font-bold text-base text-white leading-tight group-hover:text-accent transition-colors">{p.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-white">{p.price}</span>
                {p.was && <span className="text-white/40 line-through text-sm">{p.was}</span>}
                {p.was && (
                  <span className="text-accent text-xs font-bold uppercase">
                    Save ${parseInt(p.was.replace("$", "")) - parseInt(p.price.replace("$", ""))}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Collab brands data ────────────────────────────────────────── */
const COLLAB_BRANDS = [
  { name: "BUDWEISER",      tag: "King of the Fairway",          accent: "#C8102E", bg: "#0a0a0a", img: "/polo-skull.png" },
  { name: "JACK DANIEL'S",  tag: "Old No. 7 on the Back Nine",   accent: "#8B7355", bg: "#111111", img: "/polo-flamingo.png" },
  { name: "COORS LIGHT",    tag: "Cold as Your Putting Game",    accent: "#0057A8", bg: "#0c1929", img: "/product-hat.png" },
  { name: "TWISTED TEA",    tag: "Half & Half on Hole 9",        accent: "#5A8C3C", bg: "#0d1a0a", img: "/polo-retro.png" },
  { name: "CAPTAIN MORGAN", tag: "Spiced. Structured. Snapback.",accent: "#B8860B", bg: "#1a1000", img: "/product-polo.png" },
  { name: "WHITE CLAW",     tag: "Ain't No Laws on the Muni",    accent: "#7B2D8B", bg: "#0f0a14", img: "/product-womens.png" },
];

function CollabBrands() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 overflow-hidden">
      <div className="px-6 lg:px-16 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Limited Collab Drops</p>
          <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none text-white">
            ICONIC BRANDS.<br />
            <span className="text-accent">GOLF COURSE LOUD.</span>
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
            From the cooler at the 19th hole to the legends on the label — we take the brands you already love and put them where they belong. On the polo.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {["left", "right"].map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir as "left" | "right")}
              className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-accent hover:text-accent transition-colors"
            >
              {dir === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 lg:px-16 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {COLLAB_BRANDS.map((brand, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group flex-shrink-0 w-[300px] md:w-[340px] cursor-pointer"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden flex flex-col" style={{ height: "420px", background: brand.bg }}>
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
              <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1" style={{ color: brand.accent, border: `1px solid ${brand.accent}40`, background: `${brand.accent}10` }}>
                Limited Drop
              </span>
              <span className="text-white/30 text-xs uppercase tracking-wider">x Almost Elite</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Shop By Category panels ───────────────────────────────────── */
const SHOP_CATEGORIES = [
  { label: "MENS",        sub: "Polos with Personality",           img: "/lifestyle-muni.jpg",       href: "/men" },
  { label: "WOMENS",      sub: "Bold. Breathable. Yours.",         img: "/lifestyle-womens.jpg",     href: "/women" },
  { label: "YOUTH",       sub: "Future Municipal Legends",        img: "/insta-2.png",              href: "/youth" },
  { label: "HIS & HERS",  sub: "Matching Energy. Different Scores.", img: "/classic-vibe-fairway.jpg", href: "/his-hers" },
  { label: "FATHER & SON",sub: "Pass Down the Legend",            img: "/insta-3.png",              href: "/father-son" },
];

function ShopByCategory() {
  const [active, setActive] = useState(0);
  return (
    <section className="h-[70vh] flex overflow-hidden">
      {SHOP_CATEGORIES.map((cat, i) => (
        <div
          key={i}
          className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
          style={{ flex: active === i ? "4 0 0%" : "1 0 0%" }}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(0)}
        >
          <img src={cat.img} alt={cat.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" style={{ transform: active === i ? "scale(1.05)" : "scale(1)" }} />
          <div className="absolute inset-0 transition-opacity duration-500" style={{ background: active === i ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)" : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 100%)" }} />
          <div className="absolute inset-0 flex items-end justify-center pb-8 transition-opacity duration-300" style={{ opacity: active === i ? 0 : 1 }}>
            <span className="font-display font-black italic text-white text-xl uppercase tracking-widest select-none" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{cat.label}</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-300" style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? "auto" : "none" }}>
            <div>
              <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter text-white leading-none mb-2">{cat.label}</h2>
              <div className="w-16 h-0.5 bg-accent mb-3" />
              <p className="text-white/80 text-base font-medium">{cat.sub}</p>
            </div>
            <a href={cat.href} className="inline-block bg-white text-black font-bold uppercase tracking-widest text-sm px-7 py-3 w-fit hover:bg-accent hover:text-white transition-colors duration-200">Shop now</a>
          </div>
          {i < SHOP_CATEGORIES.length - 1 && <div className="absolute top-0 right-0 w-px h-full bg-white/10 z-10" />}
        </div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)" }}>
      <Navbar />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative h-[90vh] w-full flex items-end justify-center overflow-hidden bg-zinc-900 pb-16">
          <div className="absolute inset-0 z-0">
            <img src="/lifestyle-celebrating.jpg" alt="Almost Elite golfers" className="w-full h-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto">
              <motion.h1 variants={fadeInUp} className="font-display font-black italic text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-4">
                ALMOST ELITE.
              </motion.h1>
              <motion.h1 variants={fadeInUp} className="font-display font-black italic text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-6 text-accent">
                TOTALLY WORTH IT.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/85 mb-8 max-w-xl mx-auto">
                Performance-ready gear. Municipal-approved attitude.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" data-testid="button-shop-drop" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-10 text-base uppercase">
                  Shop The Drop
                </Button>
                <Button size="lg" variant="outline" data-testid="button-find-out-more" className="border-white text-white hover:bg-white hover:text-foreground rounded-none h-14 px-10 text-base uppercase font-bold bg-transparent">
                  Find Out More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Marquee ───────────────────────────────────────────────── */}
        <div className="bg-primary text-primary-foreground overflow-hidden py-4">
          <div className="whitespace-nowrap flex font-display font-bold italic text-2xl tracking-widest uppercase">
            <motion.div className="flex gap-8 items-center" animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, ease: "linear", duration: 18 }}>
              {["ALMOST ELITE", "MUNICIPAL LEGENDS WELCOME", "THE CREW > THE SCORE", "PLAY HARD. LAUGH HARDER.", "NOT FOR THE TOUR. FOR THE ROUND.", "ALMOST ELITE", "MUNICIPAL LEGENDS WELCOME", "THE CREW > THE SCORE", "PLAY HARD. LAUGH HARDER.", "NOT FOR THE TOUR. FOR THE ROUND."].map((t, i) => (
                <span key={i} className={i % 2 === 0 ? "text-primary-foreground" : "text-accent"}>
                  {i % 2 !== 0 ? "• " : ""}{t}{i % 2 !== 0 ? " •" : ""}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Split Panel ───────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 h-[75vh]">
          {[
            { title: "On Course", sub: "What you wear when you're actually out there.", cta: "Shop Apparel", img: "/lifestyle-swing.jpg", href: "/men", testId: "link-on-course" },
            { title: "In the Bag", sub: "Hats, gloves, and gear from tee box to clubhouse.", cta: "Shop Essentials", img: "/product-hat.png", href: "/accessories", testId: "link-in-the-bag" },
          ].map((panel, i) => (
            <Link key={i} href={panel.href} data-testid={panel.testId} className="group relative overflow-hidden flex items-end pb-10 px-8">
              <div className="absolute inset-0">
                <img src={panel.img} alt={panel.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              </div>
              <div className="relative z-10 text-white">
                <h2 className="font-display font-black italic text-5xl uppercase tracking-tighter leading-none mb-2">{panel.title}</h2>
                <p className="text-white/80 mb-5 text-base max-w-xs">{panel.sub}</p>
                <span className="inline-block bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm px-6 py-3 group-hover:bg-accent transition-colors">
                  {panel.cta}
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── Just Dropped slider ───────────────────────────────────── */}
        <ProductSlider products={PRODUCTS_DROPPED} title="JUST DROPPED" href="/drop" />

        {/* diagonal accent slash into collab section */}
        <SlashDivider fill="#d4700a22" />

        {/* ── Collab Brands ─────────────────────────────────────────── */}
        <CollabBrands />

        {/* ── Municipal Legends ─────────────────────────────────────── */}
        {/* Skewed saturated green panel — pops against navy-green base */}
        <SkewPanel bg="linear-gradient(135deg, #1f5035 0%, #164025 100%)" className="py-24">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">
                  For the Everyday Golfer
                </motion.p>
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8">
                  MUNICIPAL<br />LEGENDS<br />WELCOME.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/70 text-lg leading-relaxed mb-4">
                  Not every golfer plays private clubs. Most of us play where the tee sheets fill up early, the carts rattle a little, and the greens keeper is doing his best.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/70 text-lg leading-relaxed mb-8">
                  And that's exactly where the best rounds happen. Almost Elite is built for the golfers who show up week after week — chasing better shots, better rounds, and better stories for the clubhouse after.
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Button size="lg" data-testid="button-shop-muni" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-10 text-base uppercase">
                    Shop Muni Gear
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative overflow-hidden" style={{ height: "480px" }}>
                <img src="/drop-editorial.png" alt="Golfers on the fairway" className="w-full h-full object-cover object-center" />
              </motion.div>
            </div>
          </div>
        </SkewPanel>

        {/* ── Brand Pillars ─────────────────────────────────────────── */}
        {/* Skewed charcoal panel with orange accents */}
        <SkewPanel bg="linear-gradient(135deg, #1c1c1e 0%, #141414 100%)" className="py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                { icon: <Shirt className="w-8 h-8" />, title: "The Look", body: "Intentional design. Quiet personality. Gear crafted to stand apart without trying too hard." },
                { icon: <Zap className="w-8 h-8" />, title: "The Feel", body: "Soft enough for lounging. Built enough for playing. Performance without feeling like performance wear." },
                { icon: <Heart className="w-8 h-8" />, title: "The Energy", body: "We don't just make polos, we make statements. Show up confident, comfortable, and unapologetically yourself." },
              ].map((p, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`text-center p-12 ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/10" : ""}`}>
                  <div className="w-14 h-14 mx-auto text-accent flex items-center justify-center mb-6">{p.icon}</div>
                  <h3 className="font-display font-bold italic text-2xl uppercase tracking-wide mb-3 text-white">{p.title}</h3>
                  <p className="text-white/55 leading-relaxed max-w-xs mx-auto">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SkewPanel>

        {/* ── Shop The Collection slider ────────────────────────────── */}
        <ProductSlider products={PRODUCTS_COLLECTION} title="SHOP THE COLLECTION" href="/men" />

        {/* ── Shop By Category panels ───────────────────────────────── */}
        <ShopByCategory />

        {/* ── Brand Story (full photo) ──────────────────────────────── */}
        <section className="relative py-24 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/hero.png" alt="For players who love the game" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="max-w-4xl">
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">
                Built for the Rounds That Matter Most
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8">
                FOR PLAYERS WHO LOVE THE GAME ENOUGH TO TAKE IT SERIOUSLY — AND THEMSELVES A LITTLE LESS.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl opacity-90 leading-relaxed max-w-3xl mb-6">
                This isn't gear for tour vans and TV cameras. It's for early tee times, public courses, weekend groups, and the round that somehow turns into a few extra drinks afterward.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg opacity-75 leading-relaxed max-w-3xl mb-10">
                For the golfers who grind for par, celebrate bogey saves, and know the best part of the game isn't perfection — it's playing.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-display font-black italic text-3xl uppercase tracking-wide text-accent">
                You might not be elite... But you're definitely Almost.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Charity Rounds ────────────────────────────────────────── */}
        {/* Skewed deep navy/green panel */}
        <SkewPanel bg="linear-gradient(135deg, #0f1f2e 0%, #0a1a14 100%)" className="py-24">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 relative overflow-hidden" style={{ height: "260px" }}>
                    <img src="/charity-outing-1.jpg" alt="Charity outing golfers" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <img src="/charity-outing-2.jpg" alt="Charity outing crew" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="relative overflow-hidden flex items-center justify-center bg-black" style={{ height: "200px" }}>
                    <img src="/scramble-specialist-hat.jpg" alt="Scramble Specialist hat" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="font-display font-black italic text-white text-xl uppercase leading-none">Scramble<br />Specialist</p>
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mt-1">Charity Drop</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent -z-10 hidden md:block" />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">
                  Almost Elite Charity Rounds
                </motion.p>
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-6">
                  BECAUSE A GREAT CHARITY SCRAMBLE DESERVES BETTER MERCH THAN A SLEEVE OF BALLS.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/65 text-lg leading-relaxed mb-5">
                  Golf has always been about more than the scorecard. It's the people, the stories, and the rounds that turn into something worth remembering.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/65 text-lg leading-relaxed mb-8">
                  We partner with golf tournaments, nonprofits, and community events to create limited-edition merchandise that helps raise more money, more engagement, and more meaning from every round played.
                </motion.p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { step: "01", label: "Design The Gear", desc: "Custom hats and apparel built around your event's personality." },
                    { step: "02", label: "Drop Before The 1st Shot", desc: "Merch drops early so players are part of the story before tee time." },
                    { step: "03", label: "Game Day Ready", desc: "Everything ready at check-in. Clean, organized, built for a smooth round." },
                    { step: "04", label: "Wear the Story", desc: "The campaign stays open after so supporters can still be part of it." },
                  ].map((s, i) => (
                    <motion.div key={i} variants={fadeInUp} className="p-4 border border-white/15 bg-white/5">
                      <p className="text-accent font-bold text-xs tracking-widest mb-1">{s.step}</p>
                      <p className="font-bold uppercase text-sm mb-1 text-white">{s.label}</p>
                      <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div variants={fadeInUp}>
                  <Button size="lg" data-testid="button-charity-rounds" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-10 text-base uppercase">
                    Join Charity Rounds <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </SkewPanel>

        {/* ── Featured Charity Event (full photo) ───────────────────── */}
        <section className="relative py-20 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/charity-outing-2.jpg" alt="Boys & Girls Club Charity Outing" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Featured Event</p>
              <h2 className="font-display font-black italic text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
                BOYS & GIRLS CLUB<br />CHARITY OUTING
              </h2>
              <p className="text-white/60 text-base mb-2 tracking-wider uppercase font-semibold">May 30th, 2026 — XYZ Golf Course</p>
              <p className="text-white/75 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                A day of golf built around four-person teams, shared swings, and the kind of moments that never quite make it onto a scorecard — but always make it into the group chat. Almost Elite is proud to bring a limited-edition{" "}
                <span className="text-accent font-bold">Scramble Specialist</span> drop to life.
              </p>
              <p className="text-white/50 text-base mb-10">
                Supporting the <span className="text-white font-bold">Boys & Girls Clubs of America</span> — because golf has a way of giving something back.
              </p>
              <Button size="lg" data-testid="button-support-scramble" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-12 text-base uppercase">
                Support The Scramble
              </Button>
            </div>
          </div>
        </section>

        {/* slash divider from photo into reviews */}
        <SlashDivider fill="#1c1c1e" flip />

        {/* ── Social Proof ─────────────────────────────────────────────── */}
        <SkewPanel bg="linear-gradient(135deg, #1c1c1e 0%, #161616 100%)" className="py-24">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="text-center mb-14">
              <h2 className="font-display font-black italic text-5xl uppercase tracking-tighter text-white mb-2">
                WORD ON THE FAIRWAY
              </h2>
              <p className="text-white/45">The players shaping modern golf culture — one round at a time.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "Shot an 87, looked like a scratch golfer. Totally worth it.", author: "Mike T.", handicap: "15 Handicap" },
                { quote: "Finally, a brand that understands I'm just here for the experience. The gear makes me feel like I belong out there.", author: "Sarah J.", handicap: "Here for the cart" },
                { quote: "My swing is still garbage, but at least my polo isn't. Municipal legend status unlocked.", author: "Dave R.", handicap: "22 Handicap" },
              ].map((r, i) => (
                <div key={i} data-testid={`card-review-${i}`} className="bg-white/5 border border-white/10 p-8 flex flex-col relative">
                  <div className="flex text-accent mb-5">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lg italic mb-6 flex-grow text-white/80">"{r.quote}"</p>
                  <div>
                    <p className="font-bold uppercase tracking-wider text-sm text-white">{r.author}</p>
                    <p className="text-xs text-white/40">{r.handicap}</p>
                  </div>
                  <div className="absolute top-4 right-6 font-display italic text-8xl text-white/5 leading-none select-none">"</div>
                </div>
              ))}
            </div>
          </div>
        </SkewPanel>

        {/* ── Instagram Grid ────────────────────────────────────────── */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center mb-8">
            <h2 className="font-display font-black italic text-4xl uppercase tracking-tighter mb-1 text-white">FOLLOW THE CREW</h2>
            <a href="https://instagram.com/almostelite" target="_blank" rel="noreferrer" data-testid="link-instagram" className="text-accent font-bold hover:underline tracking-widest uppercase text-sm">
              @ALMOSTELITE
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
            {["/lifestyle-thumbsup.jpg", "/insta-1.png", "/clubhouse-legend-hat.jpg", "/classic-vibe-drinks.jpg", "/insta-3.png", "/lifestyle-celebrating.jpg"].map((img, i) => (
              <a key={i} href="#" data-testid={`link-instagram-post-${i}`} className="relative aspect-square group block overflow-hidden">
                <img src={img} alt={`Almost Elite crew post ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase text-xs border-b border-white/50 pb-0.5">View Post</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Newsletter (full photo) ───────────────────────────────── */}
        <section className="relative py-24 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/classic-vibe-drinks.jpg" alt="Join the Almost Elite crew" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
          </div>
          <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
            <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">10,000+ Municipal Legends Already In</p>
            <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter mb-4">
              JOIN THE CREW
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Get 15% off your first order. Early access to drops, charity round announcements, and highly questionable golf tips. No spam — just the good stuff.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="ENTER YOUR EMAIL" data-testid="input-email-newsletter" className="h-14 rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent focus-visible:border-accent" required />
              <Button type="submit" data-testid="button-newsletter-submit" className="h-14 px-8 rounded-none bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-wider shrink-0">
                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <Link href="/" className="font-display font-black italic text-4xl tracking-tighter block mb-4 text-white">ALMOST ELITE</Link>
              <p className="text-white/45 mb-2 max-w-xs text-sm leading-relaxed">Golf apparel for the rest of us. Performance-ready gear. Municipal-approved attitude.</p>
              <p className="text-white/30 text-xs italic">You might not be elite... But you're definitely Almost.</p>
            </div>
            {[
              { title: "Shop", links: ["Men's Collection", "Women's Collection", "Headwear", "Accessories", "The Drop"] },
              { title: "Charity Rounds", links: ["About The Program", "Partner With Us", "Featured Events", "Boys & Girls Club", "Plan Your Drop"] },
              { title: "Support", links: ["FAQ", "Shipping & Returns", "Size Guide", "Contact Us", "Our Story"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 text-sm text-white">{col.title}</h4>
                <ul className="space-y-3 text-white/45 text-sm">
                  {col.links.map((l, j) => (
                    <li key={j}><Link href="#" className="hover:text-accent transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
            <p>&copy; {new Date().getFullYear()} Almost Elite™ | AlmostElite.com — Golf for the Rest of Us.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
