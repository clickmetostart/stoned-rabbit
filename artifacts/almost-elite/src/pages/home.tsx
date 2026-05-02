import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingCart, Search, User, Menu, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Promotional Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold tracking-wide">
        FREE SHIPPING ON ORDERS OVER $100. WELCOME TO THE CREW.
      </div>

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/" className="font-display font-bold italic text-2xl tracking-tighter">
              ALMOST ELITE
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm tracking-wide">
            <Link href="/" className="font-display font-bold italic text-3xl tracking-tighter mr-6">
              ALMOST ELITE
            </Link>
            <Link href="/men" className="hover:text-primary transition-colors">MEN</Link>
            <Link href="/women" className="hover:text-primary transition-colors">WOMEN</Link>
            <Link href="/hats" className="hover:text-primary transition-colors">HATS</Link>
            <Link href="/accessories" className="hover:text-primary transition-colors">ACCESSORIES</Link>
            <Link href="/drop" className="text-accent hover:text-accent/80 transition-colors">THE DROP</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero.png" 
              alt="Friends golfing casually" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.h1 
                variants={fadeInUp}
                className="font-display font-black italic text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter mb-6"
              >
                ALMOST ELITE.<br/>TOTALLY WORTH IT.
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium"
              >
                Golf clothes that don't take themselves too seriously. Look sharp. Play loose. Have fun.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold tracking-wider rounded-none h-14 px-10 text-lg uppercase">
                  Shop The Drop
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Scrolling Text Marquee */}
        <div className="bg-primary text-primary-foreground overflow-hidden py-4 border-y-4 border-primary-foreground/10">
          <div className="whitespace-nowrap flex font-display font-bold italic text-3xl tracking-widest uppercase">
            <motion.div 
              className="flex gap-8 items-center"
              animate={{ x: [0, -1035] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            >
              <span>ALMOST ELITE</span>
              <span className="text-accent">•</span>
              <span>NOT QUITE PRO</span>
              <span className="text-accent">•</span>
              <span>STILL LOOKING GOOD</span>
              <span className="text-accent">•</span>
              <span>THE CREW &gt; THE SCORE</span>
              <span className="text-accent">•</span>
              <span>ALMOST ELITE</span>
              <span className="text-accent">•</span>
              <span>NOT QUITE PRO</span>
              <span className="text-accent">•</span>
              <span>STILL LOOKING GOOD</span>
              <span className="text-accent">•</span>
              <span>THE CREW &gt; THE SCORE</span>
              <span className="text-accent">•</span>
            </motion.div>
          </div>
        </div>

        {/* Category Row */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { title: "Men's Polos", img: "/product-polo.png" },
                { title: "Women's Tees", img: "/product-womens.png" },
                { title: "Hats", img: "/product-hat.png" },
                { title: "Accessories", img: "/hero.png" }, // Fallback
                { title: "New Arrivals", img: "/drop-editorial.png" }, // Fallback
              ].map((cat, i) => (
                <Link key={i} href={`/category/${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="group block text-center">
                  <div className="relative aspect-square overflow-hidden bg-secondary mb-4 rounded-none">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <h3 className="font-display font-bold italic text-xl uppercase tracking-wide group-hover:text-primary transition-colors">{cat.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <h2 className="font-display font-black italic text-5xl md:text-6xl uppercase tracking-tighter text-foreground leading-none">
                  THE COURSE-TO-BAR<br/>COLLECTION
                </h2>
              </div>
              <Button variant="outline" className="rounded-none border-foreground/20 font-bold uppercase tracking-wider h-12 px-8">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "The Mulliganeer Polo", price: "$68", img: "/product-polo.png", badge: "NEW DROP" },
                { name: "Sunday Scaries Tee", price: "$45", img: "/product-womens.png", badge: "" },
                { name: "19th Hole Snapback", price: "$35", img: "/product-hat.png", badge: "BEST SELLER" },
                { name: "Fairway to Tavern Polo", price: "$68", img: "/product-polo.png", badge: "" },
              ].map((product, i) => (
                <Link key={i} href="#" className="group block bg-card">
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider">
                        {product.badge}
                      </div>
                    )}
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    
                    {/* Quick Add Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold uppercase tracking-wider">
                        Quick Add
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border border-t-0 border-border">
                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-muted-foreground font-medium">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6">
                NOT FOR THE PROS.<br/>FOR THE REST OF US.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl opacity-90 font-medium">
                You're 3 shots back and it doesn't matter. We make gear for the golfer who knows the score (and chooses to ignore it).
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-5xl mx-auto">
              <motion.div variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 mx-auto bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 fill-accent" />
                </div>
                <h3 className="font-display font-bold italic text-2xl uppercase mb-3">For The Fun Of It</h3>
                <p className="opacity-80">Because a bad day of golf is still better than a good day at the office.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 mx-auto bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold italic text-2xl uppercase mb-3">Tee to Tavern</h3>
                <p className="opacity-80">Apparel designed to look just as sharp on the 18th green as it does at the bar afterward.</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 mx-auto bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold italic text-2xl uppercase mb-3">Built for the Crew</h3>
                <p className="opacity-80">It's not about who wins, it's about who you're playing with. And looking better than them.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Drop Editorial */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none"
              >
                <img src="/drop-editorial.png" alt="Golfer at the bar" className="w-full h-full object-cover rounded-none" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent -z-10 hidden md:block" />
                <div className="absolute -top-6 -left-6 w-48 h-48 border-2 border-primary -z-10 hidden md:block" />
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-xl"
              >
                <motion.div variants={fadeInUp} className="text-accent font-bold tracking-widest uppercase mb-4 text-sm">
                  The Latest
                </motion.div>
                <motion.h2 variants={fadeInUp} className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6 text-foreground">
                  THE 19TH HOLE<br/>COLLECTION
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
                  Our newest drop is inspired by the best part of the round: the part after the round. Earthy tones, relaxed fits, and fabrics that breathe. Don't overthink it.
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wider rounded-none h-14 px-10 text-lg uppercase w-full sm:w-auto">
                    Explore The Drop
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 bg-secondary border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display font-black italic text-5xl uppercase tracking-tighter text-foreground mb-4">
                WORD ON THE FAIRWAY
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: "Shot an 87, looked like a scratch golfer. Totally worth it.", author: "Mike T.", handicap: "15 Handicap" },
                { quote: "Finally, a brand that understands I'm just here to drink beers and occasionally hit a ball.", author: "Sarah J.", handicap: "Here for the cart" },
                { quote: "My swing is still garbage, but at least my polo isn't.", author: "Dave R.", handicap: "22 Handicap" },
              ].map((review, i) => (
                <div key={i} className="bg-card p-8 border border-border flex flex-col h-full relative">
                  <div className="flex text-accent mb-4">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-lg italic mb-6 flex-grow">"{review.quote}"</p>
                  <div>
                    <p className="font-bold uppercase tracking-wider">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.handicap}</p>
                  </div>
                  {/* Decorative quote mark */}
                  <div className="absolute top-4 right-6 font-display italic text-8xl text-secondary opacity-50 leading-none">"</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center mb-10">
            <h2 className="font-display font-black italic text-4xl uppercase tracking-tighter mb-2">FOLLOW THE CREW</h2>
            <a href="#" className="text-accent font-bold hover:underline tracking-widest uppercase">@ALMOSTELITE</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-y border-border">
            {[
              "/insta-1.png",
              "/insta-2.png",
              "/product-hat.png",
              "/hero.png",
              "/insta-3.png",
              "/drop-editorial.png"
            ].map((img, i) => (
              <a key={i} href="#" className="relative aspect-square group block overflow-hidden">
                <img src={img} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-primary-foreground font-bold tracking-widest uppercase text-sm border-b-2 border-accent pb-1">View Post</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 bg-zinc-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-display font-black italic text-5xl md:text-7xl uppercase tracking-tighter mb-4">
              JOIN THE CREW
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Get 15% off your first order. No spam, just the good stuff: new drops, early access, and highly questionable golf tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="h-14 rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent focus-visible:border-accent"
                required
              />
              <Button type="submit" className="h-14 px-8 rounded-none bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-wider shrink-0">
                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
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
              <Link href="/" className="font-display font-black italic text-4xl tracking-tighter block mb-4">
                ALMOST ELITE
              </Link>
              <p className="text-muted-foreground mb-6 max-w-xs">
                Golf apparel for the rest of us. Look sharp, play loose, have fun.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">Shop</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
                <li><Link href="/women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
                <li><Link href="/hats" className="hover:text-primary transition-colors">Headwear</Link></li>
                <li><Link href="/accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                <li><Link href="/drop" className="hover:text-primary transition-colors text-accent font-medium">The Drop</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">Support</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                <li><Link href="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 border-b border-border pb-2">About</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/story" className="hover:text-primary transition-colors">Our Story</Link></li>
                <li><Link href="/ambassadors" className="hover:text-primary transition-colors">Ambassadors</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">The 19th Hole Blog</Link></li>
              </ul>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Almost Elite™. Golf for the Rest of Us.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}