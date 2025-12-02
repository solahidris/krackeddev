"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { EscapeButton } from './EscapeButton';
import { TILE_EMPTY, TILE_WALL, TILE_JOBS, TILE_BACK_TO_TOWN, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { BuildingConfig } from '@/lib/game/types';
import { generateQuests, type Quest } from '@/lib/jobs';
import { useDialogClose } from './useDialogClose';

interface NewJobsSceneProps {
  onBack: () => void;
}

export const NewJobsScene: React.FC<NewJobsSceneProps> = ({ onBack }) => {
  const [jobs, setJobs] = useState<Quest[]>([]);
  const [showJobScreen, setShowJobScreen] = useState(false);
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

  // Load jobs
  useEffect(() => {
    generateQuests('').then(setJobs);
  }, []);

  // Generate map with jobs building
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

    // Place jobs building in center
    const centerX = Math.floor(MAP_WIDTH / 2);
    const centerY = Math.floor(MAP_HEIGHT / 2);
    newMap[centerY - 1][centerX - 1] = TILE_JOBS;
    newMap[centerY - 1][centerX] = TILE_JOBS;
    newMap[centerY][centerX - 1] = TILE_JOBS;
    newMap[centerY][centerX] = TILE_JOBS;

    // Place back to town building (bottom-left)
    newMap[MAP_HEIGHT - 2][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 2][2] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][2] = TILE_BACK_TO_TOWN;

    // Connect buildings with roads
    const jobsCenterX = Math.floor(MAP_WIDTH / 2);
    const jobsCenterY = Math.floor(MAP_HEIGHT / 2);
    connectBuildingsWithRoads(newMap, [
      [{ x: jobsCenterX - 1, y: jobsCenterY - 1 }, { x: jobsCenterX, y: jobsCenterY - 1 },
       { x: jobsCenterX - 1, y: jobsCenterY }, { x: jobsCenterX, y: jobsCenterY }],
      [{ x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
       { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }]
    ]);

    // Add ground variety and trees
    addGroundVariety(newMap);
    addTrees(newMap, [
      { x: jobsCenterX - 1, y: jobsCenterY - 1 }, { x: jobsCenterX, y: jobsCenterY - 1 },
      { x: jobsCenterX - 1, y: jobsCenterY }, { x: jobsCenterX, y: jobsCenterY },
      { x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
      { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }
    ]);

    return newMap;
  }, []);

  const buildings: BuildingConfig[] = useMemo(() => [
    {
      id: 'jobs-building',
      tileType: TILE_JOBS,
      positions: [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) - 1 },
        { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) - 1 },
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: Math.floor(MAP_HEIGHT / 2) },
        { x: Math.floor(MAP_WIDTH / 2), y: Math.floor(MAP_HEIGHT / 2) },
      ],
      label: 'JOBS BOARD',
      description: 'View available tech jobs',
      route: '',
      color: '#3b82f6',
      colorDark: '#2563eb',
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
    if (route === '') {
      setShowJobScreen(true);
    } else if (route === '/') {
      onBack();
    }
  };

  // Handle Escape key and Y button to close popup
  useDialogClose(showJobScreen, () => setShowJobScreen(false));

  return (
    <div className="relative w-full h-screen">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2 + 2) * 40}
        onCloseDialog={() => setShowJobScreen(false)}
        canCloseDialog={showJobScreen}
      />

      {/* Jobs Screen Overlay */}
      {showJobScreen && (
        <>
          {/* Backdrop - Desktop only */}
          {!isMobile && <div className="fixed inset-0 bg-black/50 z-30" />}
          <EscapeButton onClose={() => setShowJobScreen(false)} />
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto">
          <div className="bg-gray-900 border-4 border-blue-500 max-w-4xl w-full max-h-[60vh] md:max-h-[80vh] overflow-y-auto p-6 mb-20 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-blue-400 font-bold">TECH JOBS</h2>
              <button
                onClick={() => {
                  setShowJobScreen(false);
                }}
                className="text-white hover:text-red-400 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {jobs.slice(0, 10).map((job) => (
                <a
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-blue-700 p-3 cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <h3 className="text-lg text-blue-400">{job.realTitle}</h3>
                  <p className="text-gray-400 text-sm">{job.company} • {job.location}</p>
                  <p className="text-yellow-400 text-sm">{job.reward}</p>
                </a>
              ))}
            </div>
            {!isMobile && (
              <div className="mt-4 pt-4 border-t border-blue-500 text-center">
                <p className="text-gray-500 text-sm">Press ESC to close</p>
              </div>
            )}
          </div>
          </div>
          </div>
        </div>
        </>
      )}

    </div>
  );
};

