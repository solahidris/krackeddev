"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingTown } from "@/components/game/OnboardingTown";
import "../jobs/jobs.css";
import "./onboarding.css";

export default function OnboardingPage() {
  const router = useRouter();

  const handleBuildingEnter = (route: string) => {
    // Check if route is an external URL
    if (route.startsWith('http://') || route.startsWith('https://')) {
      window.open(route, '_blank', 'noopener,noreferrer');
    } else if (route !== 'npc-dialog') {
      router.push(route);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gray-900 relative">
      {/* CRT Scanline Overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
      <OnboardingTown onBuildingEnter={handleBuildingEnter} />
    </main>
  );
}

