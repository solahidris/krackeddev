"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WhitepaperScene } from '@/components/game/WhitepaperScene';
import { MusicPlayer } from '@/components/game/MusicPlayer';
import { SoundToggle } from '@/components/game/SoundToggle';
import { EscapeButton } from '@/components/game/EscapeButton';
import { useDialogClose } from '@/components/game/useDialogClose';
import '../jobs/jobs.css';

export default function WhitepaperPage() {
  const router = useRouter();
  const [showPDF, setShowPDF] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Capture first user interaction to unlock audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioUnlocked) {
        setAudioUnlocked(true);
        window.dispatchEvent(new CustomEvent('unlockAudio'));
      }
    };

    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'mousemove', 'touchmove'];
    events.forEach(event => {
      window.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [audioUnlocked]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBack = () => {
    router.push('/');
  };

  const handleClose = () => {
    setShowPDF(false);
    router.push('/');
  };

  // Handle Escape key and Y button to close dialog
  useDialogClose(showPDF, handleClose);

  return (
    <main className="min-h-screen w-full bg-gray-900 relative">
      <MusicPlayer startPlaying={true} />
      <SoundToggle />
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
      <WhitepaperScene onBack={handleBack} />
      
      {/* PDF Viewer Overlay */}
      {showPDF && (
        <>
          <EscapeButton onClose={handleClose} />
          <div className={`fixed inset-0 bg-transparent z-40 flex items-center justify-center pointer-events-none ${
            isMobile ? 'p-0' : 'p-2 md:p-4'
          }`}>
            <div className="pointer-events-auto">
            <div className={`bg-gray-900 ${
              isMobile 
                ? 'w-full max-h-[60vh] border-4 border-yellow-500 mb-20' 
                : 'border-4 border-yellow-500 max-w-6xl w-full h-[95vh] md:h-[90vh]'
            } flex flex-col overflow-hidden`}>
              <div className="flex justify-between items-center p-2 md:p-4 border-b border-yellow-500">
                <h2 className="text-lg md:text-2xl text-yellow-400 font-bold">WHITEPAPER</h2>
                <button
                  onClick={handleClose}
                  className="text-white hover:text-red-400 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src="/whitepaper.pdf#view=FitH"
                  className="w-full h-full"
                  title="Whitepaper PDF"
                  style={isMobile ? { 
                    width: '100%', 
                    height: '100%',
                    border: 'none'
                  } : {}}
                />
              </div>
              {!isMobile && (
                <div className="p-2 md:p-4 border-t border-yellow-500 text-center">
                  <p className="text-gray-500 text-xs md:text-sm">Press ESC to close</p>
                </div>
              )}
            </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}



