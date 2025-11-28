'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJobBoard } from '@/app/context/JobBoardContext';
import { Trophy, Zap, Target, Flame } from 'lucide-react';

export function UserStats() {
  const { stats } = useJobBoard();
  
  const xpForNextLevel = (stats.level + 1) * 100;
  const xpProgress = stats.xp % 100;
  const progressPercentage = (xpProgress / 100) * 100;

  return (
    <Card className="border-neon-primary/30 bg-black/60 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
          Your Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level & XP */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Level {stats.level}</span>
            <span className="text-xs text-zinc-600 font-mono">
              {xpProgress}/100 XP
            </span>
          </div>
          <div className="w-full bg-black/50 border border-neon-primary/20 h-3 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-primary to-neon-secondary transition-all duration-500 relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite]" />
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-mono">
            {xpForNextLevel - stats.xp} XP to Level {stats.level + 1}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 bg-black/30 border border-neon-primary/10">
            <Zap className="w-4 h-4 text-zinc-600" />
            <div>
              <div className="text-xs text-muted-foreground">Total XP</div>
              <div className="text-lg font-bold text-zinc-600 font-mono">{stats.xp}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-black/30 border border-neon-primary/10">
            <Target className="w-4 h-4 text-zinc-600" />
            <div>
              <div className="text-xs text-muted-foreground">Jobs Viewed</div>
              <div className="text-lg font-bold text-zinc-600 font-mono">{stats.jobsViewed}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-black/30 border border-neon-primary/10">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <div>
              <div className="text-xs text-muted-foreground">Applied</div>
              <div className="text-lg font-bold text-yellow-400 font-mono">{stats.jobsApplied}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-black/30 border border-neon-primary/10">
            <Flame className="w-4 h-4 text-orange-500" />
            <div>
              <div className="text-xs text-muted-foreground">Streak</div>
              <div className="text-lg font-bold text-orange-500 font-mono">{stats.currentStreak} days</div>
            </div>
          </div>
        </div>

        {/* Badges Preview */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">Badges ({stats.badges.filter(b => b.unlocked).length}/{stats.badges.length})</div>
          <div className="flex flex-wrap gap-2">
            {stats.badges.filter(b => b.unlocked).slice(0, 4).map((badge) => (
              <Badge key={badge.id} variant="cyberpunk" className="text-xs">
                {badge.icon} {badge.name}
              </Badge>
            ))}
            {stats.badges.filter(b => b.unlocked).length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{stats.badges.filter(b => b.unlocked).length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

