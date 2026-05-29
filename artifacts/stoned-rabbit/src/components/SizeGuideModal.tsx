import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";

type Tab = "tops" | "bottoms" | "hats";

const TABS: { id: Tab; label: string }[] = [
  { id: "tops",    label: "Tees & Hoodies" },
  { id: "bottoms", label: "Sweats & Bottoms" },
  { id: "hats",    label: "Hats & Headwear" },
];

const TOP_SIZES = [
  { size: "XS", chest: '32–34"', waist: '26–28"', hip: '34–36"', length: '26"' },
  { size: "S",  chest: '34–36"', waist: '28–30"', hip: '36–38"', length: '27"' },
  { size: "M",  chest: '38–40"', waist: '31–33"', hip: '39–41"', length: '28"' },
  { size: "L",  chest: '42–44"', waist: '34–36"', hip: '42–44"', length: '29"' },
  { size: "XL", chest: '46–48"', waist: '37–40"', hip: '45–47"', length: '30"' },
  { size: "XXL",chest: '50–52"', waist: '41–44"', hip: '48–51"', length: '31"' },
];

const BOTTOM_SIZES = [
  { size: "XS", waist: '26–27"', hip: '34–35"', inseam: '9"',  rise: '9.5"' },
  { size: "S",  waist: '28–29"', hip: '36–37"', inseam: '9"',  rise: '10"'  },
  { size: "M",  waist: '30–32"', hip: '38–40"', inseam: '9.5"',rise: '10.5"'},
  { size: "L",  waist: '33–35"', hip: '41–43"', inseam: '10"', rise: '11"'  },
  { size: "XL", waist: '36–38"', hip: '44–46"', inseam: '10"', rise: '11.5"'},
  { size: "XXL",waist: '39–42"', hip: '47–50"', inseam: '10.5"',rise: '12"' },
];

const HAT_SIZES = [
  { size: "S/M",    head: '21–21¾"', cm: "53–55 cm", fit: "Snapback — tightest setting" },
  { size: "M/L",    head: '22–22¾"', cm: "56–58 cm", fit: "Snapback — mid setting"      },
  { size: "L/XL",   head: '23–23¾"', cm: "58–60 cm", fit: "Snapback — looser setting"   },
  { size: "One Size",head: '21¼–23½"',cm:"54–60 cm", fit: "Adjustable — fits most"      },
];

const tips = [
  { label: "Chest", tip: "Measure around the fullest part of your chest, keeping the tape level." },
  { label: "Waist", tip: "Measure around your natural waistline, just above your hip bones." },
  { label: "Inseam", tip: "Measure from your crotch to the bottom of your ankle." },
  { label: "Head", tip: "Wrap the tape just above your ears and across your forehead." },
];

export function SizeGuideModal({ onClose, defaultTab = "tops" }: { onClose: () => void; defaultTab?: Tab }) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative z-10 w-full max-w-3xl overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          maxHeight: "90vh",
        }}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Orange top bar */}
        <div className="h-1.5 bg-accent flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.08] flex-shrink-0">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-accent" />
            <div>
              <p className="text-accent font-bold tracking-widest uppercase text-xs mb-0.5">Stoned Rabbit</p>
              <h2 className="font-display font-black italic text-3xl uppercase tracking-tighter leading-none text-white">
                SIZE GUIDE
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.08] flex-shrink-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "text-accent border-accent"
                  : "text-white/40 border-transparent hover:text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content — scrollable */}
        <div className="overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              {activeTab === "tops" && (
                <>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    Our tees and hoodies run true to size with a relaxed, comfortable streetwear fit.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[480px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          {["Size", "Chest", "Waist", "Hip", "Length"].map(h => (
                            <th key={h} className="text-left pb-3 pr-6 text-white/35 font-bold uppercase tracking-widest text-xs">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {TOP_SIZES.map((row, i) => (
                          <tr
                            key={row.size}
                            className={`border-b border-white/[0.05] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                          >
                            <td className="py-3.5 pr-6 font-display font-black italic text-lg text-accent uppercase">{row.size}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.chest}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.waist}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.hip}</td>
                            <td className="py-3.5 text-white/70 font-medium">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === "bottoms" && (
                <>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    Our sweats and bottoms are designed for maximum comfort and a clean street look.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[480px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          {["Size", "Waist", "Hip", "Inseam", "Rise"].map(h => (
                            <th key={h} className="text-left pb-3 pr-6 text-white/35 font-bold uppercase tracking-widest text-xs">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {BOTTOM_SIZES.map((row, i) => (
                          <tr
                            key={row.size}
                            className={`border-b border-white/[0.05] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                          >
                            <td className="py-3.5 pr-6 font-display font-black italic text-lg text-accent uppercase">{row.size}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.waist}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.hip}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.inseam}</td>
                            <td className="py-3.5 text-white/70 font-medium">{row.rise}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === "hats" && (
                <>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    All Stoned Rabbit headwear uses adjustable snapback or strap closures. Most styles are one-size-fits-most. Use head circumference for best fit.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[420px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          {["Size", "Head Circumference", "CM", "Fit Notes"].map(h => (
                            <th key={h} className="text-left pb-3 pr-6 text-white/35 font-bold uppercase tracking-widest text-xs">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {HAT_SIZES.map((row, i) => (
                          <tr
                            key={row.size}
                            className={`border-b border-white/[0.05] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                          >
                            <td className="py-3.5 pr-6 font-display font-black italic text-lg text-accent uppercase whitespace-nowrap">{row.size}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.head}</td>
                            <td className="py-3.5 pr-6 text-white/70 font-medium">{row.cm}</td>
                            <td className="py-3.5 text-white/50 text-xs leading-relaxed">{row.fit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* How to Measure */}
              <div className="mt-10 pt-8 border-t border-white/[0.08]">
                <p className="text-white/35 font-bold uppercase tracking-widest text-xs mb-5">How to Measure</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tips
                    .filter(t =>
                      activeTab === "hats"
                        ? t.label === "Head"
                        : activeTab === "bottoms"
                        ? ["Waist", "Inseam"].includes(t.label)
                        : ["Chest", "Waist"].includes(t.label)
                    )
                    .map(tip => (
                      <div key={tip.label} className="flex gap-3 p-4 bg-white/[0.03] border border-white/[0.06]">
                        <div className="w-1 flex-shrink-0 bg-accent self-stretch" />
                        <div>
                          <p className="font-bold uppercase tracking-wider text-xs text-white mb-1">{tip.label}</p>
                          <p className="text-white/40 text-xs leading-relaxed">{tip.tip}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Fit note */}
              <div className="mt-6 p-4 bg-accent/[0.08] border border-accent/20">
                <p className="text-accent font-bold uppercase tracking-widest text-xs mb-1">Stoned Rabbit Fit</p>
                <p className="text-white/50 text-xs leading-relaxed">
                  Our gear is built for full range of motion. Relaxed, comfortable, and session-ready. When in doubt, size up for a more relaxed fit.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
