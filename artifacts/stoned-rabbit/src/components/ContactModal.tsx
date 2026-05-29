import { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, Calendar, Users } from "lucide-react";

export function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", email: "", date: "", size: "", notes: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
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
        className="relative z-10 w-full max-w-2xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #133732 0%, #000000 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-1.5 bg-accent w-full" />

        <button onClick={onClose} className="absolute top-5 right-5 z-20 text-white/40 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10">
          {!sent ? (
            <>
              <div className="mb-8">
                <p className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Stoned Rabbit Collaborations</p>
                <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase tracking-tighter leading-none text-white mb-4">
                  LET'S PLAN<br />YOUR DROP.
                </h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  Tell us about your collab idea and we'll put together a custom merch drop that fits your brand, your cause, and your crew.
                </p>
              </div>

              <div className="h-px bg-white/[0.08] mb-8" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="First Last"
                      className="w-full h-12 bg-white/[0.06] border border-white/15 text-white placeholder:text-white/25 px-4 focus:outline-none focus:border-accent text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Organization / Event</label>
                    <input
                      name="org"
                      value={form.org}
                      onChange={handleChange}
                      placeholder="Cannabis Legalization Rally"
                      className="w-full h-12 bg-white/[0.06] border border-white/15 text-white placeholder:text-white/25 px-4 focus:outline-none focus:border-accent text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full h-12 bg-white/[0.06] border border-white/15 text-white placeholder:text-white/25 px-4 focus:outline-none focus:border-accent text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Estimated Event Date</label>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full h-12 bg-white/[0.06] border border-white/15 text-white/70 px-4 focus:outline-none focus:border-accent text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Estimated Group Size</label>
                  <select
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className="w-full h-12 bg-white/[0.06] border border-white/15 text-white/70 px-4 focus:outline-none focus:border-accent text-sm transition-colors"
                  >
                    <option value="" className="bg-[#133732]">Select a range</option>
                    <option value="under-20" className="bg-[#133732]">Under 20 crew</option>
                    <option value="20-50" className="bg-[#133732]">20–50 crew</option>
                    <option value="50-100" className="bg-[#133732]">50–100 crew</option>
                    <option value="100+" className="bg-[#133732]">100+ crew</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/50 text-xs font-bold uppercase tracking-widest block mb-2">Tell us about your event</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Collab drop, street takeover, popup event... give us the vibe."
                    className="w-full bg-white/[0.06] border border-white/15 text-white placeholder:text-white/25 px-4 py-3 focus:outline-none focus:border-accent text-sm resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-accent text-white font-black italic uppercase tracking-widest text-base flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors duration-200 mt-2"
                >
                  Let's Do This <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display font-black italic text-4xl uppercase tracking-tighter text-white mb-4">
                YOU'RE ON THE LIST.
              </h2>
              <p className="text-white/55 text-base leading-relaxed max-w-sm mx-auto mb-3">
                We'll reach out to <span className="text-white font-semibold">{form.email}</span> to kick off your event merch drop.
              </p>
              <p className="text-white/30 text-sm">Stoned Rabbit — graffiti-inspired gear, street-approved attitude.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
