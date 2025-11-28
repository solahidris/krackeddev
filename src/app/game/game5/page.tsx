"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Code2, Lock } from "lucide-react";

export default function Game5Page() {
  return (
    <main className="min-h-screen pb-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />

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
          <div className="flex items-center gap-2 text-neon-primary">
            <Code2 className="w-5 h-5" />
            <span className="text-sm">Solah - Game 5</span>
          </div>
        </div>

        {/* Game Title */}
        <Card className="mb-10 md:mb-12 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3">
              <Lock className="w-12 h-12 text-neon-primary" />
              Game 5: Solah's Zone
            </CardTitle>
            <p className="text-lg text-zinc-50/60">
              Your experimental playground. Build anything you want here!
            </p>
          </CardHeader>
        </Card>

        {/* Development Area */}
        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardContent className="pt-16 pb-16 md:pt-20 md:pb-20">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-4">
                <div className="text-8xl mb-4">🚧</div>
                <h2 className="text-3xl font-bold text-neon-primary">
                  Ready for Development
                </h2>
                <p className="text-lg text-zinc-50/60 max-w-md">
                  This slot is ready for your code, Solah! Replace this content
                  with your game implementation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
