import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { COLLECTIONS, ALL_PRODUCTS } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

const PAGE_BG = "linear-gradient(160deg, #0a0a0a 0%, #0d0d0d 100%)";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any },
  }),
};

function AccentLine({ className = "" }: { className?: string }) {
  return <div className={`h-[3px] bg-accent ${className}`} />;
}

export default function CollectionsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useSEO({
    title: "Collections",
    description: "Browse Stoned Rabbit collections — curated drops built around a mood, not a calendar. Signature Series, Nocturne, Everyday Carry, and more.",
    canonical: "/collections",
    keywords: "stoned rabbit collections, cannabis streetwear collections, signature series, nocturne, everyday carry",
  });

  return (
    <div className="min-h-screen text-white" style={{ background: PAGE_BG }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Ghost watermark */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none z-0 pr-8">
          <span
            className="font-display font-black italic uppercase text-white leading-none"
            style={{ fontSize: "clamp(6rem, 28vw, 28rem)", opacity: 0.03, letterSpacing: "-0.04em" }}
          >
            COLLECT
          </span>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-16">
          <AccentLine className="w-16 mb-8" />
          <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Stoned Rabbit</p>
          <h1 className="font-display font-black italic text-7xl md:text-[clamp(4rem,10vw,9rem)] uppercase tracking-tighter leading-none mb-6">
            THE<br />
            <span className="text-accent">COLLECTIONS.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Curated lines, not categories. Each collection is its own world — a specific mood, a specific moment.
          </p>
        </div>
      </section>

      {/* ── COLLECTIONS GRID ─────────────────────────────────────── */}
      <section className="pb-32 container mx-auto px-6 lg:px-16">

        {/* Featured — first collection full width */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-2"
        >
          <Link
            href={`/shop`}
            className="group relative block overflow-hidden"
            style={{ height: "clamp(380px, 50vw, 620px)" }}
          >
            <img
              src={COLLECTIONS[0].img}
              alt={COLLECTIONS[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
            {/* Top accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-10 pb-12">
              <div className="flex items-end justify-between">
                <div>
                  <AccentLine className="w-12 mb-5" />
                  <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Collection 01</p>
                  <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-3 text-white">
                    {COLLECTIONS[0].name}
                  </h2>
                  <p className="text-white/60 text-base max-w-sm leading-relaxed">
                    {COLLECTIONS[0].description}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-8">
                  <div className="w-14 h-14 border border-accent/40 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
                    <ArrowUpRight className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-white/30 text-xs uppercase tracking-widest mt-2 text-right">
                    {COLLECTIONS[0].count} pieces
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Two-column grid for remaining collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {COLLECTIONS.slice(1).map((col, i) => (
            <motion.div
              key={col.slug}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                href={`/shop`}
                className="group relative block overflow-hidden"
                style={{ height: "clamp(300px, 35vw, 480px)" }}
              >
                <img
                  src={col.img}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <AccentLine className="w-8 mb-4" />
                      <p className="text-accent font-bold tracking-widest uppercase text-xs mb-2">
                        Collection 0{i + 2}
                      </p>
                      <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-2 text-white">
                        {col.name}
                      </h2>
                      <p className="text-white/55 text-sm max-w-xs leading-relaxed">{col.sub}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-11 h-11 border border-accent/40 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
                        <ArrowUpRight className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Vault CTA tile */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Link
            href="/vault"
            className="group relative block overflow-hidden"
            style={{ height: "clamp(200px, 22vw, 300px)", background: "#0a0a0a", border: "1px solid rgba(255,153,0,0.15)" }}
          >
            {/* Grain texture via pseudo */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }} />
            <div className="absolute inset-0 flex items-center justify-between px-10 lg:px-16">
              <div>
                <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Exclusive Access</p>
                <h2 className="font-display font-black italic text-4xl md:text-6xl uppercase tracking-tighter leading-none text-white">
                  THE VAULT
                </h2>
                <p className="text-white/40 text-sm mt-3 max-w-xs">
                  Limited runs. Archive drops. Not everything comes back.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <ArrowUpRight className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 group-hover:bg-accent/60 transition-colors duration-500" />
          </Link>
        </motion.div>
      </section>

      {/* ── BRAND ETHOS STRIP ──────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-24">
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-3xl">
          <AccentLine className="w-12 mx-auto mb-8" />
          <p className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-tight text-white mb-6">
            Gear for the person who already knows what they want.
          </p>
          <p className="text-white/45 text-base leading-relaxed">
            Not trend-chasing. Not loud. Just well-made things for people with good taste and better habits.
          </p>
        </div>
      </section>
    </div>
  );
}
