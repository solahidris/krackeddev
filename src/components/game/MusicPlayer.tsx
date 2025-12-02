"use client";

import React, { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
    startPlaying?: boolean;
    onReady?: (controls: { play: () => void; pause: () => void; setVolume: (vol: number) => void }) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ startPlaying = true, onReady }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('soundMuted') === 'true';
        }
        return false;
    });
    const [audioReady, setAudioReady] = useState(false);

    // Check if audio is muted
    const isAudioMuted = () => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('soundMuted') === 'true';
    };

    // Function to try playing audio
    const tryPlayAudio = () => {
        const audio = audioRef.current;
        if (!audio || isAudioMuted()) return;

        audio.volume = 0.4;
        audio.play().catch((err) => {
            // Autoplay blocked - this is expected, will play on user interaction
            console.log('Autoplay blocked:', err);
        });
    };

    // Initialize audio and set up controls
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Set initial volume
        audio.volume = isAudioMuted() ? 0 : 0.4;

        // Handle audio ready events
        const handleCanPlay = () => {
            setAudioReady(true);
            if (startPlaying && !isAudioMuted()) {
                tryPlayAudio();
            }
        };

        const handleLoadedData = () => {
            setAudioReady(true);
            if (startPlaying && !isAudioMuted()) {
                tryPlayAudio();
            }
        };

        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('loadeddata', handleLoadedData);

        // If already loaded, try playing immediately
        if (audio.readyState >= 2) {
            setAudioReady(true);
            if (startPlaying && !isAudioMuted()) {
                tryPlayAudio();
            }
        }

        // Set up controls
        const controls = {
            play: () => {
                if (!isAudioMuted() && audio) {
                    audio.volume = 0.4;
                    tryPlayAudio();
                }
            },
            pause: () => {
                if (audio) {
                    audio.pause();
                }
            },
            setVolume: (vol: number) => {
                if (audio) {
                    audio.volume = vol;
                }
            }
        };

        if (onReady) {
            onReady(controls);
        }

        return () => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [onReady, startPlaying]);

    // Listen for sound toggle events
    useEffect(() => {
        const handleSoundToggle = (e: CustomEvent) => {
            const newMuted = e.detail.muted;
            setIsMuted(newMuted);
            
            const audio = audioRef.current;
            if (audio) {
                if (newMuted) {
                    audio.volume = 0;
                    audio.pause();
                } else {
                    audio.volume = 0.4;
                    if (startPlaying && audioReady) {
                        tryPlayAudio();
                    }
                }
            }
        };

        window.addEventListener('soundToggle', handleSoundToggle as EventListener);
        return () => window.removeEventListener('soundToggle', handleSoundToggle as EventListener);
    }, [startPlaying, audioReady]);

    // Try to play when startPlaying changes and audio is ready
    useEffect(() => {
        if (startPlaying && audioReady && !isAudioMuted()) {
            // Try multiple times with delays
            tryPlayAudio();
            const timeout1 = setTimeout(tryPlayAudio, 100);
            const timeout2 = setTimeout(tryPlayAudio, 300);
            const timeout3 = setTimeout(tryPlayAudio, 500);
            const timeout4 = setTimeout(tryPlayAudio, 1000);

            return () => {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                clearTimeout(timeout3);
                clearTimeout(timeout4);
            };
        }
    }, [startPlaying, audioReady]);

    // Aggressive autoplay on first user interaction
    useEffect(() => {
        if (!startPlaying || isAudioMuted()) return;

        const handleFirstInteraction = () => {
            tryPlayAudio();
            // Remove all listeners
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('mousemove', handleFirstInteraction);
            window.removeEventListener('touchmove', handleFirstInteraction);
            window.removeEventListener('pointerdown', handleFirstInteraction);
        };

        // Add listeners for various interaction types
        const events = ['click', 'touchstart', 'keydown', 'mousemove', 'touchmove', 'pointerdown'];
        events.forEach(event => {
            window.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, handleFirstInteraction);
            });
        };
    }, [startPlaying]);

    return (
        <audio
            ref={audioRef}
            src="/audio/Pixelmusic.mp3"
            loop
            preload="auto"
            className="hidden"
        />
    );
};

