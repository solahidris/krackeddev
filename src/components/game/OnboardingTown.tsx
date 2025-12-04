"use client";

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { TILE_EMPTY, TILE_WALL, TILE_NPC, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { BuildingConfig } from '@/lib/game/types';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { loadSprite } from '@/lib/game/sprites';
import {
  getLevelById,
  getNextLevel,
  getSectionLabel,
  getSectionDescription,
  getTasksBySection,
  getAllSections,
  getCurrentFocusSection,
  type OnboardingTask,
} from '@/lib/onboardingLevels';

interface OnboardingTownProps {
  onBuildingEnter: (route: string) => void;
}


export const OnboardingTown: React.FC<OnboardingTownProps> = ({ onBuildingEnter }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [currentXP, setCurrentXP] = useState<number>(0);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [levelUpMessage, setLevelUpMessage] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [celebrationTask, setCelebrationTask] = useState<{ title: string; xp: number } | null>(null);

  // Generate confetti data once to avoid Math.random() in render
  const confettiData = useMemo(() => {
    const colors = ['confetti-blue', 'confetti-red', 'confetti-green', 'confetti-yellow', 'confetti-purple', 'confetti-pink'];
    const leftParticles = Array.from({ length: 40 }, (_, i) => {
      // Use index-based seed for deterministic randomness
      const seed = i * 0.618033988749895; // Golden ratio for better distribution
      const randomColor = colors[Math.floor((seed % 1) * colors.length)];
      const angle = ((seed % 1) * 120 - 60) * (Math.PI / 180);
      const velocity = 300 + (seed % 1) * 400;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const r = (seed % 1) * 720 - 360;
      const delay = (seed % 1) * 0.2;
      return { randomColor, tx, ty, r, delay };
    });
    const rightParticles = Array.from({ length: 40 }, (_, i) => {
      const seed = (i + 40) * 0.618033988749895;
      const randomColor = colors[Math.floor((seed % 1) * colors.length)];
      const angle = ((seed % 1) * 120 + 120) * (Math.PI / 180);
      const velocity = 300 + (seed % 1) * 400;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const r = (seed % 1) * 720 - 360;
      const delay = (seed % 1) * 0.2;
      return { randomColor, tx, ty, r, delay };
    });
    return { leftParticles, rightParticles };
  }, []);

  // Preload house image
  useEffect(() => {
    loadSprite('/houses/HOUSE1.png').catch(() => {});
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedLevel = localStorage.getItem("onboarding-level");
    const savedXP = localStorage.getItem("onboarding-xp");
    const savedTasks = localStorage.getItem("onboarding-completed-tasks");
    const savedTaskIndex = localStorage.getItem("onboarding-task-index");

    if (savedLevel) {
      const levelId = parseInt(savedLevel, 10);
      if (levelId >= 1 && levelId <= 10) {
        setCurrentLevelId(levelId);
      }
    }

    if (savedXP) {
      setCurrentXP(parseInt(savedXP, 10));
    }

    if (savedTasks) {
      try {
        const taskIds = JSON.parse(savedTasks) as string[];
        setCompletedTaskIds(new Set(taskIds));
      } catch (e) {
        console.error("Failed to parse saved tasks", e);
      }
    }

    if (savedTaskIndex) {
      const taskIndex = parseInt(savedTaskIndex, 10);
      setCurrentTaskIndex(taskIndex);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("onboarding-level", currentLevelId.toString());
    localStorage.setItem("onboarding-xp", currentXP.toString());
    localStorage.setItem(
      "onboarding-completed-tasks",
      JSON.stringify(Array.from(completedTaskIds))
    );
    localStorage.setItem("onboarding-task-index", currentTaskIndex.toString());
  }, [currentLevelId, currentXP, completedTaskIds, currentTaskIndex]);

  // Generate map with NPC building
  const map = useMemo(() => {
    const newMap: number[][] = [];

    // Initialize empty map
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const row: number[] = [];
      for (let x = 0; x < MAP_WIDTH; x++) {
        // Border walls
        if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
          row.push(TILE_WALL);
        } else {
          row.push(TILE_EMPTY);
        }
      }
      newMap.push(row);
    }

    // Place NPC building (center-top)
    const centerX = Math.floor(MAP_WIDTH / 2);
    const npcY = 2;
    newMap[npcY][centerX - 1] = TILE_NPC;
    newMap[npcY][centerX] = TILE_NPC;
    newMap[npcY + 1][centerX - 1] = TILE_NPC;
    newMap[npcY + 1][centerX] = TILE_NPC;

    // Connect NPC with roads
    const buildingPositions = [
      [{ x: centerX - 1, y: npcY }, { x: centerX, y: npcY },
       { x: centerX - 1, y: npcY + 1 }, { x: centerX, y: npcY + 1 }]
    ];
    connectBuildingsWithRoads(newMap, buildingPositions);

    // Add ground variety and trees
    addGroundVariety(newMap);
    addTrees(newMap, [
      { x: centerX - 1, y: npcY }, { x: centerX, y: npcY },
      { x: centerX - 1, y: npcY + 1 }, { x: centerX, y: npcY + 1 }
    ]);

    return newMap;
  }, []);

  // Define NPC building configuration
  const buildings: BuildingConfig[] = useMemo(() => [
    {
      id: 'npc-guide',
      tileType: TILE_NPC,
      positions: [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: 2 },
        { x: Math.floor(MAP_WIDTH / 2), y: 2 },
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: 3 },
        { x: Math.floor(MAP_WIDTH / 2), y: 3 },
      ],
      label: 'NPC\nGUIDE',
      description: 'Talk to the onboarding guide',
      route: 'npc-dialog',
      color: '#06b6d4',
      colorDark: '#0891b2',
      imagePath: '/houses/HOUSE1.png',
    },
  ], []);

  // Get current level
  const currentLevel = getLevelById(currentLevelId);

  // Get all Level 1 tasks in order for single-task popup view
  const level1TasksOrdered = useMemo(() => {
    if (currentLevelId !== 1 || !currentLevel) return [];
    const sections = getAllSections(1);
    const orderedTasks: OnboardingTask[] = [];
    sections.forEach((section) => {
      const sectionTasks = getTasksBySection(currentLevel.tasks, section);
      orderedTasks.push(...sectionTasks);
    });
    return orderedTasks;
  }, [currentLevelId, currentLevel]);

  // Find the next incomplete task index for Level 1
  useEffect(() => {
    if (currentLevelId === 1 && level1TasksOrdered.length > 0) {
      const nextIncompleteIndex = level1TasksOrdered.findIndex(
        (task) => !completedTaskIds.has(task.id)
      );
      if (nextIncompleteIndex !== -1 && nextIncompleteIndex !== currentTaskIndex) {
        setCurrentTaskIndex(nextIncompleteIndex);
      } else if (nextIncompleteIndex === -1 && currentTaskIndex < level1TasksOrdered.length - 1) {
        // All tasks completed, show last task
        setCurrentTaskIndex(level1TasksOrdered.length - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelId, completedTaskIds, level1TasksOrdered]);

  const handleBuildingEnter = (route: string) => {
    if (route === 'npc-dialog') {
      setShowDialog(true);
      setShowGreeting(false);
      // Reset to first incomplete task for Level 1
      if (currentLevelId === 1 && level1TasksOrdered.length > 0) {
        const nextIncompleteIndex = level1TasksOrdered.findIndex(
          (task) => !completedTaskIds.has(task.id)
        );
        setCurrentTaskIndex(nextIncompleteIndex !== -1 ? nextIncompleteIndex : 0);
      }
    } else {
      onBuildingEnter(route);
    }
  };

  // Handle level advancement
  const handleLevelAdvance = useCallback(() => {
    if (currentLevel) {
      const completedCount = currentLevel.tasks.filter((t) =>
        completedTaskIds.has(t.id)
      ).length;
      const totalCount = currentLevel.tasks.filter((t) => !t.optional).length;

      if (completedCount >= totalCount) {
        const nextLevel = getNextLevel(currentLevelId);
        if (nextLevel) {
          setCurrentLevelId(nextLevel.id);
          setShowDialog(false);
          setShowGreeting(true);
          setShowLevelUp(true);
          setLevelUpMessage(`Level Up! You reached Level ${nextLevel.id}!`);
          setTimeout(() => {
            setShowLevelUp(false);
          }, 3000);
        } else {
          setShowDialog(false);
        }
      }
    }
  }, [currentLevel, completedTaskIds, currentLevelId]);

  // Handle task completion
  const handleTaskComplete = useCallback(
    (taskId: string, xp: number, taskTitle: string) => {
      if (completedTaskIds.has(taskId)) {
        return; // Already completed
      }

      setCompletedTaskIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(taskId);
        return newSet;
      });

      setCurrentXP((prev) => prev + xp);

      // Show celebration popup
      setCelebrationTask({ title: taskTitle, xp });
      setShowCelebration(true);

      // Auto-hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
        setCelebrationTask(null);
      }, 3000);

      // For Level 1, automatically move to next task after celebration
      if (currentLevelId === 1 && level1TasksOrdered.length > 0) {
        const currentIndex = level1TasksOrdered.findIndex((t) => t.id === taskId);
        if (currentIndex !== -1 && currentIndex < level1TasksOrdered.length - 1) {
          // Move to next task after celebration delay
          setTimeout(() => {
            setCurrentTaskIndex(currentIndex + 1);
          }, 3500);
        }
      }
    },
    [completedTaskIds, currentLevelId, level1TasksOrdered]
  );

  // Handle reset mission
  const handleResetMission = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Clear localStorage
    localStorage.removeItem("onboarding-level");
    localStorage.removeItem("onboarding-xp");
    localStorage.removeItem("onboarding-completed-tasks");
    localStorage.removeItem("onboarding-task-index");
    
    // Reset all state
    setCurrentLevelId(1);
    setCompletedTaskIds(new Set());
    setCurrentXP(0);
    setCurrentTaskIndex(0);
    setShowDialog(false);
    setShowGreeting(true);
    
    // Show confirmation message
    alert("Mission reset! You're back to Level 1, Section 1A with 0 XP. Start from the beginning!");
  }, []);

  // Navigation handlers for Level 1 single-task view
  const handleNextTask = useCallback(() => {
    if (currentLevelId === 1 && currentTaskIndex < level1TasksOrdered.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  }, [currentLevelId, currentTaskIndex, level1TasksOrdered]);

  const handlePreviousTask = useCallback(() => {
    if (currentLevelId === 1 && currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  }, [currentLevelId, currentTaskIndex]);

  // Handle Escape key to close dialog
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (showDialog) {
          setShowDialog(false);
          setShowGreeting(true);
        }
      }
    };

    if (showDialog) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showDialog, isMobile]);

  return (
    <div className="relative w-full h-full">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
        onCloseDialog={() => {
          if (showDialog) {
            setShowDialog(false);
          }
        }}
        canCloseDialog={showDialog}
      />

      {/* Level up message */}
      {showLevelUp && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold z-50 animate-pulse pointer-events-none">
          {levelUpMessage}
        </div>
      )}

      {/* Celebration Popup */}
      {showCelebration && celebrationTask && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 animate-fade-in" />
          
          {/* Celebration Text (No Card Background) */}
          <div className="relative text-center transform animate-scale-in pointer-events-auto px-4">
            <div className="text-6xl md:text-8xl mb-4 animate-pulse drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">🎉</div>
            <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4 drop-shadow-[0_4px_0_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '2px #000' }}>
              Task Completed!
            </h2>
            <p className="text-2xl md:text-4xl text-white mb-6 font-bold drop-shadow-[0_2px_0_#000]">
              {celebrationTask.title}
            </p>
            <div className="inline-block bg-black/40 backdrop-blur-md rounded-xl px-8 py-4 border-2 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              <p className="text-3xl md:text-5xl font-bold text-yellow-300 drop-shadow-md">
                +{celebrationTask.xp} XP
              </p>
            </div>
          </div>

          {/* Confetti Cannons (Pop from sides) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Left Cannon */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              {confettiData.leftParticles.map((particle, i) => (
                <div
                  key={`left-${i}`}
                  className={`confetti-piece ${particle.randomColor} animate-confetti-pop-side`}
                  style={{
                    left: '0px',
                    top: '0px',
                    '--tx': `${particle.tx}px`,
                    '--ty': `${particle.ty}px`,
                    '--r': `${particle.r}deg`,
                    animationDelay: `${particle.delay}s`,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Right Cannon */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              {confettiData.rightParticles.map((particle, i) => (
                <div
                  key={`right-${i}`}
                  className={`confetti-piece ${particle.randomColor} animate-confetti-pop-side`}
                  style={{
                    right: '0px',
                    top: '0px',
                    '--tx': `${particle.tx}px`,
                    '--ty': `${particle.ty}px`,
                    '--r': `${particle.r}deg`,
                    animationDelay: `${particle.delay}s`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dialog Popup - Following Levels Popup Structure */}
      {showDialog && (
        <>
          {/* Backdrop - Desktop only */}
          {!isMobile && <div className="fixed inset-0 bg-black/50 z-30" />}
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-2 md:p-4 pointer-events-none">
            <div className="pointer-events-auto">
              <div className={`bg-gray-900 border-4 border-blue-500 max-w-4xl w-full overflow-y-auto p-4 md:p-6 ${
                isMobile ? 'max-h-[60vh] mb-20' : 'max-h-[80vh]'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-blue-400 font-bold">ONBOARDING QUEST GUIDE</h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleResetMission}
                      className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition-colors font-mono"
                      title="Reset mission to Level 1"
                    >
                      Reset Mission
                    </button>
                    <button
                      onClick={() => {
                        setShowDialog(false);
                        setShowGreeting(true);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-white space-y-4 md:space-y-6">
                    {showGreeting && currentLevel && (
                      <div className="border-b border-blue-500/30 pb-4 md:pb-6">
                        <p className="text-gray-300 text-base md:text-lg mb-4">
                          Welcome, Developer! I&apos;m your onboarding guide. Here&apos;s your current quest progress.
                        </p>
                        {currentLevel.id === 1 && (() => {
                          const focusSection = getCurrentFocusSection(currentLevel.tasks, completedTaskIds);
                          return focusSection ? (
                            <p className="text-blue-300 text-sm mb-4">
                              <strong>Current Focus:</strong> {getSectionLabel(focusSection)} - {getSectionDescription(focusSection)}
                            </p>
                          ) : null;
                        })()}
                        <button
                          onClick={() => setShowGreeting(false)}
                          className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors font-mono"
                        >
                          View Full Details →
                        </button>
                      </div>
                    )}
                    
                    {currentLevel && (
                      <>
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2 md:mb-4">
                            LEVEL {currentLevel.id}: {currentLevel.title}
                          </h1>
                          <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                            {currentLevel.description}
                          </p>
                        </div>

                        <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                          <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">
                            YOUR TASKS
                          </h2>
                          
                          {/* Level 1: Single Task Popup View */}
                          {currentLevel.id === 1 && level1TasksOrdered.length > 0 ? (
                            <>
                              {/* Progress indicator */}
                              <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-blue-300 font-semibold">
                                    Task {currentTaskIndex + 1} of {level1TasksOrdered.length}
                                  </span>
                                  <span className="text-gray-300 text-sm">
                                    {level1TasksOrdered.filter((t) => completedTaskIds.has(t.id)).length} completed
                                  </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{
                                      width: `${((currentTaskIndex + 1) / level1TasksOrdered.length) * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Current Task Display */}
                              {(() => {
                                const currentTask = level1TasksOrdered[currentTaskIndex];
                                const isCompleted = completedTaskIds.has(currentTask.id);
                                const taskSection = currentTask.section;
                                const sectionLabel = taskSection ? getSectionLabel(taskSection) : '';
                                
                                return (
                                  <div className="mb-6">
                                    {/* Section Info */}
                                    {taskSection && (
                                      <div className="mb-4 p-3 bg-blue-900/10 border border-blue-500/20 rounded">
                                        <p className="text-blue-300 text-sm font-semibold">{sectionLabel}</p>
                                        <p className="text-gray-400 text-xs mt-1">
                                          {getSectionDescription(taskSection)}
                                        </p>
                                      </div>
                                    )}

                                    {/* Task Card */}
                                    <div className={`border-2 rounded-lg p-6 mb-4 ${
                                      isCompleted 
                                        ? 'border-green-500 bg-green-700/10' 
                                        : 'border-blue-500 bg-gray-800/50'
                                    }`}>
                                      <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                          <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-2">
                                            {currentTask.title}
                                            {currentTask.optional && (
                                              <span className="text-blue-400 text-sm ml-2">(Optional)</span>
                                            )}
                                          </h3>
                                          <div className="flex flex-wrap gap-3 text-sm">
                                            <span className="text-gray-300">
                                              <span className="text-blue-300 font-semibold">XP:</span> {currentTask.xp}
                                            </span>
                                            <span className="text-gray-300">
                                              <span className="text-blue-300 font-semibold">Category:</span> {currentTask.category}
                                            </span>
                                          </div>
                                        </div>
                                        {isCompleted && (
                                          <span className="text-green-400 font-bold text-lg">✓</span>
                                        )}
                                      </div>
                                      
                                      <p className="text-gray-300 text-base mb-6">
                                        {currentTask.description}
                                      </p>

                                      {/* Task Action */}
                                      <div className="flex items-center justify-between">
                                        <div>
                                          {isCompleted ? (
                                            <span className="text-green-400 font-bold text-lg">✓ COMPLETED</span>
                                          ) : (
                                            <button
                                              onClick={() => handleTaskComplete(currentTask.id, currentTask.xp, currentTask.title)}
                                              className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors font-mono font-bold text-lg"
                                            >
                                              Mark as Complete
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={handlePreviousTask}
                                        disabled={currentTaskIndex === 0}
                                        className={`px-4 py-2 rounded transition-colors font-mono ${
                                          currentTaskIndex === 0
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-700 hover:bg-blue-600 text-white'
                                        }`}
                                      >
                                        ← Previous Task
                                      </button>
                                      
                                      <span className="text-gray-400 text-sm">
                                        {currentTaskIndex + 1} / {level1TasksOrdered.length}
                                      </span>
                                      
                                      <button
                                        onClick={handleNextTask}
                                        disabled={currentTaskIndex >= level1TasksOrdered.length - 1}
                                        className={`px-4 py-2 rounded transition-colors font-mono ${
                                          currentTaskIndex >= level1TasksOrdered.length - 1
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-700 hover:bg-blue-600 text-white'
                                        }`}
                                      >
                                        Next Task →
                                      </button>
                                    </div>
                                  </div>
                                );
                              })()}
                            </>
                          ) : (
                            /* Other Levels: Table View */
                            <>
                              {/* Section Progress Summary for other levels if needed */}
                              <div className="overflow-x-auto mb-4 md:mb-6">
                                <table className="w-full text-xs md:text-sm border-collapse">
                                  <thead>
                                    <tr className="border-b border-blue-500/30">
                                      <th className="text-left text-blue-300 p-2">Task</th>
                                      <th className="text-left text-blue-300 p-2">XP Reward</th>
                                      <th className="text-left text-blue-300 p-2">Category</th>
                                      <th className="text-left text-blue-300 p-2">Description</th>
                                      <th className="text-left text-blue-300 p-2">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {currentLevel.tasks.map((task) => {
                                      const isCompleted = completedTaskIds.has(task.id);
                                      return (
                                        <tr
                                          key={task.id}
                                          className={`border-b border-blue-500/20 ${
                                            isCompleted ? "bg-green-700/10" : ""
                                          }`}
                                        >
                                          <td className="text-gray-300 p-2">
                                            {task.title}
                                            {task.optional && (
                                              <span className="text-blue-400 text-xs ml-1">(Optional)</span>
                                            )}
                                          </td>
                                          <td className="text-gray-300 p-2">{task.xp} XP</td>
                                          <td className="text-gray-300 p-2">{task.category}</td>
                                          <td className="text-gray-300 p-2">{task.description}</td>
                                          <td className="p-2">
                                            {isCompleted ? (
                                              <span className="text-green-400 font-bold">✓ COMPLETED</span>
                                            ) : (
                                              <button
                                                onClick={() => handleTaskComplete(task.id, task.xp, task.title)}
                                                className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                                              >
                                                Complete
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </>
                          )}
                        </div>

                        {currentLevel.tasks.filter((t) => completedTaskIds.has(t.id)).length >=
                          currentLevel.tasks.filter((t) => !t.optional).length && (
                          <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                            <div className="bg-green-700/20 border-2 border-green-700 p-4 rounded">
                              <p className="text-green-400 font-bold text-lg mb-2">
                                🎉 Congratulations! Level {currentLevel.id} Complete!
                              </p>
                              <p className="text-gray-300 text-sm md:text-base">
                                You&apos;ve completed all required tasks. Press the button below to advance to the next level.
                              </p>
                              <button
                                onClick={handleLevelAdvance}
                                className="mt-4 px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded transition-colors font-mono font-bold"
                              >
                                Advance to Level {currentLevelId + 1} →
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

