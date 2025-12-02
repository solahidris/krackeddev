"use client";

import React from 'react';
import { GameBoyButtonY } from './GameBoyButtonY';

interface EscapeButtonProps {
  onClose: () => void;
  className?: string;
}

export const EscapeButton: React.FC<EscapeButtonProps> = ({ onClose, className = '' }) => {
  return (
    <button
      onClick={onClose}
      className={`fixed top-4 right-4 z-50 bg-red-500/90 hover:bg-red-600 active:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-all touch-none ${className}`}
      aria-label="Close (Escape or Y button)"
    >
      <span className="text-lg">ESC</span>
      <span className="text-sm opacity-90">/</span>
      <GameBoyButtonY size={20} className="opacity-90" />
      <span className="text-sm opacity-90">Close</span>
    </button>
  );
};

