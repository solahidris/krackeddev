"use client";

import React, { useEffect, useState } from 'react';
import { Trophy, Code, Zap, Target, CheckCircle2 } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  user: string;
  action: string;
  xp: number;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

const ACTIONS = [
  { text: "completed 'Build a Portfolio'", xp: 500, icon: <Trophy className="w-4 h-4" />, color: "text-yellow-500" },
  { text: "deployed first contract", xp: 1000, icon: <Zap className="w-4 h-4" />, color: "text-purple-500" },
  { text: "fixed critical bug", xp: 300, icon: <Code className="w-4 h-4" />, color: "text-blue-500" },
  { text: "joined hackathon", xp: 100, icon: <Target className="w-4 h-4" />, color: "text-red-500" },
  { text: "verified skill: React", xp: 200, icon: <CheckCircle2 className="w-4 h-4" />, color: "text-green-500" },
];

const USERS = [
  "0xDev...", "neon_coder", "pixel_art", "rust_god", "web3_fan", 
  "api_wiz", "fe_master", "be_king", "fullstack_hero", "ui_guru"
];

export const GlobalLeaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  // Initialize with some data
  useEffect(() => {
    const initialData = Array.from({ length: 20 }).map((_, i) => generateRandomEntry(i.toString()));
    setEntries(initialData);
  }, []);

  const generateRandomEntry = (id: string): LeaderboardEntry => {
    const actionTemplate = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const user = USERS[Math.floor(Math.random() * USERS.length)];
    
    return {
      id,
      user,
      action: actionTemplate.text,
      xp: actionTemplate.xp,
      timestamp: "just now",
      icon: actionTemplate.icon,
      color: actionTemplate.color
    };
  };

  return (
    <div className="w-full mx-auto mt-2 overflow-hidden border-2 border-green-900/50 bg-black/80 rounded-lg relative h-[400px]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-green-900/20 border-b border-green-900/50 flex items-center px-6 z-10 backdrop-blur-sm">
        <div className="grid grid-cols-12 w-full text-sm font-mono text-green-500 uppercase tracking-wider font-bold">
          <div className="col-span-3">User</div>
          <div className="col-span-6">Activity</div>
          <div className="col-span-3 text-right">XP Gained</div>
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="absolute top-12 left-0 right-0 bottom-0 overflow-hidden">
        <div className="animate-infinite-scroll">
           {/* Original List */}
           <div className="flex flex-col">
            {entries.map((entry) => (
              <LeaderboardRow key={`orig-${entry.id}`} entry={entry} />
            ))}
           </div>
           {/* Duplicate List for Seamless Loop */}
           <div className="flex flex-col">
            {entries.map((entry) => (
              <LeaderboardRow key={`dup-${entry.id}`} entry={entry} />
            ))}
           </div>
        </div>
      </div>

      {/* Gradient Overlay for Fade Effect */}
      <div className="absolute top-12 left-0 right-0 h-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10" />
    </div>
  );
};

const LeaderboardRow = ({ entry }: { entry: LeaderboardEntry }) => (
  <div className="grid grid-cols-12 px-6 py-4 border-b border-green-900/20 font-mono text-base hover:bg-green-900/10 transition-colors">
    <div className="col-span-3 text-gray-400 truncate font-semibold">{entry.user}</div>
    <div className="col-span-6 text-gray-300 flex items-center gap-3 truncate">
      <span className={entry.color}>{entry.icon}</span>
      {entry.action}
    </div>
    <div className="col-span-3 text-right text-yellow-500 font-bold">+{entry.xp} XP</div>
  </div>
);

