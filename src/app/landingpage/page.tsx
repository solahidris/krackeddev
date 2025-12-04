"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('soundMuted') === 'true';
    }
    return false;
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mute/unmute
  const handleMuteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('soundMuted', newMuted.toString());
    
    // Dispatch event for global audio system
    window.dispatchEvent(new CustomEvent('soundToggle', { detail: { muted: newMuted } }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden">
      {/* Full Screen Content Area */}
      <div className="flex-1 w-full h-full relative overflow-hidden">
        {/* Background Image - bg.png */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/desktop/assets3-landing_page/bg.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* GUI Overlay - gui.png */}
        {/* <div className="absolute inset-0 w-full h-full z-10">
          <img
            src="/desktop/assets3-landing_page/gui.png"
            alt="GUI"
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* Social Logos - All link to X Community - Upper Left, 200% bigger */}
        <div className="absolute top-8 left-8 flex gap-1 z-20" style={{ transform: 'scale(3)', transformOrigin: 'top left' }}>
          <a
            href="https://x.com/i/communities/1983062242292822298"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/desktop/assets3-landing_page/xlogo.png"
              alt="X/Twitter"
              className="h-8 w-auto object-contain"
            />
          </a>
          <a
            href="https://x.com/i/communities/1983062242292822298"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/desktop/assets3-landing_page/dclogo.png"
              alt="Discord"
              className="h-8 w-auto object-contain"
            />
          </a>
          <a
            href="https://x.com/i/communities/1983062242292822298"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/desktop/assets3-landing_page/ytlogo.png"
              alt="YouTube"
              className="h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* Title - Center Above Menu Buttons */}
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-80 z-20">
          <img
            src="/desktop/assets3-landing_page/title.png"
            alt="Title"
            className="h-24 md:h-32 lg:h-40 w-auto object-contain"
          />
        </div>

        {/* Island Button - Lower Half - Links to Home */}
        <Link href="/" className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-28 z-20">
          <img
            src="/desktop/assets3-landing_page/islandbutton.png"
            alt="Island"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Setting Button - Lower Half - Links to Home */}
        <Link href="/" className="absolute top-2/3 left-1/2 transform -translate-x-1/2 translate-y-0 z-20">
          <img
            src="/desktop/assets3-landing_page/settingbutton.png"
            alt="Settings"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Export Button - Lower Half - Links to Home */}
        <Link href="/" className="absolute top-2/3 left-1/2 transform -translate-x-1/2 translate-y-28 z-20">
          <img
            src="/desktop/assets3-landing_page/exportbutton.png"
            alt="Export"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Other Logos - Same size as X logo, keep on right - All link to Home */}
        <div className="absolute top-8 right-8 flex gap-1 z-20" style={{ transform: 'scale(3)', transformOrigin: 'top right' }}>
          <Link href="/">
            <img
              src="/desktop/assets3-landing_page/trophylogo.png"
              alt="Trophy"
              className="h-8 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <button
            onClick={handleMuteToggle}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <img
              src="/desktop/assets3-landing_page/musiclogo.png"
              alt="Music"
              className={`h-8 w-auto object-contain ${isMuted ? 'opacity-50' : ''}`}
            />
          </button>
          <Link href="/">
            <img
              src="/desktop/assets3-landing_page/helplogo.png"
              alt="Help"
              className="h-8 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
