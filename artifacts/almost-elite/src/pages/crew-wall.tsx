import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Trophy, MapPin, Check } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAGE_BG = "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)";

function AccentLine({ className = "" }: { className?: string }) {
  return <div className={`h-[3px] bg-accent ${className}`} />;
}

const TIER_COLORS: Record<string, string> = {
  "Almost Elite":  "#facc15",
  "Almost Better": "hsl(32 90% 55%)",
};

const MEMBERS = [
  {
    name: "Dave 'Double Bogey' Mercer",
    course: "Riverside Municipal GC, OH",
    tier: "Almost Elite",
    pts: "1,842 pts",
    quote: "I've never broken 90 but I've never looked bad doing it.",
    img: "/classic-vibe-drinks.jpg",
    gear: "Skull & Crossclubs Polo",
  },
  {
    name: "Trina 'Sand Trap' Okafor",
    course: "Fairview Muni Links, TX",
    tier: "Almost Elite",
    pts: "1,604 pts",
    quote: "My handicap is 18. My drip is a zero.",
    img: "/product-womens.png",
    gear: "Backwoods Fade Polo",
  },
  {
    name: "Carlos 'Mulligan' Reyes",
    course: "Desert Pines Public, AZ",
    tier: "Almost Elite",
    pts: "1,310 pts",
    quote: "The course is temporary. The fit is forever.",
    img: "/drop-editorial.png",
    gear: "Range Wrangler Polo",
  },
  {
    name: "Janelle 'Birdie Attempt' Wu",
    course: "Meadow Creek GC, WA",
    tier: "Almost Elite",
    pts: "1,220 pts",
    quote: "First tee nerves are real. My hat keeps them in check.",
    img: "/charity-outing-2.jpg",
    gear: "Scramble Specialist Hat",
  },
  {
    name: "Marcus 'Lost Ball' Thompson",
    course: "Brackenfern Links, GA",
    tier: "Almost Better",
    pts: "892 pts",
    quote: "I found two balls in the rough. Neither were mine. Still counts.",
    img: "/product-polo.png",
    gear: "Skull & Crossclubs Polo",
  },
  {
    name: "Pam 'Club Thrower' Delgado",
    course: "Lakeside Muni, FL",
    tier: "Almost Better",
    pts: "741 pts",
    quote: "I don't throw clubs anymore. I set them down aggressively.",
    img: "/product-womens.png",
    gear: "Classic Vibe Polo",
  },
  {
    name: "Jim 'Five-Hour Round' Kowalski",
    course: "North Shore Muni, IL",
    tier: "Almost Better",
    pts: "693 pts",
    quote: "Slow play is a lifestyle. Don't rush greatness.",
    img: "/drop-editorial.png",
    gear: "Range Wrangler Polo",
  },
  {
    name: "Sofia 'Chip Yip' Nascimento",
    course: "Pinecrest GC, CA",
    tier: "Almost Better",
    pts: "558 pts",
    quote: "Chipping is a mindset. A broken one, but still.",
    img: "/charity-outing-2.jpg",
    gear: "Clubhouse Legend Hat",
  },
];

const PERKS = [
  { tier: "Almost Better", color: "hsl(32 90% 55%)", label: "500+ pts", note: "Eligible to submit after 500 pts" },
  { tier: "Almost Elite",  color: "#facc15",          label: "1,000+ pts", note: "Priority feature + gold badge" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function CrewWall() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: PAGE_BG }}>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Ghost word */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none z-0">
          <span
            className="font-display font-black italic uppercase text-white leading-none pr-4"
            style={{ fontSize: "clamp(6rem, 28vw, 28rem)", opacity: 0.032, letterSpacing: "-0.04em" }}
          >
            CREW
          </span>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <AccentLine className="w-16 mb-8" />
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Almost Elite Members Only</p>
              <h1 className="font-display font-black italic text-7xl md:text-[clamp(4rem,10vw,9rem)] uppercase tracking-tighter leading-none mb-5">
                THE<br />
                <span className="text-accent">CREW</span><br />
                WALL.
              </h1>
              <p className="text-white/50 text-lg max-w-xl">
                These are the real ones. Almost Better and Almost Elite members who earn their spot by spending on gear, showing up to charity rounds, and looking good doing it.
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              {PERKS.map(p => (
                <div
                  key={p.tier}
                  className="px-5 py-4 min-w-[220px]"
                  style={{ border: `1px solid ${p.color}40`, background: `${p.color}0d` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-3.5 h-3.5" style={{ color: p.color }} />
                    <span className="font-black italic uppercase text-sm tracking-tight" style={{ color: p.color }}>{p.tier}</span>
                  </div>
                  <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest mb-1">{p.label}</p>
                  <p className="text-white/40 text-xs">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-white/[0.07]" />
      </div>

      {/* ── MEMBER GRID ─────────────────────────────────────────── */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">Hall of Fame</p>
            <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter">
              {MEMBERS.length} Members Featured
            </h2>
          </div>
          <div className="flex gap-2">
            {[
              { label: "All",             active: true },
              { label: "Almost Elite",    active: false },
              { label: "Almost Better",   active: false },
            ].map(f => (
              <button
                key={f.label}
                className="h-9 px-5 text-xs font-bold uppercase tracking-widest border transition-colors duration-200"
                style={{
                  border: f.active ? "1px solid hsl(32 90% 55%)" : "1px solid rgba(255,255,255,0.12)",
                  color: f.active ? "hsl(32 90% 55%)" : "rgba(255,255,255,0.4)",
                  background: f.active ? "hsl(32 90% 55% / 0.08)" : "transparent",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          {MEMBERS.map((m, i) => {
            const color = TIER_COLORS[m.tier];
            return (
              <motion.div
                key={m.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="relative group flex flex-col"
                style={{ background: PAGE_BG }}
              >
                {/* Diagonal photo */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "clamp(180px, 18vw, 280px)",
                    clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                  }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 group-hover:bg-accent/10 transition-colors duration-400" />
                  {/* Tier badge */}
                  <div
                    className="absolute top-3 left-[8%] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 flex items-center gap-1.5"
                    style={{ background: color, color: m.tier === "Almost Elite" ? "#0b1a14" : "white" }}
                  >
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {m.tier}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-display font-black italic text-lg uppercase tracking-tight leading-tight text-white mb-1 group-hover:text-accent transition-colors duration-300">
                    {m.name}
                  </p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3 h-3 flex-shrink-0" style={{ color }} />
                    <p className="text-white/35 text-xs font-medium">{m.course}</p>
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="flex-1 text-sm text-white/60 italic leading-relaxed border-l-2 pl-3 mb-4"
                    style={{ borderColor: color + "80" }}
                  >
                    "{m.quote}"
                  </blockquote>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
                        {m.pts}
                      </p>
                      <p className="text-white/25 text-[10px] mt-0.5">{m.gear}</p>
                    </div>
                    <Trophy className="w-4 h-4 opacity-20 group-hover:opacity-60 transition-opacity duration-300" style={{ color }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── EARN YOUR SPOT ──────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.07]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — info */}
            <div>
              <AccentLine className="w-12 mb-8" />
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Want In?</p>
              <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter mb-6">
                EARN YOUR<br />SPOT.
              </h2>
              <p className="text-white/50 text-base mb-8">
                Reach Almost Better (500 pts) or Almost Elite (1,000 pts) status, then submit your photo, home course, and a one-liner. We'll feature you right here.
              </p>
              <ul className="space-y-3.5">
                {[
                  "Reach 500+ pts on any order",
                  "Submit your photo + home course",
                  "Drop a one-liner — keep it real",
                  "Get featured within 7 days",
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/65 text-sm">
                    <span
                      className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-[10px] font-black"
                      style={{ background: "hsl(32 90% 55%)", color: "white" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — submit form */}
            <div
              className="p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div
                    className="w-16 h-16 mx-auto flex items-center justify-center mb-5"
                    style={{ background: "hsl(32 90% 55%)" }}
                  >
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-black italic text-3xl uppercase tracking-tighter mb-3">You're In.</h3>
                  <p className="text-white/50 text-sm">
                    We'll review your submission and have you on the wall within 7 days. Stay Almost Elite.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-display font-black italic text-2xl uppercase tracking-tight mb-1">Submit Your Spot</h3>
                  <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-6">Almost Better & Elite members only</p>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  >
                    <div>
                      <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Your Name / Nickname</label>
                      <Input
                        required
                        placeholder="Dave 'Double Bogey' Mercer"
                        className="h-11 rounded-none bg-white/[0.06] border-white/15 text-white placeholder:text-white/20 focus-visible:ring-accent focus-visible:border-accent text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Home Course + City</label>
                      <Input
                        required
                        placeholder="Riverside Municipal GC, OH"
                        className="h-11 rounded-none bg-white/[0.06] border-white/15 text-white placeholder:text-white/20 focus-visible:ring-accent focus-visible:border-accent text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Your One-Liner</label>
                      <textarea
                        required
                        placeholder="Keep it honest. Keep it almost elite."
                        rows={3}
                        className="w-full rounded-none bg-white/[0.06] border border-white/15 text-white placeholder:text-white/20 focus:outline-none focus:border-accent p-3 text-sm resize-none"
                        style={{ fontFamily: "inherit" }}
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1.5">Email (to verify tier)</label>
                      <Input
                        type="email"
                        required
                        placeholder="you@muni.com"
                        className="h-11 rounded-none bg-white/[0.06] border-white/15 text-white placeholder:text-white/20 focus-visible:ring-accent focus-visible:border-accent text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-none bg-accent hover:bg-white hover:text-black text-white font-black italic uppercase tracking-widest text-sm transition-colors"
                    >
                      Submit My Spot <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-white/20 text-[10px] text-center">
                      We'll verify your tier via email. No spam — ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.07]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/25 text-sm mb-4">Not yet a member?</p>
          <h3 className="font-display font-black italic text-4xl uppercase tracking-tighter mb-6">
            Start Earning Today.
          </h3>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/drop">
              <Button className="h-12 px-8 rounded-none bg-accent hover:bg-white hover:text-black text-white font-black italic uppercase tracking-widest text-sm transition-colors">
                Shop The Drop <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#crew">
              <Button variant="outline" className="h-12 px-8 rounded-none border-white/20 text-white/60 hover:text-white hover:border-white font-bold uppercase tracking-widest text-sm">
                Join the Crew
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
