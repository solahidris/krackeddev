"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  unlocked: boolean;
}

interface UserStats {
  xp: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  jobsViewed: number;
  jobsApplied: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}

interface JobBoardContextType {
  stats: UserStats;
  addXP: (amount: number) => void;
  viewJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
  checkAchievements: () => void;
  updateDailyStreak: () => void;
}

const JobBoardContext = createContext<JobBoardContextType | undefined>(
  undefined
);

const INITIAL_BADGES: Badge[] = [
  {
    id: "first_view",
    name: "First Look",
    description: "Viewed your first job",
    icon: "👁️",
    unlocked: false,
  },
  {
    id: "job_hunter",
    name: "Job Hunter",
    description: "Viewed 10 jobs",
    icon: "🔍",
    unlocked: false,
  },
  {
    id: "applied",
    name: "Applied",
    description: "Applied to your first job",
    icon: "📝",
    unlocked: false,
  },
  {
    id: "streak_3",
    name: "On Fire",
    description: "3 day streak",
    icon: "🔥",
    unlocked: false,
  },
  {
    id: "streak_7",
    name: "Dedicated",
    description: "7 day streak",
    icon: "💪",
    unlocked: false,
  },
  {
    id: "level_5",
    name: "Rising Star",
    description: "Reached level 5",
    icon: "⭐",
    unlocked: false,
  },
  {
    id: "level_10",
    name: "Elite",
    description: "Reached level 10",
    icon: "🌟",
    unlocked: false,
  },
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "view_5",
    name: "Explorer",
    description: "View 5 jobs",
    xpReward: 50,
    unlocked: false,
  },
  {
    id: "view_25",
    name: "Researcher",
    description: "View 25 jobs",
    xpReward: 200,
    unlocked: false,
  },
  {
    id: "apply_1",
    name: "First Step",
    description: "Apply to 1 job",
    xpReward: 100,
    unlocked: false,
  },
  {
    id: "apply_5",
    name: "Go Getter",
    description: "Apply to 5 jobs",
    xpReward: 500,
    unlocked: false,
  },
];

export function JobBoardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jobBoardStats");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      xp: 0,
      level: 1,
      badges: INITIAL_BADGES,
      achievements: INITIAL_ACHIEVEMENTS,
      jobsViewed: 0,
      jobsApplied: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jobBoardStats", JSON.stringify(stats));
    }
  }, [stats]);

  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 100) + 1;
  };

  const addXP = (amount: number) => {
    setStats((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const levelUp = newLevel > prev.level;

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const viewJob = (jobId: string) => {
    setStats((prev) => {
      const newCount = prev.jobsViewed + 1;
      addXP(10);
      return {
        ...prev,
        jobsViewed: newCount,
      };
    });
    checkAchievements();
  };

  const applyToJob = (jobId: string) => {
    setStats((prev) => {
      const newCount = prev.jobsApplied + 1;
      addXP(50);
      return {
        ...prev,
        jobsApplied: newCount,
      };
    });
    checkAchievements();
  };

  const updateDailyStreak = () => {
    const today = new Date().toDateString();
    setStats((prev) => {
      if (prev.lastActiveDate === today) {
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = prev.lastActiveDate === yesterday.toDateString();

      const newStreak = isConsecutive ? prev.currentStreak + 1 : 1;
      const newLongestStreak = Math.max(newStreak, prev.longestStreak);

      addXP(isConsecutive ? 20 : 10);

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
      };
    });
  };

  const checkAchievements = () => {
    setStats((prev) => {
      const updatedBadges = [...prev.badges];
      const updatedAchievements = [...prev.achievements];
      let xpGained = 0;

      // Check badge unlocks
      if (
        prev.jobsViewed >= 1 &&
        !updatedBadges.find((b) => b.id === "first_view")?.unlocked
      ) {
        const badge = updatedBadges.find((b) => b.id === "first_view");
        if (badge) {
          badge.unlocked = true;
          badge.unlockedAt = new Date();
          xpGained += 25;
        }
      }
      if (
        prev.jobsViewed >= 10 &&
        !updatedBadges.find((b) => b.id === "job_hunter")?.unlocked
      ) {
        const badge = updatedBadges.find((b) => b.id === "job_hunter");
        if (badge) {
          badge.unlocked = true;
          badge.unlockedAt = new Date();
          xpGained += 50;
        }
      }
      if (
        prev.jobsApplied >= 1 &&
        !updatedBadges.find((b) => b.id === "applied")?.unlocked
      ) {
        const badge = updatedBadges.find((b) => b.id === "applied");
        if (badge) {
          badge.unlocked = true;
          badge.unlockedAt = new Date();
          xpGained += 75;
        }
      }
      if (
        prev.currentStreak >= 3 &&
        !updatedBadges.find((b) => b.id === "streak_3")?.unlocked
      ) {
        const badge = updatedBadges.find((b) => b.id === "streak_3");
        if (badge) {
          badge.unlocked = true;
          badge.unlockedAt = new Date();
          xpGained += 100;
        }
      }
      if (
        prev.currentStreak >= 7 &&
        !updatedBadges.find((b) => b.id === "streak_7")?.unlocked
      ) {
        const badge = updatedBadges.find((b) => b.id === "streak_7");
        if (badge) {
          badge.unlocked = true;
          badge.unlockedAt = new Date();
          xpGained += 200;
        }
      }
      if (
        prev.level >= 5 &&
        !updatedBadges.find((b) => b.id === "level_5")?.unlocked
      ) {
        const badge = updatedBadges.find((b) => b.id === "level_5");
        if (badge) {
          badge.unlocked = true;
          badge.unlockedAt = new Date();
          xpGained += 150;
        }
      }
      if (
        prev.level >= 10 &&
        !updatedBadges.find((b) => b.id === "level_10")?.unlocked
      ) {
        const badge = updatedBadges.find((b) => b.id === "level_10");
        if (badge) {
          badge.unlocked = true;
          badge.unlockedAt = new Date();
          xpGained += 300;
        }
      }

      // Check achievement unlocks
      if (
        prev.jobsViewed >= 5 &&
        !updatedAchievements.find((a) => a.id === "view_5")?.unlocked
      ) {
        const achievement = updatedAchievements.find((a) => a.id === "view_5");
        if (achievement) {
          achievement.unlocked = true;
          xpGained += achievement.xpReward;
        }
      }
      if (
        prev.jobsViewed >= 25 &&
        !updatedAchievements.find((a) => a.id === "view_25")?.unlocked
      ) {
        const achievement = updatedAchievements.find((a) => a.id === "view_25");
        if (achievement) {
          achievement.unlocked = true;
          xpGained += achievement.xpReward;
        }
      }
      if (
        prev.jobsApplied >= 1 &&
        !updatedAchievements.find((a) => a.id === "apply_1")?.unlocked
      ) {
        const achievement = updatedAchievements.find((a) => a.id === "apply_1");
        if (achievement) {
          achievement.unlocked = true;
          xpGained += achievement.xpReward;
        }
      }
      if (
        prev.jobsApplied >= 5 &&
        !updatedAchievements.find((a) => a.id === "apply_5")?.unlocked
      ) {
        const achievement = updatedAchievements.find((a) => a.id === "apply_5");
        if (achievement) {
          achievement.unlocked = true;
          xpGained += achievement.xpReward;
        }
      }

      if (xpGained > 0) {
        const newXP = prev.xp + xpGained;
        const newLevel = calculateLevel(newXP);
        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          badges: updatedBadges,
          achievements: updatedAchievements,
        };
      }

      return {
        ...prev,
        badges: updatedBadges,
        achievements: updatedAchievements,
      };
    });
  };

  useEffect(() => {
    updateDailyStreak();
  }, []);

  return (
    <JobBoardContext.Provider
      value={{
        stats,
        addXP,
        viewJob,
        applyToJob,
        checkAchievements,
        updateDailyStreak,
      }}
    >
      {children}
    </JobBoardContext.Provider>
  );
}

export function useJobBoard() {
  const context = useContext(JobBoardContext);
  if (context === undefined) {
    throw new Error("useJobBoard must be used within a JobBoardProvider");
  }
  return context;
}
