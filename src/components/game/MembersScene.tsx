"use client";

import React, { useMemo, useState } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { EscapeButton } from './EscapeButton';
import { TILE_EMPTY, TILE_WALL, TILE_PROFILE, TILE_BACK_TO_TOWN, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { BuildingConfig } from '@/lib/game/types';

interface MembersSceneProps {
  onBack: () => void;
}

const FOUNDING_MEMBERS = ['danial', 'solah', 'nabil', 'adam', 'anep'];
const NORMAL_MEMBERS = ['anonymous'];

export const MembersScene: React.FC<MembersSceneProps> = ({ onBack }) => {
  const [showFoundingMembersPopup, setShowFoundingMembersPopup] = useState(false);
  const [showMembersPopup, setShowMembersPopup] = useState(false);

  // Generate map
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

    const centerX = Math.floor(MAP_WIDTH / 2);

    // Place Founding Members building (left-center)
    newMap[3][centerX - 3] = TILE_PROFILE;
    newMap[3][centerX - 2] = TILE_PROFILE;
    newMap[4][centerX - 3] = TILE_PROFILE;
    newMap[4][centerX - 2] = TILE_PROFILE;

    // Place Members building (right-center)
    newMap[3][centerX + 1] = TILE_PROFILE;
    newMap[3][centerX + 2] = TILE_PROFILE;
    newMap[4][centerX + 1] = TILE_PROFILE;
    newMap[4][centerX + 2] = TILE_PROFILE;

    // Place back to town building (bottom-left)
    newMap[MAP_HEIGHT - 2][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 2][2] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][2] = TILE_BACK_TO_TOWN;

    // Connect buildings with roads
    const buildingPositions = [
      [{ x: centerX - 3, y: 3 }, { x: centerX - 2, y: 3 }, { x: centerX - 3, y: 4 }, { x: centerX - 2, y: 4 }], // Founding Members
      [{ x: centerX + 1, y: 3 }, { x: centerX + 2, y: 3 }, { x: centerX + 1, y: 4 }, { x: centerX + 2, y: 4 }], // Members
      [{ x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
       { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }] // Back to town
    ];
    connectBuildingsWithRoads(newMap, buildingPositions);

    // Add ground variety and trees
    addGroundVariety(newMap);
    const flatBuildingPositions = buildingPositions.flat();
    addTrees(newMap, flatBuildingPositions);

    return newMap;
  }, []);

  const buildings: BuildingConfig[] = useMemo(() => {
    const centerX = Math.floor(MAP_WIDTH / 2);
    
    return [
      {
        id: 'founding-members',
        tileType: TILE_PROFILE,
        positions: [
          { x: centerX - 3, y: 3 },
          { x: centerX - 2, y: 3 },
          { x: centerX - 3, y: 4 },
          { x: centerX - 2, y: 4 },
        ],
        label: 'FOUNDING MEMBERS',
        description: 'View founding members',
        route: 'founding-members-popup',
        color: '#000000',
        colorDark: '#000000',
        customLabel: 'FOUNDING\nMEMBER',
      },
      {
        id: 'members',
        tileType: TILE_PROFILE,
        positions: [
          { x: centerX + 1, y: 3 },
          { x: centerX + 2, y: 3 },
          { x: centerX + 1, y: 4 },
          { x: centerX + 2, y: 4 },
        ],
        label: 'MEMBERS',
        description: 'View members',
        route: 'members-popup',
        color: '#16a34a',
        colorDark: '#15803d',
        customLabel: 'MEMBER',
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
    ];
  }, []);

  const handleBuildingEnter = (route: string) => {
    if (route === 'founding-members-popup') {
      setShowFoundingMembersPopup(true);
    } else if (route === 'members-popup') {
      setShowMembersPopup(true);
    } else if (route === '/') {
      onBack();
    }
  };

  // Handle Escape key to close popups
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showFoundingMembersPopup) {
          setShowFoundingMembersPopup(false);
        }
        if (showMembersPopup) {
          setShowMembersPopup(false);
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showFoundingMembersPopup, showMembersPopup]);

  return (
    <div className="relative w-full h-screen">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
      />

      {/* Founding Members Popup */}
      {showFoundingMembersPopup && (
        <>
          <EscapeButton onClose={() => setShowFoundingMembersPopup(false)} />
          <div className="absolute inset-0 bg-black/90 z-30 flex items-center justify-center p-4">
            <div className="bg-gray-900 border-4 border-black max-w-md w-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-black">
                <h2 className="text-2xl text-black bg-white px-2 font-bold">FOUNDING MEMBERS</h2>
                <button
                  onClick={() => setShowFoundingMembersPopup(false)}
                  className="text-white hover:text-red-400 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 p-6">
                <div className="space-y-3">
                  {FOUNDING_MEMBERS.map((name, idx) => (
                    <div
                      key={idx}
                      className="bg-black text-white border-2 border-gray-700 px-4 py-2 rounded text-center"
                    >
                      <span className="text-sm font-semibold uppercase">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-black text-center">
                <p className="text-gray-500 text-sm">Press ESC to close</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Members Popup */}
      {showMembersPopup && (
        <>
          <EscapeButton onClose={() => setShowMembersPopup(false)} />
          <div className="absolute inset-0 bg-black/90 z-30 flex items-center justify-center p-4">
            <div className="bg-gray-900 border-4 border-green-500 max-w-md w-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-green-500">
                <h2 className="text-2xl text-green-400 font-bold">MEMBERS</h2>
                <button
                  onClick={() => setShowMembersPopup(false)}
                  className="text-white hover:text-red-400 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 p-6">
                <div className="space-y-3">
                  {NORMAL_MEMBERS.map((name, idx) => (
                    <div
                      key={idx}
                      className="bg-green-600 text-white border-2 border-green-500 px-4 py-2 rounded text-center"
                    >
                      <span className="text-sm font-semibold uppercase">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-green-500 text-center">
                <p className="text-gray-500 text-sm">Press ESC to close</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

