"use client";

import React, { useMemo, useEffect } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { TILE_EMPTY, TILE_WALL, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { BuildingConfig } from '@/lib/game/types';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { loadSprite } from '@/lib/game/sprites';

interface BuildingPlaygroundSceneProps {
  onBack: () => void;
}

export const BuildingPlaygroundScene: React.FC<BuildingPlaygroundSceneProps> = ({ onBack }) => {
  // Preload house images
  useEffect(() => {
    loadSprite('/houses/HOUSE1.png').catch(() => {});
    loadSprite('/houses/HOUSE2.png').catch(() => {});
  }, []);

  // Generate map with house buildings
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

    // Place House 1 building (left side)
    newMap[2][3] = TILE_EMPTY; // Will be rendered as building
    newMap[2][4] = TILE_EMPTY;
    newMap[3][3] = TILE_EMPTY;
    newMap[3][4] = TILE_EMPTY;

    // Place House 2 building (right side)
    newMap[2][MAP_WIDTH - 5] = TILE_EMPTY; // Will be rendered as building
    newMap[2][MAP_WIDTH - 4] = TILE_EMPTY;
    newMap[3][MAP_WIDTH - 5] = TILE_EMPTY;
    newMap[3][MAP_WIDTH - 4] = TILE_EMPTY;

    // Connect buildings with roads
    const buildingPositions = [
      [{ x: 3, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }], // House 1
      [{ x: MAP_WIDTH - 5, y: 2 }, { x: MAP_WIDTH - 4, y: 2 }, { x: MAP_WIDTH - 5, y: 3 }, { x: MAP_WIDTH - 4, y: 3 }], // House 2
    ];
    connectBuildingsWithRoads(newMap, buildingPositions);

    // Add ground variety and trees
    addGroundVariety(newMap);
    addTrees(newMap, [
      { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }, // House 1
      { x: MAP_WIDTH - 5, y: 2 }, { x: MAP_WIDTH - 4, y: 2 }, { x: MAP_WIDTH - 5, y: 3 }, { x: MAP_WIDTH - 4, y: 3 }, // House 2
    ]);

    return newMap;
  }, []);

  // Define buildings configuration with house images
  const buildings: BuildingConfig[] = useMemo(() => [
    {
      id: 'house1',
      tileType: TILE_EMPTY,
      positions: [
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
      ],
      label: 'HOUSE 1',
      description: 'House 1',
      route: '#',
      color: '#06b6d4',
      colorDark: '#0891b2',
      imagePath: '/houses/HOUSE1.png',
    },
    {
      id: 'house2',
      tileType: TILE_EMPTY,
      positions: [
        { x: MAP_WIDTH - 5, y: 2 },
        { x: MAP_WIDTH - 4, y: 2 },
        { x: MAP_WIDTH - 5, y: 3 },
        { x: MAP_WIDTH - 4, y: 3 },
      ],
      label: 'HOUSE 2',
      description: 'House 2',
      route: '#',
      color: '#06b6d4',
      colorDark: '#0891b2',
      imagePath: '/houses/HOUSE2.png',
    },
  ], []);

  const handleBuildingEnter = (route: string) => {
    // Do nothing for now, just a playground
  };

  return (
    <div className="relative w-full h-full">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
      />
    </div>
  );
};

