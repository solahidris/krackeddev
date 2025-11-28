'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Sparkles, Code2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobsPage() {
  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Kracked Jobs" 
        subtitle="Level up your career. Earn XP, unlock badges, and climb the leaderboard!"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-2xl"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-700/20 via-green-600/20 to-green-700/20 blur-3xl -z-10" />
            
            <Card className="border-2 border-green-700/50 bg-black/90 backdrop-blur-xl relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
              
              <CardContent className="p-12 md:p-16 text-center">
                {/* Animated icon */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative mb-8"
                >
                  <div className="w-24 h-24 rounded-none border-2 border-green-700 flex items-center justify-center mx-auto bg-green-700/10 shadow-[0_0_30px_rgba(21,128,61,0.4)]">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Rocket className="w-12 h-12 text-green-700" />
                    </motion.div>
                  </div>
                  {/* Floating sparkles */}
                  <motion.div
                    className="absolute top-0 left-1/4"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-green-700" />
                  </motion.div>
                  <motion.div
                    className="absolute top-0 right-1/4"
                    animate={{ 
                      y: [0, -15, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <Zap className="w-4 h-4 text-green-700" />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-green-700 mb-4 font-mono uppercase tracking-widest"
                >
                  Coming Soon
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-zinc-50/90 mb-6 max-w-md mx-auto leading-relaxed"
                >
                  We're crafting an epic gamified job board experience. Level up your career, earn XP, unlock badges, and climb the leaderboard!
                </motion.p>

                {/* Features preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-green-700/20"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-none border border-green-700/30 flex items-center justify-center mb-3 bg-green-700/5">
                      <Code2 className="w-6 h-6 text-green-700" />
                    </div>
                    <h3 className="text-sm font-semibold text-green-700 mb-1 font-mono">Gamified</h3>
                    <p className="text-xs text-zinc-50/70">Earn XP & badges</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-none border border-green-700/30 flex items-center justify-center mb-3 bg-green-700/5">
                      <Zap className="w-6 h-6 text-green-700" />
                    </div>
                    <h3 className="text-sm font-semibold text-green-700 mb-1 font-mono">Level Up</h3>
                    <p className="text-xs text-zinc-50/70">Track your progress</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-none border border-green-700/30 flex items-center justify-center mb-3 bg-green-700/5">
                      <Sparkles className="w-6 h-6 text-green-700" />
                    </div>
                    <h3 className="text-sm font-semibold text-green-700 mb-1 font-mono">Leaderboard</h3>
                    <p className="text-xs text-zinc-50/70">Compete & win</p>
                  </div>
                </motion.div>

                {/* Call to action */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-green-700/20"
                >
                  <p className="text-sm text-zinc-50/60 font-mono">
                    Stay tuned for updates! 🚀
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
