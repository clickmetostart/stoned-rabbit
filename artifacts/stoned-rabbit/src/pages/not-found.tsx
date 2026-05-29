import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const PAGE_BG = "linear-gradient(160deg, #0f1f2e 0%, #0a1a14 100%)";

export default function NotFound() {
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: PAGE_BG }}>
      <Navbar />
      <main className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Ghost 404 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-black italic uppercase text-white leading-none"
            style={{ fontSize: "clamp(10rem, 40vw, 40rem)", opacity: 0.032 }}
          >
            404
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-accent font-bold tracking-widest uppercase text-sm mb-6">
            Stoned Rabbit — But Not Quite This Page
          </p>
          <h1 className="font-display font-black italic text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6 text-white">
            LOST IN<br />THE WARREN.
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mb-6" />
          <p className="text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            Looks like you took a wrong turn. Take a breather and head back to the main shop.
          </p>
          <Link href="/">
            <button className="inline-flex items-center gap-3 bg-accent text-white font-black italic uppercase tracking-widest px-10 h-14 text-base hover:bg-white hover:text-black transition-colors duration-200">
              <ArrowLeft className="w-5 h-5" />
              Back to the Shop
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
