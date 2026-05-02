import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Heart, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const STEPS = [
  {
    step: "01",
    title: "Design The Gear",
    body: "Custom hats and apparel created specifically for your outing — built around the personality of your event, not pulled from a catalog.",
    icon: <Star className="w-7 h-7" />,
  },
  {
    step: "02",
    title: "Drop Before The 1st Shot",
    body: "Merch drops early so players can grab their gear before the first tee — and instantly be part of the story.",
    icon: <Trophy className="w-7 h-7" />,
  },
  {
    step: "03",
    title: "Game Day Ready",
    body: "Everything is ready when players arrive — clean, organized, and built for a smooth check-in and a better round ahead.",
    icon: <Heart className="w-7 h-7" />,
  },
  {
    step: "04",
    title: "Wear The Story",
    body: "The campaign stays open for a short window after the event so players and supporters can still be part of it.",
    icon: <Users className="w-7 h-7" />,
  },
];

const WHY_IT_WORKS = [
  {
    headline: "It raises more for the cause",
    body: "Merchandise becomes an additional way to support the mission behind the event.",
  },
  {
    headline: "It makes the event feel bigger",
    body: "Custom gear turns a local outing into something people talk about before and after.",
  },
  {
    headline: "It gives players something worth keeping",
    body: "Not swag. Not filler. Something tied to a day they'll actually remember.",
  },
  {
    headline: "It builds culture around the event",
    body: "Golfers don't just attend — they become part of it.",
  },
];

const FEATURED_PRODUCTS = [
  { name: "Clubhouse Legend", price: "$50", was: "$75", img: "/product-polo.png" },
  { name: "Gollllfffff", price: "$50", was: "$75", img: "/drop-editorial.png" },
  { name: "Scramble Specialist", price: "$50", was: "$75", img: "/product-hat.png" },
];

export default function Charity() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">

        {/* Hero */}
        <section className="relative h-[80vh] w-full flex items-end justify-center overflow-hidden bg-zinc-900 pb-16">
          <div className="absolute inset-0 z-0">
            <img src="/hero.png" alt="Charity Rounds" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto">
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-6">
                Almost Elite Charity Rounds
              </motion.p>
              <motion.h1 variants={fadeInUp} className="font-display font-black italic text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter mb-6">
                BECAUSE A GREAT CHARITY SCRAMBLE DESERVES BETTER MERCH THAN A SLEEVE OF BALLS.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                We partner with golf tournaments, nonprofits, and community events to create limited-edition merchandise that helps raise more money, more engagement, and more meaning from every round played.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-10 text-base uppercase">
                  Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground rounded-none h-14 px-10 text-base uppercase font-bold bg-transparent">
                  See Featured Events
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Intro split */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
                  GOLF HAS ALWAYS BEEN ABOUT MORE THAN THE SCORECARD.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed mb-5">
                  It's the people, the stories, and the rounds that turn into something worth remembering. Almost Elite Charity Rounds exists to take that idea and turn it into impact.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed mb-5">
                  This isn't corporate sponsorship. It's golf culture doing what it does best — showing up for something bigger than itself.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-foreground font-bold text-lg leading-relaxed">
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
                <div className="relative aspect-square bg-secondary overflow-hidden">
                  <img src="/drop-editorial.png" alt="Charity Rounds" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 right-6">
                    <div className="bg-background/90 backdrop-blur p-5">
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Coming Up</p>
                      <p className="font-display font-black italic text-2xl uppercase">Boys & Girls Club Outing</p>
                      <p className="text-muted-foreground text-sm mt-1">May 30th, 2026 — XYZ Golf Course</p>
                      <Link href="#featured" className="mt-3 inline-block text-primary text-xs font-bold uppercase tracking-wider hover:text-accent transition-colors">
                        See Details →
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do / 4 Steps */}
        <section className="py-24 bg-zinc-950 text-white">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">What We Do</p>
              <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none">
                IT'S NOT JUST MERCHANDISE.
              </h2>
              <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
                It's a pre-event drop system built around the energy of the outing — designed to get players engaged before the first tee, create something worth showing up for, and extend the story after the final putt drops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative p-8 border border-white/10 bg-white/[0.03] group hover:border-accent/50 transition-colors"
                >
                  <div className="text-accent mb-6">{s.icon}</div>
                  <p className="font-display font-black italic text-6xl text-white/[0.06] absolute top-4 right-5 leading-none select-none">{s.step}</p>
                  <h3 className="font-display font-bold italic text-xl uppercase tracking-tight mb-3 text-white">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Why It Works</p>
                <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter leading-none mb-4">
                  THE ROUND THAT KEEPS GOING.
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every step is intentional. Every piece is tied to the round. We build something people remember long after the final putt drops.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-0 border border-border">
                {WHY_IT_WORKS.map((w, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className={`p-6 ${i < WHY_IT_WORKS.length - 1 ? "border-b border-border" : ""} group hover:bg-secondary/40 transition-colors`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-accent font-bold text-2xl leading-none mt-0.5">0{i + 1}</span>
                      <div>
                        <h3 className="font-bold uppercase tracking-wider text-base mb-1 group-hover:text-primary transition-colors">{w.headline}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{w.body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About the Impact / Boys & Girls Club */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase text-sm mb-4">
                About the Impact
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-8">
                GOLF HAS A WAY OF BRINGING PEOPLE TOGETHER.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto mb-6">
                Many of the events we support benefit organizations like the <span className="text-accent font-bold">Boys & Girls Clubs of America</span>, helping young people gain access to mentorship, education, and safe spaces to grow.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg opacity-70 leading-relaxed max-w-3xl mx-auto mb-10">
                This program makes sure golf also gives something back. Every round played helps extend that impact a little further.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-10 text-base uppercase">
                  Plan Your Event Drop <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Where Mulligans Become Memories */}
        <section className="py-24 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <img src="/product-polo.png" alt="Where Mulligans Become Memories" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-display font-black italic text-4xl uppercase tracking-tighter leading-none">
                      Where Mulligans<br/>Become Memories.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-6">
                  CHARITY GOLF HAS ITS OWN KIND OF ENERGY.
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed mb-5">
                  Four-person teams. Shared swings. Mulligans that somehow feel strategic. And a scoreboard nobody fully agrees on by the end of the round.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed mb-5">
                  Almost Elite designs merchandise that fits right into that world. Not generic. Not forgettable. Something people actually wear after the event ends.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-foreground font-bold text-lg">
                  Because when the gear is right, the memory lasts longer.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Event */}
        <section id="featured" className="py-24 bg-zinc-950 text-white">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4 text-center">Featured Event</p>
              <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6 text-center">
                BOYS & GIRLS CLUB<br/>CHARITY OUTING
              </h2>
              <p className="text-white/60 text-base mb-12 tracking-wider uppercase font-semibold text-center">
                May 30th, 2026 — XYZ Golf Course
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src="/hero.png" alt="Boys & Girls Club Outing" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary/40" />
                  <div className="absolute top-5 left-5">
                    <span className="bg-accent text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest">Limited Drop</span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-display font-bold italic text-2xl uppercase">Scramble Specialist</p>
                    <p className="text-white/70 text-sm">Limited-edition event merch</p>
                  </div>
                </div>
                <div className="bg-white/[0.03] border-l border-white/10 p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-white/70 text-lg leading-relaxed mb-5">
                      A day of golf built around four-person teams, shared swings, and the kind of moments that never quite make it onto a scorecard — but always make it into the group chat.
                    </p>
                    <p className="text-white/70 text-lg leading-relaxed mb-5">
                      Almost Elite is proud to bring a limited-edition <span className="text-accent font-bold">Scramble Specialist</span> drop to life. Designed before the first tee, picked up on game day, and worn long after the final putt drops.
                    </p>
                    <p className="text-white/60 text-base leading-relaxed mb-8">
                      Supporting the <span className="text-white font-bold">Boys & Girls Clubs of America</span> — because golf has a way of giving something back.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-8 text-base uppercase w-full">
                      Support The Scramble
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-none h-14 px-8 text-base uppercase font-bold w-full bg-transparent">
                      Join the Round
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Keep the round going: Shop */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="text-center mb-12">
              <p className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Keep The Round Going</p>
              <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter">
                SHOP ALMOST ELITE
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                The round might be finished, but the feeling doesn't leave. Almost Elite gear is built for the course, but it's made to live beyond it.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_PRODUCTS.map((p, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-secondary" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary">
                      <p className="text-primary-foreground text-center font-bold uppercase tracking-wider text-sm">Shop Styles</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-base">{p.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold">{p.price}</span>
                      <span className="text-muted-foreground line-through text-sm">{p.was}</span>
                      <span className="text-accent text-xs font-bold uppercase">Save $25</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wider rounded-none h-14 px-12 text-base uppercase">
                  Browse All Collections <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Partner CTA */}
        <section className="py-24 bg-zinc-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-accent font-bold tracking-widest uppercase text-sm mb-4">Running a Charity Event?</p>
            <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter mb-6">
              PARTNER WITH ALMOST ELITE
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Running a charity scramble, nonprofit outing, or upcoming golf event? We help organizers create custom hats and apparel made specifically for their players. Let us handle the gear so you can handle the round.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="h-14 rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent focus-visible:border-accent"
                required
              />
              <Button
                type="submit"
                className="h-14 px-8 rounded-none bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-wider shrink-0"
              >
                Get Involved <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-background pt-20 pb-10 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <Link href="/" className="font-display font-black italic text-4xl tracking-tighter block mb-4">ALMOST ELITE</Link>
              <p className="text-muted-foreground mb-2 max-w-xs text-sm leading-relaxed">Golf apparel for the rest of us. Performance-ready gear. Municipal-approved attitude.</p>
              <p className="text-muted-foreground text-xs italic">You might not be elite... But you're definitely Almost.</p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-border pb-2 text-sm">Shop</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                {["Men's Collection", "Women's Collection", "Headwear", "Accessories", "The Drop"].map((l, i) => (
                  <li key={i}><Link href="/" className="hover:text-primary transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-border pb-2 text-sm">Charity Rounds</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                {["About The Program", "Partner With Us", "Featured Events", "Boys & Girls Club", "Plan Your Drop"].map((l, i) => (
                  <li key={i}><Link href="#" className="hover:text-primary transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-border pb-2 text-sm">Support</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                {["FAQ", "Shipping & Returns", "Size Guide", "Contact Us", "Our Story"].map((l, i) => (
                  <li key={i}><Link href="#" className="hover:text-primary transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Almost Elite™ | AlmostElite.com</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
