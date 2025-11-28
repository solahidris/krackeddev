"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Code2, Zap, Keyboard, Trophy, Clock } from "lucide-react";

export default function Game6Page() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  // Prevent space from scrolling when game is focused
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "ArrowDown") {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const initGame = async () => {
      if (gameContainerRef.current && !gameRef.current) {
        const { createRunnerGame } = await import("@/game/runner/Game");
        gameRef.current = createRunnerGame(gameContainerRef.current);
        
        // Focus the game container after creation
        gameContainerRef.current.focus();
      }
    };

    // Add global key handler to prevent scroll
    window.addEventListener("keydown", handleKeyDown);
    
    initGame();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen pb-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-12 flex items-center justify-between">
          <Link
            href="/game"
            className="flex items-center gap-2 text-zinc-50/60 hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>
          <div className="flex items-center gap-2 text-neon-secondary">
            <Code2 className="w-5 h-5" />
            <span className="text-sm">Nabil - Game 6</span>
          </div>
        </div>

        {/* Game Title */}
        <Card className="mb-10 md:mb-12 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
          <CardHeader className="text-center py-8 md:py-10">
            <CardTitle className="text-3xl md:text-4xl mb-2 flex items-center justify-center gap-3">
              <Zap className="w-10 h-10 text-neon-secondary" />
              Kracked Dev Sprint
            </CardTitle>
            <p className="text-base text-zinc-50/60">
              Survive the sprint. Ship features. Avoid burnout.
            </p>
          </CardHeader>
        </Card>

        {/* Game Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Game Canvas Area */}
          <div className="flex-1">
            <Card className="border-neon-secondary/30 bg-black/80 backdrop-blur-md overflow-hidden">
              <CardContent className="p-0">
                <div
                  ref={gameContainerRef}
                  tabIndex={0}
                  className="w-full aspect-video max-w-2xl mx-auto outline-none focus:ring-2 focus:ring-neon-secondary/50"
                  style={{
                    imageRendering: "pixelated",
                    minHeight: "320px",
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="lg:w-72 space-y-4">
            {/* Controls */}
            <Card className="border-white/10 bg-black/60 backdrop-blur-md">
              <CardHeader className="py-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-neon-primary" />
                  Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <ul className="space-y-2 text-sm text-zinc-50/70">
                  <li className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
                      SPACE
                    </kbd>
                    <span>Jump</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
                      ↑
                    </kbd>
                    <span>Jump (Alt)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
                      R
                    </kbd>
                    <span>Restart</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
                      CLICK
                    </kbd>
                    <span>Jump (Mobile)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* How to Play */}
            <Card className="border-white/10 bg-black/60 backdrop-blur-md">
              <CardHeader className="py-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  How to Play
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <ul className="space-y-2 text-sm text-zinc-50/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">■</span>
                    <span>
                      Avoid <strong className="text-red-400">bugs</strong> (red blocks)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">■</span>
                    <span>
                      Collect <strong className="text-cyan-400">pickups</strong> for bonus points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-primary mt-0.5">▶</span>
                    <span>Speed increases each sprint day</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Sprint Info */}
            <Card className="border-white/10 bg-gradient-to-br from-neon-secondary/10 to-transparent backdrop-blur-md">
              <CardHeader className="py-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-neon-secondary" />
                  Sprint Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <p className="text-sm text-zinc-50/60">
                  Each run simulates a dev sprint. Survive as many days as you can while shipping features
                  and avoiding burnout triggers like legacy bugs and merge conflicts!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
