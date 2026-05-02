import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";

const TIERS = [
  { name: "Almost Good",   min: 0,    max: 499,  color: "#94a3b8" },
  { name: "Almost Better", min: 500,  max: 999,  color: "hsl(32 90% 55%)" },
  { name: "Almost Elite",  min: 1000, max: Infinity, color: "#facc15" },
];

function getTier(pts: number) {
  return TIERS.findIndex((t) => pts >= t.min && pts <= t.max);
}

export function RewardsBanner() {
  const { items } = useCart();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const points = Math.floor(
    items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return sum + price * item.qty;
    }, 0)
  );

  const tierIdx = getTier(points);
  const tier = TIERS[tierIdx];
  const nextTier = TIERS[tierIdx + 1];
  const toNext = nextTier ? nextTier.min - points : 0;
  const progress = nextTier
    ? Math.min(((points - tier.min) / (nextTier.min - tier.min)) * 100, 100)
    : 100;

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed bottom-0 left-0 right-0 z-[900]"
        style={{ background: "#0b1a14", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Accent top border */}
        <div className="h-[2px]" style={{ background: tier.color }} />

        {/* Collapsed bar */}
        <div className="px-4 lg:px-10 py-3 flex items-center gap-4">
          <Star className="w-4 h-4 flex-shrink-0" style={{ color: tier.color }} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="font-bold text-xs uppercase tracking-widest" style={{ color: tier.color }}>
                {tier.name}
              </span>
              <span className="text-white/35 text-xs">{points.toLocaleString()} pts</span>
              {nextTier && (
                <span className="text-white/25 text-xs hidden sm:inline">
                  {toNext} pts to {nextTier.name}
                </span>
              )}
              {!nextTier && (
                <span className="text-white/25 text-xs hidden sm:inline italic">Top tier unlocked</span>
              )}
            </div>
            {/* Progress bar */}
            <div className="h-1 bg-white/10 rounded-full overflow-hidden max-w-xs">
              <motion.div
                className="h-full rounded-full"
                style={{ background: tier.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Tier pills */}
          <div className="hidden md:flex items-center gap-1.5">
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  border: `1px solid ${i === tierIdx ? t.color : "rgba(255,255,255,0.1)"}`,
                  color: i === tierIdx ? t.color : "rgba(255,255,255,0.25)",
                  background: i === tierIdx ? `${t.color}18` : "transparent",
                }}
              >
                {i === tierIdx && <Star className="w-2.5 h-2.5 fill-current" />}
                {t.name}
              </div>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-white/30 hover:text-white transition-colors p-1 flex-shrink-0"
          >
            <motion.div animate={{ rotate: expanded ? 0 : 180 }}>
              <ChevronUp className="w-4 h-4" />
            </motion.div>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/20 hover:text-white/60 transition-colors p-1 flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Expanded tier details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/[0.06]"
            >
              <div className="px-4 lg:px-10 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    tier: TIERS[0],
                    pts: "0–499 pts",
                    perks: ["Early access to drops", "5% member discount", "Monthly crew newsletter", "Community charity round invites"],
                  },
                  {
                    tier: TIERS[1],
                    pts: "500–999 pts",
                    perks: ["10% member discount", "Free standard shipping", "VIP charity round access", "Priority restock alerts"],
                  },
                  {
                    tier: TIERS[2],
                    pts: "1,000+ pts",
                    perks: ["15% member discount", "Free express shipping", "Exclusive drops (never public)", "1 free accessory per season", "Featured on the Crew Wall"],
                  },
                ].map(({ tier: t, pts, perks }, i) => {
                  const isActive = i === tierIdx;
                  return (
                    <div
                      key={t.name}
                      className="p-4"
                      style={{
                        background: isActive ? `${t.color}10` : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isActive ? t.color + "40" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-3.5 h-3.5" style={{ color: t.color }} fill={isActive ? t.color : "none"} />
                        <span className="font-black italic uppercase text-sm tracking-tight" style={{ color: t.color }}>
                          {t.name}
                        </span>
                      </div>
                      <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest mb-3">{pts}</p>
                      <ul className="space-y-1.5">
                        {perks.map((perk, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs" style={{ color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>
                            <span className="mt-0.5 flex-shrink-0" style={{ color: t.color }}>—</span>
                            {perk}
                          </li>
                        ))}
                      </ul>
                      {isActive && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: t.color }}>
                            ✓ Your current tier
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="px-4 lg:px-10 pb-4 text-white/20 text-[10px]">
                Points are earned at $1 = 1 pt with every purchase. Cart total is used to preview your tier.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
