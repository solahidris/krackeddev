"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SplitTextAnimation from "./components/SplitTextAnimation";
import { LandingTown } from "@/components/game/LandingTown";
import { MusicPlayer } from "@/components/game/MusicPlayer";
import { SoundToggle } from "@/components/game/SoundToggle";
import "./jobs/jobs.css";

export default function Home() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(true);
  const [shouldStartMusic, setShouldStartMusic] = useState(true);
  const musicControlsRef = useRef<{ play: () => void; pause: () => void; setVolume: (vol: number) => void } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if we should skip animation (e.g., coming from back to town)
      const skipAnimation = sessionStorage.getItem('skipWelcomeAnimation') === 'true';
      if (skipAnimation) {
        setShowAnimation(false);
        sessionStorage.removeItem('skipWelcomeAnimation');
        // Start music immediately if animation is skipped
        setShouldStartMusic(true);
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
          // Start music immediately if animation is skipped
          setShouldStartMusic(true);
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
    // Start music after animation completes
    setShouldStartMusic(true);
    if (musicControlsRef.current) {
      musicControlsRef.current.play();
    }
  };

  // Start music immediately when controls are ready
  useEffect(() => {
    if (musicControlsRef.current && shouldStartMusic) {
      // Try multiple times to ensure it plays
      const tryPlay = () => {
        if (musicControlsRef.current) {
          musicControlsRef.current.play();
        }
      };
      
      tryPlay();
      const timeouts = [
        setTimeout(tryPlay, 50),
        setTimeout(tryPlay, 100),
        setTimeout(tryPlay, 200),
        setTimeout(tryPlay, 500),
        setTimeout(tryPlay, 1000)
      ];

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [shouldStartMusic]);

  // Also try to play on first user interaction (any interaction)
  useEffect(() => {
    if (!shouldStartMusic) return;

    const handleFirstInteraction = () => {
      if (musicControlsRef.current) {
        musicControlsRef.current.play();
      }
    };

    const events = ['click', 'touchstart', 'keydown', 'mousemove', 'touchmove', 'pointerdown'];
    events.forEach(event => {
      window.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [shouldStartMusic]);

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
      <MusicPlayer startPlaying={shouldStartMusic} onReady={(controls) => { musicControlsRef.current = controls; }} />
      <SoundToggle />
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
