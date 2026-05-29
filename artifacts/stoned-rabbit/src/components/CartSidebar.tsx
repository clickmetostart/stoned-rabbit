import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";

const SIDEBAR_BG = "linear-gradient(160deg, #133732 0%, #000000 100%)";

export function CartSidebar() {
  const { items, cartOpen, setCartOpen, removeItem, updateQty, subtotal, itemCount, clearCart } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] z-[999] flex flex-col overflow-hidden"
            style={{ background: SIDEBAR_BG, borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Orange top bar */}
            <div className="h-1 bg-accent flex-shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="font-display font-black italic text-2xl uppercase tracking-tighter text-white leading-none">
                  YOUR BAG
                </h2>
                {itemCount > 0 && (
                  <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 leading-none">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
                  <div className="w-20 h-20 bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-white/20" />
                  </div>
                  <div>
                    <p className="font-display font-black italic text-2xl uppercase tracking-tighter text-white mb-2">
                      BAG'S EMPTY.
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">
                      You haven't added anything yet. Let's fix that.
                    </p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="h-12 px-8 bg-accent text-white font-black italic uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-200 flex items-center gap-2"
                  >
                    Shop the Drop <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {items.map((item, i) => (
                    <motion.div
                      key={`${item.slug}-${item.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 px-6 py-5"
                    >
                      {/* Image */}
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="flex-shrink-0 relative overflow-hidden"
                        style={{ width: 80, height: 80, clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="font-display font-black italic text-base uppercase tracking-tight text-white leading-none hover:text-accent transition-colors block mb-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-white/35 text-xs font-bold uppercase tracking-widest mb-3">
                          Size: {item.size}
                        </p>

                        {/* Qty controls + price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-white/15">
                            <button
                              onClick={() => updateQty(item.slug, item.size, -1)}
                              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-white">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.slug, item.size, 1)}
                              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-accent font-bold text-base">
                              ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(0)}
                            </span>
                            <button
                              onClick={() => removeItem(item.slug, item.size)}
                              className="text-white/25 hover:text-white/70 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.08] px-6 pt-5 pb-6 flex-shrink-0 space-y-4">
                {/* Order summary */}
                <div className="space-y-2 pb-4 border-b border-white/[0.06]">
                  <div className="flex justify-between text-white/45 text-sm">
                    <span className="font-bold uppercase tracking-widest text-xs">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/30 text-xs">
                    <span>Shipping</span>
                    <span>{subtotal >= 100 ? "Free" : "Calculated at checkout"}</span>
                  </div>
                  {subtotal >= 100 && (
                    <p className="text-accent text-xs font-bold uppercase tracking-widest">
                      Free shipping unlocked!
                    </p>
                  )}
                  {subtotal < 100 && (
                    <div className="mt-2">
                      <div className="h-1 bg-white/10 w-full">
                        <div
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-white/30 text-xs mt-1">
                        ${(100 - subtotal).toFixed(0)} away from free shipping
                      </p>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline">
                  <span className="font-bold uppercase tracking-widest text-xs text-white/70">Total</span>
                  <span className="font-display font-black italic text-3xl tracking-tighter text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* CTA */}
                <button className="w-full h-14 bg-accent text-white font-black italic uppercase tracking-widest text-base flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors duration-200">
                  Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full h-10 border border-white/15 text-white/50 font-bold uppercase tracking-widest text-xs hover:border-white/40 hover:text-white/80 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
