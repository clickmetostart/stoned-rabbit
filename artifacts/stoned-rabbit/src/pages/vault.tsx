import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { VAULT_PRODUCTS, ALL_PRODUCTS } from "@/data/products";

const PAGE_BG = "#080808";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any },
  }),
};

function AccentLine({ className = "" }: { className?: string }) {
  return <div className={`h-[3px] bg-accent ${className}`} />;
}

// Combine vault items + a few regular items shown as "sold out" archive pieces
const VAULT_ITEMS = [
  ...VAULT_PRODUCTS,
  ...ALL_PRODUCTS.filter(p => !p.vault).slice(0, 3).map(p => ({
    ...p,
    slug: p.slug + "-archive",
    badge: "ARCHIVE",
    vault: true,
    soldOut: true,
    price: p.price,
  })),
];

export default function VaultPage() {
  const [notifySlug, setNotifySlug] = useState<string | null>(null);
  const [notified, setNotified] = useState<string[]>([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleNotify = (slug: string) => {
    setNotifySlug(null);
    setNotified(prev => [...prev, slug]);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: PAGE_BG }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Ghost watermark */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none z-0 pr-6">
          <span
            className="font-display font-black italic uppercase text-white leading-none"
            style={{ fontSize: "clamp(6rem, 30vw, 30rem)", opacity: 0.025, letterSpacing: "-0.04em" }}
          >
            VAULT
          </span>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-16">
          <AccentLine className="w-16 mb-8" />

          <div className="flex items-start justify-between flex-wrap gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-4 h-4 text-accent opacity-70" />
                <p className="text-accent font-bold tracking-widest uppercase text-xs">Limited Access</p>
              </div>
              <h1 className="font-display font-black italic text-7xl md:text-[clamp(4rem,10vw,9rem)] uppercase tracking-tighter leading-none mb-5">
                THE<br />
                <span className="text-accent">VAULT.</span>
              </h1>
              <p className="text-white/45 text-lg max-w-xl leading-relaxed">
                Limited runs. Archive drops. One-of-a-kind pieces. When it's gone, it's gone. No reprints, no restocks, no apologies.
              </p>
            </div>

            {/* Status tiles */}
            <div className="flex flex-col gap-3 pt-2">
              {[
                { label: "Active Drops", value: VAULT_PRODUCTS.length.toString(), color: "#FF0099" },
                { label: "Archive Items", value: "12+", color: "rgba(255,255,255,0.3)" },
                { label: "No Reprints", value: "Ever", color: "rgba(255,255,255,0.3)" },
              ].map(s => (
                <div
                  key={s.label}
                  className="px-5 py-4 min-w-[200px]"
                  style={{ border: `1px solid ${s.color}30`, background: `${s.color}08` }}
                >
                  <p className="font-display font-black italic text-3xl leading-none mb-1" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ── VAULT PRODUCTS ───────────────────────────────────────── */}
      <section className="py-20 container mx-auto px-6 lg:px-16">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-white/25 text-xs font-bold uppercase tracking-widest mb-2">Current & Archive</p>
            <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter">
              {VAULT_ITEMS.length} Items in The Vault
            </h2>
          </div>
          <div className="flex gap-2">
            {["All", "Available", "Archive"].map((f, i) => (
              <button
                key={f}
                className="h-9 px-5 text-xs font-bold uppercase tracking-widest border transition-colors duration-200"
                style={{
                  border: i === 0 ? "1px solid #FF0099" : "1px solid rgba(255,255,255,0.12)",
                  color: i === 0 ? "#FF0099" : "rgba(255,255,255,0.4)",
                  background: i === 0 ? "rgba(255,0,153,0.08)" : "transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
          {VAULT_ITEMS.map((item, i) => {
            const isSoldOut = (item as any).soldOut;
            return (
              <motion.div
                key={item.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="group relative flex flex-col"
                style={{ background: PAGE_BG }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "clamp(280px, 26vw, 420px)" }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isSoldOut ? "grayscale opacity-50" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Sold out overlay */}
                  {isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="px-4 py-2 border border-white/30 bg-black/60">
                        <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Archive — Gone</p>
                      </div>
                    </div>
                  )}

                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1"
                    style={{
                      background: isSoldOut ? "rgba(255,255,255,0.15)" : "#FF0099",
                      color: "white",
                    }}
                  >
                    {item.badge || "VAULT"}
                  </div>

                  {/* Top accent on hover — only for available items */}
                  {!isSoldOut && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}

                  {/* Shop now — slide up on hover */}
                  {!isSoldOut && (
                    <div className="absolute bottom-0 left-0 right-0 py-3 bg-accent flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white font-bold uppercase tracking-widest text-xs">Shop Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-display font-black italic text-lg uppercase tracking-tight leading-tight text-white mb-1 group-hover:text-accent transition-colors duration-300">
                    {item.name}
                  </p>
                  <p className="text-white/40 text-xs mb-3 leading-snug flex-1">{item.shortDesc}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
                    <div>
                      <p className="font-bold text-white text-sm">{isSoldOut ? "Sold Out" : item.price}</p>
                      <p className="text-white/25 text-[10px] uppercase tracking-widest mt-0.5">
                        {isSoldOut ? "Archive Only" : "Limited Run"}
                      </p>
                    </div>

                    {isSoldOut ? (
                      notified.includes(item.slug) ? (
                        <p className="text-accent text-[10px] font-bold uppercase tracking-widest">Notified ✓</p>
                      ) : (
                        <button
                          onClick={() => setNotifySlug(item.slug)}
                          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-white/20 text-white/50 hover:border-accent hover:text-accent transition-colors"
                        >
                          Notify Me
                        </button>
                      )
                    ) : (
                      <Link href={`/product/${item.slug.replace("-archive", "")}`}>
                        <div className="w-9 h-9 border border-accent/40 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors duration-200">
                          <ArrowUpRight className="w-4 h-4 text-accent hover:text-white" />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── NOTIFY MODAL ─────────────────────────────────────────── */}
      {notifySlug && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
          onClick={() => setNotifySlug(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-8"
            style={{ background: "#111", border: "1px solid rgba(255,0,153,0.3)" }}
            onClick={e => e.stopPropagation()}
          >
            <AccentLine className="w-10 mb-6" />
            <h3 className="font-display font-black italic text-3xl uppercase tracking-tighter mb-2">
              Drop Notification
            </h3>
            <p className="text-white/45 text-sm mb-6">We'll let you know if this piece ever comes back. No promises — but we'll tell you first.</p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full h-11 bg-white/[0.06] border border-white/15 text-white placeholder:text-white/25 px-4 text-sm mb-4 outline-none focus:border-accent transition-colors"
            />
            <button
              onClick={() => handleNotify(notifySlug)}
              className="w-full h-12 bg-accent text-white font-black italic uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors"
            >
              Notify Me
            </button>
          </motion.div>
        </div>
      )}

      {/* ── FOOTER CTA ───────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <AccentLine className="w-12 mx-auto mb-8" />
          <p className="text-white/25 text-sm mb-4">Looking for the main line?</p>
          <h3 className="font-display font-black italic text-4xl uppercase tracking-tighter mb-6">
            Browse All Collections.
          </h3>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/collections">
              <button className="h-12 px-8 bg-accent text-white font-black italic uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
                Collections
              </button>
            </Link>
            <Link href="/shop">
              <button className="h-12 px-8 border border-white/20 text-white/60 font-bold uppercase tracking-widest text-sm hover:text-white hover:border-white transition-colors">
                Shop All
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
