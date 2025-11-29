'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PrayerWidget from './PrayerWidget';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-lg border-white/10 shadow-[0_0_20px_rgba(21,128,61,0.1)]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group relative flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute -inset-2 bg-neon-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative font-mono text-xl font-bold tracking-tighter text-foreground group-hover:text-neon-primary transition-colors duration-300">
            &lt;Kracked Devs /&gt;
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/game">Games</NavLink>
          <NavLink href="/talks">Talks</NavLink>
          <NavLink href="/hackathon">Hackathon</NavLink>

          <NavLink href="/jobs">Jobs</NavLink>
          <NavLink href="/forum">Forum</NavLink>
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <PrayerWidget />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground hover:text-neon-primary"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4 flex flex-col">
              <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
              <MobileNavLink href="/game" onClick={() => setIsMobileMenuOpen(false)}>Games</MobileNavLink>
              <MobileNavLink href="/talks" onClick={() => setIsMobileMenuOpen(false)}>Talks</MobileNavLink>
              <MobileNavLink href="/hackathon" onClick={() => setIsMobileMenuOpen(false)}>Hackathon</MobileNavLink>

              <MobileNavLink href="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</MobileNavLink>
              <MobileNavLink href="/forum" onClick={() => setIsMobileMenuOpen(false)}>Forum</MobileNavLink>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Prayer Times</span>
                <PrayerWidget />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Neon Line */}
      <div className={cn(
        "absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-neon-primary to-transparent transition-all duration-500",
        (isScrolled || isMobileMenuOpen) ? "w-full opacity-50" : "w-0 opacity-0"
      )} />
    </motion.nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="relative text-sm font-medium text-zinc-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:text-neon-primary transition-colors duration-300 py-2 group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-primary shadow-[0_0_10px_var(--neon-primary)] group-hover:w-full transition-all duration-300" />
  </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-lg font-medium text-zinc-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:text-neon-primary hover:pl-2 transition-all duration-300 border-l-2 border-transparent hover:border-neon-primary py-2"
  >
    {children}
  </Link>
);

export default Navbar;
