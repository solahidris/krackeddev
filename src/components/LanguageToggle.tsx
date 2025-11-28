'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center p-1 rounded-md bg-white/5 border border-white/10">
      <ToggleButton 
        isActive={language === 'ms'} 
        onClick={() => setLanguage('ms')}
      >
        MY
      </ToggleButton>
      <ToggleButton 
        isActive={language === 'en'} 
        onClick={() => setLanguage('en')}
      >
        EN
      </ToggleButton>
    </div>
  );
};

const ToggleButton = ({ isActive, onClick, children }: { isActive: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-3 py-1 text-xs font-bold transition-all duration-300 rounded relative overflow-hidden",
      isActive 
        ? "text-zinc-950 shadow-[0_0_10px_var(--neon-cyan)]" 
        : "text-muted-foreground hover:text-zinc-50 hover:bg-white/10"
    )}
  >
    {isActive && (
      <div className="absolute inset-0 bg-neon-cyan z-0" />
    )}
    <span className="relative z-10">{children}</span>
  </button>
);

export default LanguageToggle;
