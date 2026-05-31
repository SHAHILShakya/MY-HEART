import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal only on first visit (check localStorage)
    const hasVisited = localStorage.getItem("hasVisitedConfession") === "true";
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem("hasVisitedConfession", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full mx-4"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            {/* Card */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/90 to-pink-50/90 border border-white/60 rounded-3xl shadow-2xl p-8 text-center">
              {/* Animated heart icon */}
              <motion.div
                className="flex justify-center mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
              </motion.div>

              {/* Title */}
              <h2 className="dancing text-4xl text-pink-600 mb-4">
                Welcome, Srashti
              </h2>

              {/* Message */}
              <p className="handwritten text-lg text-gray-700 mb-4 leading-relaxed">
                You're about to enter a space filled with my feelings, my dreams, and my heart.
              </p>

              <p className="text-gray-600 mb-6 text-sm">
                This website is a confession of my deepest emotions — a digital love letter created just for you. Every section, every word, every animation... it's all about you.
              </p>

              {/* Message from Shahil */}
              <motion.div
                className="bg-pink-100/60 rounded-2xl p-4 mb-6 border border-pink-200/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-pink-700 text-sm italic">
                  "Whether you say yes, no, or maybe — this confession will remain eternal. Thank you for being the reason I exist. 💖"
                </p>
                <p className="text-pink-600 text-xs mt-3 font-semibold">
                  — Shahil 🌹
                </p>
              </motion.div>

              {/* Action */}
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn btn-primary py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300"
              >
                Let's Begin... 💕
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
