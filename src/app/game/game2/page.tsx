/**
 * Super Saiyan Money Quest - Dragon Ball Themed Game
 * Collect Ringgit bills, avoid ghosts, and blow up walls!
 *
 * CONTROLS:
 * - W/A/S/D or Arrow Keys: Move (one direction at a time)
 * - SPACE: Place bomb
 * - Touch: Use virtual D-pad and bomb button on mobile
 */

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, Ghost, Bomb } from "lucide-react";

// ============================================================================
// GAME CONSTANTS
// ============================================================================
const TILE_SIZE = 40;
const MAP_WIDTH = 17;
const MAP_HEIGHT = 13;
const PLAYER_SPEED = 3;
const GHOST_SPEED = 1.5;
const BOMB_TIMER = 180; // 3 seconds at 60fps
const EXPLOSION_DURATION = 30; // 0.5 seconds
const EXPLOSION_RANGE = 2; // tiles

// Ringgit bill denominations and colors
const BILL_TYPES = [
  { value: 1, color: "#1E90FF", label: "RM1" },
  { value: 5, color: "#32CD32", label: "RM5" },
  { value: 10, color: "#FF4500", label: "RM10" },
  { value: 20, color: "#FFD700", label: "RM20" },
  { value: 50, color: "#00CED1", label: "RM50" },
  { value: 100, color: "#9932CC", label: "RM100" },
];

// Map tile types
const TILE_EMPTY = 0;
const TILE_WALL = 1;
const TILE_BLOCK = 2;

// Generate a Bomberman-style grid map
function generateMap(): number[][] {
  const map: number[][] = [];

  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row: number[] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Border walls
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        row.push(TILE_WALL);
      }
      // Grid pattern of walls (like Bomberman)
      else if (x % 2 === 0 && y % 2 === 0) {
        row.push(TILE_WALL);
      }
      // Random destructible blocks (but not near spawn points)
      else if (
        Math.random() < 0.4 &&
        !((x <= 2 && y <= 2) || (x >= MAP_WIDTH - 3 && y >= MAP_HEIGHT - 3))
      ) {
        row.push(TILE_BLOCK);
      } else {
        row.push(TILE_EMPTY);
      }
    }
    map.push(row);
  }

  // Clear spawn area for player (top-left)
  map[1][1] = TILE_EMPTY;
  map[1][2] = TILE_EMPTY;
  map[2][1] = TILE_EMPTY;

  // Clear spawn areas for ghosts (corners)
  map[1][MAP_WIDTH - 2] = TILE_EMPTY;
  map[MAP_HEIGHT - 2][1] = TILE_EMPTY;
  map[MAP_HEIGHT - 2][MAP_WIDTH - 2] = TILE_EMPTY;

  return map;
}

// Interfaces
interface Bill {
  id: string;
  x: number;
  y: number;
  type: (typeof BILL_TYPES)[number];
  collected: boolean;
}

interface GhostEntity {
  id: string;
  x: number;
  y: number;
  direction: number;
  color: string;
  speed: number;
  alive: boolean;
}

interface BombEntity {
  id: string;
  tileX: number;
  tileY: number;
  timer: number;
}

interface Explosion {
  id: string;
  tiles: Array<{ x: number; y: number }>;
  timer: number;
}

// Generate collectible bills on empty tiles
function generateBills(map: number[][]): Bill[] {
  const bills: Bill[] = [];
  const positions: Array<{ x: number; y: number }> = [];

  for (let y = 1; y < MAP_HEIGHT - 1; y++) {
    for (let x = 1; x < MAP_WIDTH - 1; x++) {
      if (map[y][x] === TILE_EMPTY && !(x <= 2 && y <= 2)) {
        positions.push({ x, y });
      }
    }
  }

  positions.sort(() => Math.random() - 0.5);
  const billCount = Math.min(15, positions.length);

  for (let i = 0; i < billCount; i++) {
    const pos = positions[i];
    const rand = Math.random();
    let typeIndex: number;
    if (rand < 0.35) typeIndex = 0;
    else if (rand < 0.55) typeIndex = 1;
    else if (rand < 0.7) typeIndex = 2;
    else if (rand < 0.82) typeIndex = 3;
    else if (rand < 0.92) typeIndex = 4;
    else typeIndex = 5;

    bills.push({
      id: `bill-${i}`,
      x: pos.x * TILE_SIZE + TILE_SIZE / 2,
      y: pos.y * TILE_SIZE + TILE_SIZE / 2,
      type: BILL_TYPES[typeIndex],
      collected: false,
    });
  }

  return bills;
}

// Generate ghosts
function generateGhosts(): GhostEntity[] {
  const colors = ["#FF0000", "#00FFFF", "#FF69B4"];
  const positions = [
    { x: MAP_WIDTH - 2, y: 1 },
    { x: 1, y: MAP_HEIGHT - 2 },
    { x: MAP_WIDTH - 2, y: MAP_HEIGHT - 2 },
  ];

  return positions.map((pos, i) => ({
    id: `ghost-${i}`,
    x: pos.x * TILE_SIZE + TILE_SIZE / 2,
    y: pos.y * TILE_SIZE + TILE_SIZE / 2,
    direction: Math.floor(Math.random() * 4),
    color: colors[i % colors.length],
    speed: GHOST_SPEED + Math.random() * 0.3,
    alive: true,
  }));
}

// ============================================================================
// TILE RENDERER
// ============================================================================
function renderTile(
  ctx: CanvasRenderingContext2D,
  tile: number,
  x: number,
  y: number
) {
  const px = x * TILE_SIZE;
  const py = y * TILE_SIZE;

  switch (tile) {
    case TILE_EMPTY:
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = "#252545";
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
      break;

    case TILE_WALL:
      // Solid indestructible wall
      ctx.fillStyle = "#5a5a7a";
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#6a6a8a";
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#4a4a6a";
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      break;

    case TILE_BLOCK:
      // Destructible block (brown brick)
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(px + 1, py + 1, TILE_SIZE - 2, TILE_SIZE - 2);
      ctx.fillStyle = "#A0522D";
      ctx.fillRect(px + 3, py + 3, TILE_SIZE - 6, TILE_SIZE - 6);
      // Brick lines
      ctx.strokeStyle = "#654321";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + 1, py + TILE_SIZE / 2);
      ctx.lineTo(px + TILE_SIZE - 1, py + TILE_SIZE / 2);
      ctx.moveTo(px + TILE_SIZE / 2, py + 1);
      ctx.lineTo(px + TILE_SIZE / 2, py + TILE_SIZE / 2);
      ctx.moveTo(px + TILE_SIZE / 4, py + TILE_SIZE / 2);
      ctx.lineTo(px + TILE_SIZE / 4, py + TILE_SIZE - 1);
      ctx.moveTo(px + (TILE_SIZE * 3) / 4, py + TILE_SIZE / 2);
      ctx.lineTo(px + (TILE_SIZE * 3) / 4, py + TILE_SIZE - 1);
      ctx.stroke();
      break;
  }
}

// ============================================================================
// SUPER SAIYAN GOKU PLAYER RENDERER
// ============================================================================
function renderPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Walking animation
  const bounce = Math.abs(Math.sin(frame * 0.3)) * 2;

  // Super Saiyan aura (golden glow)
  const auraSize = 28 + Math.sin(frame * 0.2) * 4;
  const gradient = ctx.createRadialGradient(
    0,
    -5 - bounce,
    5,
    0,
    -5 - bounce,
    auraSize
  );
  gradient.addColorStop(0, "rgba(255, 215, 0, 0.4)");
  gradient.addColorStop(0.5, "rgba(255, 255, 0, 0.2)");
  gradient.addColorStop(1, "rgba(255, 255, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(0, -5 - bounce, auraSize, auraSize + 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(0, 16, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs with blue boots (walking animation)
  const legOffset = Math.sin(frame * 0.4) * 3;
  // Left leg
  ctx.fillStyle = "#FF6B00"; // Orange gi pants
  ctx.fillRect(-7, 6 - bounce + legOffset, 5, 6);
  ctx.fillStyle = "#1E90FF"; // Blue boots
  ctx.beginPath();
  ctx.ellipse(-5, 14 - bounce + legOffset, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // Right leg
  ctx.fillStyle = "#FF6B00";
  ctx.fillRect(2, 6 - bounce - legOffset, 5, 6);
  ctx.fillStyle = "#1E90FF";
  ctx.beginPath();
  ctx.ellipse(5, 14 - bounce - legOffset, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body (Orange gi)
  ctx.fillStyle = "#FF6B00";
  ctx.beginPath();
  ctx.ellipse(0, 0 - bounce, 10, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Blue undershirt showing at neck
  ctx.fillStyle = "#1E90FF";
  ctx.beginPath();
  ctx.arc(0, -8 - bounce, 5, 0, Math.PI, true);
  ctx.fill();

  // Blue belt/sash
  ctx.fillStyle = "#1E90FF";
  ctx.fillRect(-10, 4 - bounce, 20, 3);

  // Arms (orange gi with blue wristbands)
  ctx.fillStyle = "#FF6B00";
  ctx.fillRect(-14, -4 - bounce, 6, 10);
  ctx.fillRect(8, -4 - bounce, 6, 10);
  // Blue wristbands
  ctx.fillStyle = "#1E90FF";
  ctx.fillRect(-14, 3 - bounce, 6, 3);
  ctx.fillRect(8, 3 - bounce, 6, 3);
  // Hands (skin)
  ctx.fillStyle = "#FFDAB9";
  ctx.beginPath();
  ctx.arc(-11, 8 - bounce, 3, 0, Math.PI * 2);
  ctx.arc(11, 8 - bounce, 3, 0, Math.PI * 2);
  ctx.fill();

  // Head/Face
  ctx.fillStyle = "#FFDAB9"; // Skin tone
  ctx.beginPath();
  ctx.arc(0, -14 - bounce, 10, 0, Math.PI * 2);
  ctx.fill();

  // Super Saiyan spiky golden hair
  ctx.fillStyle = "#FFD700"; // Golden yellow

  // Main hair spikes pointing upward (iconic SSJ look)
  ctx.beginPath();
  // Center spike (tallest)
  ctx.moveTo(-2, -20 - bounce);
  ctx.lineTo(0, -38 - bounce);
  ctx.lineTo(2, -20 - bounce);
  // Left spikes
  ctx.moveTo(-4, -20 - bounce);
  ctx.lineTo(-6, -34 - bounce);
  ctx.lineTo(-2, -22 - bounce);
  ctx.moveTo(-6, -18 - bounce);
  ctx.lineTo(-10, -30 - bounce);
  ctx.lineTo(-4, -20 - bounce);
  ctx.moveTo(-8, -16 - bounce);
  ctx.lineTo(-14, -26 - bounce);
  ctx.lineTo(-6, -18 - bounce);
  // Right spikes
  ctx.moveTo(4, -20 - bounce);
  ctx.lineTo(6, -34 - bounce);
  ctx.lineTo(2, -22 - bounce);
  ctx.moveTo(6, -18 - bounce);
  ctx.lineTo(10, -30 - bounce);
  ctx.lineTo(4, -20 - bounce);
  ctx.moveTo(8, -16 - bounce);
  ctx.lineTo(14, -26 - bounce);
  ctx.lineTo(6, -18 - bounce);
  ctx.fill();

  // Hair base covering top of head
  ctx.beginPath();
  ctx.arc(0, -18 - bounce, 10, Math.PI, 0, false);
  ctx.fill();

  // Side hair/sideburns
  ctx.fillRect(-10, -18 - bounce, 3, 6);
  ctx.fillRect(7, -18 - bounce, 3, 6);

  // Forehead bang (M-shaped)
  ctx.beginPath();
  ctx.moveTo(-8, -18 - bounce);
  ctx.lineTo(-5, -14 - bounce);
  ctx.lineTo(-2, -17 - bounce);
  ctx.lineTo(0, -13 - bounce);
  ctx.lineTo(2, -17 - bounce);
  ctx.lineTo(5, -14 - bounce);
  ctx.lineTo(8, -18 - bounce);
  ctx.fill();

  // Face details based on direction
  if (direction === 0) {
    // Down - facing camera
    // Teal/green Super Saiyan eyes
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(-4, -14 - bounce, 3, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(4, -14 - bounce, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#00CED1"; // Teal irises
    ctx.beginPath();
    ctx.arc(-4, -13 - bounce, 2, 0, Math.PI * 2);
    ctx.arc(4, -13 - bounce, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(-4, -13 - bounce, 1, 0, Math.PI * 2);
    ctx.arc(4, -13 - bounce, 1, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows (intense SSJ look)
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-7, -17 - bounce);
    ctx.lineTo(-2, -16 - bounce);
    ctx.moveTo(7, -17 - bounce);
    ctx.lineTo(2, -16 - bounce);
    ctx.stroke();

    // Confident smirk
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-3, -8 - bounce);
    ctx.quadraticCurveTo(0, -6 - bounce, 3, -8 - bounce);
    ctx.stroke();
  } else if (direction === 1) {
    // Up - back of head (spiky hair from behind)
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(0, -14 - bounce, 9, 0, Math.PI * 2);
    ctx.fill();
    // Back spikes
    ctx.beginPath();
    ctx.moveTo(-6, -16 - bounce);
    ctx.lineTo(-8, -28 - bounce);
    ctx.lineTo(-2, -20 - bounce);
    ctx.moveTo(0, -18 - bounce);
    ctx.lineTo(0, -32 - bounce);
    ctx.lineTo(4, -20 - bounce);
    ctx.moveTo(6, -16 - bounce);
    ctx.lineTo(8, -28 - bounce);
    ctx.lineTo(2, -20 - bounce);
    ctx.fill();
  } else if (direction === 2) {
    // Left - profile view
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(-3, -14 - bounce, 2, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#00CED1";
    ctx.beginPath();
    ctx.arc(-4, -13 - bounce, 1.5, 0, Math.PI * 2);
    ctx.fill();
    // Eyebrow
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, -17 - bounce);
    ctx.lineTo(-2, -16 - bounce);
    ctx.stroke();
    // Side spikes
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.moveTo(-8, -16 - bounce);
    ctx.lineTo(-16, -22 - bounce);
    ctx.lineTo(-8, -20 - bounce);
    ctx.fill();
  } else {
    // Right - profile view
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(3, -14 - bounce, 2, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#00CED1";
    ctx.beginPath();
    ctx.arc(4, -13 - bounce, 1.5, 0, Math.PI * 2);
    ctx.fill();
    // Eyebrow
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(6, -17 - bounce);
    ctx.lineTo(2, -16 - bounce);
    ctx.stroke();
    // Side spikes
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.moveTo(8, -16 - bounce);
    ctx.lineTo(16, -22 - bounce);
    ctx.lineTo(8, -20 - bounce);
    ctx.fill();
  }

  ctx.restore();
}

// ============================================================================
// GHOST RENDERER
// ============================================================================
function renderGhost(
  ctx: CanvasRenderingContext2D,
  ghost: GhostEntity,
  frame: number
) {
  if (!ghost.alive) return;

  ctx.save();
  ctx.translate(ghost.x, ghost.y);

  const wobble =
    Math.sin(frame * 0.15 + parseFloat(ghost.id.split("-")[1])) * 2;

  // Ghost body
  ctx.fillStyle = ghost.color;
  ctx.beginPath();
  ctx.arc(0, -4 + wobble, 12, Math.PI, 0);
  ctx.lineTo(12, 10 + wobble);
  for (let i = 0; i < 5; i++) {
    const wx = 12 - i * 6;
    const wy = i % 2 === 0 ? 14 + wobble : 10 + wobble;
    ctx.lineTo(wx, wy);
  }
  ctx.closePath();
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#FFF";
  ctx.beginPath();
  ctx.ellipse(-4, -4 + wobble, 4, 5, 0, 0, Math.PI * 2);
  ctx.ellipse(4, -4 + wobble, 4, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pupils
  ctx.fillStyle = "#00F";
  const pupilOffsets = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];
  const po = pupilOffsets[ghost.direction];
  ctx.beginPath();
  ctx.arc(-4 + po.x, -4 + wobble + po.y, 2, 0, Math.PI * 2);
  ctx.arc(4 + po.x, -4 + wobble + po.y, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ============================================================================
// BOMB RENDERER
// ============================================================================
function renderBomb(
  ctx: CanvasRenderingContext2D,
  bomb: BombEntity,
  frame: number
) {
  const x = bomb.tileX * TILE_SIZE + TILE_SIZE / 2;
  const y = bomb.tileY * TILE_SIZE + TILE_SIZE / 2;

  // Pulsing animation
  const pulse = 1 + Math.sin(frame * 0.3) * 0.1;
  const urgency = bomb.timer < 60 ? 1 + Math.sin(frame * 0.8) * 0.15 : 1;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(pulse * urgency, pulse * urgency);

  // Bomb body
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fill();

  // Highlight
  ctx.fillStyle = "#3a3a3a";
  ctx.beginPath();
  ctx.arc(-4, -4, 5, 0, Math.PI * 2);
  ctx.fill();

  // Fuse
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.quadraticCurveTo(5, -20, 0, -22);
  ctx.stroke();

  // Spark
  if (frame % 10 < 5) {
    ctx.fillStyle = "#FF4500";
    ctx.beginPath();
    ctx.arc(0, -24, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(0, -24, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ============================================================================
// EXPLOSION RENDERER
// ============================================================================
function renderExplosion(
  ctx: CanvasRenderingContext2D,
  explosion: Explosion,
  frame: number
) {
  const alpha = explosion.timer / EXPLOSION_DURATION;

  explosion.tiles.forEach((tile) => {
    const x = tile.x * TILE_SIZE + TILE_SIZE / 2;
    const y = tile.y * TILE_SIZE + TILE_SIZE / 2;

    // Outer glow
    ctx.fillStyle = `rgba(255, 100, 0, ${alpha * 0.5})`;
    ctx.beginPath();
    ctx.arc(x, y, TILE_SIZE * 0.7, 0, Math.PI * 2);
    ctx.fill();

    // Inner fire
    ctx.fillStyle = `rgba(255, 200, 0, ${alpha * 0.8})`;
    ctx.beginPath();
    ctx.arc(x, y, TILE_SIZE * 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, TILE_SIZE * 0.3, 0, Math.PI * 2);
    ctx.fill();
  });
}

// ============================================================================
// BILL RENDERER
// ============================================================================
function renderBill(ctx: CanvasRenderingContext2D, bill: Bill, frame: number) {
  if (bill.collected) return;

  const bob = Math.sin(frame * 0.1 + bill.x * 0.1) * 2;

  ctx.save();
  ctx.translate(bill.x, bill.y + bob);

  ctx.shadowColor = bill.type.color;
  ctx.shadowBlur = 8;
  ctx.fillStyle = bill.type.color;
  ctx.fillRect(-10, -6, 20, 12);
  ctx.strokeStyle = "#FFF";
  ctx.lineWidth = 1;
  ctx.strokeRect(-10, -6, 20, 12);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#FFF";
  ctx.font = "bold 7px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(bill.type.label, 0, 0);

  ctx.restore();
}

// ============================================================================
// VIRTUAL D-PAD COMPONENT
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
    `w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl select-none transition-all touch-none ${
      activeDir === dir
        ? "bg-pink-500/80 scale-95"
        : "bg-white/20 active:bg-pink-500/60"
    }`;

  return (
    <div className="grid grid-cols-3 gap-1">
      <div />
      <button
        className={buttonClass("up")}
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
      <div />
      <button
        className={buttonClass("left")}
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
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/20" />
      <button
        className={buttonClass("right")}
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
      <div />
      <button
        className={buttonClass("down")}
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
      <div />
    </div>
  );
}

// ============================================================================
// MAIN GAME COMPONENT
// ============================================================================
export default function Game2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const [map, setMap] = useState(() => generateMap());
  const [bills, setBills] = useState<Bill[]>(() => generateBills(map));
  const [ghosts, setGhosts] = useState<GhostEntity[]>(() => generateGhosts());
  const [bombs, setBombs] = useState<BombEntity[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [money, setMoney] = useState(0);
  const [collected, setCollected] = useState(0);
  const [lives, setLives] = useState(3);
  const [bombCount, setBombCount] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [canvasScale, setCanvasScale] = useState(1);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const totalBills = bills.length;
  const bombIdRef = useRef(0);
  const explosionIdRef = useRef(0);

  // Player state
  const playerRef = useRef({
    x: 1.5 * TILE_SIZE,
    y: 1.5 * TILE_SIZE,
    direction: 3,
    frame: 0,
    isMoving: false,
    invincible: false,
    invincibleTimer: 0,
  });

  // Input state
  const currentDirRef = useRef<string | null>(null);
  const bombRequestRef = useRef(false);

  // Check if position is walkable
  const isWalkable = useCallback(
    (x: number, y: number, padding: number = 10) => {
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
          tileX >= MAP_WIDTH ||
          tileY < 0 ||
          tileY >= MAP_HEIGHT
        ) {
          return false;
        }

        const tile = map[tileY]?.[tileX];
        if (tile !== TILE_EMPTY) {
          return false;
        }
      }

      // Also check if there's a bomb at any of the tiles
      const playerTileX = Math.floor(x / TILE_SIZE);
      const playerTileY = Math.floor(y / TILE_SIZE);
      for (const bomb of bombs) {
        if (bomb.tileX === playerTileX && bomb.tileY === playerTileY) {
          // Allow walking on bomb if player is already on it
          const currentTileX = Math.floor(playerRef.current.x / TILE_SIZE);
          const currentTileY = Math.floor(playerRef.current.y / TILE_SIZE);
          if (currentTileX !== bomb.tileX || currentTileY !== bomb.tileY) {
            return false;
          }
        }
      }

      return true;
    },
    [map, bombs]
  );

  // Play sound
  const playSound = useCallback(
    (frequency: number, duration: number = 0.1) => {
      if (!soundEnabled || typeof window === "undefined") return;
      try {
        const audioCtx = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = frequency;
        osc.type = "square";
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          audioCtx.currentTime + duration
        );
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch {
        // Audio not supported
      }
    },
    [soundEnabled]
  );

  // Place bomb
  const placeBomb = useCallback(() => {
    if (bombCount <= 0) return;

    const player = playerRef.current;
    const tileX = Math.floor(player.x / TILE_SIZE);
    const tileY = Math.floor(player.y / TILE_SIZE);

    // Check if there's already a bomb at this tile
    const existingBomb = bombs.find(
      (b) => b.tileX === tileX && b.tileY === tileY
    );
    if (existingBomb) return;

    setBombs((prev) => [
      ...prev,
      {
        id: `bomb-${bombIdRef.current++}`,
        tileX,
        tileY,
        timer: BOMB_TIMER,
      },
    ]);
    setBombCount((prev) => prev - 1);
    playSound(150, 0.1);
  }, [bombCount, bombs, playSound]);

  // Collect bill
  const collectBill = useCallback(
    (bill: Bill) => {
      if (bill.collected) return;
      setBills((prev) =>
        prev.map((b) => (b.id === bill.id ? { ...b, collected: true } : b))
      );
      setMoney((prev) => prev + bill.type.value);
      setCollected((prev) => prev + 1);
      playSound(600 + bill.type.value * 5, 0.15);
    },
    [playSound]
  );

  // Handle player hit
  const handlePlayerHit = useCallback(() => {
    const player = playerRef.current;
    if (player.invincible) return;

    setLives((prev) => {
      if (prev <= 1) {
        setGameOver(true);
        playSound(200, 0.5);
        return 0;
      }
      playSound(300, 0.3);
      return prev - 1;
    });

    player.x = 1.5 * TILE_SIZE;
    player.y = 1.5 * TILE_SIZE;
    player.invincible = true;
    player.invincibleTimer = 120;
  }, [playSound]);

  // Handle direction input
  const handleDirectionInput = useCallback((dir: string | null) => {
    currentDirRef.current = dir;
  }, []);

  // Handle bomb button press
  const handleBombPress = useCallback(() => {
    bombRequestRef.current = true;
  }, []);

  // Detect mobile and calculate canvas scale
  useEffect(() => {
    const checkMobileAndScale = () => {
      // Only use width for mobile control display
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      // Calculate scale to fit screen
      const canvasWidth = MAP_WIDTH * TILE_SIZE;
      const canvasHeight = MAP_HEIGHT * TILE_SIZE;
      const availableWidth = window.innerWidth - 16;
      const availableHeight = window.innerHeight - (isMobileDevice ? 240 : 140);

      const scaleX = availableWidth / canvasWidth;
      const scaleY = availableHeight / canvasHeight;
      const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1

      setCanvasScale(Math.max(scale, 0.4)); // Minimum scale of 0.4
    };

    checkMobileAndScale();
    window.addEventListener("resize", checkMobileAndScale);
    return () => window.removeEventListener("resize", checkMobileAndScale);
  }, []);

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || gameWon) return;

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
      } else if (key === " ") {
        e.preventDefault();
        bombRequestRef.current = true;
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
  }, [gameOver, gameWon, handleDirectionInput]);

  // Game loop
  useEffect(() => {
    if (gameOver || gameWon) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      const player = playerRef.current;

      // Handle bomb placement request
      if (bombRequestRef.current) {
        placeBomb();
        bombRequestRef.current = false;
      }

      // Update invincibility
      if (player.invincible) {
        player.invincibleTimer--;
        if (player.invincibleTimer <= 0) {
          player.invincible = false;
        }
      }

      // Movement directions
      const dirVectors = [
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
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

        if (isWalkable(newX, newY, 10)) {
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

      // Update bombs
      setBombs((prevBombs) => {
        const newBombs: BombEntity[] = [];
        const explodingBombs: BombEntity[] = [];

        prevBombs.forEach((bomb) => {
          bomb.timer--;
          if (bomb.timer <= 0) {
            explodingBombs.push(bomb);
          } else {
            newBombs.push(bomb);
          }
        });

        // Create explosions for exploding bombs
        if (explodingBombs.length > 0) {
          const newExplosions: Explosion[] = [];

          explodingBombs.forEach((bomb) => {
            const tiles: Array<{ x: number; y: number }> = [
              { x: bomb.tileX, y: bomb.tileY },
            ];

            // Expand in 4 directions
            const dirs = [
              { dx: 0, dy: -1 },
              { dx: 0, dy: 1 },
              { dx: -1, dy: 0 },
              { dx: 1, dy: 0 },
            ];

            dirs.forEach((dir) => {
              for (let i = 1; i <= EXPLOSION_RANGE; i++) {
                const tx = bomb.tileX + dir.dx * i;
                const ty = bomb.tileY + dir.dy * i;

                if (tx < 0 || tx >= MAP_WIDTH || ty < 0 || ty >= MAP_HEIGHT)
                  break;

                const tile = map[ty][tx];
                if (tile === TILE_WALL) break;

                tiles.push({ x: tx, y: ty });

                if (tile === TILE_BLOCK) {
                  // Destroy the block
                  setMap((prevMap) => {
                    const newMap = prevMap.map((row) => [...row]);
                    newMap[ty][tx] = TILE_EMPTY;
                    return newMap;
                  });
                  break;
                }
              }
            });

            newExplosions.push({
              id: `exp-${explosionIdRef.current++}`,
              tiles,
              timer: EXPLOSION_DURATION,
            });

            // Return bomb to player
            setBombCount((prev) => prev + 1);
            playSound(100, 0.3);
          });

          setExplosions((prev) => [...prev, ...newExplosions]);
        }

        return newBombs;
      });

      // Update explosions
      setExplosions((prevExplosions) => {
        return prevExplosions
          .map((exp) => ({ ...exp, timer: exp.timer - 1 }))
          .filter((exp) => exp.timer > 0);
      });

      // Check explosion collision with player
      explosions.forEach((exp) => {
        exp.tiles.forEach((tile) => {
          const px = tile.x * TILE_SIZE + TILE_SIZE / 2;
          const py = tile.y * TILE_SIZE + TILE_SIZE / 2;
          const dist = Math.sqrt(
            Math.pow(player.x - px, 2) + Math.pow(player.y - py, 2)
          );
          if (dist < TILE_SIZE * 0.6) {
            handlePlayerHit();
          }
        });
      });

      // Check explosion collision with ghosts
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          if (!ghost.alive) return ghost;

          for (const exp of explosions) {
            for (const tile of exp.tiles) {
              const ex = tile.x * TILE_SIZE + TILE_SIZE / 2;
              const ey = tile.y * TILE_SIZE + TILE_SIZE / 2;
              const dist = Math.sqrt(
                Math.pow(ghost.x - ex, 2) + Math.pow(ghost.y - ey, 2)
              );
              if (dist < TILE_SIZE * 0.6) {
                playSound(400, 0.2);
                return { ...ghost, alive: false };
              }
            }
          }
          return ghost;
        })
      );

      // Update ghosts
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          if (!ghost.alive) return ghost;

          const gVec = dirVectors[ghost.direction];
          let newGX = ghost.x + gVec.dx * ghost.speed;
          let newGY = ghost.y + gVec.dy * ghost.speed;

          if (!isWalkable(newGX, newGY, 8)) {
            const possibleDirs: number[] = [];
            for (let d = 0; d < 4; d++) {
              if (d !== (ghost.direction + 2) % 4) {
                const testVec = dirVectors[d];
                const testX = ghost.x + testVec.dx * ghost.speed;
                const testY = ghost.y + testVec.dy * ghost.speed;
                if (isWalkable(testX, testY, 8)) {
                  possibleDirs.push(d);
                }
              }
            }

            if (possibleDirs.length > 0) {
              const toPlayerX = player.x - ghost.x;
              const toPlayerY = player.y - ghost.y;

              let bestDir = possibleDirs[0];
              let bestScore = -Infinity;

              for (const d of possibleDirs) {
                const dv = dirVectors[d];
                const score =
                  dv.dx * toPlayerX + dv.dy * toPlayerY + Math.random() * 20;
                if (score > bestScore) {
                  bestScore = score;
                  bestDir = d;
                }
              }

              ghost.direction = bestDir;
            } else {
              ghost.direction = (ghost.direction + 2) % 4;
            }

            const newVec = dirVectors[ghost.direction];
            newGX = ghost.x + newVec.dx * ghost.speed;
            newGY = ghost.y + newVec.dy * ghost.speed;
          }

          if (isWalkable(newGX, newGY, 8)) {
            ghost.x = newGX;
            ghost.y = newGY;
          }

          return ghost;
        })
      );

      // Check collision with ghosts
      if (!player.invincible) {
        for (const ghost of ghosts) {
          if (!ghost.alive) continue;
          const dist = Math.sqrt(
            Math.pow(player.x - ghost.x, 2) + Math.pow(player.y - ghost.y, 2)
          );
          if (dist < 16) {
            handlePlayerHit();
            break;
          }
        }
      }

      // Check bill collection
      bills.forEach((bill) => {
        if (!bill.collected) {
          const dist = Math.sqrt(
            Math.pow(player.x - bill.x, 2) + Math.pow(player.y - bill.y, 2)
          );
          if (dist < 18) {
            collectBill(bill);
          }
        }
      });

      // Check win condition
      if (collected >= totalBills && !gameWon) {
        setGameWon(true);
        playSound(800, 0.5);
      }

      // Render
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render map
      for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
          renderTile(ctx, map[y][x], x, y);
        }
      }

      // Render bills
      bills.forEach((bill) => renderBill(ctx, bill, frameCount));

      // Render bombs
      bombs.forEach((bomb) => renderBomb(ctx, bomb, frameCount));

      // Render explosions
      explosions.forEach((exp) => renderExplosion(ctx, exp, frameCount));

      // Render ghosts
      ghosts.forEach((ghost) => renderGhost(ctx, ghost, frameCount));

      // Render player (blink when invincible)
      if (!player.invincible || frameCount % 10 < 5) {
        renderPlayer(
          ctx,
          player.x,
          player.y,
          player.direction,
          player.isMoving ? player.frame : 0
        );
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [
    map,
    bills,
    ghosts,
    bombs,
    explosions,
    gameOver,
    gameWon,
    collected,
    totalBills,
    isWalkable,
    collectBill,
    handlePlayerHit,
    placeBomb,
    playSound,
  ]);

  // Restart game
  const restartGame = () => {
    window.location.reload();
  };

  const progress = totalBills > 0 ? (collected / totalBills) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 bg-black/40 backdrop-blur-sm border-b border-white/10">
        <Link
          href="/game"
          className="flex items-center gap-1 sm:gap-2 text-zinc-50/70 hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Back</span>
        </Link>

        <h1 className="text-sm sm:text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-400">
          ⚡ SSJ Quest
        </h1>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 sm:p-2 text-zinc-50/70 hover:text-zinc-50 transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </header>

      {/* Stats Bar */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-black/30">
        <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
          <span className="text-zinc-600 font-bold text-xs sm:text-base">
            RM {money}
          </span>
          <span className="text-zinc-50/60 text-[10px] sm:text-sm">
            💵 {collected}/{totalBills}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: lives }).map((_, i) => (
              <span key={i} className="text-red-400 text-[10px] sm:text-sm">
                ❤️
              </span>
            ))}
          </div>
          <span className="text-orange-400 text-[10px] sm:text-sm">
            💣 {bombCount}
          </span>
        </div>
        <div className="w-12 sm:w-28 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-green-500 to-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameContainerRef}
        className="flex-1 flex flex-col items-center justify-center p-2 overflow-hidden"
      >
        <div
          className="relative rounded-xl overflow-hidden border-2 sm:border-4 border-slate-700/50 shadow-2xl"
          style={{
            transform: `scale(${canvasScale})`,
            transformOrigin: "center center",
          }}
        >
          <canvas
            ref={canvasRef}
            width={MAP_WIDTH * TILE_SIZE}
            height={MAP_HEIGHT * TILE_SIZE}
            className="block"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">
              <Ghost className="w-16 h-16 text-red-500 mb-4" />
              <h2 className="text-4xl font-bold text-red-500 mb-2">
                GAME OVER
              </h2>
              <p className="text-zinc-50/80 text-lg mb-4">
                You collected: RM {money}
              </p>
              <button
                onClick={restartGame}
                className="px-6 py-3 bg-linear-to-r from-red-500 to-orange-500 text-zinc-50 font-bold rounded-xl hover:scale-105 transition-transform"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Win Overlay */}
          {gameWon && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                YOU WIN!
              </h2>
              <p className="text-zinc-50/80 text-lg mb-4">Total: RM {money}</p>
              <button
                onClick={restartGame}
                className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 text-zinc-50 font-bold rounded-xl hover:scale-105 transition-transform"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls - CSS hidden on md+ screens */}
        {!gameOver && !gameWon && (
          <div className="mt-2 flex items-center justify-between w-full max-w-sm px-2 md:hidden">
            <DPad onDirectionChange={handleDirectionInput} />

            <div className="flex flex-col gap-1">
              <button
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleBombPress();
                }}
                onClick={handleBombPress}
                className="w-14 h-14 rounded-full bg-orange-500/80 active:bg-orange-600 flex items-center justify-center text-2xl touch-none select-none border-2 border-orange-300"
              >
                💣
              </button>
              <button
                onClick={restartGame}
                className="px-2 py-1 bg-white/10 text-zinc-50/80 text-[10px] rounded-lg border border-white/10"
              >
                Restart
              </button>
            </div>
          </div>
        )}

        {/* Desktop Hint - CSS hidden on small screens */}
        {!gameOver && !gameWon && (
          <div className="mt-4 hidden md:flex items-center gap-4">
            <span className="text-zinc-50/40 text-sm">
              <span className="text-cyan-400 font-mono">WASD</span> move ·{" "}
              <span className="text-orange-400 font-mono">SPACE</span> bomb
            </span>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-white/10 text-zinc-50/80 text-sm rounded-xl border border-white/10"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
