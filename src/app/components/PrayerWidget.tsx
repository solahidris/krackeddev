'use client';

import React, { useEffect, useState } from 'react';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

const PrayerWidget = () => {
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // Method 17 is JAKIM (Malaysia)
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=Kuala%20Lumpur&country=Malaysia&method=17`);
        const data = await res.json();
        
        if (data.data && data.data.timings) {
          calculateNextPrayer(data.data.timings);
        }
      } catch (error) {
        console.error('Failed to fetch prayer times', error);
      }
    };

    fetchPrayerTimes();
    // Update every minute to check for next prayer
    const interval = setInterval(fetchPrayerTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateNextPrayer = (timings: PrayerTimes) => {
    const now = new Date();
    const timeNow = now.getHours() * 60 + now.getMinutes();

    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    for (const prayer of prayers) {
      const [hours, minutes] = timings[prayer].split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      
      if (prayerTime > timeNow) {
        setNextPrayer({ name: prayer, time: timings[prayer] });
        return;
      }
    }

    // If all passed, next is Fajr tomorrow (simplified to just showing Fajr)
    setNextPrayer({ name: 'Fajr', time: timings['Fajr'] });
  };

  if (!nextPrayer) return null;

  return (
    <div className="badge badge-ghost gap-2 p-3 hidden sm:flex">
      <span className="text-xs font-semibold opacity-70">Next Prayer (KL):</span>
      <span className="font-bold text-primary">{nextPrayer.name} {nextPrayer.time}</span>
    </div>
  );
};

export default PrayerWidget;

