"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, Star, Users } from 'lucide-react';

export const TestimonialLevelUp = () => {
  const [count, setCount] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const TARGET = 10000;

  useEffect(() => {
    const duration = 1500; // 1.5 seconds (faster)
    const steps = 60;
    const stepTime = duration / steps;
    
    // Quadratic easing for "start slow, end fast" feel or linear
    // But user asked "start from 1 but very quick to 10,000+"
    
    let current = 1;
    const timer = setInterval(() => {
      // Exponential growth factor to make it feel "very quick"
      current = current * 1.15 + 100; 
      
      if (current >= TARGET) {
        setCount(TARGET);
        setLeveledUp(true);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-2">
      <div className="relative">
        {/* Stat Counter */}
        <div className="flex items-center gap-3 text-3xl md:text-5xl font-bold font-mono text-yellow-400">
          <Users className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
          <span>{count.toLocaleString()}</span>
        </div>
      </div>

      <div className={`text-lg md:text-2xl font-bold text-green-500 font-mono transition-all duration-500 ${leveledUp ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
        KRACKED DEVS ARE SHIPPING!
      </div>
    </div>
  );
};

