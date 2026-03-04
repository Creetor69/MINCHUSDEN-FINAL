import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, PawPrint, Phone, Volume2, VolumeX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Boarding', path: '/boarding' },
    { name: 'Training', path: '/training' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 px-6 py-4 rounded-full border border-white/10',
        isScrolled ? 'bg-trust/80 backdrop-blur-xl shadow-2xl py-3' : 'bg-trust/40 backdrop-blur-md'
      )}
    >
      <div className="flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2 group shrink-0 z-10">
          <div className="w-8 h-8 bg-premium rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <PawPrint className="text-trust w-5 h-5" />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-white whitespace-nowrap">
            Minchu's <span className="text-premium">Den</span>
          </span>
        </Link>

        {/* Desktop Nav - Centered with better spacing to avoid overlap */}
        <div className="hidden xl:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2 w-max">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-[9px] font-black tracking-widest uppercase transition-all hover:text-premium hover:scale-110 whitespace-nowrap',
                location.pathname === link.path ? 'text-premium' : 'text-white/70'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Book Now Button */}
        <div className="flex items-center gap-4 shrink-0 z-10">
          <Link
            to="/booking"
            className="bg-premium text-trust px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-premium/20"
          >
            Book Now
          </Link>
          
          {/* Mobile Toggle */}
          <button
            className="xl:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-trust shadow-2xl border-t border-white/5 p-8 flex flex-col gap-6 xl:hidden rounded-b-[32px]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-serif text-white hover:text-premium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-premium text-trust text-center py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
