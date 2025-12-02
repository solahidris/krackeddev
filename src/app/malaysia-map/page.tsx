"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import MalaysiaSnapMap from '@/components/malaysia/MalaysiaSnapMap';
import { MusicPlayer } from '@/components/game/MusicPlayer';
import { SoundToggle } from '@/components/game/SoundToggle';
import '../jobs/jobs.css';

export default function MalaysiaMapPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <main className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      <MusicPlayer startPlaying={true} />
      <SoundToggle />
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
      
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 right-4 z-40 px-4 py-2 border-2 border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-500 hover:text-white font-mono text-sm transition-colors"
      >
        ← Back
      </button>

      {/* Snapchat-style Malaysia Map */}
      <div className="w-full h-screen">
        <MalaysiaSnapMap />
      </div>
    </main>
  );
}
