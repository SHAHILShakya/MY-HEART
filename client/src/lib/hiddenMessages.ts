/**
 * Hidden Messages (Easter Eggs) System
 * 
 * This module manages 8 romantic hidden messages throughout the site.
 * Each message can be discovered through different triggers.
 * 
 * HOW TO EDIT MESSAGES:
 * - Edit the `messages` object below with your custom romantic texts
 * - Each message has: id, title, content, and trigger hint
 * 
 * HOW TO RESET PROGRESS:
 * - Open browser console and run: resetSecrets()
 * - Or: localStorage.removeItem('shahil_secrets_found')
 */

export interface HiddenMessage {
  id: number;
  title: string;
  content: string;
  hint: string;
  found: boolean;
  timestamp?: string;
}

// ========== EDITABLE MESSAGES ========== 
// Replace these with your own heartfelt messages for Srashti
export const messages: Record<number, Omit<HiddenMessage, 'found' | 'timestamp'>> = {
  1: {
    id: 1,
    title: "The Essence of Love",
    content: "Love, in its purest form, is not about possession or expectation. It is a spiritual recognition of another soul. It is the quiet joy of knowing you exist in this world, and that alone is enough to light up my path.",
    hint: "As you begin this journey, a secret awakens from the very air you breathe..."
  },
  2: {
    id: 2,
    title: "Love is a Sanctuary",
    content: "True love is a sanctuary where the soul finds rest. It doesn't ask for anything in return because the act of loving is itself the greatest reward. You are my peace, my quiet prayer, and my most beautiful meditation.",
    hint: "Look closely at the first glimpse of my heart's gallery... Love hides in the details."
  },
  3: {
    id: 3,
    title: "The Patience of a Devoted Soul",
    content: "Patience is the language of eternal love. It is the ability to wait without demand, to care without pressure, and to cherish the distance as much as the closeness. My love for you is a constant, quiet flame that needs no fuel but your happiness.",
    hint: "Linger a while where our story begins to unfold... Secrets reveal themselves to those who wait."
  },
  4: {
    id: 4,
    title: "Divine Connection",
    content: "Our connection transcends the physical realm. It is a meeting of spirits, a harmony of hearts that beats in sync with the universe. I don't need you to be mine to love you; I just need you to be happy, for your joy is the rhythm of my soul.",
    hint: "Time is but a shadow... Stay long enough, and the light of truth will shine through."
  },
  5: {
    id: 5,
    title: "Sacred Gratitude",
    content: "I am profoundly grateful for the mere privilege of knowing you. Every letter of your name is a sacred vibration that resonates with the deepest parts of my being. Thank you for being the divine light that you are, regardless of where our paths lead.",
    hint: "A name so beautiful it deserves to be whispered in every heartbeat..."
  },
  6: {
    id: 6,
    title: "The Ultimate Freedom",
    content: "The highest form of love is to want what is best for the other, even if it doesn't include oneself. My heart is a garden where you are free to bloom in whatever direction your soul desires. Your freedom is my greatest respect for you.",
    hint: "The truth of my heart reveals itself at the peak of our journey..."
  },
  7: {
    id: 7,
    title: "Eternal Belonging",
    content: "To love is to belong to a moment, a feeling, a soul—not a person. I belong to the moment I first saw the universe in your eyes. That belonging is mine to keep, a sacred treasure that requires nothing from you but your existence.",
    hint: "Hold on to the subtle whispers of the soul... Deep connection requires commitment."
  },
  8: {
    id: 8,
    title: "Unconditional Grace",
    content: "Unconditional love is a state of grace. It is seeing the divine in you and honoring it without question. No matter what the future holds, my heart will always be a place of warmth and safety for you, with no strings attached and no debts to be paid.",
    hint: "The final secret is the code to my very soul... It has always been yours to unlock."
  }
};

// ========== Storage Management ==========
const STORAGE_KEY = 'shahil_secrets_found';

interface SavedProgress {
  [key: number]: {
    found: boolean;
    timestamp: string;
  };
}

export function getFoundSecrets(): SavedProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function markSecretAsFound(messageId: number): void {
  const progress = getFoundSecrets();
  progress[messageId] = {
    found: true,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isSecretFound(messageId: number): boolean {
  const progress = getFoundSecrets();
  return progress[messageId]?.found || false;
}

export function getTotalFound(): number {
  const progress = getFoundSecrets();
  return Object.keys(progress).length;
}

export function getAllMessages(): HiddenMessage[] {
  const progress = getFoundSecrets();
  return Object.values(messages).map(msg => ({
    ...msg,
    found: progress[msg.id]?.found || false,
    timestamp: progress[msg.id]?.timestamp
  }));
}

export function resetSecrets(): void {
  localStorage.removeItem(STORAGE_KEY);
  console.log('✨ All secrets have been reset! Refresh the page to start discovering again.');
}

// Make resetSecrets available globally for developer console
if (typeof window !== 'undefined') {
  (window as any).resetSecrets = resetSecrets;
}

// ========== Trigger Handlers ==========

/**
 * Trigger 1: Type "yes" in a hidden input
 */
export function setupTypeYesTrigger(onReveal: (messageId: number) => void): () => void {
  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.value.toLowerCase().trim() === 'yes') {
      if (!isSecretFound(1)) {
        onReveal(1);
        input.value = '';
      }
    }
  };

  const inputs = document.querySelectorAll('.secret-input');
  inputs.forEach(input => input.addEventListener('input', handleInput));

  return () => {
    inputs.forEach(input => input.removeEventListener('input', handleInput));
  };
}

/**
 * Trigger 2: Click element 5 times within 4 seconds
 */
export function setupClickTrigger(
  selector: string,
  onReveal: (messageId: number) => void
): () => void {
  let clicks: number[] = [];
  const CLICK_THRESHOLD = 5;
  const TIME_WINDOW = 4000;

  const handleClick = () => {
    const now = Date.now();
    clicks.push(now);
    clicks = clicks.filter(time => now - time < TIME_WINDOW);

    if (clicks.length >= CLICK_THRESHOLD && !isSecretFound(2)) {
      onReveal(2);
      clicks = [];
    }
  };

  const element = document.querySelector(selector);
  element?.addEventListener('click', handleClick);

  return () => {
    element?.removeEventListener('click', handleClick);
  };
}

/**
 * Trigger 3: Scroll to section and linger for 2 seconds
 */
export function setupScrollTrigger(
  sectionId: string,
  onReveal: (messageId: number) => void
): () => void {
  let timer: NodeJS.Timeout | null = null;

  const handleScroll = () => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !isSecretFound(3)) {
      if (!timer) {
        timer = setTimeout(() => {
          onReveal(3);
        }, 2000);
      }
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial position

  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (timer) clearTimeout(timer);
  };
}

/**
 * Trigger 4: Time-delayed reveal (45 seconds)
 */
export function setupTimeTrigger(onReveal: (messageId: number) => void): () => void {
  const timer = setTimeout(() => {
    if (!isSecretFound(4)) {
      onReveal(4);
    }
  }, 45000);

  return () => {
    clearTimeout(timer);
  };
}

/**
 * Trigger 5: Type sequence "SRASHTI"
 */
export function setupSequenceTrigger(onReveal: (messageId: number) => void): () => void {
  const TARGET_SEQUENCE = 'SRASHTI';
  let typed = '';
  let resetTimer: NodeJS.Timeout;

  const handleKeyPress = (e: KeyboardEvent) => {
    // Only track letter keys
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      typed += e.key.toUpperCase();

      // Reset after 2 seconds of no typing
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        typed = '';
      }, 2000);

      // Check if sequence matches
      if (typed.includes(TARGET_SEQUENCE) && !isSecretFound(5)) {
        onReveal(5);
        typed = '';
      }

      // Keep only last 20 characters to prevent memory issues
      if (typed.length > 20) {
        typed = typed.slice(-20);
      }
    }
  };

  window.addEventListener('keypress', handleKeyPress);

  return () => {
    window.removeEventListener('keypress', handleKeyPress);
    clearTimeout(resetTimer);
  };
}

/**
 * Trigger 6: Called when "Yes" button is clicked
 */
export function triggerYesProposal(onReveal: (messageId: number) => void): void {
  if (!isSecretFound(6)) {
    onReveal(6);
  }
}

/**
 * Trigger 7: Long-press on hidden dot
 */
export function setupLongPressTrigger(
  selector: string,
  onReveal: (messageId: number) => void
): () => void {
  const PRESS_DURATION = 1200;
  let pressTimer: NodeJS.Timeout | null = null;

  const startPress = () => {
    if (isSecretFound(7)) return;
    pressTimer = setTimeout(() => {
      onReveal(7);
    }, PRESS_DURATION);
  };

  const endPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  const element = document.querySelector(selector);
  element?.addEventListener('mousedown', startPress);
  element?.addEventListener('touchstart', startPress);
  element?.addEventListener('mouseup', endPress);
  element?.addEventListener('mouseleave', endPress);
  element?.addEventListener('touchend', endPress);
  element?.addEventListener('touchcancel', endPress);

  return () => {
    element?.removeEventListener('mousedown', startPress);
    element?.removeEventListener('touchstart', startPress);
    element?.removeEventListener('mouseup', endPress);
    element?.removeEventListener('mouseleave', endPress);
    element?.removeEventListener('touchend', endPress);
    element?.removeEventListener('touchcancel', endPress);
    if (pressTimer) clearTimeout(pressTimer);
  };
}

/**
 * Trigger 8: Secret code input
 */
export function checkSecretCode(code: string, onReveal: (messageId: number) => void): boolean {
  if (code.toUpperCase().trim() === 'MYHEART' && !isSecretFound(8)) {
    onReveal(8);
    return true;
  }
  return false;
}

// ========== Micro-Animations ==========
export function createMicroCelebration(container: HTMLElement): void {
  const hearts = ['💕', '💖', '💗', '💝', '💓', '💞'];
  
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: ${20 + Math.random() * 15}px;
      pointer-events: none;
      animation: microFloat 1s ease-out forwards;
      transform-origin: center;
      z-index: 1000;
    `;
    
    // Random direction
    const angle = (Math.PI * 2 * i) / 6;
    const distance = 40 + Math.random() * 20;
    heart.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
    heart.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
    
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
  }
}

// Add micro-animation CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes microFloat {
      0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0);
      }
      50% {
        opacity: 1;
        transform: translate(
          calc(-50% + var(--tx)),
          calc(-50% + var(--ty))
        ) scale(1.2);
      }
      100% {
        opacity: 0;
        transform: translate(
          calc(-50% + var(--tx)),
          calc(-50% + var(--ty) - 20px)
        ) scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}
