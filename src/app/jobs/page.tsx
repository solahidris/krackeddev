"use client";

import React, { useState } from 'react';
import { ViewState, CharacterStats, Quest, UserProfile } from '@/types/jobs';
import TownSquare from '@/components/jobs/TownSquare';
import QuestBoard from '@/components/jobs/QuestBoard';
import QuestDetail from '@/components/jobs/QuestDetail';
import CharacterHUD from '@/components/jobs/CharacterHUD';
import ProfileView from '@/components/jobs/ProfileView';
import TrainingCamp from '@/components/jobs/TrainingCamp';
import { PixelButton } from '@/components/jobs/PixelComponents';
import './jobs.css';

const JobsPage: React.FC = () => {
  const [view, setView] = useState<ViewState>('START_SCREEN');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  // Mock character stats
  const [stats, setStats] = useState<CharacterStats>({
    name: "Dev_Hero",
    level: 5,
    hp: 85,
    maxHp: 100,
    mp: 42,
    maxMp: 50,
    gold: 150,
    class: "Code Wizard"
  });

  // User Profile Data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    resumeName: null,
    experiences: [],
    skills: ['TypeScript', 'React', 'Tailwind'],
    education: [],
    honors: [],
    certs: []
  });

  const handleStart = () => {
    setView('TOWN_SQUARE');
  };

  const handleSelectQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    setView('QUEST_DETAIL');
  };

  const handleAcceptQuest = () => {
    if (selectedQuest) {
      alert(`You accepted the quest: ${selectedQuest.title}! Prepare your resume!`);
      setStats(prev => ({
        ...prev,
        hp: Math.min(prev.maxHp, prev.hp + 5),
        gold: prev.gold + 10
      }));
      setView('TOWN_SQUARE');
    }
  };

  const handleVisitInn = () => {
    setView('PROFILE');
  };

  const restoreStats = () => {
    setStats(prev => ({
      ...prev,
      hp: prev.maxHp,
      mp: prev.maxMp
    }));
    alert("You slept at the Inn. HP and MP fully restored!");
  };

  return (
    <div className="h-screen bg-gray-900 text-white jobs-container relative overflow-hidden flex flex-col pt-16">
      {/* Scanline Overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 relative z-10 flex flex-col overflow-hidden">
        {view === 'START_SCREEN' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 p-8 border-4 border-double border-white bg-blue-900/80 max-w-2xl mx-4">
              <h1 className="text-4xl md:text-6xl text-yellow-400 mb-8 text-shadow-xl leading-tight">
                KRACKED<br />JOBS
              </h1>
              <p className="mb-12 text-blue-200 text-sm md:text-base leading-loose">
                Embark on a journey to find your next role.<br />
                Defeat the Imposter Syndrome Dragon.<br />
                Loot the Salary Chest.
              </p>
              <PixelButton onClick={handleStart} className="text-xl animate-pulse">
                PRESS START
              </PixelButton>
            </div>
            <div className="absolute bottom-4 text-xs text-gray-500">
              © 2025 Kracked Jobs by iffat_haikal All Rights Reserved.
            </div>
          </div>
        )}

        {view === 'TOWN_SQUARE' && (
          <TownSquare
            stats={stats}
            onVisitGuild={() => setView('GUILD_HALL')}
            onRest={handleVisitInn}
            onVisitTraining={() => setView('TRAINING_CAMP')}
          />
        )}

        {view === 'PROFILE' && (
          <ProfileView
            profile={userProfile}
            stats={stats}
            onUpdateProfile={setUserProfile}
            onBack={() => setView('TOWN_SQUARE')}
            onSleep={restoreStats}
          />
        )}

        {view === 'GUILD_HALL' && (
          <QuestBoard
            onBack={() => setView('TOWN_SQUARE')}
            onSelectQuest={handleSelectQuest}
          />
        )}

        {view === 'QUEST_DETAIL' && selectedQuest && (
          <QuestDetail
            quest={selectedQuest}
            onBack={() => setView('GUILD_HALL')}
            onAccept={handleAcceptQuest}
          />
        )}

        {view === 'TRAINING_CAMP' && (
          <TrainingCamp onBack={() => setView('TOWN_SQUARE')} />
        )}
      </main>
    </div>
  );
};

export default JobsPage;
