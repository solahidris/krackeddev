"use client";

import React, { useMemo, useRef, useEffect, useCallback, useState } from 'react';
import { TILE_SIZE, TILE_EMPTY, TILE_WALL, PLAYER_SPEED } from '@/lib/game/constants';
import { renderTile, renderPlayer } from '@/lib/game/renderers';
import { BuildingConfig } from '@/lib/game/types';
import { isPointInMalaysia, loadMalaysiaSVG } from '@/lib/malaysia/mapData';
import { MobileControls } from '@/components/game/MobileControls';
import { preloadCharacterSprites } from '@/lib/game/sprites';

interface MalaysiaTileMapProps {
  onBack?: () => void;
}

// Custom map dimensions for Malaysia (larger to show the shape better)
const MALAYSIA_MAP_WIDTH = 30;
const MALAYSIA_MAP_HEIGHT = 20;

// Check if position is walkable (adapted for custom map size)
function isWalkableMalaysia(
  x: number,
  y: number,
  map: number[][],
  padding: number = 10
): boolean {
  const corners = [
    { x: x - padding, y: y - padding },
    { x: x + padding, y: y - padding },
    { x: x - padding, y: y + padding },
    { x: x + padding, y: y + padding },
  ];

  for (const corner of corners) {
    const tileX = Math.floor(corner.x / TILE_SIZE);
    const tileY = Math.floor(corner.y / TILE_SIZE);

    if (
      tileX < 0 ||
      tileX >= MALAYSIA_MAP_WIDTH ||
      tileY < 0 ||
      tileY >= MALAYSIA_MAP_HEIGHT
    ) {
      return false;
    }

    const tile = map[tileY]?.[tileX];
    if (tile === TILE_WALL) {
      return false;
    }
  }

  return true;
}

export const MalaysiaTileMap: React.FC<MalaysiaTileMapProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Generate tile map based on Malaysia shape
  const map = useMemo(() => {
    const newMap: number[][] = [];
    const canvasWidth = MALAYSIA_MAP_WIDTH * TILE_SIZE;
    const canvasHeight = MALAYSIA_MAP_HEIGHT * TILE_SIZE;

    // Initialize all tiles as walls (border)
    for (let y = 0; y < MALAYSIA_MAP_HEIGHT; y++) {
      const row: number[] = [];
      for (let x = 0; x < MALAYSIA_MAP_WIDTH; x++) {
        row.push(TILE_WALL);
      }
      newMap.push(row);
    }

    // Convert each tile to check if its center is within Malaysia
    for (let y = 0; y < MALAYSIA_MAP_HEIGHT; y++) {
      for (let x = 0; x < MALAYSIA_MAP_WIDTH; x++) {
        // Check center point of tile
        const tileCenterX = (x + 0.5) * TILE_SIZE;
        const tileCenterY = (y + 0.5) * TILE_SIZE;
        
        // If tile center is within Malaysia, make it walkable
        if (isPointInMalaysia(tileCenterX, tileCenterY, canvasWidth, canvasHeight)) {
          newMap[y][x] = TILE_EMPTY;
        }
      }
    }

    return newMap;
  }, []);

  // Player state - start in center of Peninsular Malaysia
  const playerRef = useRef({
    x: (MALAYSIA_MAP_WIDTH * 0.15) * TILE_SIZE, // Center of West Malaysia
    y: (MALAYSIA_MAP_HEIGHT * 0.50) * TILE_SIZE, // Middle vertically
    direction: 0, // 0=down, 1=up, 2=left, 3=right
    frame: 0,
    isMoving: false,
  });

  // Input state
  const currentDirRef = useRef<string | null>(null);

  // Handle direction input
  const handleDirectionInput = useCallback((dir: string | null) => {
    currentDirRef.current = dir;
  }, []);

  // Preload character sprites and Malaysia SVG
  useEffect(() => {
    preloadCharacterSprites().catch(console.error);
    loadMalaysiaSVG().catch(console.error);
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

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      let dir: string | null = null;

      if (key === "w" || key === "arrowup") {
        e.preventDefault();
        dir = "up";
      } else if (key === "s" || key === "arrowdown") {
        e.preventDefault();
        dir = "down";
      } else if (key === "a" || key === "arrowleft") {
        e.preventDefault();
        dir = "left";
      } else if (key === "d" || key === "arrowright") {
        e.preventDefault();
        dir = "right";
      }

      if (dir) {
        handleDirectionInput(dir);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const currentDir = currentDirRef.current;

      if (
        ((key === "w" || key === "arrowup") && currentDir === "up") ||
        ((key === "s" || key === "arrowdown") && currentDir === "down") ||
        ((key === "a" || key === "arrowleft") && currentDir === "left") ||
        ((key === "d" || key === "arrowright") && currentDir === "right")
      ) {
        handleDirectionInput(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleDirectionInput]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      const player = playerRef.current;

      // Movement directions
      const dirVectors = [
        { dx: 0, dy: 1 }, // down
        { dx: 0, dy: -1 }, // up
        { dx: -1, dy: 0 }, // left
        { dx: 1, dy: 0 }, // right
      ];

      // Player movement
      if (currentDirRef.current) {
        const dirMap: Record<string, number> = {
          down: 0,
          up: 1,
          left: 2,
          right: 3,
        };
        const inputDir = dirMap[currentDirRef.current];
        const vec = dirVectors[inputDir];
        const newX = player.x + vec.dx * PLAYER_SPEED;
        const newY = player.y + vec.dy * PLAYER_SPEED;

        if (isWalkableMalaysia(newX, newY, map, 10)) {
          player.x = newX;
          player.y = newY;
          player.direction = inputDir;
          player.isMoving = true;
          player.frame++;
        } else {
          player.isMoving = false;
        }
      } else {
        player.isMoving = false;
      }

      // Render
      ctx.fillStyle = "#0f172a"; // slate-900 background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render map
      for (let y = 0; y < MALAYSIA_MAP_HEIGHT; y++) {
        for (let x = 0; x < MALAYSIA_MAP_WIDTH; x++) {
          renderTile(ctx, map[y][x], x, y);
        }
      }

      // Render player
      renderPlayer(
        ctx,
        player.x,
        player.y,
        player.direction,
        player.isMoving ? player.frame : 0
      );

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [map]);

  return (
    <div className="relative w-full h-full">
      <div className="w-full bg-gray-900 text-white jobs-container relative overflow-hidden flex flex-col items-center justify-center pt-20 pb-8 px-2 md:px-4">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="relative w-full border-4 border-gray-700" style={{ aspectRatio: `${MALAYSIA_MAP_WIDTH}/${MALAYSIA_MAP_HEIGHT}` }}>
            <canvas
              ref={canvasRef}
              width={MALAYSIA_MAP_WIDTH * TILE_SIZE}
              height={MALAYSIA_MAP_HEIGHT * TILE_SIZE}
              className="block w-full h-full"
              style={{ 
                imageRendering: "pixelated"
              }}
            />
          </div>
        </div>

        {/* Mobile Controls */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 w-full flex items-center px-4 pb-6 z-30 pointer-events-none">
            <MobileControls
              onDirectionChange={handleDirectionInput}
              onInteract={() => {}}
              canInteract={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
