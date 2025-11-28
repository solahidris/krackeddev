'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'CodeMaster', xp: 2450, level: 25 },
  { rank: 2, name: 'DevNinja', xp: 1890, level: 19 },
  { rank: 3, name: 'TechWizard', xp: 1650, level: 17 },
  { rank: 4, name: 'HackerPro', xp: 1420, level: 15 },
  { rank: 5, name: 'ByteLord', xp: 1280, level: 13 },
];

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="text-muted-foreground font-mono">#{rank}</span>;
  };

  return (
    <Card className="border-neon-primary/30 bg-black/60 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center justify-between p-3 bg-black/30 border border-neon-primary/10 hover:border-neon-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                {getRankIcon(entry.rank)}
                <div>
                  <div className="font-bold text-sm">{entry.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    Level {entry.level}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-zinc-600 font-mono">{entry.xp}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-center text-muted-foreground">
          Your rank: #{Math.floor(Math.random() * 50) + 6}
        </div>
      </CardContent>
    </Card>
  );
}

