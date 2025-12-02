"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { EscapeButton } from './EscapeButton';
import { TILE_EMPTY, TILE_WALL, TILE_WHITEPAPER, TILE_BACK_TO_TOWN, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { BuildingConfig } from '@/lib/game/types';

interface WhitepaperSceneProps {
  onBack: () => void;
}

export const WhitepaperScene: React.FC<WhitepaperSceneProps> = ({ onBack }) => {
  const [showPDF, setShowPDF] = useState(false);
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

    // Place whitepaper building in center
    const centerX = Math.floor(MAP_WIDTH / 2);
    const centerY = Math.floor(MAP_HEIGHT / 2);
    newMap[centerY - 1][centerX - 1] = TILE_WHITEPAPER;
    newMap[centerY - 1][centerX] = TILE_WHITEPAPER;
    newMap[centerY][centerX - 1] = TILE_WHITEPAPER;
    newMap[centerY][centerX] = TILE_WHITEPAPER;

    // Place back to town building (bottom-left)
    newMap[MAP_HEIGHT - 2][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 2][2] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][2] = TILE_BACK_TO_TOWN;

    // Connect buildings with roads
    const wpCenterX = Math.floor(MAP_WIDTH / 2);
    const wpCenterY = Math.floor(MAP_HEIGHT / 2);
    connectBuildingsWithRoads(newMap, [
      [{ x: wpCenterX - 1, y: wpCenterY - 1 }, { x: wpCenterX, y: wpCenterY - 1 },
       { x: wpCenterX - 1, y: wpCenterY }, { x: wpCenterX, y: wpCenterY }],
      [{ x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
       { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }]
    ]);

    // Add ground variety and trees
    addGroundVariety(newMap);
    addTrees(newMap, [
      { x: wpCenterX - 1, y: wpCenterY - 1 }, { x: wpCenterX, y: wpCenterY - 1 },
      { x: wpCenterX - 1, y: wpCenterY }, { x: wpCenterX, y: wpCenterY },
      { x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
      { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }
    ]);

    return newMap;
  }, []);

  const buildings: BuildingConfig[] = useMemo(() => [
    {
      id: 'whitepaper',
      tileType: TILE_WHITEPAPER,
      positions: [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) - 1 },
        { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) - 1 },
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) },
        { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) },
      ],
      label: 'WHITEPAPER',
      description: 'Read our project whitepaper',
      route: 'whitepaper',
      color: '#eab308',
      colorDark: '#ca8a04',
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
    } else {
      // Open whitepaper PDF in new tab
      window.open('/whitepaper.pdf', '_blank');
    }
  };

  // Handle Escape key to close popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPDF) {
        setShowPDF(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showPDF]);

  return (
    <div className="relative w-full h-screen">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2 + 2) * 40}
      />

      {/* PDF Viewer Overlay */}
      {showPDF && (
        <>
          <EscapeButton onClose={() => setShowPDF(false)} />
          <div className={`absolute inset-0 bg-black/90 z-30 flex items-center justify-center ${
            isMobile ? 'p-0' : 'p-2 md:p-4'
          }`}>
          <div className={`bg-gray-900 ${
            isMobile 
              ? 'w-full h-full border-0' 
              : 'border-4 border-yellow-500 max-w-6xl w-full h-[95vh] md:h-[90vh]'
          } flex flex-col`}>
            {!isMobile && (
              <div className="flex justify-between items-center p-2 md:p-4 border-b border-yellow-500">
                <h2 className="text-lg md:text-2xl text-yellow-400 font-bold">WHITEPAPER</h2>
                <button
                  onClick={() => setShowPDF(false)}
                  className="text-white hover:text-red-400 text-xl"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="/whitepaper.pdf#view=FitH"
                className="w-full h-full"
                title="Whitepaper PDF"
                style={isMobile ? { 
                  width: '100%', 
                  height: '100%',
                  border: 'none'
                } : {}}
              />
            </div>
            {!isMobile && (
              <div className="p-2 md:p-4 border-t border-yellow-500 text-center">
                <p className="text-gray-500 text-xs md:text-sm">Press ESC to close</p>
              </div>
            )}
          </div>
        </div>
        </>
      )}

    </div>
  );
};

