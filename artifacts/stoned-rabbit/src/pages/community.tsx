import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, Heart, Users, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import GhostWord from "@/components/GhostWord";
import { RegisterModal } from "@/components/RegisterModal";
import { ContactModal } from "@/components/ContactModal";

const PAGE_BG = "linear-gradient(160deg, #133732 0%, #000000 100%)";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

function AccentLine({ className = "" }: { className?: string }) {
  return <div className={`h-1 bg-accent ${className}`} />;
}

const STEPS = [
  { step: "01", title: "Design The Collab", body: "Custom apparel and accessories created specifically for the campaign — built around the personality of the cause, not pulled from a catalog.", icon: <Star className="w-7 h-7" /> },
  { step: "02", title: "Drop The Collection", body: "Merch drops online early so the community can grab their gear before the release event — and instantly support the cause.", icon: <Trophy className="w-7 h-7" /> },
  { step: "03", title: "Sponsor Expungement", body: "100% of proceeds from featured charity drops fund pro-bono lawyers and legal clinics to clear non-violent cannabis records.", icon: <Heart className="w-7 h-7" /> },
  { step: "04", title: "Wear The Movement", body: "Every item represents a message. Wear your support with pride and keep spreading the word long after the drop ends.", icon: <Users className="w-7 h-7" /> },
];

const WHY_IT_WORKS = [
  { headline: "It raises more for the cause", body: "Every sale contributes directly to legal clinics, making advocacy self-funding." },
  { headline: "It connects the community", body: "Custom street gear unites supporters, turning abstract activism into physical visibility." },
  { headline: "It gives people gear they love", body: "Not boring handouts. High-end, premium hoodies, caps, and accessories people actually want to wear." },
  { headline: "It builds culture around the brand", body: "Our supporters don't just wear the merch — they represent a larger movement for justice." },
];

const FEATURED_PRODUCTS = [
  { name: "Stoned Rabbit Hoodie", price: "$85", was: "$100", img: "/Stoned Rabbit Logo - hoodie 1.png" },
  { name: "Freedom Tag", price: "$25", was: "$35", img: "/freedom_tag.png" },
  { name: "Neon Dreams Tee", price: "$35", was: "$45", img: "/neon_dreams_tee.png" },
];

export default function Charity() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: PAGE_BG }}>
      <Navbar />

      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] w-full flex items-end justify-center overflow-hidden pb-20">
          <div className="absolute inset-0 z-0">
            <img src="/charity-outing-1.jpg" alt="Charity Drops" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
          </div>
          {/* Ghost COMMUNITY bleeds behind hero text */}
          <div className="absolute inset-0 flex items-end overflow-hidden pointer-events-none select-none">
            <span className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.045, marginBottom: "-2rem" }}>COMMUNITY</span>
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl">
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-6">
                Stoned Rabbit Community Drops
              </motion.p>
              <motion.h1 variants={fadeInUp} className="font-display font-black italic text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter mb-6 text-white">
                BECAUSE A GREAT<br />CULTURE<br />DESERVES A GREAT<br />MOVEMENT.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
                We partner with expungement campaigns, street artists, and legal aid clinics to create limited-edition streetwear that funds legal representation, record expungement, and a fresh start.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center gap-2 bg-accent text-white font-black italic uppercase tracking-widest px-10 h-14 text-base hover:bg-white hover:text-black transition-colors duration-200"
                >
                  Partner With Us <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-bold uppercase tracking-widest px-10 h-14 text-base hover:bg-white/10 transition-colors duration-200"
                >
                  See Active Initiatives
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── INTRO SPLIT ───────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <GhostWord word="STREET" className="justify-end" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <AccentLine className="w-16 mb-8" />
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-6 text-white">
                  STREET CULTURE HAS ALWAYS BEEN ABOUT COMMUNITY.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  It's the people, the stories, and the shared connections that turn a brand into something worth remembering. Stoned Rabbit exists to take that idea and translate it into social impact.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  This isn't corporate charity. It's street culture doing what it does best — taking care of our own and showing up for justice.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white font-bold text-lg leading-relaxed">
                  We step in and use our drops to build support networks for those affected by unjust convictions.
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
                  <img src="/charity-outing-2.jpg" alt="Project Clean Slate" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-8 left-12 right-8">
                    <div className="bg-black/80 backdrop-blur-sm border border-white/10 p-5">
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Featured Initiative</p>
                      <p className="font-display font-black italic text-2xl uppercase text-white">Project Clean Slate</p>
                      <p className="text-white/50 text-sm mt-1">Ongoing Nationwide Campaign</p>
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
                It's a community drop system built around the energy of advocacy — designed to get supporters engaged and representing.
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
                  className="relative p-8 bg-[#0e2925] group hover:bg-white/5 transition-colors"
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
                  THE IMPACT THAT<br />KEEPS GROWING.
                </h2>
                <p className="text-white/50 text-lg leading-relaxed">
                  Every step is intentional. Every piece is tied to the movement. We build something that leaves a lasting positive mark on people's lives.
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
                Project Clean Slate
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8 text-white">
                THE WAR ON DRUGS DAMAGED LIVES. NOW IT'S TIME TO RESTORE THEM.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-white/65 leading-relaxed max-w-3xl mx-auto mb-6">
                Many of our campaigns fund organizations like <span className="text-accent font-bold">The Last Prisoner Project</span>, helping individuals affected by cannabis convictions secure legal representation, clear their criminal records, and reintegrate into society.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-white/45 leading-relaxed max-w-3xl mx-auto mb-10">
                This program makes sure that our culture gives back to those who paved the way. Every purchase helps extend that impact a little further.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <button
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center gap-2 bg-accent text-white font-black italic uppercase tracking-widest px-10 h-14 text-base hover:bg-white hover:text-black transition-colors duration-200"
                >
                  Register Your Next Collab <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SESSIONS BECOME MOVEMENTS ─────────────────────────────── */}
        <section className="relative py-24 overflow-hidden">
          <GhostWord word="SESSION" />
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
                  <img src="/lifestyle-muni.jpg" alt="Where Sessions Become Movements" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent flex items-end p-12">
                    <div className="text-white">
                      <p className="font-display font-black italic text-4xl uppercase tracking-tighter leading-none">
                        Where Sessions<br/>Become Movements.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <AccentLine className="w-16 mb-8" />
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-6 text-white">
                  COMMUNITY ADVOCACY HAS ITS OWN ENERGY.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  Popup events. Creative collabs. Shared stories and late night sessions. An underground community built on mutual respect and shared dreams.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white/55 text-lg leading-relaxed mb-5">
                  Stoned Rabbit designs streetwear that fits right into that world. Not corporate. Not compromise. Real, premium gear that people actually wear with pride.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-white font-bold text-lg">
                  Because when the gear is right, the statement hits harder.
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
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Featured Initiative — Project Clean Slate</p>
              <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6 text-white">
                FIGHTING FOR<br/>FAIRNESS.
              </h2>
              <p className="text-white/40 text-base mb-12 tracking-wider uppercase font-semibold">
                Ongoing Nationwide Campaign
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5 bg-accent/20">
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src="/charity-outing-1.jpg" alt="Project Clean Slate" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-5 left-5">
                    <span className="bg-accent text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">Charity Drop</span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-display font-bold italic text-2xl uppercase">Freedom Tag</p>
                    <p className="text-white/60 text-sm">Limited-edition drop</p>
                  </div>
                </div>
                <div className="bg-white/[0.03] p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-white/65 text-lg leading-relaxed mb-5">
                      A grassroots campaign built around street level organizing, popup gallery exhibitions, and sharing stories that legal systems ignore.
                    </p>
                    <p className="text-white/65 text-lg leading-relaxed mb-5">
                      Stoned Rabbit is proud to bring a limited-edition <span className="text-accent font-bold">Freedom Tag</span> drop to life — designed with purpose, worn with pride.
                    </p>
                    <p className="text-white/45 text-base leading-relaxed mb-8">
                      Supporting <span className="text-white font-bold">The Last Prisoner Project</span> — because the culture deserves more than just merchandise.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setRegisterOpen(true)}
                      className="w-full bg-accent text-white font-black italic uppercase tracking-widest h-14 text-base hover:bg-white hover:text-black transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Claim Your Freedom Tag <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRegisterOpen(true)}
                      className="w-full border border-white/20 text-white font-bold uppercase tracking-widest h-14 text-base hover:bg-white/10 transition-colors duration-200"
                    >
                      Support The Cause
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
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Represent the movement</p>
              <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter text-white">
                SHOP STONED RABBIT.
              </h2>
              <p className="text-white/45 mt-3 max-w-xl">
                The session might end, but the representation stays strong.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-accent/15">
              {FEATURED_PRODUCTS.map((p, i) => (
                <div key={i} className="group cursor-pointer bg-black">
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
                      <span className="text-accent text-xs font-bold uppercase">Save ${(parseInt(p.was.replace("$", "")) - parseInt(p.price.replace("$", "")))}</span>
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
            <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Running a Community Event?</p>
            <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter mb-6 text-white">
              PARTNER WITH<br />STONED RABBIT.
            </h2>
            <p className="text-lg text-white/55 mb-10 max-w-2xl mx-auto">
              Running an advocacy rally, record clearing event, or community art initiative? We help organizers create custom streetwear and merchandise made specifically for their supporters.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 h-14 bg-white/10 border border-white/20 text-white placeholder:text-white/35 px-4 focus:outline-none focus:border-accent uppercase tracking-wider text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setContactOpen(true)}
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
                  <img src="/logo-badge.png" alt="Stoned Rabbit" className="w-16 h-16 object-contain mb-4" />
                </Link>
                <p className="text-white/45 mb-2 max-w-xs text-sm leading-relaxed">Graffiti-inspired gear. Street-approved attitude. Good vibes only.</p>
                <p className="text-white/30 text-xs italic">Stay lifted. Stay grounded.</p>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 text-sm text-white">Shop</h4>
                <ul className="space-y-3 text-white/45 text-sm">
                  {["Street Apparel","Hats & Headwear","Accessories","Glassware","The Drop"].map(l => (
                    <li key={l}><Link href="/" className="hover:text-accent transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 text-sm text-white">Community</h4>
                <ul className="space-y-3 text-white/45 text-sm">
                  {["Project Clean Slate","The Warren Crew","The Blog","Collab Drops","Advocacy Program"].map(l => (
                    <li key={l}><Link href="/community" className="hover:text-accent transition-colors">{l}</Link></li>
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
              <p className="text-white/30 text-xs uppercase tracking-widest">© 2026 Stoned Rabbit. All rights reserved. Good Vibes Welcome.</p>
              <p className="text-white/20 text-xs italic">Dedicated to ending cannabis incarceration and supporting legal expungement. Stay Lifted.</p>
            </div>
          </div>
        </footer>

      </main>

      <AnimatePresence>
        {registerOpen && <RegisterModal onClose={() => setRegisterOpen(false)} />}
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
