'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Code2, Zap } from 'lucide-react';

export default function Game6Page() {
  return (
    <main className="min-h-screen pb-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            href="/game" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
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
        <Card className="mb-8 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3">
              <Zap className="w-12 h-12 text-neon-secondary" />
              Game 6: Nabil's First Game
            </CardTitle>
            <p className="text-lg text-white/60">
              This is your experimental playground, Nabil! Build anything you want here.
            </p>
          </CardHeader>
        </Card>

        {/* Development Area */}
        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Under Construction */}
              <div className="text-center space-y-4">
                <div className="text-8xl mb-4">🚧</div>
                <h2 className="text-3xl font-bold text-neon-secondary">Under Construction</h2>
                <p className="text-lg text-white/60 max-w-md">
                  This page is ready for your code! Replace this content with your game implementation.
                </p>
              </div>

              {/* Developer Guide */}
              <div className="mt-8 p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-neon-secondary/30 max-w-2xl w-full">
                <h3 className="text-2xl font-semibold mb-6 text-neon-secondary flex items-center gap-2">
                  <Code2 className="w-6 h-6" />
                  Quick Start Guide
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-white">📁 File Location</h4>
                    <code className="text-sm bg-black/50 px-3 py-2 rounded block text-neon-secondary">
                      /src/app/game/game6/page.tsx
                    </code>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-white">💡 Ideas to Try</h4>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-neon-secondary">•</span>
                        <span>HTML5 Canvas game (drawing, animations)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-secondary">•</span>
                        <span>React-based card or board game</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-secondary">•</span>
                        <span>Physics simulation with simple mechanics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-secondary">•</span>
                        <span>Integrate a game library (Phaser, Three.js, etc.)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/60 italic">
                      💪 This is your space to experiment and learn. Break things, fix things, and have fun!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}




