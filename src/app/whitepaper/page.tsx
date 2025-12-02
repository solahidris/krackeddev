"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WhitepaperScene } from '@/components/game/WhitepaperScene';
import '../jobs/jobs.css';

export default function WhitepaperPage() {
  const router = useRouter();
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Capture first user interaction to unlock audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioUnlocked) {
        setAudioUnlocked(true);
        window.dispatchEvent(new CustomEvent('unlockAudio'));
      }
    };

    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'mousemove', 'touchmove'];
    events.forEach(event => {
      window.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [audioUnlocked]);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen w-full bg-gray-900 relative">
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
      <WhitepaperScene onBack={handleBack} />
    </main>
  );
}



