import { useEffect } from "react";

const FallingPetals = () => {
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'falling-petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (Math.random() * 3 + 7) + 's';
      petal.style.animationDelay = Math.random() * 2 + 's';
      
      const container = document.getElementById('petals-container');
      if (container) {
        container.appendChild(petal);
        
        setTimeout(() => {
          if (petal.parentNode) {
            petal.remove();
          }
        }, 10000);
      }
    };

    const interval = setInterval(createPetal, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div id="petals-container" className="fixed inset-0 pointer-events-none z-0" />;
};

export default FallingPetals;
