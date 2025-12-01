"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.4; // adjust as you like

        // Try to autoplay, but handle browsers that block it
        const tryPlay = () => {
            audio
                .play()
                .then(() => {
                    // playing 👍
                })
                .catch(() => {
                    // Autoplay blocked – start on first user click
                    const unlock = () => {
                        audio.play().catch(() => { });
                        window.removeEventListener("click", unlock);
                    };
                    window.addEventListener("click", unlock);
                });
        };

        tryPlay();
    }, []);

    return (
        <audio
            ref={audioRef}
            src="../audio/Pixelmusic.mp3"
            loop
            preload="auto"
            className="hidden"
        />
    );
}
