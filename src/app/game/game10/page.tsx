'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Code2, Lock } from 'lucide-react';

export default function Game10Page() {
  return (
    <main className="min-h-screen pb-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-10 relative z-10">
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
            <span className="text-sm">Nabil - Game 10</span>
          </div>
        </div>

        <Card className="mb-8 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3">
              <Lock className="w-12 h-12 text-neon-secondary" />
              Game 10: Nabil's Zone
            </CardTitle>
            <p className="text-lg text-white/60">
              Ready for development when you are!
            </p>
          </CardHeader>
        </Card>

        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-4">
                <div className="text-8xl mb-4">🚧</div>
                <h2 className="text-3xl font-bold text-neon-secondary">Ready for Development</h2>
                <p className="text-lg text-white/60 max-w-md">
                  This slot is ready for your code, Nabil!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}




