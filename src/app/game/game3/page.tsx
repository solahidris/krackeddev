/**
 * Pokemon Red Clone - Stone Town Edition
 * A faithful recreation of Pokemon Red with medieval townhall aesthetics
 *
 * CONTROLS:
 * - W/A/S/D or Arrow Keys: Move (grid-snapped movement)
 * - Touch: Use virtual D-pad on mobile
 */

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";

// ============================================================================
// GAME CONSTANTS
// ============================================================================
const TILE_SIZE = 16;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 18;
const SCALE = 4; // 4x scale for crisp pixels

// Viewport size (what's visible on screen) - Pokemon GB style
const VIEWPORT_WIDTH = 10; // tiles visible horizontally
const VIEWPORT_HEIGHT = 9; // tiles visible vertically
const CANVAS_WIDTH = VIEWPORT_WIDTH * TILE_SIZE * SCALE;
const CANVAS_HEIGHT = VIEWPORT_HEIGHT * TILE_SIZE * SCALE;

const WALK_SPEED = 8; // Frames to complete one tile movement
const ANIMATION_SPEED = 4; // Frames per animation step

// Tile types
const TILE = {
  GRASS: 0,
  COBBLESTONE: 1,
  RAFFLESIA: 2,
};

// Pokemon Red inspired color palette
const COLORS = {
  // Grass colors
  GRASS: "#88C070",
  GRASS_DARK: "#78B060",
  GRASS_LIGHT: "#98D080",

  // Cobblestone path
  COBBLE: "#A8A8A8",
  COBBLE_DARK: "#888888",
  COBBLE_LIGHT: "#C8C8C8",

  // Rafflesia flower colors
  RAFFLESIA_RED: "#C41E3A",
  RAFFLESIA_DARK: "#8B0000",
  RAFFLESIA_SPOTS: "#F5F5DC",
  RAFFLESIA_CENTER: "#4A0404",
  RAFFLESIA_CENTER_DARK: "#2A0202",

  // Player (Red from Pokemon)
  PLAYER_SKIN: "#F8C0A0",
  PLAYER_HAIR: "#181818",
  PLAYER_HAT: "#F83800",
  PLAYER_SHIRT: "#F83800",
  PLAYER_PANTS: "#3078F8",
  PLAYER_SHOES: "#181818",

  // UI
  BLACK: "#181818",
  WHITE: "#F8F8F8",
};

// Simple map with pavements and rafflesia in center
// prettier-ignore
const MAP: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Direction constants
const DIR = {
  DOWN: 0,
  UP: 1,
  LEFT: 2,
  RIGHT: 3,
};

// Check if a tile is walkable
function isWalkable(tileType: number): boolean {
  return tileType === TILE.GRASS || tileType === TILE.COBBLESTONE;
}

// ============================================================================
// TILE RENDERING - Simplified with Rafflesia
// ============================================================================
function renderTile(
  ctx: CanvasRenderingContext2D,
  tile: number,
  x: number,
  y: number,
  frame: number
) {
  const px = x * TILE_SIZE;
  const py = y * TILE_SIZE;

  // Base grass for all tiles first
  ctx.fillStyle = COLORS.GRASS;
  ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);

  // Grass texture pattern (Pokemon style)
  ctx.fillStyle = COLORS.GRASS_DARK;
  if ((x + y) % 2 === 0) {
    ctx.fillRect(px + 3, py + 3, 2, 2);
    ctx.fillRect(px + 11, py + 11, 2, 2);
  } else {
    ctx.fillRect(px + 3, py + 11, 2, 2);
    ctx.fillRect(px + 11, py + 3, 2, 2);
  }

  switch (tile) {
    case TILE.COBBLESTONE:
      // Cobblestone path - Pokemon style
      ctx.fillStyle = COLORS.COBBLE;
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      // Stone pattern
      ctx.fillStyle = COLORS.COBBLE_DARK;
      ctx.fillRect(px, py + 7, TILE_SIZE, 1);
      ctx.fillRect(px + 7, py, 1, 8);
      ctx.fillRect(px + 3, py + 8, 1, 8);
      ctx.fillRect(px + 11, py + 8, 1, 8);
      // Highlights
      ctx.fillStyle = COLORS.COBBLE_LIGHT;
      ctx.fillRect(px + 1, py + 1, 2, 1);
      ctx.fillRect(px + 9, py + 1, 2, 1);
      ctx.fillRect(px + 5, py + 9, 2, 1);
      ctx.fillRect(px + 13, py + 9, 2, 1);
      break;

    case TILE.RAFFLESIA:
      // Giant Rafflesia flower - spans 2x2 tiles but render per tile
      // Determine which part of the flower this tile is
      const isTopLeft =
        MAP[y]?.[x + 1] === TILE.RAFFLESIA &&
        MAP[y + 1]?.[x] === TILE.RAFFLESIA;
      const isTopRight =
        MAP[y]?.[x - 1] === TILE.RAFFLESIA &&
        MAP[y + 1]?.[x] === TILE.RAFFLESIA;
      const isBottomLeft =
        MAP[y]?.[x + 1] === TILE.RAFFLESIA &&
        MAP[y - 1]?.[x] === TILE.RAFFLESIA;
      const isBottomRight =
        MAP[y]?.[x - 1] === TILE.RAFFLESIA &&
        MAP[y - 1]?.[x] === TILE.RAFFLESIA;

      // Pulsing animation for the flower
      const pulse = Math.sin(frame / 20) * 0.5 + 0.5;

      if (isTopLeft) {
        // Top-left petal
        ctx.fillStyle = COLORS.RAFFLESIA_RED;
        ctx.fillRect(px + 4, py + 4, 12, 12);
        ctx.fillStyle = COLORS.RAFFLESIA_DARK;
        ctx.fillRect(px + 4, py + 4, 12, 4);
        ctx.fillRect(px + 4, py + 4, 4, 12);
        // Spots
        ctx.fillStyle = COLORS.RAFFLESIA_SPOTS;
        ctx.fillRect(px + 7, py + 7, 2, 2);
        ctx.fillRect(px + 11, py + 10, 2, 2);
        ctx.fillRect(px + 8, py + 13, 2, 2);
      } else if (isTopRight) {
        // Top-right petal
        ctx.fillStyle = COLORS.RAFFLESIA_RED;
        ctx.fillRect(px, py + 4, 12, 12);
        ctx.fillStyle = COLORS.RAFFLESIA_DARK;
        ctx.fillRect(px, py + 4, 12, 4);
        ctx.fillRect(px + 8, py + 4, 4, 12);
        // Spots
        ctx.fillStyle = COLORS.RAFFLESIA_SPOTS;
        ctx.fillRect(px + 7, py + 7, 2, 2);
        ctx.fillRect(px + 3, py + 10, 2, 2);
        ctx.fillRect(px + 6, py + 13, 2, 2);
      } else if (isBottomLeft) {
        // Bottom-left petal
        ctx.fillStyle = COLORS.RAFFLESIA_RED;
        ctx.fillRect(px + 4, py, 12, 12);
        ctx.fillStyle = COLORS.RAFFLESIA_DARK;
        ctx.fillRect(px + 4, py + 8, 12, 4);
        ctx.fillRect(px + 4, py, 4, 12);
        // Spots
        ctx.fillStyle = COLORS.RAFFLESIA_SPOTS;
        ctx.fillRect(px + 7, py + 7, 2, 2);
        ctx.fillRect(px + 11, py + 3, 2, 2);
        ctx.fillRect(px + 8, py + 1, 2, 2);
        // Center hole (bottom-left corner)
        ctx.fillStyle = COLORS.RAFFLESIA_CENTER;
        ctx.fillRect(px + 12, py, 4, 4);
        ctx.fillStyle = COLORS.RAFFLESIA_CENTER_DARK;
        ctx.fillRect(px + 13 + Math.floor(pulse), py + 1, 2, 2);
      } else if (isBottomRight) {
        // Bottom-right petal
        ctx.fillStyle = COLORS.RAFFLESIA_RED;
        ctx.fillRect(px, py, 12, 12);
        ctx.fillStyle = COLORS.RAFFLESIA_DARK;
        ctx.fillRect(px, py + 8, 12, 4);
        ctx.fillRect(px + 8, py, 4, 12);
        // Spots
        ctx.fillStyle = COLORS.RAFFLESIA_SPOTS;
        ctx.fillRect(px + 7, py + 7, 2, 2);
        ctx.fillRect(px + 3, py + 3, 2, 2);
        ctx.fillRect(px + 6, py + 1, 2, 2);
        // Center hole (bottom-right corner)
        ctx.fillStyle = COLORS.RAFFLESIA_CENTER;
        ctx.fillRect(px, py, 4, 4);
        ctx.fillStyle = COLORS.RAFFLESIA_CENTER_DARK;
        ctx.fillRect(px + 1, py + 1, 2, 2);
      } else {
        // Single tile rafflesia (fallback)
        ctx.fillStyle = COLORS.RAFFLESIA_RED;
        ctx.fillRect(px + 2, py + 2, 12, 12);
        ctx.fillStyle = COLORS.RAFFLESIA_DARK;
        ctx.fillRect(px + 2, py + 2, 12, 3);
        // Center
        ctx.fillStyle = COLORS.RAFFLESIA_CENTER;
        ctx.fillRect(px + 5, py + 5, 6, 6);
        ctx.fillStyle = COLORS.RAFFLESIA_CENTER_DARK;
        ctx.fillRect(px + 6, py + 6, 4, 4);
        // Spots
        ctx.fillStyle = COLORS.RAFFLESIA_SPOTS;
        ctx.fillRect(px + 3, py + 4, 2, 2);
        ctx.fillRect(px + 11, py + 4, 2, 2);
        ctx.fillRect(px + 3, py + 10, 2, 2);
        ctx.fillRect(px + 11, py + 10, 2, 2);
      }
      break;
  }
}

// ============================================================================
// PLAYER RENDERING - Pokemon Red/Red trainer style
// ============================================================================
function renderPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  walkFrame: number,
  isMoving: boolean
) {
  const px = x;
  const py = y;

  // Animation frame (0, 1, 2, 1 cycle for walking)
  const animFrame = isMoving
    ? [0, 1, 2, 1][Math.floor(walkFrame / ANIMATION_SPEED) % 4]
    : 0;

  // Shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(px + 4, py + 14, 8, 2);

  // Render based on direction
  switch (direction) {
    case DIR.DOWN:
      renderPlayerDown(ctx, px, py, animFrame);
      break;
    case DIR.UP:
      renderPlayerUp(ctx, px, py, animFrame);
      break;
    case DIR.LEFT:
      renderPlayerLeft(ctx, px, py, animFrame);
      break;
    case DIR.RIGHT:
      renderPlayerRight(ctx, px, py, animFrame);
      break;
  }
}

function renderPlayerDown(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  frame: number
) {
  // Hat
  ctx.fillStyle = COLORS.PLAYER_HAT;
  ctx.fillRect(px + 4, py, 8, 3);
  ctx.fillRect(px + 3, py + 2, 10, 2);

  // Hair
  ctx.fillStyle = COLORS.PLAYER_HAIR;
  ctx.fillRect(px + 4, py + 3, 8, 2);

  // Face
  ctx.fillStyle = COLORS.PLAYER_SKIN;
  ctx.fillRect(px + 4, py + 4, 8, 4);

  // Eyes
  ctx.fillStyle = COLORS.BLACK;
  ctx.fillRect(px + 5, py + 5, 2, 2);
  ctx.fillRect(px + 9, py + 5, 2, 2);

  // Body/Shirt
  ctx.fillStyle = COLORS.PLAYER_SHIRT;
  ctx.fillRect(px + 4, py + 8, 8, 4);

  // Arms with walking animation
  const armOffset = frame === 1 ? -1 : frame === 2 ? 1 : 0;
  ctx.fillRect(px + 2 + armOffset, py + 8, 2, 3);
  ctx.fillRect(px + 12 - armOffset, py + 8, 2, 3);

  // Pants
  ctx.fillStyle = COLORS.PLAYER_PANTS;
  ctx.fillRect(px + 5, py + 12, 3, 2);
  ctx.fillRect(px + 8, py + 12, 3, 2);

  // Feet with walking animation
  ctx.fillStyle = COLORS.PLAYER_SHOES;
  const footOffset = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  ctx.fillRect(px + 5 + footOffset, py + 14, 2, 2);
  ctx.fillRect(px + 9 - footOffset, py + 14, 2, 2);
}

function renderPlayerUp(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  frame: number
) {
  // Hat (back)
  ctx.fillStyle = COLORS.PLAYER_HAT;
  ctx.fillRect(px + 4, py, 8, 4);
  ctx.fillRect(px + 3, py + 2, 10, 2);

  // Hair (back view - more visible)
  ctx.fillStyle = COLORS.PLAYER_HAIR;
  ctx.fillRect(px + 4, py + 3, 8, 5);

  // Back of shirt
  ctx.fillStyle = COLORS.PLAYER_SHIRT;
  ctx.fillRect(px + 4, py + 8, 8, 4);

  // Backpack
  ctx.fillStyle = "#705028"; // Brown backpack
  ctx.fillRect(px + 5, py + 9, 6, 3);

  // Arms
  const armOffset = frame === 1 ? -1 : frame === 2 ? 1 : 0;
  ctx.fillStyle = COLORS.PLAYER_SHIRT;
  ctx.fillRect(px + 2 + armOffset, py + 8, 2, 3);
  ctx.fillRect(px + 12 - armOffset, py + 8, 2, 3);

  // Pants
  ctx.fillStyle = COLORS.PLAYER_PANTS;
  ctx.fillRect(px + 5, py + 12, 3, 2);
  ctx.fillRect(px + 8, py + 12, 3, 2);

  // Feet
  ctx.fillStyle = COLORS.PLAYER_SHOES;
  const footOffset = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  ctx.fillRect(px + 5 + footOffset, py + 14, 2, 2);
  ctx.fillRect(px + 9 - footOffset, py + 14, 2, 2);
}

function renderPlayerLeft(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  frame: number
) {
  // Hat
  ctx.fillStyle = COLORS.PLAYER_HAT;
  ctx.fillRect(px + 3, py, 8, 3);
  ctx.fillRect(px + 1, py + 2, 10, 2);

  // Hair
  ctx.fillStyle = COLORS.PLAYER_HAIR;
  ctx.fillRect(px + 4, py + 3, 6, 2);

  // Face (side)
  ctx.fillStyle = COLORS.PLAYER_SKIN;
  ctx.fillRect(px + 3, py + 4, 6, 4);

  // Eye
  ctx.fillStyle = COLORS.BLACK;
  ctx.fillRect(px + 4, py + 5, 2, 2);

  // Body
  ctx.fillStyle = COLORS.PLAYER_SHIRT;
  ctx.fillRect(px + 4, py + 8, 7, 4);

  // Arm
  const armSwing = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  ctx.fillRect(px + 9, py + 8 + armSwing, 2, 3);

  // Pants
  ctx.fillStyle = COLORS.PLAYER_PANTS;
  ctx.fillRect(px + 5, py + 12, 3, 2);
  ctx.fillRect(px + 8, py + 12, 2, 2);

  // Feet
  ctx.fillStyle = COLORS.PLAYER_SHOES;
  if (frame === 1) {
    ctx.fillRect(px + 4, py + 14, 3, 2);
    ctx.fillRect(px + 9, py + 14, 2, 2);
  } else if (frame === 2) {
    ctx.fillRect(px + 6, py + 14, 3, 2);
    ctx.fillRect(px + 10, py + 14, 2, 2);
  } else {
    ctx.fillRect(px + 5, py + 14, 3, 2);
    ctx.fillRect(px + 9, py + 14, 2, 2);
  }
}

function renderPlayerRight(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  frame: number
) {
  // Hat
  ctx.fillStyle = COLORS.PLAYER_HAT;
  ctx.fillRect(px + 5, py, 8, 3);
  ctx.fillRect(px + 5, py + 2, 10, 2);

  // Hair
  ctx.fillStyle = COLORS.PLAYER_HAIR;
  ctx.fillRect(px + 6, py + 3, 6, 2);

  // Face (side)
  ctx.fillStyle = COLORS.PLAYER_SKIN;
  ctx.fillRect(px + 7, py + 4, 6, 4);

  // Eye
  ctx.fillStyle = COLORS.BLACK;
  ctx.fillRect(px + 10, py + 5, 2, 2);

  // Body
  ctx.fillStyle = COLORS.PLAYER_SHIRT;
  ctx.fillRect(px + 5, py + 8, 7, 4);

  // Arm
  const armSwing = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  ctx.fillRect(px + 5, py + 8 + armSwing, 2, 3);

  // Pants
  ctx.fillStyle = COLORS.PLAYER_PANTS;
  ctx.fillRect(px + 6, py + 12, 2, 2);
  ctx.fillRect(px + 8, py + 12, 3, 2);

  // Feet
  ctx.fillStyle = COLORS.PLAYER_SHOES;
  if (frame === 1) {
    ctx.fillRect(px + 5, py + 14, 2, 2);
    ctx.fillRect(px + 9, py + 14, 3, 2);
  } else if (frame === 2) {
    ctx.fillRect(px + 4, py + 14, 2, 2);
    ctx.fillRect(px + 7, py + 14, 3, 2);
  } else {
    ctx.fillRect(px + 5, py + 14, 2, 2);
    ctx.fillRect(px + 8, py + 14, 3, 2);
  }
}

// ============================================================================
// D-PAD COMPONENT - Game Boy Style
// ============================================================================
function DPad({
  onDirectionChange,
}: {
  onDirectionChange: (dir: string | null) => void;
}) {
  const [activeDir, setActiveDir] = useState<string | null>(null);

  const handleDirection = useCallback(
    (dir: string | null) => {
      setActiveDir(dir);
      onDirectionChange(dir);
    },
    [onDirectionChange]
  );

  const buttonClass = (dir: string) =>
    `w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl select-none transition-all touch-none font-bold ${
      activeDir === dir
        ? "bg-[#303030] scale-95 text-white"
        : "bg-[#202020] active:bg-[#303030] text-gray-400"
    }`;

  return (
    <div className="grid grid-cols-3 gap-0 bg-[#181818] p-1 rounded-xl">
      <div className="w-16 h-16 sm:w-20 sm:h-20" />
      <button
        className={`${buttonClass("up")} rounded-t-xl`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleDirection("up");
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleDirection(null);
        }}
        onMouseDown={() => handleDirection("up")}
        onMouseUp={() => handleDirection(null)}
        onMouseLeave={() => activeDir === "up" && handleDirection(null)}
      >
        ▲
      </button>
      <div className="w-16 h-16 sm:w-20 sm:h-20" />
      <button
        className={`${buttonClass("left")} rounded-l-xl`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleDirection("left");
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleDirection(null);
        }}
        onMouseDown={() => handleDirection("left")}
        onMouseUp={() => handleDirection(null)}
        onMouseLeave={() => activeDir === "left" && handleDirection(null)}
      >
        ◀
      </button>
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#282828] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-[#181818]" />
      </div>
      <button
        className={`${buttonClass("right")} rounded-r-xl`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleDirection("right");
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleDirection(null);
        }}
        onMouseDown={() => handleDirection("right")}
        onMouseUp={() => handleDirection(null)}
        onMouseLeave={() => activeDir === "right" && handleDirection(null)}
      >
        ▶
      </button>
      <div className="w-16 h-16 sm:w-20 sm:h-20" />
      <button
        className={`${buttonClass("down")} rounded-b-xl`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleDirection("down");
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleDirection(null);
        }}
        onMouseDown={() => handleDirection("down")}
        onMouseUp={() => handleDirection(null)}
        onMouseLeave={() => activeDir === "down" && handleDirection(null)}
      >
        ▼
      </button>
      <div className="w-16 h-16 sm:w-20 sm:h-20" />
    </div>
  );
}

// ============================================================================
// A/B BUTTONS
// ============================================================================
function ActionButtons() {
  return (
    <div className="flex gap-4 items-center">
      <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#A01030] text-white font-bold text-xl shadow-lg active:scale-95 transition-transform border-b-4 border-[#701020]">
        B
      </button>
      <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#A01030] text-white font-bold text-xl shadow-lg active:scale-95 transition-transform border-b-4 border-[#701020] -mt-8">
        A
      </button>
    </div>
  );
}

// ============================================================================
// MAIN GAME COMPONENT
// ============================================================================
export default function Game3Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [canvasScale, setCanvasScale] = useState(1);

  // Player state - start on the path
  const playerRef = useRef({
    tileX: 7,
    tileY: 15,
    pixelX: 7 * TILE_SIZE,
    pixelY: 15 * TILE_SIZE,
    direction: DIR.UP,
    isMoving: false,
    walkFrame: 0,
    targetTileX: 7,
    targetTileY: 15,
    moveProgress: 0,
  });

  // Input state
  const inputRef = useRef<string | null>(null);
  const queuedInputRef = useRef<string | null>(null);

  // Play footstep sound - Pokemon style
  const playFootstep = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 180 + Math.random() * 40;
      osc.type = "square";
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // Audio not supported
    }
  }, [soundEnabled]);

  // Play grass rustle sound
  const playGrassRustle = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 600 + Math.random() * 200;
      osc.type = "sawtooth";
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio not supported
    }
  }, [soundEnabled]);

  // Handle direction input
  const handleDirectionInput = useCallback((dir: string | null) => {
    if (dir) {
      queuedInputRef.current = dir;
    }
    inputRef.current = dir;
  }, []);

  // Detect mobile and calculate scale
  useEffect(() => {
    const checkMobileAndScale = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      const availableWidth = window.innerWidth - 48;
      const availableHeight = window.innerHeight - (isMobileDevice ? 350 : 200);

      const scaleX = availableWidth / CANVAS_WIDTH;
      const scaleY = availableHeight / CANVAS_HEIGHT;
      const scale = Math.min(scaleX, scaleY, 1.5);

      setCanvasScale(Math.max(scale, 0.3));
    };

    checkMobileAndScale();
    window.addEventListener("resize", checkMobileAndScale);
    return () => window.removeEventListener("resize", checkMobileAndScale);
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
      const currentDir = inputRef.current;

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

    // Disable image smoothing for crisp pixels
    ctx.imageSmoothingEnabled = false;

    let animationId: number;
    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      const player = playerRef.current;

      // Handle movement
      if (player.isMoving) {
        player.moveProgress++;
        player.walkFrame++;

        const progress = player.moveProgress / WALK_SPEED;
        const startX = player.tileX * TILE_SIZE;
        const startY = player.tileY * TILE_SIZE;
        const endX = player.targetTileX * TILE_SIZE;
        const endY = player.targetTileY * TILE_SIZE;

        player.pixelX = startX + (endX - startX) * progress;
        player.pixelY = startY + (endY - startY) * progress;

        if (player.moveProgress >= WALK_SPEED) {
          player.tileX = player.targetTileX;
          player.tileY = player.targetTileY;
          player.pixelX = player.tileX * TILE_SIZE;
          player.pixelY = player.tileY * TILE_SIZE;
          player.isMoving = false;
          player.moveProgress = 0;

          if (queuedInputRef.current) {
            inputRef.current = queuedInputRef.current;
          }
        }
      }

      // Start new movement
      if (!player.isMoving && inputRef.current) {
        const dirMap: Record<string, { dir: number; dx: number; dy: number }> =
          {
            up: { dir: DIR.UP, dx: 0, dy: -1 },
            down: { dir: DIR.DOWN, dx: 0, dy: 1 },
            left: { dir: DIR.LEFT, dx: -1, dy: 0 },
            right: { dir: DIR.RIGHT, dx: 1, dy: 0 },
          };

        const move = dirMap[inputRef.current];
        if (move) {
          player.direction = move.dir;

          const newTileX = player.tileX + move.dx;
          const newTileY = player.tileY + move.dy;

          if (
            newTileX >= 0 &&
            newTileX < MAP_WIDTH &&
            newTileY >= 0 &&
            newTileY < MAP_HEIGHT
          ) {
            const targetTile = MAP[newTileY][newTileX];
            if (isWalkable(targetTile)) {
              player.targetTileX = newTileX;
              player.targetTileY = newTileY;
              player.isMoving = true;
              player.moveProgress = 0;
              player.walkFrame = 0;
              playFootstep();
            }
          }
        }
      }

      if (!inputRef.current) {
        queuedInputRef.current = null;
      }

      // Render
      ctx.fillStyle = COLORS.BLACK;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(SCALE, SCALE);

      // Calculate camera position (centered on player)
      const viewportPixelWidth = VIEWPORT_WIDTH * TILE_SIZE;
      const viewportPixelHeight = VIEWPORT_HEIGHT * TILE_SIZE;

      // Camera follows player, keeping them centered
      let cameraX = player.pixelX - viewportPixelWidth / 2 + TILE_SIZE / 2;
      let cameraY = player.pixelY - viewportPixelHeight / 2 + TILE_SIZE / 2;

      // Clamp camera to map bounds
      const maxCameraX = MAP_WIDTH * TILE_SIZE - viewportPixelWidth;
      const maxCameraY = MAP_HEIGHT * TILE_SIZE - viewportPixelHeight;
      cameraX = Math.max(0, Math.min(cameraX, maxCameraX));
      cameraY = Math.max(0, Math.min(cameraY, maxCameraY));

      // Translate to camera position
      ctx.translate(-cameraX, -cameraY);

      // Calculate visible tile range (with 1 tile buffer for smooth scrolling)
      const startTileX = Math.max(0, Math.floor(cameraX / TILE_SIZE) - 1);
      const startTileY = Math.max(0, Math.floor(cameraY / TILE_SIZE) - 1);
      const endTileX = Math.min(
        MAP_WIDTH,
        Math.ceil((cameraX + viewportPixelWidth) / TILE_SIZE) + 1
      );
      const endTileY = Math.min(
        MAP_HEIGHT,
        Math.ceil((cameraY + viewportPixelHeight) / TILE_SIZE) + 1
      );

      // Render only visible map tiles
      for (let y = startTileY; y < endTileY; y++) {
        for (let x = startTileX; x < endTileX; x++) {
          renderTile(ctx, MAP[y][x], x, y, frameCount);
        }
      }

      // Render player (at their world position, camera transform handles centering)
      renderPlayer(
        ctx,
        player.pixelX,
        player.pixelY,
        player.direction,
        player.walkFrame,
        player.isMoving
      );

      ctx.restore();

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [playFootstep, playGrassRustle]);

  return (
    <div className="fixed inset-0 z-50 bg-[#181818] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#101010] border-b border-[#303030]">
        <Link
          href="/game"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <h1 className="text-lg sm:text-xl font-bold text-white tracking-wider">
          RAFFLESIA GARDEN
        </h1>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </header>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Game Boy Color Style Frame */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: "#8B1E3F",
            padding: "16px",
            borderRadius: "16px",
            transform: `scale(${canvasScale})`,
            transformOrigin: "center center",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)",
          }}
        >
          {/* Screen bezel */}
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: "#303030",
              padding: "8px",
              borderRadius: "8px",
              boxShadow: "inset 0 4px 8px rgba(0,0,0,0.5)",
            }}
          >
            {/* Screen inner shadow */}
            <div
              style={{
                backgroundColor: "#000",
                padding: "4px",
                borderRadius: "4px",
              }}
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="block"
                style={{
                  imageRendering: "pixelated",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>

          {/* Power indicator */}
          <div className="absolute top-5 left-6 flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-green-400"
              style={{ boxShadow: "0 0 8px #4ade80" }}
            />
            <span className="text-[8px] text-white/60 font-bold tracking-wider">
              POWER
            </span>
          </div>

          {/* Brand text */}
          <div className="absolute top-5 right-6">
            <span className="text-[10px] text-white/80 font-bold tracking-widest">
              POKEMON
            </span>
          </div>
        </div>

        {/* Mobile Controls */}
        {isMobile && (
          <div className="mt-6 flex items-center justify-between w-full max-w-md px-4">
            <DPad onDirectionChange={handleDirectionInput} />
            <ActionButtons />
          </div>
        )}

        {/* Desktop Hint */}
        {!isMobile && (
          <div className="mt-8 text-center space-y-2">
            <span className="text-gray-500 text-sm block">
              Use{" "}
              <span className="text-white font-mono bg-[#303030] px-2 py-1 rounded">
                WASD
              </span>{" "}
              or{" "}
              <span className="text-white font-mono bg-[#303030] px-2 py-1 rounded">
                Arrow Keys
              </span>{" "}
              to move
            </span>
            <span className="text-gray-600 text-xs block">
              Walk the paths and discover the giant Rafflesia!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
