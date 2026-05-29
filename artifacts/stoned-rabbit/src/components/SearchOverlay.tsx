import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ALL_PRODUCTS } from "@/data/products";

const SUGGESTED = ["tee", "hoodie", "hat", "beanie", "grinder", "bong", "drop"];

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-transparent text-accent">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const results = q
    ? ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.badge?.toLowerCase().includes(q) ?? false) ||
        p.shortDesc.toLowerCase().includes(q)
      )
    : [];

  const featured = ALL_PRODUCTS.filter(p => p.badge === "NEW DROP" || p.badge === "BEST SELLER").slice(0, 4);

  return (
    <motion.div
      className="fixed inset-0 z-[990] flex flex-col"
      style={{ background: "rgba(10, 26, 20, 0.97)", backdropFilter: "blur(20px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Orange top bar */}
      <div className="h-1 bg-accent flex-shrink-0" />

      {/* Search input row */}
      <div className="flex items-center gap-4 px-6 lg:px-16 py-6 border-b border-white/[0.08] flex-shrink-0">
        <Search className="w-6 h-6 text-accent flex-shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search gear, hats, drops..."
          className="flex-1 bg-transparent text-white placeholder:text-white/25 font-display font-black italic text-3xl md:text-4xl uppercase tracking-tighter leading-none outline-none"
          style={{ caretColor: "hsl(32 90% 55%)" }}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/40 hover:text-white transition-colors p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Results / suggestions */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-16 py-10">
        <AnimatePresence mode="wait">

          {/* ── ACTIVE SEARCH ── */}
          {q && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {results.length > 0 ? (
                <>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-8">
                    {results.length} {results.length === 1 ? "result" : "results"} for "{query}"
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                    {results.map((p, i) => (
                      <motion.div
                        key={p.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link href={`/product/${p.slug}`} onClick={onClose} className="group block">
                          {/* Diagonal image */}
                          <div
                            className="relative overflow-hidden mb-3"
                            style={{
                              height: "clamp(180px, 18vw, 280px)",
                              clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                            }}
                          >
                            <img
                              src={p.img}
                              alt={p.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-300" />
                            {p.badge && (
                              <div className="absolute top-2 left-[10%] bg-accent text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                                {p.badge}
                              </div>
                            )}
                          </div>
                          <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-0.5">{p.category}</p>
                          <p className="font-display font-black italic text-base uppercase tracking-tight text-white leading-none group-hover:text-accent transition-colors mb-1">
                            {highlight(p.name, query)}
                          </p>
                          <p className="text-accent font-bold text-sm">{p.price}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                >
                  <p className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter text-white/10 mb-6">
                    NO RESULTS.
                  </p>
                  <p className="text-white/35 text-sm mb-8">
                    Nothing found for "<span className="text-white/60">{query}</span>" — try a different search.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTED.map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="h-9 px-5 border border-white/15 text-white/50 text-xs font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── DEFAULT STATE ── */}
          {!q && (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Ghost word */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <span
                  className="font-display font-black italic uppercase text-white leading-none"
                  style={{ fontSize: "clamp(6rem, 28vw, 28rem)", opacity: 0.025, whiteSpace: "nowrap", letterSpacing: "-0.04em" }}
                >
                  SEARCH
                </span>
              </div>

              <div className="relative z-10">
                {/* Quick suggestions */}
                <div className="mb-12">
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED.map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="h-10 px-6 border border-white/15 text-white/60 text-xs font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors duration-200 flex items-center gap-1.5 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Browse by category */}
                <div className="mb-12">
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Browse Categories</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Apparel",     href: "/apparel",     img: "/acid_wash_hoodie.png" },
                      { label: "Headwear",    href: "/headwear",    img: "/rabbit_hole_beanie.png" },
                      { label: "Glassware",   href: "/glass",       img: "/graffiti_bong.png" },
                      { label: "Accessories", href: "/accessories", img: "/street_grinder.png" },
                    ].map(cat => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={onClose}
                        className="group relative overflow-hidden"
                        style={{ aspectRatio: "3/2", clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
                      >
                        <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-300" />
                        <div className="absolute bottom-3 left-[8%] right-[8%] flex items-center justify-between">
                          <p className="font-display font-black italic text-xl uppercase tracking-tight text-white leading-none">{cat.label}</p>
                          <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Featured drops */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Featured Drops</p>
                    <Link
                      href="/drop"
                      onClick={onClose}
                      className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                      View All <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {featured.map((p, i) => (
                      <motion.div
                        key={p.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Link href={`/product/${p.slug}`} onClick={onClose} className="group block">
                          <div
                            className="relative overflow-hidden mb-3"
                            style={{
                              height: "clamp(140px, 14vw, 220px)",
                              clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                            }}
                          >
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-300" />
                            {p.badge && (
                              <div className="absolute top-2 left-[10%] bg-accent text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                                {p.badge}
                              </div>
                            )}
                          </div>
                          <p className="font-display font-black italic text-sm uppercase tracking-tight text-white leading-none group-hover:text-accent transition-colors mb-1">
                            {p.name}
                          </p>
                          <p className="text-accent font-bold text-xs">{p.price}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
