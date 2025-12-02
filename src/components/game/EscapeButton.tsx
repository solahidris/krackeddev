"use client";

import React, { useState, useEffect } from 'react';
import { GameBoyButtonY } from './GameBoyButtonY';

interface EscapeButtonProps {
  onClose: () => void;
  className?: string;
}

export const EscapeButton: React.FC<EscapeButtonProps> = ({ onClose, className = '' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  return (
    <button
      onClick={onClose}
      className={`fixed top-4 right-4 z-[100] bg-red-500/90 hover:bg-red-600 active:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hidden md:flex items-center gap-2 transition-all touch-none pointer-events-auto ${className}`}
      aria-label="Close (Escape or Y button)"
    >
      <span className="text-lg">{isMobile ? 'Y' : 'ESC'}</span>
      <span className="text-sm opacity-90">/</span>
      <GameBoyButtonY size={20} className="opacity-90" />
      <span className="text-sm opacity-90">Close</span>
    </button>
  );
};

