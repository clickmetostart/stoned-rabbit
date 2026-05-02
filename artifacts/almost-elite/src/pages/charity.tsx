import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, Heart, Users, Trophy, X, ShoppingBag, MapPin, Calendar, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import GhostWord from "@/components/GhostWord";

const PAGE_BG = "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

function AccentLine({ className = "" }: { className?: string }) {
  return <div className={`h-1 bg-accent ${className}`} />;
}

const STEPS = [
  { step: "01", title: "Design The Gear", body: "Custom hats and apparel created specifically for your outing — built around the personality of your event, not pulled from a catalog.", icon: <Star className="w-7 h-7" /> },
  { step: "02", title: "Drop Before The 1st Shot", body: "Merch drops early so players can grab their gear before the first tee — and instantly be part of the story.", icon: <Trophy className="w-7 h-7" /> },
  { step: "03", title: "Game Day Ready", body: "Everything is ready when players arrive — clean, organized, and built for a smooth check-in and a better round ahead.", icon: <Heart className="w-7 h-7" /> },
  { step: "04", title: "Wear The Story", body: "The campaign stays open for a short window after the event so players and supporters can still be part of it.", icon: <Users className="w-7 h-7" /> },
];

const WHY_IT_WORKS = [
  { headline: "It raises more for the cause", body: "Merchandise becomes an additional way to support the mission behind the event." },
  { headline: "It makes the event feel bigger", body: "Custom gear turns a local outing into something people talk about before and after." },
  { headline: "It gives players something worth keeping", body: "Not swag. Not filler. Something tied to a day they'll actually remember." },
  { headline: "It builds culture around the event", body: "Golfers don't just attend — they become part of it." },
];

const FEATURED_PRODUCTS = [
  { name: "Clubhouse Legend", price: "$50", was: "$75", img: "/product-polo.png" },
  { name: "Scramble Specialist", price: "$50", was: "$75", img: "/scramble-specialist-hat.jpg" },
  { name: "Classic Vibe", price: "$50", was: "$75", img: "/polo-retro.png" },
];

const SIZES = ["S/M", "L/XL", "XXL"];

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  function handleClaim() {
    if (!size) return;
    setAdded(true);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-4xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Orange top bar */}
        <div className="h-1.5 bg-accent w-full" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT — Hat */}
          <div className="relative overflow-hidden bg-black/30" style={{ minHeight: 420 }}>
            <img
              src="/scramble-specialist-hat.jpg"
              alt="Scramble Specialist Hat"
              className="w-full h-full object-cover"
              style={{ minHeight: 420 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Ghost */}
            <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden leading-none">
              <span
                className="font-display font-black italic uppercase text-white whitespace-nowrap"
                style={{ fontSize: "clamp(4rem, 12vw, 10rem)", opacity: 0.07 }}
              >
                HAT
              </span>
            </div>

            <div className="absolute top-5 left-5">
              <span className="bg-accent text-white text-xs font-black uppercase px-3 py-1.5 tracking-widest">
                Event Only Drop
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display font-black italic text-3xl uppercase text-white leading-tight mb-1">
                Scramble Specialist
              </p>
              <p className="text-white/55 text-sm">Limited-edition · Boy's &amp; Girls Charity Outing</p>
              <p className="text-accent font-black text-2xl mt-3">$50</p>
            </div>
          </div>

          {/* RIGHT — Details + form */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Event header */}
              <div className="mb-7">
                <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">
                  Fore A Good Cause — Boy's &amp; Girls Charity
                </p>
                <h2 className="font-display font-black italic text-4xl uppercase tracking-tighter leading-none text-white mb-5">
                  CLAIM YOUR<br />EVENT MERCH.
                </h2>
                <div className="space-y-2 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>May 30th, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>XYZ Golf Course</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Delivered to you <span className="text-white font-semibold">at the event</span></span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/8 mb-7" />

              {/* Description */}
              <p className="text-white/55 text-sm leading-relaxed mb-7">
                The <span className="text-accent font-bold">Scramble Specialist</span> trucker hat was built for this outing — and only this one. Order yours before the event, pick it up on game day. Part of every purchase supports the{" "}
                <span className="text-white font-semibold">Boys &amp; Girls Clubs of America</span>.
              </p>

              {/* Size selector */}
              <div className="mb-7">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Select Size</p>
                <div className="flex gap-2">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex-1 h-11 border font-bold uppercase tracking-wider text-sm transition-all duration-150 ${
                        size === s
                          ? "border-accent bg-accent text-white"
                          : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {!size && (
                  <p className="text-white/30 text-xs mt-2">Choose a size to continue</p>
                )}
              </div>
            </div>

            {/* CTA */}
            {!added ? (
              <button
                onClick={handleClaim}
                disabled={!size}
                className={`w-full h-14 font-black italic uppercase tracking-widest text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                  size
                    ? "bg-accent text-white hover:bg-white hover:text-black cursor-pointer"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                Claim My Merch — $50 <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-14 bg-green-600/20 border border-green-500/40 flex items-center justify-center gap-2"
              >
                <span className="text-green-400 font-black uppercase tracking-widest text-sm">
                  You're in — See you at the scramble!
                </span>
              </motion.div>
            )}
            <p className="text-white/25 text-xs text-center mt-4">
              Your hat will be ready at check-in · No shipping required
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Charity() {
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: PAGE_BG }}>
      <Navbar />

      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] w-full flex items-end justify-center overflow-hidden pb-20">
          <div className="absolute inset-0 z-0">
            <img src="/charity-outing-1.jpg" alt="Charity Rounds" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
          </div>
          {/* Ghost CHARITY bleeds behind hero text */}
          <div className="absolute inset-0 flex items-end overflow-hidden pointer-events-none select-none">
            <span className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.045, marginBottom: "-2rem" }}>CHARITY</span>
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl">
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-6">
                Almost Elite Charity Rounds
              </motion.p>
              <motion.h1 variants={fadeInUp} className="font-display font-black italic text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter mb-6 text-white">
                BECAUSE A GREAT<br />CHARITY SCRAMBLE<br />DESERVES BETTER<br />MERCH.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
                We partner with golf tournaments, nonprofits, and community events to create limited-edition merchandise that raises more money, more engagement, and more meaning from every round played.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
                <button className="inline-flex items-center gap-2 bg-accent text-white font-black italic uppercase tracking-widest px-10 h-14 text-base hover:bg-white hover:text-black transition-colors duration-200">
                  Partner With Us <ArrowRight className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-2 border border-white/30 text-white font-bold uppercase tracking-widest px-10 h-14 text-base hover:bg-white/10 transition-colors duration-200">
                  See Featured Events
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── INTRO SPLIT ───────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <GhostWord word="GOLF" className="justify-end" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <AccentLine className="w-16 mb-8" />
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-6 text-white">
                  GOLF HAS ALWAYS BEEN ABOUT MORE THAN THE SCORECARD.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  It's the people, the stories, and the rounds that turn into something worth remembering. Almost Elite Charity Rounds exists to take that idea and turn it into impact.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  This isn't corporate sponsorship. It's golf culture doing what it does best — showing up for something bigger than itself.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white font-bold text-lg leading-relaxed">
                  We step into your event and help turn it into something people actually want to be part of.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div
                  className="relative overflow-hidden aspect-square"
                  style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
                >
                  <img src="/charity-outing-2.jpg" alt="Charity Rounds" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-8 left-12 right-8">
                    <div className="bg-black/80 backdrop-blur-sm border border-white/10 p-5">
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Coming Up</p>
                      <p className="font-display font-black italic text-2xl uppercase text-white">Fore A Good Cause</p>
                      <p className="text-white/50 text-sm mt-1">May 30th, 2026 — XYZ Golf Course</p>
                      <a href="#featured" className="mt-3 inline-block text-accent text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                        See Details →
                      </a>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-accent -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO / 4 STEPS ──────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <GhostWord word="DROP" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <AccentLine className="w-16 mx-auto mb-6" />
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">What We Do</p>
              <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none text-white">
                IT'S NOT JUST<br />MERCHANDISE.
              </h2>
              <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
                It's a pre-event drop system built around the energy of the outing — designed to get players engaged before the first tee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-accent/20">
              {STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative p-8 bg-[#0f1f2e] group hover:bg-white/5 transition-colors"
                >
                  <div className="text-accent mb-6">{s.icon}</div>
                  <p className="font-display font-black italic text-6xl text-white/[0.06] absolute top-4 right-5 leading-none select-none">{s.step}</p>
                  <h3 className="font-display font-bold italic text-xl uppercase tracking-tight mb-3 text-white">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY IT WORKS ──────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <GhostWord word="WORKS" className="justify-end" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <AccentLine className="w-16 mb-8" />
                <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Why It Works</p>
                <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-4 text-white">
                  THE ROUND THAT<br />KEEPS GOING.
                </h2>
                <p className="text-white/50 text-lg leading-relaxed">
                  Every step is intentional. Every piece is tied to the round. We build something people remember long after the final putt drops.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-0 border border-white/10">
                {WHY_IT_WORKS.map((w, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className={`p-6 ${i < WHY_IT_WORKS.length - 1 ? "border-b border-white/10" : ""} group hover:bg-white/5 transition-colors`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-accent font-bold text-2xl leading-none mt-0.5">0{i + 1}</span>
                      <div>
                        <h3 className="font-bold uppercase tracking-wider text-base mb-1 text-white group-hover:text-accent transition-colors">{w.headline}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{w.body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT THE IMPACT ──────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <GhostWord word="CAUSE" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-4xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <AccentLine className="w-16 mx-auto mb-8" />
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">
                Fore A Good Cause
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8 text-white">
                GOLF HAS ALWAYS GIVEN BACK. NOW IT'S YOUR TURN.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-white/65 leading-relaxed max-w-3xl mx-auto mb-6">
                Many of the events we support benefit organizations like the <span className="text-accent font-bold">Boys & Girls Clubs of America</span>, helping young people gain access to mentorship, education, and safe spaces to grow.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-white/45 leading-relaxed max-w-3xl mx-auto mb-10">
                This program makes sure golf also gives something back. Every round played helps extend that impact a little further.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <button className="inline-flex items-center gap-2 bg-accent text-white font-black italic uppercase tracking-widest px-10 h-14 text-base hover:bg-white hover:text-black transition-colors duration-200">
                  Plan Your Event Drop <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── MULLIGANS BECOME MEMORIES ─────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <GhostWord word="MUNI" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4/3", clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
                >
                  <img src="/lifestyle-muni.jpg" alt="Where Mulligans Become Memories" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent flex items-end p-12">
                    <div className="text-white">
                      <p className="font-display font-black italic text-4xl uppercase tracking-tighter leading-none">
                        Where Mulligans<br/>Become Memories.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <AccentLine className="w-16 mb-8" />
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-6 text-white">
                  CHARITY GOLF HAS ITS OWN KIND OF ENERGY.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  Four-person teams. Shared swings. Mulligans that somehow feel strategic. And a scoreboard nobody fully agrees on by the end of the round.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  Almost Elite designs merchandise that fits right into that world. Not generic. Not forgettable. Something people actually wear after the event ends.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white font-bold text-lg">
                  Because when the gear is right, the memory lasts longer.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FEATURED EVENT ────────────────────────────────────────── */}
        <section id="featured" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 flex items-center pointer-events-none select-none z-0">
            <span
              className="font-display font-black italic uppercase text-white whitespace-nowrap leading-none"
              style={{
                fontSize: "clamp(6rem, 18vw, 18rem)",
                opacity: 0.04,
                marginLeft: "22%",
              }}
            >
              REGISTER
            </span>
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <AccentLine className="w-16 mb-8" />
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Featured Event — Boy's &amp; Girls Charity</p>
              <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6 text-white">
                FORE A<br/>GOOD CAUSE.
              </h2>
              <p className="text-white/40 text-base mb-12 tracking-wider uppercase font-semibold">
                May 30th, 2026 — XYZ Golf Course
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5 bg-accent/20">
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src="/charity-outing-1.jpg" alt="Boys & Girls Club Outing" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-5 left-5">
                    <span className="bg-accent text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">Limited Drop</span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-display font-bold italic text-2xl uppercase">Scramble Specialist</p>
                    <p className="text-white/60 text-sm">Limited-edition event merch</p>
                  </div>
                </div>
                <div className="bg-white/[0.03] p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-white/65 text-lg leading-relaxed mb-5">
                      A day of golf built around four-person teams, shared swings, and the kind of moments that never quite make it onto a scorecard — but always make it into the group chat.
                    </p>
                    <p className="text-white/65 text-lg leading-relaxed mb-5">
                      Almost Elite is proud to bring a limited-edition <span className="text-accent font-bold">Scramble Specialist</span> drop to life. Designed before the first tee, picked up on game day, and worn long after the final putt drops.
                    </p>
                    <p className="text-white/45 text-base leading-relaxed mb-8">
                      Supporting the <span className="text-white font-bold">Boys & Girls Clubs of America</span> — because golf has a way of giving something back.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setRegisterOpen(true)}
                      className="w-full bg-accent text-white font-black italic uppercase tracking-widest h-14 text-base hover:bg-white hover:text-black transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Register for the Event <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRegisterOpen(true)}
                      className="w-full border border-white/20 text-white font-bold uppercase tracking-widest h-14 text-base hover:bg-white/10 transition-colors duration-200"
                    >
                      Claim Event Merch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SHOP ──────────────────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          <GhostWord word="SHOP" className="justify-end" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="mb-12">
              <AccentLine className="w-16 mb-6" />
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Keep The Round Going</p>
              <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter text-white">
                SHOP ALMOST ELITE.
              </h2>
              <p className="text-white/45 mt-3 max-w-xl">
                The round might be finished, but the feeling doesn't leave.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-accent/15">
              {FEATURED_PRODUCTS.map((p, i) => (
                <div key={i} className="group cursor-pointer bg-[#0a1a14]">
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "3/4", clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)" }}
                  >
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent">
                      <p className="text-white text-center font-bold uppercase tracking-wider text-sm">Shop Styles</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-base text-white">{p.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-white">{p.price}</span>
                      <span className="text-white/35 line-through text-sm">{p.was}</span>
                      <span className="text-accent text-xs font-bold uppercase">Save $25</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/">
                <button className="inline-flex items-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest px-10 h-12 text-sm hover:bg-white/10 transition-colors duration-200">
                  Browse All Collections <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PARTNER CTA ───────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <GhostWord word="PARTNER" />
          <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
            <AccentLine className="w-16 mx-auto mb-8" />
            <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Running a Charity Event?</p>
            <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter mb-6 text-white">
              PARTNER WITH<br />ALMOST ELITE.
            </h2>
            <p className="text-lg text-white/55 mb-10 max-w-2xl mx-auto">
              Running a charity scramble, nonprofit outing, or upcoming golf event? We help organizers create custom hats and apparel made specifically for their players.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 h-14 bg-white/10 border border-white/20 text-white placeholder:text-white/35 px-4 focus:outline-none focus:border-accent uppercase tracking-wider text-sm"
                required
              />
              <button
                type="submit"
                className="h-14 px-8 bg-accent hover:bg-white hover:text-black text-white font-black italic uppercase tracking-widest transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                Get Involved <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <footer className="border-t border-white/10 pt-20 pb-10">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <Link href="/">
                  <img src="/logo-badge.png" alt="Almost Elite" className="w-16 h-16 object-contain mb-4" />
                </Link>
                <p className="text-white/45 mb-2 max-w-xs text-sm leading-relaxed">Golf apparel for the rest of us. Performance-ready gear. Municipal-approved attitude.</p>
                <p className="text-white/30 text-xs italic">You might not be elite... But you're definitely Almost.</p>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 text-sm text-white">Shop</h4>
                <ul className="space-y-3 text-white/45 text-sm">
                  {["Men's Polos","Women's Collection","Hats & Headwear","Accessories","The Drop"].map(l => (
                    <li key={l}><Link href="/" className="hover:text-accent transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 text-sm text-white">Community</h4>
                <ul className="space-y-3 text-white/45 text-sm">
                  {["Fore A Good Cause","Municipal Legends","The Blog","Collab Drops","Ambassador Program"].map(l => (
                    <li key={l}><Link href="/charity" className="hover:text-accent transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 text-sm text-white">Support</h4>
                <ul className="space-y-3 text-white/45 text-sm">
                  {["Sizing Guide","Shipping & Returns","FAQ","Contact Us","Privacy Policy"].map(l => (
                    <li key={l}><a href="#" className="hover:text-accent transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/30 text-xs uppercase tracking-widest">© 2026 Almost Elite. All rights reserved. Municipal Legends Welcome.</p>
              <p className="text-white/20 text-xs italic">Not affiliated with the PGA Tour. Not even a little.</p>
            </div>
          </div>
        </footer>

      </main>

      <AnimatePresence>
        {registerOpen && <RegisterModal onClose={() => setRegisterOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
