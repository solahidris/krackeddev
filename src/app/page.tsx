"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SplitTextAnimation from "@/components/animations/SplitTextAnimation";
import { LandingTown } from "@/components/game/LandingTown";
import { useSupabase } from "@/context/SupabaseContext";
import "@/styles/jobs.css";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading, openLoginModal } = useSupabase();
  const [showAnimation, setShowAnimation] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if we should skip animation (e.g., coming from back to town)
      const skipAnimation =
        sessionStorage.getItem("skipWelcomeAnimation") === "true";
      if (skipAnimation) {
        setShowAnimation(false);
        setAnimationDone(true);
        sessionStorage.removeItem("skipWelcomeAnimation");
        return;
      }

      // Check 12-hour localStorage logic
      const LAST_WELCOME_KEY = "krackedDevs_lastWelcomeTime";
      const ONE_HOUR_MS = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

      const lastWelcomeTime = localStorage.getItem(LAST_WELCOME_KEY);
      const now = Date.now();

      if (lastWelcomeTime) {
        const timeSinceLastWelcome = now - parseInt(lastWelcomeTime, 10);
        // If less than 12 hours have passed, skip animation
        if (timeSinceLastWelcome < ONE_HOUR_MS) {
          setShowAnimation(false);
          setAnimationDone(true);
          return;
        }
      }

      // If we get here, either it's the first time or 12+ hours have passed
      // Animation will show, and we'll save the timestamp when it completes
    }
  }, []);

  // Auto-open login modal when animation is done and user is not authenticated
  useEffect(() => {
    if (animationDone && !loading && !isAuthenticated) {
      // Small delay to let the town render first
      const timer = setTimeout(() => {
        openLoginModal();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animationDone, loading, isAuthenticated, openLoginModal]);

  const handleAnimationComplete = () => {
    // Save the current timestamp when animation completes
    if (typeof window !== "undefined") {
      const LAST_WELCOME_KEY = "krackedDevs_lastWelcomeTime";
      localStorage.setItem(LAST_WELCOME_KEY, Date.now().toString());
    }
    setShowAnimation(false);
    setAnimationDone(true);
    // Trigger audio unlock event for global MusicPlayer
    setAudioUnlocked(true);
    window.dispatchEvent(new CustomEvent("unlockAudio"));
  };

  // Capture first user interaction to unlock audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioUnlocked) {
        setAudioUnlocked(true);
        window.dispatchEvent(new CustomEvent("unlockAudio"));
      }
    };

    const events = [
      "click",
      "touchstart",
      "mousedown",
      "keydown",
      "mousemove",
      "touchmove",
    ];
    events.forEach((event) => {
      window.addEventListener(event, handleFirstInteraction, {
        once: true,
        passive: true,
      });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [audioUnlocked]);

  const handleBuildingEnter = (route: string) => {
    if (route === "/") {
      // Set flag to skip animation when returning to landing
      if (typeof window !== "undefined") {
        sessionStorage.setItem("skipWelcomeAnimation", "true");
      }
    }
    // Check if route is an external URL
    if (route.startsWith("http://") || route.startsWith("https://")) {
      window.open(route, "_blank", "noopener,noreferrer");
    } else {
      router.push(route);
    }
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
      {!showAnimation && <LandingTown onBuildingEnter={handleBuildingEnter} />}
    </main>
  );
}
