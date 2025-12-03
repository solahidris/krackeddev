"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { TILE_EMPTY, TILE_WALL, TILE_BLOG, TILE_JOBS, TILE_CODE, TILE_PROFILE, TILE_WHITEPAPER, TILE_X, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { BuildingConfig } from '@/lib/game/types';
import { CharacterStats, UserProfile } from '@/types/jobs';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { EscapeButton } from './EscapeButton';

interface LandingTownProps {
  onBuildingEnter: (route: string) => void;
}

export const LandingTown: React.FC<LandingTownProps> = ({ onBuildingEnter }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Mock profile data
  const stats: CharacterStats = {
    name: "Dev_Hero",
    level: 5,
    hp: 85,
    maxHp: 100,
    mp: 42,
    maxMp: 50,
    gold: 150,
    class: "Code Wizard"
  };

  const userProfile: UserProfile = {
    resumeName: null,
    experiences: [],
    skills: ['TypeScript', 'React', 'Tailwind', 'Next.js', 'Node.js'],
    education: [],
    honors: [],
    certs: []
  };

  // Generate map with all buildings
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

    // Place Blog building (top-right)
    newMap[2][MAP_WIDTH - 5] = TILE_BLOG;
    newMap[2][MAP_WIDTH - 4] = TILE_BLOG;
    newMap[3][MAP_WIDTH - 5] = TILE_BLOG;
    newMap[3][MAP_WIDTH - 4] = TILE_BLOG;

    // Place Jobs building (top-left)
    newMap[2][3] = TILE_JOBS;
    newMap[2][4] = TILE_JOBS;
    newMap[3][3] = TILE_JOBS;
    newMap[3][4] = TILE_JOBS;

    // Place Code building (left-center)
    newMap[5][2] = TILE_CODE;
    newMap[5][3] = TILE_CODE;
    newMap[6][2] = TILE_CODE;
    newMap[6][3] = TILE_CODE;

    // Place Profile building (right-center)
    newMap[5][MAP_WIDTH - 4] = TILE_PROFILE;
    newMap[5][MAP_WIDTH - 3] = TILE_PROFILE;
    newMap[6][MAP_WIDTH - 4] = TILE_PROFILE;
    newMap[6][MAP_WIDTH - 3] = TILE_PROFILE;

    // Place Whitepaper building (bottom-center)
    newMap[MAP_HEIGHT - 3][Math.floor(MAP_WIDTH / 2) - 1] = TILE_WHITEPAPER;
    newMap[MAP_HEIGHT - 3][Math.floor(MAP_WIDTH / 2)] = TILE_WHITEPAPER;
    newMap[MAP_HEIGHT - 4][Math.floor(MAP_WIDTH / 2) - 1] = TILE_WHITEPAPER;
    newMap[MAP_HEIGHT - 4][Math.floor(MAP_WIDTH / 2)] = TILE_WHITEPAPER;

    // Place X tiles (2 tiles above spawn - spawn is at center, so Y=2 is 2 tiles above center Y=4)
    const centerX = Math.floor(MAP_WIDTH / 2);
    const xTileY = 2; // 2 tiles above spawn (spawn Y is around 4)
    newMap[xTileY][centerX - 1] = TILE_X;
    newMap[xTileY][centerX] = TILE_X;

    // Connect buildings with roads (before adding trees and variety)
    const buildingPositions = [
      [{ x: MAP_WIDTH - 5, y: 2 }, { x: MAP_WIDTH - 4, y: 2 }, { x: MAP_WIDTH - 5, y: 3 }, { x: MAP_WIDTH - 4, y: 3 }], // Blog
      [{ x: 3, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }], // Jobs
      [{ x: 2, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 6 }], // Code
      [{ x: MAP_WIDTH - 4, y: 5 }, { x: MAP_WIDTH - 3, y: 5 }, { x: MAP_WIDTH - 4, y: 6 }, { x: MAP_WIDTH - 3, y: 6 }], // Profile
      [{ x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 3 }, { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 3 },
       { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 }, { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 }], // Whitepaper
      [{ x: Math.floor(MAP_WIDTH / 2) - 1, y: 2 }, { x: Math.floor(MAP_WIDTH / 2), y: 2 }] // X tiles
    ];
    connectBuildingsWithRoads(newMap, buildingPositions);

    // Add ground variety and trees
    addGroundVariety(newMap);
    addTrees(newMap, [
      { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }, // Jobs
      { x: MAP_WIDTH - 5, y: 2 }, { x: MAP_WIDTH - 4, y: 2 }, { x: MAP_WIDTH - 5, y: 3 }, { x: MAP_WIDTH - 4, y: 3 }, // Blog
      { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 6 }, // Code
      { x: MAP_WIDTH - 4, y: 5 }, { x: MAP_WIDTH - 3, y: 5 }, { x: MAP_WIDTH - 4, y: 6 }, { x: MAP_WIDTH - 3, y: 6 }, // Profile
      { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 3 }, { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 3 },
      { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 }, { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 }, // Whitepaper
      { x: Math.floor(MAP_WIDTH / 2) - 1, y: 2 }, { x: Math.floor(MAP_WIDTH / 2), y: 2 } // X tiles
    ]);

    return newMap;
  }, []);

  // Define buildings configuration
  const buildings: BuildingConfig[] = useMemo(() => [
    {
      id: 'blog',
      tileType: TILE_BLOG,
      positions: [
        { x: MAP_WIDTH - 5, y: 2 },
        { x: MAP_WIDTH - 4, y: 2 },
        { x: MAP_WIDTH - 5, y: 3 },
        { x: MAP_WIDTH - 4, y: 3 },
      ],
      label: 'BLOG',
      description: 'Read our latest posts and updates',
      route: '/blog',
      color: '#a855f7',
      colorDark: '#9333ea',
    },
    {
      id: 'new-jobs',
      tileType: TILE_JOBS,
      positions: [
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
      ],
      label: 'JOBS',
      description: 'Explore tech jobs in a playable world',
      route: '/new-jobs',
      color: '#3b82f6',
      colorDark: '#2563eb',
    },
    {
      id: 'code',
      tileType: TILE_CODE,
      positions: [
        { x: 2, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 6 },
        { x: 3, y: 6 },
      ],
      label: 'CODE',
      description: 'Hackathons, Open Source, and Bounties',
      route: '/code',
      color: '#06b6d4',
      colorDark: '#0891b2',
    },
    {
      id: 'members',
      tileType: TILE_PROFILE,
      positions: [
        { x: MAP_WIDTH - 4, y: 5 },
        { x: MAP_WIDTH - 3, y: 5 },
        { x: MAP_WIDTH - 4, y: 6 },
        { x: MAP_WIDTH - 3, y: 6 },
      ],
      label: 'MEMBERS',
      description: 'View our community members',
      route: '/members',
      color: '#ec4899',
      colorDark: '#db2777',
    },
    {
      id: 'whitepaper',
      tileType: TILE_WHITEPAPER,
      positions: [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 },
        { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 },
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 3 },
        { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 3 },
      ],
      label: 'WHITEPAPER',
      customLabel: 'WHITE\nPAPER',
      description: 'Read our project whitepaper',
      route: '/whitepaper',
      color: '#eab308',
      colorDark: '#ca8a04',
    },
    {
      id: 'x',
      tileType: TILE_X,
      positions: [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: 2 },
        { x: Math.floor(MAP_WIDTH / 2), y: 2 },
      ],
      label: 'X',
      description: 'Join our X community',
      route: 'https://x.com/i/communities/1983062242292822298',
      color: '#000000',
      colorDark: '#000000',
    },
  ], []);

  const handleBuildingEnter = (route: string) => {
    if (route === 'profile-popup') {
      setShowProfilePopup(true);
    } else {
      onBuildingEnter(route);
    }
  };

  // Handle Escape key to close popups (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (showProfilePopup) {
          setShowProfilePopup(false);
        }
      }
    };

    if (showProfilePopup) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showProfilePopup, isMobile]);


  return (
    <div className="relative w-full h-full">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
        onCloseDialog={() => {
          if (showProfilePopup) {
            setShowProfilePopup(false);
          }
        }}
        canCloseDialog={showProfilePopup}
      />

      {/* Profile Popup */}
      {showProfilePopup && (
        <>
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto">
          <div className="bg-gray-900 border-4 border-pink-500 max-w-2xl w-full max-h-[60vh] md:max-h-[90vh] overflow-y-auto flex flex-col mb-20 md:mb-0">
            <div className="flex justify-between items-center p-4 border-b border-pink-500">
              <h2 className="text-2xl text-pink-400 font-bold">YOUR PROFILE</h2>
            </div>

            <div className="flex-1 p-6 space-y-6">
              {/* Character Stats */}
              <div className="border-2 border-pink-700 p-4">
                <h3 className="text-xl text-pink-400 font-bold mb-4">Character Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Name</p>
                    <p className="text-white text-lg">{stats.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Level</p>
                    <p className="text-white text-lg">{stats.level}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Class</p>
                    <p className="text-white text-lg">{stats.class}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Gold</p>
                    <p className="text-yellow-400 text-lg">{stats.gold}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">HP</p>
                    <p className="text-green-400 text-lg">{stats.hp} / {stats.maxHp}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">MP</p>
                    <p className="text-blue-400 text-lg">{stats.mp} / {stats.maxMp}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="border-2 border-pink-700 p-4">
                <h3 className="text-xl text-pink-400 font-bold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-pink-500/20 text-pink-300 border border-pink-500 px-3 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              {userProfile.experiences.length > 0 && (
                <div className="border-2 border-pink-700 p-4">
                  <h3 className="text-xl text-pink-400 font-bold mb-4">Experience</h3>
                  <div className="space-y-3">
                    {userProfile.experiences.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-pink-500 pl-4">
                        <p className="text-white font-semibold">{exp.role}</p>
                        <p className="text-gray-400 text-sm">{exp.company}</p>
                        <p className="text-gray-500 text-xs">{exp.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {userProfile.education.length > 0 && (
                <div className="border-2 border-pink-700 p-4">
                  <h3 className="text-xl text-pink-400 font-bold mb-4">Education</h3>
                  <div className="space-y-3">
                    {userProfile.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-pink-500 pl-4">
                        <p className="text-white font-semibold">{edu.degree}</p>
                        <p className="text-gray-400 text-sm">{edu.school}</p>
                        <p className="text-gray-500 text-xs">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {userProfile.certs.length > 0 && (
                <div className="border-2 border-pink-700 p-4">
                  <h3 className="text-xl text-pink-400 font-bold mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.certs.map((cert, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-500/20 text-pink-300 border border-pink-500 px-3 py-1 rounded text-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
          </div>
        </>
      )}

      {/* Whitepaper popup removed - now navigates to /whitepaper page */}
      {/* 
            <div className="pointer-events-auto">
              <div className={`bg-gray-900 ${
                isMobile 
                  ? 'w-full max-h-[60vh] border-4 border-yellow-500 mb-20' 
                  : 'border-4 border-yellow-500 max-w-4xl w-full max-h-[90vh]'
              } flex flex-col overflow-hidden`}>
                <div className="flex justify-between items-center p-2 md:p-4 border-b border-yellow-500">
                  <h2 className="text-lg md:text-2xl text-yellow-400 font-bold">WHITEPAPER</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-white space-y-4 md:space-y-6">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2 md:mb-4">KRACKED DEVS</h1>
                        <h2 className="text-xl md:text-2xl font-semibold text-yellow-300 mb-4 md:mb-6">Join Malaysia's Premier Developer Community</h2>
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-200 mb-4 md:mb-6">Welcome to Your Coding Home</h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4 md:mb-6">
                          KrackedDevs launches December 2025. Learn the basics, build your first portfolio piece, join a supportive community—then grow through real experience and peer support.
                        </p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">What We're Building</h3>
                        <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Imagine a platform where you:</p>
                        <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">🎮 Start small, grow forever — Begin with basics at Level 1, keep learning and earning for life</li>
                          <li className="text-gray-300 text-sm md:text-base">🏆 Win through competition — Regular challenges with opportunities to earn and grow</li>
                          <li className="text-gray-300 text-sm md:text-base">💼 Land real jobs — Build a portfolio that attracts companies</li>
                          <li className="text-gray-300 text-sm md:text-base">🚀 Learn by doing — Contribute to real projects, get feedback from experienced members</li>
                          <li className="text-gray-300 text-sm md:text-base">👥 Lean on community — Get stuck? Ask. Stuck members? Help. Everyone grows together</li>
                          <li className="text-gray-300 text-sm md:text-base">📈 Earn as you improve — Opportunities multiply with your skills and commitment</li>
                        </ul>
                        <p className="text-yellow-300 font-semibold text-sm md:text-base">All completely FREE to join.</p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">How It Works</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Phase 1: The Basics (Levels 1-5)</h4>
                          <p className="text-gray-400 text-sm md:text-base mb-2 md:mb-3">4-8 weeks to learn the fundamentals</p>
                          <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">You'll learn what you need to start:</p>
                          <ul className="list-none space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">✓ Set up your GitHub profile</li>
                            <li className="text-gray-300 text-sm md:text-base">✓ Learn coding fundamentals</li>
                            <li className="text-gray-300 text-sm md:text-base">✓ Build your first real project</li>
                            <li className="text-gray-300 text-sm md:text-base">✓ Add it to your portfolio</li>
                            <li className="text-gray-300 text-sm md:text-base">✓ Meet the community</li>
                          </ul>
                          <p className="text-gray-300 text-sm md:text-base">By Level 5, you know enough to start. The real learning begins here.</p>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Phase 2: The Real Game (Levels 6+)</h4>
                          <p className="text-gray-400 text-sm md:text-base mb-2 md:mb-3">Continuous growth through community and experience</p>
                          <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base">🎯 Compete and keep learning — Challenges push you forward</li>
                            <li className="text-gray-300 text-sm md:text-base">💼 Get hired as you improve — Companies see your growth</li>
                            <li className="text-gray-300 text-sm md:text-base">🚀 Build real projects — Learn by doing with peer support</li>
                            <li className="text-gray-300 text-sm md:text-base">💰 Earn as you progress — Opportunities match your growing skills</li>
                            <li className="text-gray-300 text-sm md:text-base">🏆 Become a mentor — Help others, cement your knowledge</li>
                          </ul>
                          <p className="text-gray-300 mt-3 md:mt-4 text-sm md:text-base">The more you commit, the faster you grow.</p>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">The Learning Model</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">It's Not a Bootcamp</h4>
                          <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">We're not hand-holding you through everything. This is real.</p>
                          <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">L1-5 teaches basics: Coding fundamentals, your first project, portfolio setup</li>
                            <li className="text-gray-300 text-sm md:text-base">Everything after: You learn through experience, community help, and your own effort</li>
                            <li className="text-gray-300 text-sm md:text-base">Community is your teacher: Stuck on something? Ask experienced members. They ask when stuck too</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Success Requires Commitment</h4>
                          <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">You need to:</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Show up regularly</li>
                            <li className="text-gray-300 text-sm md:text-base">Be willing to struggle</li>
                            <li className="text-gray-300 text-sm md:text-base">Ask questions when stuck</li>
                            <li className="text-gray-300 text-sm md:text-base">Help others when you know the answer</li>
                            <li className="text-gray-300 text-sm md:text-base">Learn from failure</li>
                            <li className="text-gray-300 text-sm md:text-base">Push yourself forward</li>
                          </ul>
                          <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">In return:</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base">You'll actually learn real development</li>
                            <li className="text-gray-300 text-sm md:text-base">You'll build actual portfolio pieces</li>
                            <li className="text-gray-300 text-sm md:text-base">You'll earn money</li>
                            <li className="text-gray-300 text-sm md:text-base">You'll have a community supporting you</li>
                            <li className="text-gray-300 text-sm md:text-base">You'll grow into a real developer</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">Three Ways to Earn (As You Grow)</h3>
                        
                        <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">1. Win Competitions</h4>
                            <p className="text-gray-300 text-sm md:text-base mb-2">Regular challenges throughout the platform. As you improve, harder competitions open up. Top performers earn rewards.</p>
                            <p className="text-gray-400 text-sm md:text-base italic">When: Start exploring at Level 2, but real opportunities emerge as you get better</p>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">2. Land Jobs</h4>
                            <p className="text-gray-300 text-sm md:text-base mb-2">Build your portfolio on KrackedDevs. Companies see your work. As you level up and improve, better opportunities appear.</p>
                            <p className="text-gray-400 text-sm md:text-base italic">When: Starts around Level 5+, grows with your skills</p>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">3. Get Passive Income from Projects</h4>
                            <p className="text-gray-300 text-sm md:text-base">Contribute to upcoming projects. When they launch and generate revenue, you earn a percentage.</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">Get Started Today</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Join in 30 Seconds</h4>
                          <ol className="list-decimal list-inside space-y-2 md:space-y-3 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Go to KrackedDevs.com</li>
                            <li className="text-gray-300 text-sm md:text-base">Click "Join with GitHub"</li>
                            <li className="text-gray-300 text-sm md:text-base">Create your profile</li>
                            <li className="text-gray-300 text-sm md:text-base">Start Level 1</li>
                          </ol>
                          <p className="text-gray-300 text-sm md:text-base">That's it. No credit card. No fees. Completely free.</p>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Your First Week</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Day 1: Join and complete Level 1 setup</li>
                            <li className="text-gray-300 text-sm md:text-base">Day 2: Start learning basics, first coding challenges</li>
                            <li className="text-gray-300 text-sm md:text-base">Day 3: Work on your first small project</li>
                            <li className="text-gray-300 text-sm md:text-base">Day 4: Ask community for help if you need it</li>
                            <li className="text-gray-300 text-sm md:text-base">Day 5: Complete Level 1, join Discord</li>
                            <li className="text-gray-300 text-sm md:text-base">Day 6: Work on Level 2 content</li>
                            <li className="text-gray-300 text-sm md:text-base">Day 7: Help someone on the forum, get feedback</li>
                          </ul>
                          <p className="text-gray-300 text-sm md:text-base">Total: ~5-10 hours of your time</p>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">What You Get</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">The Platform</h4>
                          <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base">Learning Path: L1-5 teaches basics + first project</li>
                            <li className="text-gray-300 text-sm md:text-base">Real Experience: Compete, build projects, earn</li>
                            <li className="text-gray-300 text-sm md:text-base">Job Board: Real opportunities from companies</li>
                            <li className="text-gray-300 text-sm md:text-base">Project Gallery: Real projects seeking contributors</li>
                            <li className="text-gray-300 text-sm md:text-base">Your Portfolio: All your work in one place</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">The Community</h4>
                          <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base">Peer Support: Ask questions, get answers from real developers</li>
                            <li className="text-gray-300 text-sm md:text-base">Code Reviews: Experienced members review your code</li>
                            <li className="text-gray-300 text-sm md:text-base">Mentorship: Learn from people ahead of you</li>
                            <li className="text-gray-300 text-sm md:text-base">Shared Knowledge: Everyone helps everyone grow</li>
                            <li className="text-gray-300 text-sm md:text-base">No judgment: You're learning, mistakes are welcome here</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">Who Should Join?</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Perfect For You If:</h4>
                          <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base">You're willing to put in effort</li>
                            <li className="text-gray-300 text-sm md:text-base">You can handle learning on your own timeline</li>
                            <li className="text-gray-300 text-sm md:text-base">You value real experience over hand-holding</li>
                            <li className="text-gray-300 text-sm md:text-base">You're comfortable asking for help</li>
                            <li className="text-gray-300 text-sm md:text-base">You're ready to help others too</li>
                            <li className="text-gray-300 text-sm md:text-base">You believe in learning by doing</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Maybe Not For You If:</h4>
                          <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base">You want a guided bootcamp experience</li>
                            <li className="text-gray-300 text-sm md:text-base">You expect someone to teach you everything</li>
                            <li className="text-gray-300 text-sm md:text-base">You give up when things get hard</li>
                            <li className="text-gray-300 text-sm md:text-base">You're not willing to commit time</li>
                            <li className="text-gray-300 text-sm md:text-base">You want guaranteed employment</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">Why KrackedDevs?</h3>
                        
                        <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">vs. Bootcamps</h4>
                            <p className="text-gray-300 text-sm md:text-base mb-1">Bootcamp: Expensive, hand-held, ends after 3 months, artificial</p>
                            <p className="text-gray-300 text-sm md:text-base">KrackedDevs: Free, community-driven, real projects, real earning</p>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">vs. Job Boards</h4>
                            <p className="text-gray-300 text-sm md:text-base mb-1">Job boards: Apply without experience, get rejected</p>
                            <p className="text-gray-300 text-sm md:text-base">KrackedDevs: Build portfolio first, companies see your growth</p>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">vs. Learning Alone</h4>
                            <p className="text-gray-300 text-sm md:text-base mb-1">Alone: Stuck, no feedback, lonely, unmotivated.</p>
                            <p className="text-gray-300 text-sm md:text-base">KrackedDevs: Stuck? Ask. Share? Help others. Motivated? Community</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">Real Talk</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-2">You will struggle here. That's the point.</p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">Real developers solve problems they don't fully understand. That's what real work is. Here, you'll do that, but you won't be alone—the community has your back.</p>
                        <p className="text-gray-300 text-sm md:text-base">The faster you commit, the faster you learn. Real experience teaches faster than any course.</p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">FAQ</h3>
                        
                        <div className="space-y-4 md:space-y-6">
                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: Really free?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: Yes. 100% free for developers. We make money from companies, not you.</p>
                          </div>

                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: Do I need experience?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: Nope. L1-5 covers basics. After that, learning is on you (with community help).</p>
                          </div>

                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: Will you teach me everything?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: We teach basics and fundamentals. Everything else you learn through experience, community, and personal effort.</p>
                          </div>

                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: What if I get stuck?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: Ask the community. Real developers answer. You'll do the same for others.</p>
                          </div>

                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: How fast can I learn?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: Depends on your commitment. More time = faster learning. Real projects = faster progress.</p>
                          </div>

                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: Will I get a job?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: If you build a solid portfolio and keep improving, yes. Companies want to see growth and real work.</p>
                          </div>

                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: Is it easy?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: No. It's real. Real work is harder than tutorials, but it matters more.</p>
                          </div>

                          <div>
                            <p className="text-yellow-300 font-semibold text-sm md:text-base mb-1">Q: Part-time okay?</p>
                            <p className="text-gray-300 text-sm md:text-base">A: Yes. But understand: part-time takes longer. That's okay.</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">The Big Picture</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-2">You don't get a certificate. You get a career.</p>
                        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">Stop paying for bootcamps that don't guarantee jobs. Stop learning from tutorials nobody cares about.</p>
                        
                        <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">Here, you:</p>
                        <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">Learn real skills</li>
                          <li className="text-gray-300 text-sm md:text-base">Build real projects</li>
                          <li className="text-gray-300 text-sm md:text-base">Earn real money</li>
                          <li className="text-gray-300 text-sm md:text-base">Get real jobs</li>
                          <li className="text-gray-300 text-sm md:text-base">Join a real community</li>
                          <li className="text-gray-300 text-sm md:text-base">Grow for life</li>
                        </ul>
                        <p className="text-gray-300 text-sm md:text-base">No shortcuts. Just honest, real development.</p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">Ready?</h3>
                        <p className="text-yellow-300 font-semibold text-base md:text-lg mb-2">[JOIN NOW - IT'S FREE]</p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">No credit card. No commitment. Just bring your willingness to learn.</p>
                        <p className="text-gray-300 text-sm md:text-base font-semibold">Warning: This won't be easy. It will be worth it.</p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">Let's Stay Connected</h3>
                        <ul className="list-disc list-inside space-y-2 md:space-y-3 ml-2 md:ml-4">
                          <li className="text-gray-300 text-sm md:text-base">Website: krackeddevs.com</li>
                          <li className="text-gray-300 text-sm md:text-base">Discord: discord.gg/krackeddevs</li>
                          <li className="text-gray-300 text-sm md:text-base">Twitter: @Krackeddevs</li>
                          <li className="text-gray-300 text-sm md:text-base">LinkedIn: KrackedDevs Malaysia</li>
                          <li className="text-gray-300 text-sm md:text-base">Email: hello@krackeddevs.com</li>
                        </ul>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">One More Thing</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-2">We're launching December 2025.</p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">This is the beginning. But it won't feel like a beginning—it'll feel like jumping into the real thing.</p>
                        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">That's by design.</p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">Welcome to KrackedDevs. Welcome to real development.</p>
                        <p className="text-yellow-300 font-semibold text-sm md:text-base mb-2">KrackedDevs: Where Malaysian Developers Learn, Build, Earn, and Thrive Through Real Experience</p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">The game starts December 2025. Bring your commitment.</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-4 md:mt-6">Version 1.0 - Learning Model Updated</p>
                        <p className="text-gray-400 text-xs md:text-sm">December 2025 - Community-Driven Learning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      */}
    </div>
  );
};

