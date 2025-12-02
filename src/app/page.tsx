"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SplitTextAnimation from "./components/SplitTextAnimation";
import { LandingTown } from "@/components/game/LandingTown";
import "./jobs/jobs.css";

export default function Home() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if we should skip animation (e.g., coming from back to town)
      const skipAnimation = sessionStorage.getItem('skipWelcomeAnimation') === 'true';
      if (skipAnimation) {
        setShowAnimation(false);
        sessionStorage.removeItem('skipWelcomeAnimation');
        return;
      }

      // Check 12-hour localStorage logic
      const LAST_WELCOME_KEY = 'krackedDevs_lastWelcomeTime';
      const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
      
      const lastWelcomeTime = localStorage.getItem(LAST_WELCOME_KEY);
      const now = Date.now();
      
      if (lastWelcomeTime) {
        const timeSinceLastWelcome = now - parseInt(lastWelcomeTime, 10);
        // If less than 12 hours have passed, skip animation
        if (timeSinceLastWelcome < TWELVE_HOURS_MS) {
          setShowAnimation(false);
          return;
        }
      }
      
      // If we get here, either it's the first time or 12+ hours have passed
      // Animation will show, and we'll save the timestamp when it completes
    }
  }, []);

  const handleAnimationComplete = () => {
    // Save the current timestamp when animation completes
    if (typeof window !== 'undefined') {
      const LAST_WELCOME_KEY = 'krackedDevs_lastWelcomeTime';
      localStorage.setItem(LAST_WELCOME_KEY, Date.now().toString());
    }
    setShowAnimation(false);
    // Trigger audio unlock event for global MusicPlayer
    setAudioUnlocked(true);
    window.dispatchEvent(new CustomEvent('unlockAudio'));
  };

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

  const handleBuildingEnter = (route: string) => {
    if (route === '/') {
      // Set flag to skip animation when returning to landing
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('skipWelcomeAnimation', 'true');
      }
    }
    router.push(route);
  };

  return (
    <main className="min-h-screen w-full bg-gray-900 relative">
      {/* CRT Scanline Overlay */}
      {!showAnimation && (
        <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
      )}
      {showAnimation && (
        <SplitTextAnimation
          text="Welcome to Kracked Devs"
          onComplete={handleAnimationComplete}
        />
      )}
      {!showAnimation && (
        <LandingTown onBuildingEnter={handleBuildingEnter} />
      )}
    </main>
  );
}
