'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

const PrayerWidget = () => {
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [timings, setTimings] = useState<PrayerTimes | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Method 17 is JAKIM (Malaysia)
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=Kuala%20Lumpur&country=Malaysia&method=17`
        );
        const data = await res.json();

        if (data.data && data.data.timings) {
          setTimings(data.data.timings);
          calculateNextPrayer(data.data.timings);
        }
      } catch (error) {
        console.error('Failed to fetch prayer times', error);
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateNextPrayer = (currentTimings: PrayerTimes) => {
    const now = new Date();
    const timeNow = now.getHours() * 60 + now.getMinutes();

    for (const prayer of PRAYER_ORDER) {
      const [hours, minutes] = currentTimings[prayer].split(':').map(Number);
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > timeNow) {
        setNextPrayer({ name: prayer, time: currentTimings[prayer] });
        return;
      }
    }
    setNextPrayer({ name: 'Fajr', time: currentTimings['Fajr'] });
  };

  if (!nextPrayer) return null;

  return (
    <div className="relative hidden sm:inline-block text-left">
      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-2 py-1 px-3 cursor-pointer select-none border-neon-purple/50 text-foreground hover:bg-neon-purple/10 transition-colors duration-300",
          open && "bg-neon-purple/20 border-neon-purple box-shadow-[0_0_10px_var(--neon-purple)]"
        )}
        onClick={() => timings && setOpen((prev) => !prev)}
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold opacity-70">Next Prayer (KL):</span>
        <span className="font-bold text-neon-purple">
          {nextPrayer.name} {nextPrayer.time}
        </span>
      </Badge>

      {open && timings && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-neon-purple/30 bg-background/90 backdrop-blur-xl shadow-[0_0_30px_rgba(189,0,255,0.2)] p-4 text-sm z-40 animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-semibold tracking-wider uppercase text-xs text-muted-foreground">Prayer Schedule</span>
              <button
                type="button"
                className="text-muted-foreground hover:text-neon-pink transition-colors"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              {PRAYER_ORDER.map((name) => (
                <div key={name} className="flex items-center justify-between group hover:bg-white/5 p-1 rounded transition-colors">
                  <span className={cn(
                    "capitalize transition-colors",
                    name === nextPrayer.name ? "text-neon-purple font-bold" : "text-foreground/80"
                  )}>{name}</span>
                  <span
                    className={cn(
                      "font-mono",
                      name === nextPrayer.name
                        ? 'text-neon-purple font-bold drop-shadow-[0_0_5px_var(--neon-purple)]'
                        : 'text-foreground/60 group-hover:text-foreground'
                    )}
                  >
                    {timings[name]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PrayerWidget;
