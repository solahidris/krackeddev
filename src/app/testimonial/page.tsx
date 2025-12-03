"use client";

import React, { useEffect } from 'react';
import { TestimonialLevelUp } from '@/components/TestimonialLevelUp';
import { GlobalLeaderboard } from '@/components/GlobalLeaderboard';
import { ShootingStars } from '@/components/ShootingStars';
import { Quote, Terminal } from 'lucide-react';
import '../jobs/jobs.css';

export default function TestimonialPage() {
  // Audio unlock similar to WhitepaperPage
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('unlockAudio'));
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
      {/* Shooting Stars Background */}
      <ShootingStars />
      
      {/* Star Field - Static */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30 pointer-events-none z-0"></div>
      
      {/* Scanlines Overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-30"></div>
      
      <div className="relative z-40 container mx-auto px-4 flex items-center justify-center h-full">
        
        {/* Level Up Animation - Hero Section */}
        <div className="w-full max-w-4xl">
          <div className="space-y-6">
             <TestimonialLevelUp />

             {/* Live Global Leaderboard */}
             <div className="space-y-4 pt-4">
               <GlobalLeaderboard />
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}
