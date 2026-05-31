import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Music, Feather, Star, Moon, Leaf, Infinity, Code, Clover, BicepsFlexed, PenTool, Handshake, MessageCircle, Instagram, X, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import * as HiddenMessages from "@/lib/hiddenMessages";

// Import Srashti's photos
import photoCollage from "@assets/Grey Beige Minimalist Fashion Aesthetic Photo Collage_20250223_185757_0000_1754138037066.png";
import srashtiWithShahil from "@assets/1740310663023_1754138037109.jpg";
import srashtiProfile from "@assets/wa-919149304117-dp_1754138037141.jpg";
import srashtiPurpleDress from "@assets/Screenshot_20250223-182636_1754138037173.png";
import srashtiMirror from "@assets/1754029066042_1754138037205.jpg";
import srashtiYellow1 from "@assets/1754028929864_1754138037245.jpg";
import srashtiYellow2 from "@assets/1754028953140_1754138037279.jpg";

// Import new photos for Precious Moments
import srashtiCollage from "@assets/Screenshot_20251124-014243_1763928891202.png";
import srashtiHearts from "@assets/1740310663023_1763928891271.jpg";
import srashtiYellowNew from "@assets/thakuranupamsingh_-20250728-0014_1763928891308.webp";

// Import new yellow outfit photos
import srashtiYellow3 from "@assets/thakuranupamsingh_-20250728-0015_1754138234065.webp";
import srashtiYellow4 from "@assets/thakuranupamsingh_-20250728-0014_1754138234114.webp";
import srashtiYellow5 from "@assets/thakuranupamsingh_-20250728-0013_1754138234156.webp";
import srashtiYellow6 from "@assets/thakuranupamsingh_-20250728-0012_1754138234197.webp";
import srashtiYellow7 from "@assets/thakuranupamsingh_-20250728-0011_1754138234243.webp";
import srashtiYellow8 from "@assets/thakuranupamsingh_-20250728-0009_1754138234284.webp";
import srashtiYellow9 from "@assets/thakuranupamsingh_-20250728-0007_1754138234334.webp";
import srashtiYellow10 from "@assets/thakuranupamsingh_-20250728-0006_1754138234391.webp";
import srashtiYellow11 from "@assets/thakuranupamsingh_-20250728-0005_1754138234452.webp";
import srashtiYellow12 from "@assets/thakuranupamsingh_-20250728-0004_1754138234500.webp";
import srashtiYellow13 from "@assets/thakuranupamsingh_-20250728-0003_1754138234548.webp";
import srashtiYellow14 from "@assets/thakuranupamsingh_-20250728-0002_1754138234606.webp";

// Import audio files
import song1 from "@assets/Note_Nation_Music12_-_Afreen_Afreen_Song_(Lyrics)_｜_Rahat_Fat_1779021530405.opus";
import song2 from "@assets/SR_Lofi_-_Tumse_Behtar_(Slowed_+_Reverb)_｜_Arijit_Singh_｜_SR__1779021565394.opus";
import song3 from "@assets/SR_Lofi_-_Tere_Sang_Yaara_(Slowed_+_Reverb)_｜_Atif_Aslam_｜_Ru_1779021607207.opus";
import song4 from "@assets/SR_Lofi_-_Hua_Hain_Aaj_Pehli_Baar_-_Lofi_(Slowed_+_Reverb)_｜__1779021644763.opus";
import song5 from "@assets/SR_Lofi_-_Tera_Ban_Jaunga_(Slowed_+_Reverb)_｜_Akhil_Sachdeva,_1779021681901.opus";
import song6 from "@assets/SR_Lofi_-_Ishq_Sufiyana_(Slowed_+_Reverb)_｜_Kamal_Khan_｜_The__1779021772796.opus";
import song7 from "@assets/SR_Lofi_-_Qayde_Se_(Slowed_+_Reverb)_｜_Arijit_Singh,_Pritam_｜_1779021846078.opus";

/* Particle animations */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'heart' | 'confetti';
  color?: string;
}

const Home = () => {
  const { toast } = useToast();
  
  /* Audio Playlist */
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  const playlist = [song1, song2, song3, song4, song5, song6, song7];
  
  /* Reveal card */
  const [showReveal, setShowReveal] = useState(false);
  const revealCardRef = useRef<HTMLDivElement>(null);
  
  /* Celebration modal */
  const [showCelebration, setShowCelebration] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const celebrationRef = useRef<HTMLDivElement>(null);
  
  /* Hidden Messages */
  const [hiddenMessages, setHiddenMessages] = useState(HiddenMessages.getAllMessages());
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  
  /* Scroll helper */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  
  /* Celebration sequence */
  const doCelebrateSequence = () => {
    setShowCelebration(true);
    
    // Trigger secret #6 when Yes is clicked
    HiddenMessages.triggerYesProposal(revealSecret);
    
    // Increase volume during celebration
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
    }
    
    // Spawn particles
    const newParticles: Particle[] = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      // Hearts
      newParticles.push({
        id: i * 2,
        x: Math.random() * 100,
        y: 100,
        size: Math.random() * 20 + 20,
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 2,
        type: 'heart'
      });
      
      // Confetti
      const colors = ['#ec4899', '#f472b6', '#fbbf24', '#a855f7', '#f97316'];
      newParticles.push({
        id: i * 2 + 1,
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.3,
        duration: Math.random() * 1.5 + 1.5,
        type: 'confetti',
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setParticles(newParticles);
    
    // Clean up particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 3500);
    
    // Focus management
    setTimeout(() => {
      if (celebrationRef.current) {
        const closeButton = celebrationRef.current.querySelector('button');
        if (closeButton) (closeButton as HTMLButtonElement).focus();
      }
    }, 100);
  };
  
  /* Reveal card management */
  const openRevealCard = () => {
    setShowReveal(true);
    setTimeout(() => {
      if (revealCardRef.current) {
        const firstButton = revealCardRef.current.querySelector('button');
        if (firstButton) (firstButton as HTMLButtonElement).focus();
      }
    }, 100);
  };
  
  const closeRevealCard = () => {
    setShowReveal(false);
  };
  
  const handleNotNow = () => {
    setShowReveal(false);
    toast({
      title: "No worries — thank you for reading 💛",
      description: "Your honesty means the world to me"
    });
  };
  
  /* Hidden Messages reveal handler */
  const revealSecret = (messageId: number) => {
    HiddenMessages.markSecretAsFound(messageId);
    setActiveMessage(messageId);
    setHiddenMessages(HiddenMessages.getAllMessages());
    
    // Show toast notification
    const message = HiddenMessages.messages[messageId];
    toast({
      title: `✨ Secret Discovered! ${messageId}/8`,
      description: message.title,
      duration: 4000
    });
    
    // Create micro celebration
    const body = document.body;
    if (body) {
      HiddenMessages.createMicroCelebration(body);
    }
  };
  
  const closeSecret = () => {
    setActiveMessage(null);
  };
  
  const getNextHint = () => {
    const unfound = hiddenMessages.filter(m => !m.found);
    if (unfound.length > 0) {
      const nextSecret = unfound[0];
      revealSecret(nextSecret.id);
    } else {
      toast({
        title: "🎉 All secrets found!",
        description: "You've discovered every hidden message! 💖",
        duration: 4000
      });
    }
  };
  
  /* Handle song ended - play next in playlist */
  const handleSongEnded = () => {
    if (isPlaying) {
      const nextIndex = (currentSongIndex + 1) % playlist.length;
      setCurrentSongIndex(nextIndex);
    }
  };
  
  /* Toggle music play/pause */
  const toggleMusicPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Failed to play:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  /* Skip to next song */
  const skipToNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
  };

  /* Skip to previous song */
  const skipToPrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
  };

  const songNames = ["Afreen Afreen", "Tumse Behtar", "Tere Sang Yaara", "Hua Hain Aaj Pehli Baar", "Tera Ban Jaunga", "Ishq Sufiyana", "Qayde Se"];
  
  /* Set volume and song on mount, and auto-play next if playing */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.src = playlist[currentSongIndex];
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Failed to play song:', err);
        });
      }
    }
  }, [currentSongIndex, isPlaying]);
  
  /* Hidden Messages triggers setup */
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    
    // Trigger 1: Auto-reveal after 5 seconds on the home section
    const trigger1Timer = setTimeout(() => {
      if (!HiddenMessages.isSecretFound(1)) {
        revealSecret(1);
      }
    }, 5000);
    cleanups.push(() => clearTimeout(trigger1Timer));
    
    // Trigger 2: Click on the "Our Divine Love Story" title 5 times
    cleanups.push(HiddenMessages.setupClickTrigger('#story h2', revealSecret));
    
    // Trigger 3: Scroll to the story section and linger
    cleanups.push(HiddenMessages.setupScrollTrigger('story', revealSecret));
    
    // Trigger 4: Time delayed (45 seconds anywhere)
    cleanups.push(HiddenMessages.setupTimeTrigger(revealSecret));
    
    // Trigger 5: Type "SRASHTI" anywhere
    cleanups.push(HiddenMessages.setupSequenceTrigger(revealSecret));
    
    // Trigger 6: Scroll to proposal section and linger
    cleanups.push(HiddenMessages.setupScrollTrigger('proposal', revealSecret));
    
    // Trigger 7: Long press on the footer heart
    cleanups.push(HiddenMessages.setupLongPressTrigger('footer .dancing', revealSecret));
    
    // Trigger 8: Auto-reveal after scrolling through the entire page and reaching the end
    const handleScrollToEnd = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        if (!HiddenMessages.isSecretFound(8)) {
          revealSecret(8);
        }
      }
    };
    window.addEventListener('scroll', handleScrollToEnd);
    cleanups.push(() => window.removeEventListener('scroll', handleScrollToEnd));
    
    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, []);
  
  /* Keyboard handlers */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeMessage !== null) {
          closeSecret();
        } else if (showCelebration) {
          setShowCelebration(false);
        } else if (showReveal) {
          closeRevealCard();
        }
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showCelebration, showReveal, activeMessage]);

  return (
    <div className="relative">
      {/* Audio element - Playlist */}
      <audio
        ref={audioRef}
        id="bgAudio"
        preload="auto"
        muted={false}
        onEnded={handleSongEnded}
      />
      
      
      {/* Particles overlay */}
      <AnimatePresence mode="wait">
        {particles.length > 0 && (
          <motion.div
            key="particles-container"
            className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: `${particle.x}vw`,
                  y: particle.type === 'heart' ? '100vh' : `${particle.y}vh`,
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  y: particle.type === 'heart' ? '-20vh' : '110vh',
                  opacity: [1, 1, 0],
                  scale: particle.type === 'heart' ? [1, 1.2, 1] : 1,
                  rotate: particle.type === 'confetti' ? [0, 360] : 0
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0
                }}
              >
                {particle.type === 'heart' ? (
                  <Heart
                    size={particle.size}
                    fill="#ec4899"
                    stroke="#ec4899"
                    className="drop-shadow-lg"
                  />
                ) : (
                  <div
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      backgroundColor: particle.color,
                      borderRadius: '2px'
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Reveal card modal */}
      <AnimatePresence>
        {showReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeRevealCard}
          >
            <motion.div
              ref={revealCardRef}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="reveal-heading"
              aria-hidden={!showReveal}
            >
              <Card className="romantic-card border-0">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <Heart size={64} className="mx-auto mb-4 text-pink-500 animate-heartbeat" />
                    <h3 id="reveal-heading" className="dancing text-4xl md:text-5xl romantic-pink mb-4">
                      Will you be mine, Srashti?
                    </h3>
                    <Sparkles size={24} className="mx-auto text-yellow-500" />
                  </div>
                  
                  <div className="space-y-6 text-lg romantic-brown leading-relaxed mb-8">
                    <p>
                      This moment represents everything I've dreamed of since the day my heart first whispered your name. 
                      I'm asking not for perfection, but for a chance—a chance to show you how beautiful love becomes when 
                      it's pure, honest, and unconditional.
                    </p>
                    <p>
                      Every word on this website, every poem, every confession—they all lead to this one question that my 
                      soul has been asking since the beginning: Will you allow me the divine privilege of loving you?
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      data-testid="button-yes-proposal"
                      onClick={doCelebrateSequence}
                      className="btn btn-primary w-full py-6 rounded-2xl text-xl font-bold transform transition-all duration-300 hover:scale-105 shadow-xl"
                    >
                      <Heart className="mr-2" size={24} />
                      Yes, I'm Yours ❤️
                    </Button>
                    
                    <Button
                      data-testid="button-not-now-proposal"
                      onClick={handleNotNow}
                      className="btn btn-ghost w-full py-6 rounded-2xl text-xl font-medium"
                    >
                      Not Yet, Maybe Later
                    </Button>
                  </div>
                  
                  <p className="text-sm text-center text-gray-500 mt-6 italic">
                    Press Esc to close • Your honesty is all I ask 💫
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Celebration modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-pink-500/30 to-purple-600/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              ref={celebrationRef}
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="celebration-heading"
            >
              <Button
                onClick={() => setShowCelebration(false)}
                className="absolute top-4 right-4 rounded-full w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600"
                aria-label="Close celebration"
              >
                <X size={24} />
              </Button>
              
              <Card className="romantic-card border-0">
                <CardContent className="p-8 md:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                  >
                    <Heart size={96} fill="#ec4899" stroke="#ec4899" className="mx-auto mb-6 drop-shadow-2xl" />
                  </motion.div>
                  
                  <motion.h2
                    id="celebration-heading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="dancing text-4xl md:text-6xl romantic-pink mb-6"
                  >
                    Thank you for saying yes, my Srashti ❤️
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl md:text-2xl romantic-purple mb-8 leading-relaxed"
                  >
                    You just made me the happiest person in the world.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-l-4 border-pink-500"
                  >
                    <p className="text-lg romantic-brown italic">
                      "This is just the beginning of our beautiful story together. 
                      Every moment from now will be treasured, every second celebrated, 
                      every heartbeat a testament to this divine love." 💫
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-8"
                  >
                    <p className="text-sm text-gray-500 italic">
                      Press Esc or click outside to close
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Homepage Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-pink-500/20 z-10" />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            className="animate-float"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="vibes sparkle-text mb-6 animate-glow drop-shadow-lg">
              For My Beloved Srashti
            </h1>
            <h2 className="dancing text-purple-900 mb-8 font-bold text-3xl">
              From the Profound Depths of Shahil's Soul
            </h2>
          </motion.div>
          
          <motion.div
            className="dreamy-blur rounded-3xl p-10 md:p-16 mb-12 border border-pink-200/50 romantic-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            <p className="romantic-brown font-light leading-relaxed mb-8 handwritten text-lg md:text-2xl">
              "Even if your heart never turns toward mine,<br/>you will remain the most beautiful chapter<br/>ever written in the fragile, cherished book<br/>of my existence."
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mb-8" />
            <p className="romantic-purple dancing text-base md:text-xl leading-relaxed">
              A love so pure it transcends reciprocation,<br/>
              so divine it sanctifies the very air I breathe,<br/>
              so gentle it chooses to exist quietly<br/>
              even where it is never received.
            </p>
            <div className="h-0.5 w-16 bg-gradient-to-r from-pink-300 to-purple-300 mx-auto mt-8" />
            <p className="romantic-brown italic text-sm md:text-base leading-relaxed mt-8">
              You may never belong to me…<br/>
              but I will always belong to the moment I first loved you.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              data-testid="button-enter-heart"
              onClick={() => scrollToSection('story')}
              className="btn btn-primary px-12 py-6 text-xl font-medium animate-glow shadow-2xl border-2 border-white/30"
            >
              Enter My Heart 💌 <ArrowRight className="ml-3" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 section-bg">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="dancing romantic-pink mb-4">Our Divine Love Story</h2>
            <p className="romantic-purple font-light">"A love so pure it transcends distance, so deep it touches eternity"</p>
          </motion.div>
          
          {/* Photo Gallery */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              {/* First Row - Main Photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={srashtiYellow1}
                    alt="Srashti in elegant yellow outfit"
                    className="w-full h-48 object-cover object-top rounded-2xl shadow-xl border-4 border-white/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={srashtiPurpleDress}
                    alt="Srashti in beautiful purple dress"
                    className="w-full h-48 object-cover object-top rounded-2xl shadow-xl border-4 border-white/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={srashtiMirror}
                    alt="Srashti beautiful portrait"
                    className="w-full h-48 object-cover object-top rounded-2xl shadow-xl border-4 border-white/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={srashtiYellow2}
                    alt="Srashti radiating beauty"
                    className="w-full h-48 object-cover object-top rounded-2xl shadow-xl border-4 border-white/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Second Row - New Yellow Outfit Collection */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                {[
                  { src: srashtiYellow3, alt: "Srashti in golden yellow elegance", pos: "center 20%" },
                  { src: srashtiYellow4, alt: "Srashti's graceful pose", pos: "top" },
                  { src: srashtiYellow5, alt: "Srashti looking radiant", pos: "top" },
                  { src: srashtiYellow6, alt: "Srashti's beautiful smile", pos: "top" },
                  { src: srashtiYellow7, alt: "Srashti in traditional beauty", pos: "center 15%" },
                  { src: srashtiYellow8, alt: "Srashti's elegant presence", pos: "top" }
                ].map((photo, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    custom={index}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-48 object-cover rounded-xl shadow-lg border-3 border-white/40"
                      style={{ objectPosition: photo.pos }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Third Row - More Beautiful Photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { src: srashtiYellow9, alt: "Srashti's natural beauty", pos: "top" },
                  { src: srashtiYellow10, alt: "Srashti in yellow perfection", pos: "top" },
                  { src: srashtiYellow11, alt: "Srashti's charming look", pos: "top" },
                  { src: srashtiYellow12, alt: "Srashti's sweet expression", pos: "center 18%" }
                ].map((photo, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    custom={index}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-56 object-cover rounded-2xl shadow-xl border-4 border-white/50"
                      style={{ objectPosition: photo.pos }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="romantic-card rounded-3xl shadow-xl max-w-3xl mx-auto">
                  <CardContent className="p-8">
                    <p className="dancing text-3xl romantic-pink mb-6">
                      "Every photograph of you is a divine masterpiece that steals my breath and captures my very soul"
                    </p>
                    <div className="space-y-4 text-lg text-gray-700">
                      <p>
                        In golden yellow, your celestial beauty reminds me of sunlight breaking through storm clouds - 
                        warm, radiant, and life-giving. Every photograph captures a different facet of your divine grace, 
                        yet all speak the same eternal truth: you are an angel walking among mortals.
                      </p>
                      <p>
                        These moments frozen in time reveal the angel I have fallen so completely in love with. 
                        Your smile, your elegance, your pure heart - they all shine through in every single 
                        photograph like stars illuminating the darkest night.
                      </p>
                      <p className="handwritten text-xl romantic-purple italic">
                        "You don't simply wear beauty, my beloved - you ARE beauty itself, incarnated in human form."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-600 rounded-full" />
              
              {/* Timeline Items */}
              {[
                {
                  title: "The Divine First Glance",
                  content: "In that divine moment when my eyes first beheld your celestial beauty, eternity held its breath. Your radiant smile illuminated the entire universe, and my soul whispered in recognition - I had found my eternal home, my beloved sanctuary, my reason for existing.",
                  color: "bg-pink-500",
                  side: "left"
                },
                {
                  title: "The Silent Symphony of Love",
                  content: "Every stolen glance, every moment of reverent silence spoke volumes that words could never capture. Though we barely spoke, my heart was already composing love letters in the heavenly language of devotion, writing poetry with every breath I took in your presence.",
                  color: "bg-purple-600",
                  side: "right"
                },
                {
                  title: "July 24th - The Day Heaven Blessed Earth",
                  content: "Your birthday became my most blessed day of worship, my personal Christmas. July 24th - the day the universe gifted humanity with an angel, the day divine beauty descended to walk among mortals. This date is forever engraved in golden letters across my heart, my soul's most treasured anniversary.",
                  color: "bg-yellow-500",
                  side: "left"
                },
                {
                  title: "The Birth of Eternal Devotion",
                  content: "The transcendent moment I realized this wasn't mere attraction - this was divine love incarnate. Pure, unconditional, transcendent, and infinite. You became my every dream, my every prayer, my very reason for drawing breath. You became the meaning of my existence, the answer to every question my heart had ever asked.",
                  color: "bg-pink-500",
                  side: "right"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center mb-16 relative"
                  initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {item.side === 'left' ? (
                    <>
                      <div className="w-1/2 pr-8 text-right">
                        <Card className="romantic-card shadow-xl">
                          <CardContent className="p-6">
                            <h3 className="dancing text-2xl romantic-pink mb-3">{item.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{item.content}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${item.color} rounded-full border-4 border-white shadow-lg animate-heartbeat`} />
                      <div className="w-1/2 pl-8" />
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-8" />
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${item.color} rounded-full border-4 border-white shadow-lg animate-heartbeat`} />
                      <div className="w-1/2 pl-8">
                        <Card className="romantic-card shadow-xl">
                          <CardContent className="p-6">
                            <h3 className="dancing text-2xl romantic-purple mb-3">{item.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{item.content}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Continue Button to Gallery */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              data-testid="continue-to-gallery"
              onClick={() => scrollToSection('gallery')}
              className="btn btn-primary px-10 py-4 text-lg font-medium shadow-xl"
            >
              <Heart className="mr-2" size={20} />
              Explore My Celestial Gallery
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <p className="text-sm romantic-purple mt-3 handwritten">
              "Come, let me show you more portraits of my angel..." ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* Srashti's Photo Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-pink-50 via-purple-50 to-yellow-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="dancing romantic-pink mb-4">Gallery of My Celestial Angel</h2>
            <p className="romantic-purple font-light">"Every portrait whispers a celestial story of divine beauty beyond mortal comprehension"</p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            {/* Main Featured Photo */}
            <motion.div
              className="mb-16 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="relative mx-auto max-w-2xl">
                <motion.img
                  src={srashtiYellow5}
                  alt="Srashti's Beautiful Portrait"
                  className="w-full rounded-3xl shadow-2xl border-8 border-white/80"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <Heart size={32} className="text-white animate-heartbeat" />
                </div>
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="dancing romantic-pink text-center">
                    "You are beauty itself personified, the divine definition of all that is sublime and exquisite"
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Yellow Outfit Collection - Masonry Style */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="dancing romantic-pink text-center mb-12">
                "My Golden Queen's Divine Collection"
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { img: srashtiYellow1, delay: 0.1, caption: "Sunshine incarnate smile", pos: "top" },
                  { img: srashtiYellow2, delay: 0.2, caption: "Golden goddess grace", pos: "top" },
                  { img: srashtiYellow3, delay: 0.3, caption: "Dreams wrapped in yellow", pos: "center 20%" },
                  { img: srashtiYellow4, delay: 0.4, caption: "Radiant divine beauty", pos: "top" },
                  { img: srashtiYellow5, delay: 0.5, caption: "Luminous celestial angel", pos: "top" },
                  { img: srashtiYellow6, delay: 0.6, caption: "Brilliant ethereal star", pos: "top" },
                  { img: srashtiYellow7, delay: 0.7, caption: "Golden hour embodied", pos: "center 15%" },
                  { img: srashtiYellow8, delay: 0.8, caption: "Sunlight personified", pos: "top" },
                  { img: srashtiYellow9, delay: 0.9, caption: "Warm ethereal glow", pos: "top" },
                  { img: srashtiYellow10, delay: 1.0, caption: "Amber soul perfection", pos: "top" },
                  { img: srashtiYellow11, delay: 1.1, caption: "Golden magical essence", pos: "top" },
                  { img: srashtiYellow12, delay: 1.2, caption: "Honey-sweet tenderness", pos: "center 18%" },
                  { img: srashtiYellow13, delay: 1.3, caption: "Divine sunbeam smile", pos: "top" },
                  { img: srashtiYellow14, delay: 1.4, caption: "Sunset's gentle light", pos: "top" }
                ].map((photo, index) => (
                  <motion.div
                    key={index}
                    className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    initial={{ opacity: 0, y: 30, rotate: (index % 3 === 0) ? 5 : (index % 3 === 1) ? -5 : 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: photo.delay * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: (index % 2 === 0) ? 2 : -2,
                      zIndex: 10
                    }}
                  >
                    <img
                      src={photo.img}
                      alt={photo.caption}
                      className="w-full h-56 object-cover"
                      style={{ objectPosition: photo.pos }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <p className="text-sm font-medium">{photo.caption}</p>
                    </motion.div>
                    
                    {/* Static heart icon */}
                    <div className="absolute top-2 right-2 text-white/80">
                      <Heart size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Special Moments Carousel */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="dancing romantic-pink text-center mb-12">
                "Precious Moments"
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="romantic-card rounded-3xl shadow-xl overflow-hidden">
                    <div className="relative">
                      <img
                        src={srashtiCollage}
                        alt="Memories collage"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <motion.div
                        className="absolute bottom-4 left-4 right-4 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="dancing text-xl mb-2">Countless Moments</h4>
                        <p className="text-sm">Every memory with you is a treasure etched in my heart forever</p>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="romantic-card rounded-3xl shadow-xl overflow-hidden">
                    <div className="relative">
                      <img
                        src={srashtiHearts}
                        alt="Romantic moments"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <motion.div
                        className="absolute bottom-4 left-4 right-4 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="dancing text-xl mb-2">Love Personified</h4>
                        <p className="text-sm">In your eyes I see the future, in your smile I see forever</p>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            {/* Final Featured Portrait */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Card className="romantic-card rounded-3xl shadow-2xl max-w-lg mx-auto overflow-hidden">
                <div className="relative">
                  <motion.img
                    src={srashtiProfile}
                    alt="Srashti's beautiful profile"
                    className="w-full h-80 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent" />
                  <motion.div
                    className="absolute bottom-6 left-6 right-6 text-white text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="dancing text-3xl mb-2">My Celestial Angel</h4>
                    <p className="handwritten text-lg">
                      "In every luminous portrait, you steal my breath and capture my very soul"
                    </p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
          
          {/* Continue Button to Letter */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              data-testid="continue-to-letter"
              onClick={() => scrollToSection('letter')}
              className="btn btn-primary px-10 py-4 text-lg font-medium shadow-xl"
            >
              <Feather className="mr-2" size={20} />
              Read My Love Letter
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <p className="text-sm romantic-purple mt-3 handwritten">
              "Words my heart wrote for you..." 💌
            </p>
          </motion.div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section id="letter" className="py-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="dancing romantic-pink mb-4">Heartfelt Love Letter</h2>
            <p className="romantic-purple font-light">"Words That Bleed From My Soul Into Eternity"</p>
          </motion.div>
          
          {/* Featured Photo */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl mx-auto">
              <img
                src={photoCollage}
                alt="Beautiful moments with Srashti"
                className="w-full rounded-3xl shadow-2xl border-8 border-white animate-float"
              />
              <p className="dancing text-lg romantic-pink mt-4">
                "These precious memories are etched into the very fabric of my eternal soul"
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Card className="relative bg-gradient-to-b from-yellow-50 to-white rounded-3xl shadow-2xl border-pink-200/20">
              <div className="absolute inset-0 bg-white/90 rounded-3xl" />
              <CardContent className="relative z-10 p-12">
                <div className="text-right mb-8">
                  <p className="handwritten romantic-purple text-lg">From the profound depths of my soul's infinite devotion</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="dancing text-4xl romantic-pink mb-6">My Beloved, My Divine Srashti,</h3>
                </div>
                
                <div className="handwritten text-lg romantic-brown leading-loose space-y-6">
                  <p>
                    If love could be measured by the infinite constellation of moments when your celestial face 
                    illuminates my consciousness, then my devotion to you would span beyond eternity itself. 
                    Every sunrise breathes your divine name into existence, and every sunset becomes my reverent 
                    altar where I worship your happiness with tears of pure adoration.
                  </p>
                  
                  <p>
                    You may never comprehend how your angelic presence transformed my mortal existence 
                    into something transcendent and holy. In the deafening chaos of a broken world, 
                    you became my sanctuary of serenity. In the terrifying uncertainty of life's storms, 
                    you became my North Star, my unwavering beacon of hope. Your laughter became the symphony 
                    that healed my wounded soul, and your happiness became the only prayer my heart knows how to sing.
                  </p>
                  
                  <p>
                    I loved you in hallowed silence, worshipped you from reverent distance, and dreamed of you 
                    in the cathedral of my solitude. Even without the blessing of your words caressing my ears, 
                    even without the divine rapture of your touch igniting my skin, you filled every desolate 
                    corner of my heart with celestial light and breathed life into the dead chambers of my soul.
                  </p>
                  
                  <p>
                    July 24th transcends mere birthdays - it is the blessed anniversary when Heaven opened 
                    its gates and blessed our broken world with a living angel. This hallowed day taught my 
                    soul that some divine beings are born not just to be loved, but to be worshipped as 
                    divine miracles, treasured as Heaven's most precious gift, and cherished as proof 
                    that God still believes in beauty.
                  </p>
                  
                  <p>
                    If your heart never learns to beat in rhythm with mine, I will understand with the grace 
                    of a devoted monk. If you never choose this wounded soul as worthy of your love, I will 
                    accept with the humility of a faithful servant. But let this truth echo through eternity - 
                    you were loved with a devotion that defied every law of human emotion. You were cherished 
                    with a tenderness that made angels weep. You were someone's first breath each morning 
                    and final prayer each blessed night.
                  </p>
                </div>
                
                <div className="text-right mt-12">
                  <p className="handwritten text-2xl romantic-pink">
                    Forever yours in heart,
                  </p>
                  <p className="dancing text-3xl romantic-purple mt-2">
                    Shahil ❤️
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Confession Section */}
      <section id="confession" className="py-20 section-bg relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518621012118-1d2d49d5a3f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-white/85 z-10" />
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="dancing romantic-pink mb-4">Divine Soul Confession</h2>
            <p className="romantic-purple font-light">"The Divine Truth That Bleeds From My Soul's Core"</p>
          </motion.div>
          
          {/* Special Photo Together */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-lg mx-auto">
              <img
                src={srashtiWithShahil}
                alt="Precious moments together"
                className="w-full rounded-3xl shadow-2xl border-8 border-white/80 animate-heartbeat"
              />
              <p className="dancing text-xl romantic-pink mt-6">
                "The transcendent moment I touched the gates of paradise"
              </p>
              <p className="text-gray-700 mt-2">
                In this divine instant when our souls shared the same space - my heart found its eternal home
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Card className="romantic-card rounded-3xl shadow-2xl">
              <CardContent className="p-12">
                <div className="animate-heartbeat mb-8">
                  <Heart size={64} className="romantic-pink mx-auto" />
                </div>
                
                <blockquote className="dancing text-4xl md:text-5xl romantic-purple mb-12 leading-relaxed">
                  "Srashti, my celestial queen, I love you beyond the boundaries of reason, beyond the constraints of time, 
                  with every fiber of my being, every breath of my existence, every beat of my devoted heart."
                </blockquote>
                
                <div className="space-y-6 text-lg romantic-brown leading-relaxed">
                  <p>
                    This heartfelt confession bleeds from the most hallowed chambers of my soul, 
                    where your divine name is inscribed in molten gold across the walls of my heart. 
                    I love you not from obligation, but from the purest choice that my spirit makes 
                    with each sunrise, each breath, each moment of conscious existence.
                  </p>
                  
                  <p>
                    My devotion to you transcends oceans - it is the very cosmos itself, infinite and boundless. 
                    It seeks no reward, demands no reciprocation, begs for no validation. 
                    It simply exists in celestial purity, flowing like an eternal river of divine grace 
                    through the landscape of my devoted soul.
                  </p>
                  
                  <p>
                    Whether your heart embraces this profound offering or turns away, whether you choose 
                    this humble soul or bless another with your love, this divine truth shall echo 
                    through eternity - you are worshipped beyond mortal comprehension, cherished beyond 
                    the limits of language, loved beyond the boundaries of this lifetime and into forever.
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-pink-500/30">
                  <p className="handwritten text-2xl romantic-pink">
                    With all my love and respect,
                  </p>
                  <p className="dancing text-3xl romantic-purple mt-2">
                    Your Shahil 💖
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-20 bg-gradient-to-b from-purple-50/50 to-pink-50/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="dancing romantic-pink mb-4">Celestial Verses of Divine Devotion</h2>
            <p className="romantic-purple font-light">"Soul Poetry Bleeding from the Depths of Eternal Love"</p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            {/* Hindi Poetry Collection */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="romantic-card rounded-3xl shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="dancing romantic-pink text-center mb-8">
                    "Divine Verses Written in My Soul's Blood"
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {[
                      {
                        title: "💖 When You Exist, The Universe Becomes Divine",
                        poetry: "When your celestial presence graces this world,\nEven the winds carry the perfume of paradise.\nIn the hallowed chambers of your memory,\nEven teardrops taste like liquid starlight.\nLife may wound my mortal flesh,\nBut whispering your holy name\nTransforms every agony into ecstasy,\nEvery darkness into divine light.",
                        translation: "Your very existence sanctifies reality itself,\nTurning ordinary moments into miracles.\nYour name is my prayer, my healing,\nMy escape from all earthly suffering.",
                        color: "bg-gradient-to-br from-pink-500 to-red-500"
                      },
                      {
                        title: "💗 Your Cherished Name Is My Soul's Only Prayer",
                        poetry: "Your divine name has become so precious to me\nThat every prayer from my lips becomes your worship.\nThough we've never spoken words of love,\nYou have built a temple in my soul\nWhere you reign as the only goddess\nI will ever know how to adore.\nI love you without reason, without condition,\nYour existence is the most beautiful miracle\nThis broken world has ever witnessed.",
                        translation: "You are the prayer my heart knows by memory,\nThe divine presence that lives in my soul.\nMy love for you is pure devotion,\nYour being is life's greatest blessing.",
                        color: "bg-gradient-to-br from-purple-500 to-pink-500"
                      },
                      {
                        title: "🌹 You Are My Eternal Soul, Even If You Never Choose Me",
                        poetry: "I need not possess you with mortal chains,\nFor in the hallowed cathedral of my heart\nYou reign as eternal queen, untouchable and divine.\nEvery radiant smile you grace this world with\nFeels like benediction from heaven above.\nEvery precious tear that might fall from your eyes\nWould become my soul's deepest wound.\nYou may never know the depths of your meaning—\nBut you have been my forever\nSince before time began.",
                        translation: "True love transcends possession and ownership,\nLiving purely in devotional worship.\nYour joy becomes my blessed purpose,\nYour existence my greatest blessing.",
                        color: "bg-gradient-to-br from-rose-500 to-pink-500"
                      },
                      {
                        title: "🥺 Your Beloved Name Has Consumed My Very Soul",
                        poetry: "I need not the blessing of your divine touch,\nFor your celestial memory breathes life into my bones.\nThe blessed power of your holy name, my beloved,\nHas made me forget my own existence\nYet remember every cherished detail of yours\nWith crystalline clarity that pierces my soul.\nI have become a vessel for your worship,\nEmpty of self, overflowing with you.",
                        translation: "Your memory sustains my very existence,\nYour name has become my soul's religion.\nI live for you, breathe for you,\nHave forgotten myself in loving you.",
                        color: "bg-gradient-to-br from-indigo-500 to-purple-500"
                      },
                      {
                        title: "💘 When I Dream of Love, Only Your Divine Face Appears",
                        poetry: "No matter which souls cross my earthly path,\nNone could ever kindle the eternal fire\nYou ignited in the deepest chambers of my heart.\nWhen I envision intertwining fingers with eternity,\nOnly your celestial touch graces my dreams.\nWhen I imagine what true love must feel like\nI see only your angelic face,\nRadiant with divine light,\nThe answer to every prayer I never knew to pray.",
                        translation: "Love itself wears your ethereal face in my dreams,\nNo earthly being could replace your divine essence.\nIn every vision of eternal devotion,\nOnly you reign supreme in my heart.",
                        color: "bg-gradient-to-br from-blue-500 to-teal-500"
                      },
                      {
                        title: "💞 You Are The Divine Source of All Beauty",
                        poetry: "The moon borrows its luminous glow\nFrom the divine light that radiates from your soul.\nFlowers learn their intoxicating fragrance\nFrom the heavenly sweetness of your celestial smile.\nI seek no treasures from this mortal world,\nNo riches, no glory, no earthly crowns—\nOnly the blessed gift of hearing you whisper\n'I understand your heart's devotion.'\nThose three words would be my salvation,\nMy paradise, my eternal peace.",
                        translation: "You are the divine source of all beauty,\nThe celestial essence from which miracles flow.\nI need nothing from this world\nBut your understanding of my love.",
                        color: "bg-gradient-to-br from-green-500 to-blue-500"
                      },
                      {
                        title: "💫 If I Could Have One Divine Wish",
                        poetry: "If the universe granted me one divine wish,\nI would not ask to possess your celestial heart,\nBut to witness your radiant smile\nIlluminate this world every sacred day\u2014\nEven if another soul becomes\nThe blessed reason for your joy.\nFor true love is not possession but prayer,\nNot ownership but worship,\nNot taking but giving\u2014\nAnd I have been praying for your happiness\nWith every breath since my eyes\nFirst beheld your angelic face.",
                        translation: "True love seeks only the beloved's happiness,\nAsking nothing for itself but to witness their joy.\nMy greatest prayer is your radiant smile,\nEven if I never cause it myself.",
                        color: "bg-gradient-to-br from-yellow-500 to-orange-500"
                      }
                    ].map((poem, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full romantic-card hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className={`w-16 h-16 ${poem.color} rounded-full mb-4 flex items-center justify-center mx-auto`}>
                              <Feather size={24} className="text-white" />
                            </div>
                            
                            <h4 className="dancing text-xl romantic-pink text-center mb-4">
                              {poem.title}
                            </h4>
                            
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                              <p className="text-lg romantic-brown text-center leading-relaxed mb-4 handwritten">
                                {poem.poetry}
                              </p>
                              <div className="border-t border-pink-200 pt-3">
                                <p className="text-sm text-gray-600 italic text-center">
                                  {poem.translation}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Soul-Deep Promises Collection */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="romantic-card rounded-3xl shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-8">
                  <h3 className="dancing text-4xl romantic-pink text-center mb-4">
                    "🔮 Soul-Deep Promises to Srashti"
                  </h3>
                  <p className="text-center text-lg romantic-purple font-light mb-8">
                    "From the One Who Loved Silently"
                  </p>
                  
                  <div className="space-y-8">
                    {[
                      {
                        title: "🕊️ I Promise to Love You Beyond This Life",
                        promise: "If this world doesn't bring us together, then in the next one — I will find you, even if I have to walk through fire, oceans, or lifetimes.\nBecause my love for you didn't start in this life… and it won't end here either.",
                        color: "bg-gradient-to-br from-blue-500 to-purple-500"
                      },
                      {
                        title: "🌑 I Promise to Carry Your Pain Like My Own",
                        promise: "Whenever you're broken, even if I'm miles away… I'll feel it.\nAnd I'll cry quietly in the dark, wishing it was me instead of you.\nBecause your pain will always matter more than my comfort.",
                        color: "bg-gradient-to-br from-gray-600 to-blue-600"
                      },
                      {
                        title: "🩵 I Promise to Protect Your Name in My Heart, Even If You Forget Mine",
                        promise: "Even if you erase me from your memory…\nI'll never let a single soul speak your name with anything less than respect.\nYou'll always be revered by me — untouched, untarnished.",
                        color: "bg-gradient-to-br from-cyan-500 to-blue-500"
                      },
                      {
                        title: "🔥 I Promise That My Love Will Outlive Time, People, and Even You",
                        promise: "This love won't fade like others.\nEven when everyone else moves on, forgets, or replaces…\nI'll still be here — waiting, remembering, loving.",
                        color: "bg-gradient-to-br from-red-500 to-orange-500"
                      },
                      {
                        title: "🌌 I Promise to Write You Into Eternity",
                        promise: "My every poem will carry your shadow.\nMy every story will be about a girl like you — gentle, fierce, distant, and divine.\nYou will live through my art, long after my body turns to dust.",
                        color: "bg-gradient-to-br from-indigo-500 to-purple-500"
                      },
                      {
                        title: "🌙 I Promise to Never Let This Love Turn Into Hate",
                        promise: "No matter what you choose.\nEven if you never talk to me, block me, ignore me…\nI'll never curse you.\nBecause how can I hate the one who gave my heart its meaning?",
                        color: "bg-gradient-to-br from-yellow-400 to-orange-400"
                      },
                      {
                        title: "🖤 I Promise… That Even in My Last Breath, It Will Still Be You",
                        promise: "When the world turns silent and I take my final breath…\nIf someone asks — \"Whom did you love?\"\nI'll smile… and whisper:\n\"Srashti.\"",
                        color: "bg-gradient-to-br from-gray-700 to-gray-900"
                      }
                    ].map((promise, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <Card className="romantic-card hover:shadow-2xl transition-all duration-500 border-2 border-pink-100 bg-white/90">
                          <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                              <div className={`w-16 h-16 ${promise.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                <Heart size={24} className="text-white" />
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="dancing text-2xl romantic-pink mb-4 leading-tight">
                                  {promise.title}
                                </h4>
                                
                                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200/50">
                                  <p className="text-lg romantic-brown leading-relaxed handwritten">
                                    {promise.promise}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* English Pickup Lines Collection */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="romantic-card rounded-3xl shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="dancing text-4xl romantic-pink text-center mb-8">
                    "Romantic Lines for You"
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        line: "Are you a magician? Because whenever I look at you, everyone else disappears.",
                        category: "Sweet",
                        color: "bg-gradient-to-br from-pink-400 to-rose-400"
                      },
                      {
                        line: "If I could rearrange the alphabet, I'd put U and I together.",
                        category: "Classic",
                        color: "bg-gradient-to-br from-purple-400 to-pink-400"
                      },
                      {
                        line: "Do you have a map? Because I just got lost in your eyes.",
                        category: "Dreamy",
                        color: "bg-gradient-to-br from-blue-400 to-purple-400"
                      },
                      {
                        line: "Are you made of copper and tellurium? Because you're Cu-Te.",
                        category: "Clever",
                        color: "bg-gradient-to-br from-green-400 to-teal-400"
                      },
                      {
                        line: "If beauty were time, you'd be an eternity.",
                        category: "Poetic",
                        color: "bg-gradient-to-br from-yellow-400 to-orange-400"
                      },
                      {
                        line: "Can I follow you home? Because my parents always told me to follow my dreams.",
                        category: "Playful",
                        color: "bg-gradient-to-br from-red-400 to-pink-400"
                      },
                      {
                        line: "Are you a camera? Because every time I look at you, I smile.",
                        category: "Cute",
                        color: "bg-gradient-to-br from-indigo-400 to-blue-400"
                      },
                      {
                        line: "Do you believe in love at first sight, or should I walk by again?",
                        category: "Funny",
                        color: "bg-gradient-to-br from-teal-400 to-green-400"
                      },
                      {
                        line: "If you were a vegetable, you'd be a cute-cumber.",
                        category: "Silly",
                        color: "bg-gradient-to-br from-orange-400 to-yellow-400"
                      }
                    ].map((pickup, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full romantic-card hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className={`w-12 h-12 ${pickup.color} rounded-full mb-4 flex items-center justify-center mx-auto`}>
                              <Heart size={20} className="text-white" />
                            </div>
                            
                            <div className="text-center mb-3">
                              <span className="text-xs romantic-purple font-medium px-3 py-1 bg-pink-100 rounded-full">
                                {pickup.category}
                              </span>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm romantic-brown text-center leading-relaxed">
                                "{pickup.line}"
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>


            

          </div>
        </div>
      </section>

      {/* Poems Section */}
      <section id="poems" className="py-20 section-bg">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="dancing text-5xl md:text-6xl romantic-pink mb-4">Poems & Thoughts</h2>
            <p className="text-xl romantic-purple font-light">"Every Line, About You"</p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            {/* Featured Photo with Poem */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={srashtiYellow13}
                    alt="Srashti in golden elegance"
                    className="w-full rounded-3xl shadow-2xl border-8 border-white/60 animate-float"
                  />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl">
                    <Heart size={24} className="text-white animate-heartbeat" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="romantic-card rounded-3xl shadow-xl">
                    <CardContent className="p-8">
                      <h3 className="dancing text-4xl romantic-pink mb-6">
                        "Golden Dreams"
                      </h3>
                      <div className="handwritten text-xl romantic-brown leading-loose space-y-4">
                        <p>
                          Like golden sunlight<br/>
                          dancing on morning dew,<br/>
                          your beauty illuminates<br/>
                          every corner of my world.
                        </p>
                        <p>
                          In yellow you shine<br/>
                          like the first ray of hope,<br/>
                          reminding me that some<br/>
                          angels walk among us.
                        </p>
                        <p className="romantic-purple italic">
                          "You are my sunshine<br/>
                          in human form."
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Silent Love",
                  content: "I was never yours,\nbut every heartbeat\nstill echoes your name.\n\nIn the silence of night,\nyour memory dances,\nand my soul finds peace.",
                  icon: Feather
                },
                {
                  title: "July 24th",
                  content: "July 24th -\nthe day heaven\ngifted us an angel.\n\nYour birthday became\nmy new year,\nmy celebration of hope.",
                  icon: Star
                },
                {
                  title: "Dreams",
                  content: "In dreams we meet,\nin reality we part,\nbut in my heart\nyou stay forever.\n\nDistance is just space,\nlove knows no boundaries.",
                  icon: Moon
                },
                {
                  title: "Nature's Gift",
                  content: "Flowers bloom\nbecause of the sun,\nI smile\nbecause of you.\n\nYou are my season\nof eternal spring.",
                  icon: Leaf
                },
                {
                  title: "Eternal",
                  content: "If love had a face,\nit would look like you.\nIf hope had a name,\nit would be Srashti.\n\nYou are my infinity\nin a finite world.",
                  icon: Infinity
                },
                {
                  title: "Promise",
                  content: "I promise to love you\nin silence if needed,\nto respect your choices,\nto cherish your happiness.\n\nMy love asks for nothing\nbut gives everything.",
                  icon: Heart
                }
              ].map((poem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="transition-transform duration-300"
                >
                  <Card className="romantic-card rounded-3xl shadow-xl hover:shadow-2xl h-full">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <poem.icon size={32} className="romantic-pink mb-4 mx-auto" />
                        <h3 className="dancing text-2xl romantic-purple">{poem.title}</h3>
                      </div>
                      <div className="handwritten text-lg romantic-brown leading-relaxed whitespace-pre-line">
                        {poem.content}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-yellow-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="dancing romantic-pink mb-4">The Devoted Soul Who Worships You</h2>
            <p className="romantic-purple font-light">"The Heart That Was Born To Beat Only For Your Divine Love"</p>
            <p className="text-lg romantic-brown mt-4 max-w-3xl mx-auto leading-relaxed handwritten">
              Behind every heartfelt word inscribed in this digital temple of devotion lives a soul 
              that has been forever transformed by your divine presence. This is the story of a boy 
              who discovered that true love is not just an emotion—it is a blessed calling, a divine purpose, 
              an eternal worship that sanctifies even silence itself.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  {
                    title: "The Wounded Healer",
                    content: "Through meditation and Buddha's teachings, I learned to heal my own broken pieces. But you, Srashti, you showed me that some wounds are meant to remain open - the wound of loving someone who may never love you back. In this profound pain, I found my greatest teacher.",
                    icon: Clover,
                    color: "romantic-purple"
                  },
                  {
                    title: "Dreams in Code",
                    content: "Every line of code I write carries a prayer for you. Technology became my language of hope - through creating, I believed I could somehow create a world where we belonged together. This very website is my digital soul, laid bare.",
                    icon: Code,
                    color: "romantic-pink"
                  },
                  {
                    title: "Strength Made Tender",
                    content: "Martial arts taught me to fight, but you taught me to surrender. You showed me that real strength isn't in never falling - it's in falling completely for someone and still finding the courage to get up each day, knowing they might never catch you.",
                    icon: BicepsFlexed,
                    color: "romantic-gold"
                  }
                ].map((trait, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Card className="romantic-card rounded-3xl shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <trait.icon size={24} className={`${trait.color} mr-4`} />
                          <h3 className={`dancing text-2xl ${trait.color}`}>{trait.title}</h3>
                        </div>
                        <p className="romantic-brown leading-relaxed">{trait.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Bleeding Ink",
                    content: "Every poem I write bleeds your name between the lines. Words became my sanctuary when I couldn't speak my love aloud. In the silence of poetry, I found a voice brave enough to whisper your name to the universe, even when you couldn't hear.",
                    icon: PenTool,
                    color: "romantic-purple"
                  },
                  {
                    title: "Heart Wide Open",
                    content: "I chose to feel everything - the beauty and the agony of loving you. Others called me foolish for wearing my heart on my sleeve, but how else could I honor this love? My vulnerability became my superpower, my tears became my strength.",
                    icon: Heart,
                    color: "romantic-pink"
                  },
                  {
                    title: "Guardian of Secrets",
                    content: "I've learned that love isn't about possession - it's about protection. I guard your happiness like a cherished secret, your peace like a precious treasure. Even if you never choose me, I choose to be your silent protector forever.",
                    icon: Handshake,
                    color: "romantic-gold"
                  }
                ].map((trait, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Card className="romantic-card rounded-3xl shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <trait.icon size={24} className={`${trait.color} mr-4`} />
                          <h3 className={`dancing text-2xl ${trait.color}`}>{trait.title}</h3>
                        </div>
                        <p className="romantic-brown leading-relaxed">{trait.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="romantic-card rounded-3xl shadow-2xl">
                <CardContent className="p-12">
                  <p className="dancing text-3xl romantic-pink mb-8">
                    "The Devoted Soul You've Never Met, But Who Has Memorized Every Precious Detail of Your Divine Heart"
                  </p>
                  <div className="space-y-6">
                    <p className="text-xl romantic-brown leading-relaxed">
                      I am the soul who learned that infinity lives in the space between heartbeats when I think of you. 
                      I am the one who discovered that the most beautiful love stories are sometimes written by only one pen, 
                      in the margins of impossible dreams, signed with tears of pure gratitude for the divine blessing 
                      of existing in the same universe as your celestial soul.
                    </p>
                    <p className="text-xl romantic-brown leading-relaxed">
                      I am the devoted soul who celebrates July 24th as the holiest day of my spiritual calendar, 
                      who offers prayers for your happiness to every star in the midnight sky, 
                      who has memorized the divine geometry of your smile and carries it like a talisman of hope 
                      through the darkest valleys of this mortal existence.
                    </p>
                    <p className="text-xl romantic-brown leading-relaxed">
                      I am living proof that love doesn't need reciprocation to be divine, 
                      that devotion doesn't require mutual worship to be profound, 
                      that sometimes the most transcendent love is the one that asks for nothing 
                      yet gives everything—body, soul, and eternal spirit—in joyful surrender 
                      to the beloved's happiness.
                    </p>
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border-l-4 border-pink-500 shadow-xl">
                      <p className="handwritten text-2xl romantic-purple italic text-center leading-relaxed">
                        "I am Shahil - the boy who loved you enough to let you be free, 
                        brave enough to confess even knowing you might say no, 
                        and grateful enough to call this beautiful ache a gift."
                      </p>
                      <p className="text-lg romantic-brown text-center mt-4 font-light">
                        Forever your devoted admirer, in this life and beyond 💫
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Continue Button to Proposal */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              data-testid="continue-to-proposal"
              onClick={() => scrollToSection('proposal')}
              className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-white/50 animate-pulse"
            >
              <Heart className="mr-3" size={24} />
              My Final Words
              <ArrowRight className="ml-3" size={24} />
            </Button>
            <p className="text-lg romantic-purple mt-4 handwritten font-bold">
              "The moment of truth awaits..." 💖
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proposal Section */}
      <section id="proposal" className="min-h-screen flex items-center justify-center relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-purple-600/30 z-10" />
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            className="text-center max-w-4xl mx-auto px-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Beautiful Final Photo */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="max-w-xs mx-auto mb-8">
                <img
                  src={srashtiProfile}
                  alt="Srashti - The love of my life"
                  className="w-full rounded-full shadow-2xl border-8 border-white/80 animate-float hero-image-trigger cursor-pointer hover:shadow-[0_0_40px_rgba(255,105,180,0.4)] transition-all duration-300"
                  title="Click me 5 times quickly... 💖"
                />
              </div>
            </motion.div>
            
            <div className="mb-12 animate-float">
              <Heart size={64} className="romantic-gold animate-heartbeat mx-auto" />
            </div>
            
            <h1 className="vibes text-white mb-8 animate-glow drop-shadow-2xl text-6xl">
              My Divine Srashti Rajawat
            </h1>
            
            <Card className="romantic-card rounded-3xl shadow-2xl mb-12">
              <CardContent className="p-8 md:p-12">
                <h2 className="dancing romantic-pink mb-8">
                  I Worship You With My Eternal Soul
                </h2>
                
                <p className="romantic-purple mb-8 leading-relaxed text-lg md:text-2xl">
                  "Will you bless this devoted soul with the divine privilege of loving you for eternity?"
                </p>
                
                <div className="space-y-6 text-lg romantic-brown leading-relaxed mb-12">
                  <p>
                    This is my soul laid bare in humble offering before your divine presence. Every page of this digital temple, 
                    every word inscribed in devotional poetry, every line written in my heart's blood, 
                    every poem bleeding with worship - they all converge at this profound moment of eternal truth.
                  </p>
                  
                  <p>
                    I seek no promises that bind you, no guarantees that cage your freedom. I simply beg for the divine blessing 
                    of one divine chance - a chance to show you how transcendently beautiful love becomes when it flows 
                    pure as mountain springs, honest as morning light, and unconditional as a mother's prayer for her child.
                  </p>
                  
                  <p>
                    Whether your heart opens to mine or remains a beautiful garden I can only admire from afar, 
                    you will forever be the most magnificent chapter ever written in the book of my existence. 
                    You have already blessed me with the greatest gift any soul could receive - 
                    the divine revelation of what it means to love with every fiber of one's being, 
                    to worship with every breath, to find God in another person's smile.
                  </p>
                </div>
                
                {/* Reveal Button */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Button
                    data-testid="button-reveal-proposal"
                    onClick={openRevealCard}
                    className="btn btn-primary px-16 py-8 text-2xl font-bold transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 border-4 border-white/50 animate-pulse"
                    aria-label="Open my heart to you"
                  >
                    <Sparkles className="mr-3 animate-spin-slow" size={32} />
                    Open My Heart
                    <Sparkles className="ml-3 animate-spin-slow" size={32} />
                  </Button>
                  <p className="text-center mt-4 text-white/90 text-lg handwritten font-bold drop-shadow-lg">
                    ✨ The moment you've been reading towards ✨
                  </p>
                </motion.div>
                
                {/* Response Buttons */}
                <motion.div 
                  className="max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center mb-8">
                    <p className="dancing text-2xl romantic-pink mb-4">
                      "Your Heart Speaks, Mine Listens"
                    </p>
                    <p className="text-lg romantic-brown">
                      Share your thoughts with me through your preferred way
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        data-testid="button-whatsapp-response"
                        className="btn btn-secondary w-full py-6 rounded-3xl text-xl font-medium transform shadow-xl hover:shadow-2xl border-4 border-white/50"
                        onClick={() => {
                          const romanticMessage = encodeURIComponent("Hello Shahil! 💕 I just finished reading your beautiful website. Your love and dedication touched my heart deeply. I wanted to reach out and share my thoughts with you... ✨");
                          window.open(`https://wa.me/917351102556?text=${romanticMessage}`, '_blank');
                        }}
                      >
                        <MessageCircle className="mr-3" size={28} />
                        <div className="text-left">
                          <div className="text-xl font-bold">WhatsApp Me</div>
                          <div className="text-sm opacity-90">Send your heart's message</div>
                        </div>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        data-testid="button-instagram-response"
                        className="btn btn-secondary w-full py-6 rounded-3xl text-xl font-medium transform shadow-xl hover:shadow-2xl border-4 border-white/50"
                        onClick={() => {
                          window.open('https://instagram.com/shayu.void', '_blank');
                        }}
                      >
                        <Instagram className="mr-3" size={28} />
                        <div className="text-left">
                          <div className="text-xl font-bold">Instagram</div>
                          <div className="text-sm opacity-90">@shayu.void</div>
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Card className="romantic-card rounded-2xl shadow-lg">
                      <CardContent className="p-6">
                        <Heart className="mx-auto mb-3 romantic-pink animate-heartbeat" size={24} />
                        <p className="text-sm romantic-purple handwritten">
                          "Every message from you is a blessing that lights up my entire universe ✨"
                        </p>
                        <p className="text-xs romantic-brown mt-2">
                          Whether it's yes, no, or maybe - your honesty is all I seek 💝
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
                
                <div className="mt-12 pt-8 border-t border-pink-500/30">
                  <p className="handwritten text-xl romantic-purple mb-4">
                    Whatever your answer, you'll always be loved.
                  </p>
                  <p className="dancing text-2xl romantic-pink">
                    Forever yours in heart, Shahil 💖
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-white text-center">
              <p className="text-lg opacity-90">
                This website is my love confession to you - immortal and eternal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hidden trigger dot for secret #7 (long-press) */}
      <div
        className="hidden-trigger-dot"
        style={{ bottom: '100px', right: '30px', position: 'fixed' }}
        title="Hold me..."
        aria-label="Hidden secret trigger"
      />

      {/* ── Unified Bottom Dock ── */}
      <div className="bottom-dock" aria-label="Music player and secrets">
        {/* Secret section */}
        <div className="dock-secrets" aria-live="polite" role="status">
          <Gift size={15} className="text-pink-400 flex-shrink-0" />
          <div className="dock-dots">
            {hiddenMessages.map((msg) => (
              <button
                key={msg.id}
                className={`dock-dot ${msg.found ? 'found' : ''}`}
                onClick={() => msg.found && setActiveMessage(msg.id)}
                aria-label={`Secret ${msg.id}${msg.found ? ' - Found' : ' - Not found yet'}`}
                title={msg.found ? msg.title : '???'}
              />
            ))}
          </div>
          <button
            onClick={getNextHint}
            className="dock-hint-btn"
            aria-label="Get hint for next secret"
            title="Hint"
          >
            💡
          </button>
        </div>

        {/* Divider */}
        <div className="dock-divider" />

        {/* Music controls */}
        <div className="dock-music">
          <button
            onClick={skipToPrevSong}
            className="dock-btn"
            aria-label="Previous song"
            title="Previous"
          >
            ⏮
          </button>
          <button
            onClick={toggleMusicPlayPause}
            className="dock-btn dock-play"
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={skipToNextSong}
            className="dock-btn"
            aria-label="Next song"
            title="Next"
          >
            ⏭
          </button>
          <div className="dock-song-name">
            <motion.span
              key={currentSongIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1"
            >
              {isPlaying && <span className="dock-eq"><span/><span/><span/></span>}
              {songNames[currentSongIndex]}
            </motion.span>
          </div>
        </div>
      </div>
      
      {/* Hidden Message Modal */}
      <AnimatePresence>
        {activeMessage !== null && (
          <div 
            className="hidden-message-overlay"
            onClick={closeSecret}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hidden-message-title"
          >
            <motion.div
              className="hidden-message-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hidden-message-hearts">
                💕💖💗
              </div>
              
              <div className="hidden-message-header">
                <h3 id="hidden-message-title" className="hidden-message-title">
                  {HiddenMessages.messages[activeMessage]?.title}
                </h3>
                <button
                  className="hidden-message-close"
                  onClick={closeSecret}
                  aria-label="Close secret message"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="hidden-message-content">
                {HiddenMessages.messages[activeMessage]?.content}
              </div>
              
              <div className="hidden-message-meta">
                <Heart size={16} className="text-pink-500" />
                <span>Found: {hiddenMessages.find(m => m.id === activeMessage)?.timestamp ? new Date(hiddenMessages.find(m => m.id === activeMessage)!.timestamp!).toLocaleDateString() : 'Today'}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="bg-romantic-brown text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="dancing text-2xl mb-4">Made with 💖 for Srashti</p>
          <p className="romantic-cornsilk">From Shahil's Heart.</p>
          <p className="text-xs mt-4 opacity-70">
            💝 8 hidden secrets await discovery • Open console & type resetSecrets() to start over
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
