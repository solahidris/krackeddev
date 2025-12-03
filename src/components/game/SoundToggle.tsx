"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const SoundToggle: React.FC = () => {
    // Always start with false to match server render
    const [isMuted, setIsMuted] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Mark as client-side rendered
        setIsClient(true);
        
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Load initial state from localStorage on client only
        const muted = localStorage.getItem('soundMuted') === 'true';
        setIsMuted(muted);

        // Sync with localStorage changes
        const handleStorageChange = () => {
            const muted = localStorage.getItem('soundMuted') === 'true';
            setIsMuted(muted);
        };

        // Sync with soundToggle events from MobileControls
        const handleSoundToggle = (e: CustomEvent) => {
            setIsMuted(e.detail.muted);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('soundToggle', handleSoundToggle as EventListener);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('soundToggle', handleSoundToggle as EventListener);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const toggleSound = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        localStorage.setItem('soundMuted', newMuted.toString());
        
        // Trigger custom event for MusicPlayer to listen
        window.dispatchEvent(new CustomEvent('soundToggle', { detail: { muted: newMuted } }));
    };

    // Render consistent initial state until client-side hydration
    const displayMuted = isClient ? isMuted : false;

    // Hide on mobile (mute button is in MobileControls)
    // Also hide on /testimonial page
    if (isMobile || pathname === '/testimonial') {
        return null;
    }

    return (
        <button
            onClick={toggleSound}
            className="fixed top-20 right-20 z-[100] w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center hover:bg-black/90 transition-all pointer-events-auto"
            aria-label={displayMuted ? 'Unmute sound' : 'Mute sound'}
        >
            {displayMuted ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-white"
                >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-white"
                >
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
            )}
        </button>
    );
};
