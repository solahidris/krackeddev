"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, PLAYER_SPEED, TILE_EMPTY, TILE_WALL } from '@/lib/game/constants';
import { renderTile, renderPlayer } from '@/lib/game/renderers';
import { isWalkable, isNearBuilding, isOnBuildingTile } from '@/lib/game/utils';
import { BuildingConfig } from '@/lib/game/types';
import { MobileControls } from './MobileControls';
import { preloadCharacterSprites } from '@/lib/game/sprites';

// Create a single shared Audio instance for click sound (only in browser)
let clickSound: HTMLAudioElement | null = null;
if (typeof Audio !== "undefined") {
    clickSound = new Audio("/audio/click.mp3");
    clickSound.volume = 0.6;
}

const playClickSound = () => {
    if (clickSound) {
        try {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {
                // ignore autoplay / user gesture issues
            });
        } catch {
            // fail silently
        }
    }
};

interface BaseGameWorldProps {
  map: number[][];
  buildings: BuildingConfig[];
  onBuildingEnter: (route: string) => void;
  initialPlayerX?: number;
  initialPlayerY?: number;
}

export const BaseGameWorld: React.FC<BaseGameWorldProps> = ({
  map,
  buildings,
  onBuildingEnter,
  initialPlayerX = (MAP_WIDTH / 2) * TILE_SIZE,
  initialPlayerY = (MAP_HEIGHT / 2) * TILE_SIZE,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [nearBuilding, setNearBuilding] = useState<BuildingConfig | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const hasNavigatedRef = useRef(false);

  // Player state
  const playerRef = useRef({
    x: initialPlayerX,
    y: initialPlayerY,
    direction: 0, // 0=down, 1=up, 2=left, 3=right
    frame: 0,
    isMoving: false,
  });

  // Input state
  const currentDirRef = useRef<string | null>(null);
  const lastTileRef = useRef<{ x: number; y: number } | null>(null);

  // Handle direction input
  const handleDirectionInput = useCallback((dir: string | null) => {
    currentDirRef.current = dir;
  }, []);

  // Preload character sprites
  useEffect(() => {
    preloadCharacterSprites().catch(console.error);
  }, []);

  // Detect mobile and small screens
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileDevice = window.innerWidth < 768;
      const isSmallScreenDevice = window.innerWidth < 1280; // Below xl (huge) breakpoint
      setIsMobile(isMobileDevice);
      setIsSmallScreen(isSmallScreenDevice);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
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
      } else if (key === "e" || key === " ") {
        // E or Space to interact
        e.preventDefault();
        if (nearBuilding) {
          playClickSound();
          setShowDialog(true);
        }
      } else if (e.key === "Enter") {
        // Enter to navigate
        e.preventDefault();
        if (nearBuilding && showDialog) {
          playClickSound();
          onBuildingEnter(nearBuilding.route);
        }
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
  }, [handleDirectionInput, nearBuilding, showDialog, onBuildingEnter]);

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

        if (isWalkable(newX, newY, map, 10)) {
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

      // Check if near any building
      let foundBuilding: BuildingConfig | null = null;
      
      for (const building of buildings) {
        if (isNearBuilding(player.x, player.y, building.positions)) {
          foundBuilding = building;
          
          // Check if player is standing on any tile of the building and it has autoNavigate
          if (isOnBuildingTile(player.x, player.y, building.positions) && building.autoNavigate && !hasNavigatedRef.current) {
            // Auto-navigate immediately (only once)
            hasNavigatedRef.current = true;
            onBuildingEnter(building.route);
            return; // Exit early to prevent further rendering
          }
          
          break;
        }
      }
      
      // Reset navigation flag if player moves away from auto-navigate building
      if (!foundBuilding || !foundBuilding.autoNavigate) {
        hasNavigatedRef.current = false;
      }

      if (foundBuilding !== nearBuilding) {
        setNearBuilding(foundBuilding);
        if (!foundBuilding) {
          setShowDialog(false);
        }
      }

      // Render
      ctx.fillStyle = "#0f172a"; // slate-900 background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render map
      for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
          renderTile(ctx, map[y][x], x, y);
        }
      }

      // Render custom labels on buildings
      for (const building of buildings) {
        if (building.customLabel && building.positions.length > 0) {
          // Find the bounding box of all building positions
          const minX = Math.min(...building.positions.map(p => p.x));
          const minY = Math.min(...building.positions.map(p => p.y));
          const maxX = Math.max(...building.positions.map(p => p.x));
          const maxY = Math.max(...building.positions.map(p => p.y));
          
          const px = minX * TILE_SIZE;
          const py = minY * TILE_SIZE;
          const width = (maxX - minX + 1) * TILE_SIZE;
          const height = (maxY - minY + 1) * TILE_SIZE;
          
          // Cover the default building text with a background rectangle
          // This ensures only the custom label (date) is visible, no "BLOG" text behind it
          ctx.fillStyle = building.colorDark || "#9333ea"; // Use building's dark color
          ctx.fillRect(px + 4, py + 4, width - 8, height - 8);
          
          // Calculate center of the building for text placement
          const centerX = px + width / 2;
          const centerY = py + height / 2;
          
          ctx.font = "bold 6px 'Press Start 2P', monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.fillStyle = "#ffffff";
          
          // Split label into lines if needed
          const lines = building.customLabel.split('\n');
          lines.forEach((line, idx) => {
            const textY = centerY + (idx - (lines.length - 1) / 2) * 6;
            ctx.strokeText(line, centerX, textY);
            ctx.fillText(line, centerX, textY);
          });
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
  }, [map, buildings, nearBuilding]);

  return (
    <div className="w-full bg-gray-900 text-white jobs-container relative overflow-hidden flex flex-col items-center justify-center pt-20 pb-8 px-2 md:px-4">
      {/* Canvas Container with relative positioning for dialogs */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="relative w-full border-4 border-gray-700" style={{ aspectRatio: `${MAP_WIDTH}/${MAP_HEIGHT}` }}>
          <canvas
            ref={canvasRef}
            width={MAP_WIDTH * TILE_SIZE}
            height={MAP_HEIGHT * TILE_SIZE}
            className="block w-full h-full"
            style={{ 
              imageRendering: "pixelated"
            }}
          />

          {/* Dialog Box - overlay on top of tile section */}
          {showDialog && nearBuilding && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/90 border-4 border-white p-4 max-w-md w-[90%]">
              <div className="text-center">
                <p className="text-yellow-400 mb-2 text-sm">{nearBuilding.label}</p>
                <p className="text-white text-xs mb-2">{nearBuilding.description}</p>
                {!isMobile && <p className="text-green-400 text-xs">Press ENTER to enter</p>}
                {isMobile && <p className="text-green-400 text-xs">Tap ENTER button below</p>}
              </div>
            </div>
          )}

          {/* Interaction Hint - overlay on top of tile section */}
          {nearBuilding && !showDialog && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/70 border-2 border-yellow-400 p-2">
              <p className="text-yellow-400 text-xs text-center">
                {isMobile ? 'Tap E button below' : 'Press E or SPACE to speak'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Controls - Centered below tile section */}
      {isMobile && (
        <div className="w-full max-w-5xl mt-6 flex items-center justify-center gap-8">
          <MobileControls
            onDirectionChange={handleDirectionInput}
            onInteract={() => {
              if (nearBuilding) {
                playClickSound();
                setShowDialog(true);
              }
            }}
            onConfirm={() => {
              if (nearBuilding && showDialog) {
                playClickSound();
                onBuildingEnter(nearBuilding.route);
              }
            }}
            canInteract={!!nearBuilding && !showDialog}
            canConfirm={!!nearBuilding && showDialog}
          />
        </div>
      )}
    </div>
  );
};

