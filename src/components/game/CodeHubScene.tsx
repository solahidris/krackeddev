"use client";

import React, { useMemo } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { TILE_EMPTY, TILE_WALL, TILE_CODE, TILE_BACK_TO_TOWN, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { BuildingConfig } from '@/lib/game/types';

interface CodeHubSceneProps {
  onBack: () => void;
}

export const CodeHubScene: React.FC<CodeHubSceneProps> = ({ onBack }) => {
  const X_COMMUNITY_URL = 'https://x.com/i/communities/1983062242292822298';

  // Generate map with 3 buildings
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

    // Place Hackathon building (left)
    newMap[3][3] = TILE_CODE;
    newMap[3][4] = TILE_CODE;
    newMap[4][3] = TILE_CODE;
    newMap[4][4] = TILE_CODE;

    // Place Open Source building (center)
    const centerX = Math.floor(MAP_WIDTH / 2);
    newMap[3][centerX - 1] = TILE_CODE;
    newMap[3][centerX] = TILE_CODE;
    newMap[4][centerX - 1] = TILE_CODE;
    newMap[4][centerX] = TILE_CODE;

    // Place Bounty building (right)
    newMap[3][MAP_WIDTH - 5] = TILE_CODE;
    newMap[3][MAP_WIDTH - 4] = TILE_CODE;
    newMap[4][MAP_WIDTH - 5] = TILE_CODE;
    newMap[4][MAP_WIDTH - 4] = TILE_CODE;

    // Place back to town building (bottom-left)
    newMap[MAP_HEIGHT - 2][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 2][2] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][2] = TILE_BACK_TO_TOWN;

    return newMap;
  }, []);

  const buildings: BuildingConfig[] = useMemo(() => {
    const centerX = Math.floor(MAP_WIDTH / 2);
    return [
      {
        id: 'hackathon',
        tileType: TILE_CODE,
        positions: [
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
        ],
        label: 'HACKATHON',
        description: 'Join coding competitions and challenges',
        route: 'hackathon',
        color: '#06b6d4',
        colorDark: '#0891b2',
        customLabel: 'HACK\nATHON',
      },
      {
        id: 'opensource',
        tileType: TILE_CODE,
        positions: [
          { x: centerX - 1, y: 3 },
          { x: centerX, y: 3 },
          { x: centerX - 1, y: 4 },
          { x: centerX, y: 4 },
        ],
        label: 'OPEN SOURCE',
        description: 'Contribute to open source projects',
        route: 'opensource',
        color: '#06b6d4',
        colorDark: '#0891b2',
        customLabel: 'OPEN\nSOURCE',
      },
      {
        id: 'bounty',
        tileType: TILE_CODE,
        positions: [
          { x: MAP_WIDTH - 5, y: 3 },
          { x: MAP_WIDTH - 4, y: 3 },
          { x: MAP_WIDTH - 5, y: 4 },
          { x: MAP_WIDTH - 4, y: 4 },
        ],
        label: 'BOUNTY',
        description: 'Earn rewards for completing coding tasks',
        route: 'bounty',
        color: '#06b6d4',
        colorDark: '#0891b2',
        customLabel: 'BOUNTY',
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
    if (route === '/') {
      onBack();
    } else if (route === 'hackathon' || route === 'opensource' || route === 'bounty') {
      // Open X community in new tab
      window.open(X_COMMUNITY_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative w-full h-screen">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2 + 2) * 40}
      />


    </div>
  );
};

