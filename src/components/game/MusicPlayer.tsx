"use client";

import { useEffect, useRef, useState } from "react";

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

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const controls = {
            play: () => {
                const currentMuted = localStorage.getItem('soundMuted') === 'true';
                if (!currentMuted && audio) {
                    audio.play().catch(() => {
                        // Autoplay blocked – start on first user click
                        const unlock = () => {
                            const stillMuted = localStorage.getItem('soundMuted') === 'true';
                            if (audio && !stillMuted) {
                                audio.play().catch(() => { });
                            }
                            window.removeEventListener("click", unlock);
                        };
                        window.addEventListener("click", unlock);
                    });
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

        const currentMuted = localStorage.getItem('soundMuted') === 'true';
        if (startPlaying && !currentMuted) {
            controls.play();
        }
    }, [startPlaying, onReady]);

    // Listen for sound toggle events
    useEffect(() => {
        const handleSoundToggle = (e: CustomEvent) => {
            const newMuted = e.detail.muted;
            setIsMuted(newMuted);
            
            // Immediately update audio
            const audio = audioRef.current;
            if (audio) {
                if (newMuted) {
                    audio.volume = 0;
                    audio.pause();
                } else {
                    audio.volume = 0.4;
                    if (startPlaying) {
                        audio.play().catch(() => { });
                    }
                }
            }
        };

        window.addEventListener('soundToggle', handleSoundToggle as EventListener);
        return () => window.removeEventListener('soundToggle', handleSoundToggle as EventListener);
    }, [startPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Initialize volume based on mute state
        const currentMuted = localStorage.getItem('soundMuted') === 'true';
        if (currentMuted) {
            audio.volume = 0;
            audio.pause();
        } else {
            audio.volume = 0.4;
            if (startPlaying) {
                audio.play().catch(() => { });
            }
        }
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

// Export hook to control music from outside
export const useMusicControls = () => {
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('soundMuted') === 'true';
        }
        return false;
    });

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return { isMuted, toggleMute };
};

