"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogScene } from '@/components/game/BlogScene';
import '../jobs/jobs.css';

export default function BlogPage() {
  const router = useRouter();
  const [showGame, setShowGame] = useState(true);
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

  if (showGame) {
    return (
      <main className="min-h-screen w-full bg-gray-900 relative">
        <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
        <BlogScene onBack={handleBack} />
      </main>
    );
  }

  // Fallback to original blog page if needed
  return null;
}
