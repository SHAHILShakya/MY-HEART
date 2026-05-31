import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const FloatingPetal = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="fixed pointer-events-none select-none"
    style={{ left: x, top: -40, fontSize: "1.5rem", zIndex: 0 }}
    animate={{ y: ["0vh", "110vh"], rotate: [0, 360], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 7 + Math.random() * 4, delay, repeat: Infinity, ease: "linear" }}
  >
    🌸
  </motion.div>
);

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 50 }}>

      {/* Deep romantic background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #e1bee7 50%, #f8bbd0 75%, #fce4ec 100%)",
            "linear-gradient(135deg, #e1bee7 0%, #fce4ec 25%, #f8bbd0 50%, #e1bee7 75%, #f8bbd0 100%)",
            "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #e1bee7 50%, #f8bbd0 75%, #fce4ec 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Glowing orbs */}
      <motion.div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,105,180,0.15) 0%, transparent 70%)", top: "-10%", left: "-10%" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(186,104,200,0.15) 0%, transparent 70%)", bottom: "-10%", right: "-10%" }}
        animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
      />

      {/* Falling petals */}
      {[...Array(10)].map((_, i) => (
        <FloatingPetal key={i} delay={i * 0.6} x={Math.random() * window.innerWidth} />
      ))}

      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute text-yellow-300 pointer-events-none select-none"
          style={{ left: `${15 + i * 15}%`, top: `${10 + (i % 3) * 30}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: [0, -20, 0] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
        >
          ✨
        </motion.div>
      ))}

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div
          className="relative rounded-[2.5rem] p-10 md:p-14 overflow-hidden text-center"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1.5px solid rgba(255,255,255,0.8)",
            boxShadow: "0 30px 80px rgba(236,72,153,0.18), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Inner shimmer */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,182,193,0.8), rgba(221,160,221,0.8), transparent)" }}
          />

          {/* Animated beating heart */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-2xl opacity-50" style={{ background: "radial-gradient(circle, #f472b6, transparent)" }} />
              <Heart className="w-16 h-16 fill-pink-400 text-pink-400 relative drop-shadow-lg" />
            </div>
          </motion.div>

          {/* For Srashti label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-pink-400 mb-3"
          >
            A love letter for
          </motion.p>

          {/* Her name */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="dancing mb-2"
            style={{
              fontSize: "clamp(3rem, 10vw, 4.5rem)",
              background: "linear-gradient(135deg, #ec4899, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
              filter: "drop-shadow(0 2px 8px rgba(236,72,153,0.25))",
            }}
          >
            Srashti
          </motion.h1>

          {/* Small divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mx-auto mb-6 h-[2px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #f472b6, transparent)" }}
          />

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="handwritten text-gray-600 mb-2 leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 3vw, 1.3rem)" }}
          >
            Someone who loves you deeply
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="handwritten text-gray-600 mb-8 leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 3vw, 1.3rem)" }}
          >
            has created this just for you...
          </motion.p>

          {/* Subtle quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="rounded-2xl px-6 py-4 mb-8"
            style={{ background: "rgba(252,231,243,0.6)", border: "1px solid rgba(249,168,212,0.4)" }}
          >
            <p className="text-pink-700 italic text-sm leading-relaxed">
              "In a world full of ordinary moments, you are my extraordinary reason to smile every single day."
            </p>
            <p className="text-pink-500 text-xs mt-2 font-semibold">— Shahil 💖</p>
          </motion.div>

          {/* Enter button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(236,72,153,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #f472b6, #a855f7, #ec4899)",
                boxShadow: "0 10px 30px rgba(236,72,153,0.3)",
              }}
            >
              <Sparkles size={20} />
              Open My Confession
              <Heart size={18} className="fill-white" />
            </motion.button>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-gray-400 text-xs mt-6"
          >
            ✨ crafted with every heartbeat ✨
          </motion.p>
        </div>
      </motion.div>

      {/* Floating hearts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`fh-${i}`}
          className="fixed text-3xl pointer-events-none select-none"
          style={{ left: `${10 + i * 20}%`, bottom: "-50px" }}
          animate={{ y: [0, -(window.innerHeight + 100)], opacity: [0, 0.7, 0] }}
          transition={{ duration: 8 + i, delay: i * 1.2, repeat: Infinity, ease: "easeOut" }}
        >
          💗
        </motion.div>
      ))}
    </div>
  );
}
