import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, MapPin, Calendar, ArrowRight } from "lucide-react";

const STYLES = ["Matte Black", "Chamber Brass", "Raw Aluminum"];

export function RegisterModal({ onClose }: { onClose: () => void }) {
  const [style, setStyle] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  function handleClaim() {
    if (!style) return;
    setAdded(true);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative z-10 w-full max-w-4xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-1.5 bg-accent w-full" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative overflow-hidden bg-black/30" style={{ minHeight: 420 }}>
            <img
              src="/freedom_tag.png"
              alt="Freedom Tag"
              className="w-full h-full object-cover"
              style={{ minHeight: 420 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden leading-none">
              <span
                className="font-display font-black italic uppercase text-white whitespace-nowrap"
                style={{ fontSize: "clamp(4rem, 12vw, 10rem)", opacity: 0.07 }}
              >
                TAG
              </span>
            </div>

            <div className="absolute top-5 left-5">
              <span className="bg-accent text-white text-xs font-black uppercase px-3 py-1.5 tracking-widest">
                Charity Drop
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display font-black italic text-3xl uppercase text-white leading-tight mb-1">
                Freedom Tag
              </p>
              <p className="text-white/55 text-sm">Limited-edition · Last Prisoner Project</p>
              <p className="text-accent font-black text-2xl mt-3">$25</p>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-7">
                <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">
                  Project Clean Slate — Expungement Initiative
                </p>
                <h2 className="font-display font-black italic text-4xl uppercase tracking-tighter leading-none text-white mb-5">
                  CLAIM YOUR<br />FREEDOM TAG.
                </h2>
                <div className="space-y-2 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Ongoing Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Nationwide Campaign</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Ships directly to you <span className="text-white font-semibold">· Free Shipping</span></span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/[0.08] mb-7" />

              <p className="text-white/55 text-sm leading-relaxed mb-7">
                The custom metal <span className="text-accent font-bold">Freedom Tag</span> is built to represent the movement. Wear it on your keys, your bag, or your stash box. 100% of all proceeds support <span className="text-white font-semibold">The Last Prisoner Project</span> to fund legal clinics and expungement advocacy.
              </p>

              <div className="mb-7">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Select Style</p>
                <div className="flex gap-2">
                  {STYLES.map(s => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`flex-1 h-11 border font-bold uppercase tracking-wider text-xs transition-all duration-150 ${
                        style === s
                          ? "border-accent bg-accent text-white"
                          : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {!style && (
                  <p className="text-white/30 text-xs mt-2">Choose a style to continue</p>
                )}
              </div>
            </div>

            {!added ? (
              <button
                onClick={handleClaim}
                disabled={!style}
                className={`w-full h-14 font-black italic uppercase tracking-widest text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                  style
                    ? "bg-accent text-white hover:bg-white hover:text-black cursor-pointer"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                Claim My Tag — $25 <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-14 bg-green-600/20 border border-green-500/40 flex items-center justify-center gap-2"
              >
                <span className="text-green-400 font-black uppercase tracking-widest text-sm text-center">
                  Order Confirmed · Stay Lifted!
                </span>
              </motion.div>
            )}
            <p className="text-white/25 text-xs text-center mt-4">
              Your tag will ship within 3–5 business days · Tracking email to follow
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
