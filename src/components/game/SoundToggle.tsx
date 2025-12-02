"use client";

import React, { useState, useEffect } from 'react';

export const SoundToggle: React.FC = () => {
    // Always start with false to match server render
    const [isMuted, setIsMuted] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Mark as client-side rendered
        setIsClient(true);
        
        // Load initial state from localStorage on client only
        const muted = localStorage.getItem('soundMuted') === 'true';
        setIsMuted(muted);

        // Sync with localStorage changes
        const handleStorageChange = () => {
            const muted = localStorage.getItem('soundMuted') === 'true';
            setIsMuted(muted);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
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

    return (
        <button
            onClick={toggleSound}
            className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center hover:bg-black/90 transition-all"
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

