'use client';

import React, { useState, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function JobsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Join Our Team" 
        subtitle="We're building something special."
      />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <Card className="max-w-2xl mx-auto border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />
          <CardContent className="pt-16 pb-16 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
              Coming Soon
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              We're preparing exciting opportunities for talented developers.
            </p>
            
            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-bold text-neon-primary font-mono mb-1">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Days</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-bold text-neon-primary font-mono mb-1">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Hours</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-bold text-neon-primary font-mono mb-1">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Minutes</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-bold text-neon-primary font-mono mb-1">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Seconds</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-neon-primary font-mono text-lg mb-6">
              <Calendar className="w-5 h-5" />
              <span>January 2026</span>
            </div>
            <p className="text-sm text-muted-foreground mt-6 max-w-md mx-auto">
              Check back soon for open positions. In the meantime, join our community to stay updated!
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

