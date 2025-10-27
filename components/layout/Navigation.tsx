'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- New state for scroll direction ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);
  // ---

  // --- Updated scroll handler ---
  useEffect(() => {
    const handleScroll = () => {
      const currentYPos = window.scrollY;
      const isScrollingDown = currentYPos > lastYPos;

      // This logic keeps your original styling change
      setIsScrolled(currentYPos > 50); 
      
      // This logic handles visibility:
      // Show if near the top OR scrolling up
      setIsVisible(currentYPos < 50 || !isScrollingDown); 

      // Update the last scroll position
      setLastYPos(currentYPos); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastYPos]); // <-- Add dependency
  // ---

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 ${
          isScrolled ? 'shadow-lg py-2' : 'backdrop-blur-md py-3'
        }`}
        
        // --- Updated animation props ---
        initial={{ y: 0 }} // Start visible
        animate={{ y: isVisible ? 0 : '-100%' }} // Animate based on isVisible state
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        // ---
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-14 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/logo.png"
                  alt="Pakmake Packaging Inc"
                  width={448}
                  height={200}
                  className={`h-auto w-auto transition-all duration-300 ${
                    isScrolled ? 'max-h-10 md:max-h-14' : 'max-h-14 md:max-h-18'
                  }`}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-6 py-3 text-lg md:text-xl text-gray-300 hover:text-white font-medium transition-all duration-300 group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button (Hamburger / Cross) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 relative z-20"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 md:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col space-y-8 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-4 px-6 text-3xl text-gray-300 hover:text-white transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}