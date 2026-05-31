import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export default function InteractiveHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn hearts on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, select, textarea, [role='button']")) return;

      const newHeart: FloatingHeart = { id: nextId, x: e.clientX, y: e.clientY };
      setHearts((prev) => [...prev, newHeart]);
      setNextId((prev) => prev + 1);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1400);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [nextId]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl select-none"
            style={{ left: heart.x - 12, top: heart.y - 12 }}
            initial={{ opacity: 1, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.3, y: -100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
