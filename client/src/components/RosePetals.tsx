import { motion } from "framer-motion";

const Petal = ({ delay, duration }: { delay: number; duration: number }) => {
  const randomX = Math.random() * window.innerWidth;
  const randomRotation = Math.random() * 720;
  const randomOpacity = 0.3 + Math.random() * 0.4;

  return (
    <motion.div
      className="fixed pointer-events-none text-2xl"
      initial={{
        x: randomX,
        y: -50,
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        y: window.innerHeight + 50,
        opacity: [0, randomOpacity, 0],
        rotate: randomRotation,
        x: randomX + (Math.random() - 0.5) * 100,
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        zIndex: -1,
      }}
    >
      🌹
    </motion.div>
  );
};

export default function RosePetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <Petal
          key={i}
          delay={i * 0.8}
          duration={8 + Math.random() * 4}
        />
      ))}
    </div>
  );
}
