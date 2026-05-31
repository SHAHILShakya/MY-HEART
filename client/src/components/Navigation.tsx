import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Sacred Beginning' },
    { id: 'story', label: 'Our Divine Tale' },
    { id: 'gallery', label: 'Celestial Beauty' },
    { id: 'letter', label: 'Soul\'s Whisper' },
    { id: 'confession', label: 'Heart\'s Truth' },
    { id: 'music', label: 'Eternal Verses' },
    { id: 'poems', label: 'Love\'s Poetry' },
    { id: 'about', label: 'Devoted Heart' },
    { id: 'proposal', label: 'Forever Promise' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white bg-opacity-90 backdrop-blur-md border-b border-pink-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="dancing text-3xl font-bold romantic-pink drop-shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            Srashti ❤️
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                data-testid={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="romantic-brown hover:text-pink-500 transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-button"
            className="md:hidden romantic-pink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Heart size={24} className="animate-heartbeat" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                data-testid={`mobile-nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 romantic-brown hover:text-pink-500 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
