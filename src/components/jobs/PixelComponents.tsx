"use client";

import React from 'react';

// Create a single shared Audio instance (only in browser)
let clickSound: HTMLAudioElement | null = null;
if (typeof Audio !== "undefined") {
    clickSound = new Audio("/audio/click.mp3"); // file in /public/audio/
    clickSound.volume = 0.6; // tweak volume if you want
}

// A classic blue RPG box with white border
export const RpgBox: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
    <div className={`relative bg-blue-800 border-4 border-white outline outline-4 outline-gray-800 shadow-xl ${className}`}>
        {title && (
            <div className="absolute -top-5 left-4 bg-blue-800 px-2 border-2 border-white text-white text-xs uppercase tracking-widest z-10">
                {title}
            </div>
        )}
        <div className="border-2 border-blue-900 p-4 h-full text-white">
            {children}
        </div>
    </div>
);

// A pixelated button
export const PixelButton: React.FC<{
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'danger' | 'success' | 'warning';
    disabled?: boolean;
    className?: string;
}> = ({ onClick, children, variant = 'primary', disabled, className = "" }) => {
    const baseColors = {
        primary: "bg-blue-600 hover:bg-blue-500",
        danger: "bg-red-600 hover:bg-red-500",
        success: "bg-green-600 hover:bg-green-500",
        warning: "bg-orange-600 hover:bg-orange-500"
    };

    const handleClick = () => {
        if (!disabled && clickSound) {
            try {
                clickSound.currentTime = 0; // rewind so rapid clicks work
                clickSound.play().catch(() => {
                    // ignore autoplay / user gesture issues for button
                });
            } catch {
                // fail silently
            }
        }

        // Call original onClick if provided
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`
                relative px-6 py-3 text-white uppercase text-sm tracking-wider font-bold
                border-b-4 border-r-4 border-black active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1
                disabled:opacity-50 disabled:cursor-not-allowed
                ${baseColors[variant]}
                ${className}
            `}
        >
            <div className="absolute inset-0 border-t-2 border-l-2 border-white/30 pointer-events-none"></div>
            {children}
        </button>
    );
};

// Health/Mana Bar
export const StatBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ label, value, max, color }) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className="flex items-center gap-2 text-xs mb-2">
            <span className="w-8 font-bold text-shadow">{label}</span>
            <div className="flex-1 h-4 bg-gray-900 border-2 border-gray-600 relative">
                <div
                    className={`h-full ${color} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                ></div>
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
            </div>
            <span className="w-16 text-right">{value}/{max}</span>
        </div>
    );
};

export const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-8 text-white animate-pulse">
        <div className="text-4xl mb-4">⌛</div>
        <p>Consulting the Oracles...</p>
    </div>
);
