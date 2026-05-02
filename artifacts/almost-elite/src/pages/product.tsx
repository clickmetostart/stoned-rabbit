import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Heart, Share2, ChevronDown, ChevronUp, Star, Truck, RotateCcw, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import GhostWord from "@/components/GhostWord";
import { getProductBySlug, getRelatedProducts } from "@/data/products";

const PAGE_BG = "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-bold uppercase tracking-wider text-sm text-white hover:text-accent transition-colors"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="pb-5 text-white/55 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen text-white flex flex-col" style={{ background: PAGE_BG }}>
        <Navbar />
        <main className="flex-1 flex items-center justify-center flex-col gap-6 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-display font-black italic uppercase text-white leading-none" style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.032 }}>GONE</span>
          </div>
          <h1 className="font-display font-black italic text-6xl uppercase tracking-tighter relative z-10">Product Not Found</h1>
          <p className="text-white/50 relative z-10">That one's not in the bag — yet.</p>
          <Link href="/">
            <button className="bg-accent text-white font-bold uppercase tracking-wider h-12 px-8 hover:bg-white hover:text-black transition-colors relative z-10">
              Back to Home
            </button>
          </Link>
        </main>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.related);
  const savings = product.was
    ? `$${parseInt(product.was.replace("$", "")) - parseInt(product.price.replace("$", ""))}`
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: PAGE_BG }}>
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-6 lg:px-16 py-3 flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-accent transition-colors cursor-pointer">{product.category}</span>
            <span>/</span>
            <span className="text-white/80 font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Product Detail */}
        <section className="relative overflow-hidden">
          <GhostWord word={product.name.split(" ")[0]} className="justify-end opacity-50" />
          <div className="relative z-10 container mx-auto px-6 lg:px-16 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left: Image — parallelogram crop */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div
                  className="relative overflow-hidden aspect-square"
                  style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
                >
                  {product.badge && (
                    <div className="absolute top-4 left-8 z-10 bg-accent text-white text-xs font-bold px-3 py-1.5 uppercase tracking-widest">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-0 border border-white/10 mt-4">
                  {[
                    { icon: <Truck className="w-4 h-4" />, label: "Free Shipping", sub: "Orders over $100" },
                    { icon: <RotateCcw className="w-4 h-4" />, label: "Easy Returns", sub: "30-day policy" },
                    { icon: <Shield className="w-4 h-4" />, label: "Secure", sub: "Always encrypted" },
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col items-center text-center py-4 px-2 ${i < 2 ? "border-r border-white/10" : ""}`}>
                      <div className="text-accent mb-1">{item.icon}</div>
                      <p className="font-bold text-xs uppercase tracking-wide text-white">{item.label}</p>
                      <p className="text-white/40 text-xs">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Product Info */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="lg:pt-4"
              >
                <motion.div variants={fadeInUp} className="flex items-center justify-between mb-3">
                  <p className="text-accent font-bold tracking-widest uppercase text-xs">{product.category}</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                    <span className="text-white/40 text-xs ml-1">(47 reviews)</span>
                  </div>
                </motion.div>

                <motion.h1 variants={fadeInUp} className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-4 text-white">
                  {product.name}
                </motion.h1>

                <motion.div variants={fadeInUp} className="flex items-baseline gap-3 mb-5">
                  <span className="font-display font-black text-3xl text-white">{product.price}</span>
                  {product.was && (
                    <>
                      <span className="text-white/40 line-through text-lg">{product.was}</span>
                      <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wide">
                        Save {savings}
                      </span>
                    </>
                  )}
                </motion.div>

                <motion.p variants={fadeInUp} className="text-white/55 text-base leading-relaxed mb-6 italic border-l-2 border-accent pl-4">
                  {product.shortDesc}
                </motion.p>

                {product.colors.length > 0 && (
                  <motion.div variants={fadeInUp} className="mb-6">
                    <p className="font-bold uppercase tracking-wider text-sm mb-3 text-white">
                      Color: <span className="font-normal text-white/50">{product.colors[selectedColor].name}</span>
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? "border-accent scale-110" : "border-white/20 hover:border-white/50"}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div variants={fadeInUp} className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold uppercase tracking-wider text-sm text-white">
                      Size: <span className={`font-normal ${selectedSize ? "text-white" : "text-white/40"}`}>
                        {selectedSize || "Select a size"}
                      </span>
                    </p>
                    <button className="text-xs text-accent underline font-medium uppercase tracking-wide">Size Guide</button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[52px] h-12 px-3 border font-bold text-sm uppercase tracking-wide transition-all ${
                          selectedSize === size
                            ? "bg-accent text-white border-accent"
                            : "border-white/20 text-white/70 hover:border-accent hover:text-accent bg-transparent"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="text-xs text-white/35 mt-2">Please select a size to add to cart</p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-3 mb-6">
                  <div className="flex items-center border border-white/20 h-14">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-full flex items-center justify-center text-lg font-bold text-white hover:bg-white/10 transition-colors">−</button>
                    <span className="w-10 text-center font-bold text-base text-white">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-12 h-full flex items-center justify-center text-lg font-bold text-white hover:bg-white/10 transition-colors">+</button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`flex-1 h-14 font-black italic uppercase tracking-widest text-base transition-all flex items-center justify-center gap-2 ${
                      addedToCart
                        ? "bg-green-600 text-white"
                        : "bg-accent hover:bg-white hover:text-black text-white"
                    } disabled:opacity-30`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {addedToCart ? "Added to Cart!" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => setWishlisted(w => !w)}
                    className={`w-14 h-14 border flex items-center justify-center transition-all ${
                      wishlisted ? "border-accent bg-accent/10 text-accent" : "border-white/20 text-white/50 hover:border-accent hover:text-accent"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                  </button>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center gap-2 text-white/35 text-xs uppercase tracking-widest mb-8">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share this drop</span>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <AccordionItem title="The Story">
                    <p>{product.description}</p>
                  </AccordionItem>
                  <AccordionItem title="Details & Materials">
                    <ul className="space-y-2">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent font-bold mt-0.5">—</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                  <AccordionItem title="Shipping & Returns">
                    <div className="space-y-2">
                      <p><strong className="text-white">Free shipping</strong> on orders over $100. Standard shipping 5–7 business days.</p>
                      <p><strong className="text-white">Returns:</strong> 30 days from delivery. Unworn and in original condition only.</p>
                      <p>Charity Round drops are final sale — those funds go directly to the cause.</p>
                    </div>
                  </AccordionItem>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="relative py-20 overflow-hidden border-t border-white/10">
            <GhostWord word="MORE" className="justify-end" />
            <div className="relative z-10 container mx-auto px-6 lg:px-16">
              <div className="mb-10">
                <div className="w-16 h-1 bg-accent mb-5" />
                <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter text-white">
                  YOU MIGHT<br />ALSO LIKE.
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link href={`/product/${p.slug}`} className="group block">
                      <div
                        className="relative overflow-hidden aspect-square mb-3"
                        style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
                      >
                        {p.badge && (
                          <div className="absolute top-2 left-4 z-10 bg-accent text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                            {p.badge}
                          </div>
                        )}
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent">
                          <p className="text-white text-center font-bold uppercase tracking-wider text-xs">View Product</p>
                        </div>
                      </div>
                      <p className="font-bold text-sm leading-tight text-white group-hover:text-accent transition-colors">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-white">{p.price}</span>
                        {p.was && <span className="text-white/40 line-through text-xs">{p.was}</span>}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to shop */}
        <div className="py-10 border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-16">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
