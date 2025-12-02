"use client";

import React, { useMemo, useState } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { EscapeButton } from './EscapeButton';
import { TILE_EMPTY, TILE_WALL, TILE_BLOG, TILE_JOBS, TILE_CODE, TILE_PROFILE, TILE_WHITEPAPER, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { BuildingConfig } from '@/lib/game/types';
import { CharacterStats, UserProfile } from '@/types/jobs';
import { useDialogClose } from './useDialogClose';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';

interface LandingTownProps {
  onBuildingEnter: (route: string) => void;
}

export const LandingTown: React.FC<LandingTownProps> = ({ onBuildingEnter }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

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

    // Place New Jobs building (top-left)
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

    // Connect buildings with roads (before adding trees and variety)
    const buildingPositions = [
      [{ x: MAP_WIDTH - 5, y: 2 }, { x: MAP_WIDTH - 4, y: 2 }, { x: MAP_WIDTH - 5, y: 3 }, { x: MAP_WIDTH - 4, y: 3 }], // Blog
      [{ x: 3, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }], // Jobs
      [{ x: 2, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 6 }], // Code
      [{ x: MAP_WIDTH - 4, y: 5 }, { x: MAP_WIDTH - 3, y: 5 }, { x: MAP_WIDTH - 4, y: 6 }, { x: MAP_WIDTH - 3, y: 6 }], // Profile
      [{ x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 3 }, { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 3 },
       { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 }, { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 }] // Whitepaper
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
      { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 }, { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 } // Whitepaper
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
      label: 'NEW JOBS',
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
      description: 'Read our project whitepaper',
      route: '/whitepaper',
      color: '#eab308',
      colorDark: '#ca8a04',
    },
  ], []);

  const handleBuildingEnter = (route: string) => {
    if (route === 'profile-popup') {
      setShowProfilePopup(true);
    } else if (route === '/whitepaper') {
      // Open whitepaper PDF in new tab
      window.open('/whitepaper.pdf', '_blank');
    } else {
      onBuildingEnter(route);
    }
  };

  // Handle Escape key and Y button to close popup
  useDialogClose(showProfilePopup, () => setShowProfilePopup(false));

  return (
    <div className="relative w-full h-full">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
        onCloseDialog={() => setShowProfilePopup(false)}
        canCloseDialog={showProfilePopup}
      />

      {/* Profile Popup */}
      {showProfilePopup && (
        <>
          <EscapeButton onClose={() => setShowProfilePopup(false)} />
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto">
          <div className="bg-gray-900 border-4 border-pink-500 max-w-2xl w-full max-h-[60vh] md:max-h-[90vh] overflow-y-auto flex flex-col mb-20 md:mb-0">
            <div className="flex justify-between items-center p-4 border-b border-pink-500">
              <h2 className="text-2xl text-pink-400 font-bold">YOUR PROFILE</h2>
              <button
                onClick={() => setShowProfilePopup(false)}
                className="text-white hover:text-red-400 text-xl"
              >
                ✕
              </button>
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

            <div className="p-4 border-t border-pink-500 text-center">
              <p className="text-gray-500 text-sm">Press ESC to close</p>
            </div>
          </div>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

