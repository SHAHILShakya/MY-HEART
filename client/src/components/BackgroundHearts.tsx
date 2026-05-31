import { Heart } from "lucide-react";

const BackgroundHearts = () => {
  const hearts = [
    { size: 32, top: '10%', left: '10%', delay: '0s' },
    { size: 24, top: '20%', right: '15%', delay: '2s' },
    { size: 28, bottom: '30%', left: '20%', delay: '4s' },
    { size: 20, top: '60%', right: '25%', delay: '6s' },
    { size: 24, bottom: '20%', right: '10%', delay: '8s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map((heart, index) => (
        <Heart
          key={index}
          size={heart.size}
          className="absolute text-pink-200 opacity-10 animate-float"
          style={{
            top: heart.top,
            bottom: heart.bottom,
            left: heart.left,
            right: heart.right,
            animationDelay: heart.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundHearts;
