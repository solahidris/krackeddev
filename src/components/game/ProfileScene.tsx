"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { EscapeButton } from './EscapeButton';
import { TILE_EMPTY, TILE_WALL, TILE_PROFILE, TILE_BACK_TO_TOWN, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { BuildingConfig } from '@/lib/game/types';
import { CharacterStats, UserProfile } from '@/types/jobs';
import { useDialogClose } from './useDialogClose';

interface ProfileSceneProps {
  onBack: () => void;
}

export const ProfileScene: React.FC<ProfileSceneProps> = ({ onBack }) => {
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

  // Generate simple map
  const map = useMemo(() => {
    const newMap: number[][] = [];

    for (let y = 0; y < MAP_HEIGHT; y++) {
      const row: number[] = [];
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
          row.push(TILE_WALL);
        } else {
          row.push(TILE_EMPTY);
        }
      }
      newMap.push(row);
    }

    // Place profile building in center
    const centerX = Math.floor(MAP_WIDTH / 2);
    const centerY = Math.floor(MAP_HEIGHT / 2);
    newMap[centerY - 1][centerX - 1] = TILE_PROFILE;
    newMap[centerY - 1][centerX] = TILE_PROFILE;
    newMap[centerY][centerX - 1] = TILE_PROFILE;
    newMap[centerY][centerX] = TILE_PROFILE;

    // Place back to town building (bottom-left)
    newMap[MAP_HEIGHT - 2][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 2][2] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][2] = TILE_BACK_TO_TOWN;

    // Connect buildings with roads
    const profileCenterX = Math.floor(MAP_WIDTH / 2);
    const profileCenterY = Math.floor(MAP_HEIGHT / 2);
    connectBuildingsWithRoads(newMap, [
      [{ x: profileCenterX - 1, y: profileCenterY - 1 }, { x: profileCenterX, y: profileCenterY - 1 },
       { x: profileCenterX - 1, y: profileCenterY }, { x: profileCenterX, y: profileCenterY }],
      [{ x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
       { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }]
    ]);

    // Add ground variety and trees
    addGroundVariety(newMap);
    addTrees(newMap, [
      { x: profileCenterX - 1, y: profileCenterY - 1 }, { x: profileCenterX, y: profileCenterY - 1 },
      { x: profileCenterX - 1, y: profileCenterY }, { x: profileCenterX, y: profileCenterY },
      { x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
      { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }
    ]);

    return newMap;
  }, []);

  const buildings: BuildingConfig[] = useMemo(() => [
    {
      id: 'profile',
      tileType: TILE_PROFILE,
      positions: [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) - 1 },
        { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) - 1 },
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) },
        { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) },
      ],
      label: 'PROFILE',
      description: 'View your profile and stats',
      route: 'profile',
      color: '#ec4899',
      colorDark: '#db2777',
    },
    {
      id: 'back-to-town',
      tileType: TILE_BACK_TO_TOWN,
      positions: [
        { x: 1, y: MAP_HEIGHT - 3 },
        { x: 2, y: MAP_HEIGHT - 3 },
        { x: 1, y: MAP_HEIGHT - 2 },
        { x: 2, y: MAP_HEIGHT - 2 },
      ],
      label: 'BACK TO TOWN',
      description: 'Return to the main town',
      route: '/',
      color: '#ef4444',
      colorDark: '#dc2626',
      autoNavigate: true,
    },
  ], []);

  const handleBuildingEnter = (route: string) => {
    if (route === '/') {
      onBack();
    } else if (route === 'profile') {
      setShowProfilePopup(true);
    }
  };

  // Handle Escape key and Y button to close popup
  useDialogClose(showProfilePopup, () => setShowProfilePopup(false));

  return (
    <div className="relative w-full h-screen">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2 + 2) * 40}
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

