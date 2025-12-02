import { TILE_SIZE, TILE_EMPTY, TILE_WALL, TILE_JOBS, TILE_BLOG, TILE_HACKATHON, TILE_CODE, TILE_PROFILE, TILE_WHITEPAPER, TILE_BACK_TO_TOWN, TILE_TREE, TILE_GRAVEL, TILE_PAVEMENT, TILE_X } from './constants';
import { spriteCache, getCharacterSpritePath, getChickenSpritePath, getCowSpritePath } from './sprites';

// Tile renderer
export function renderTile(
  ctx: CanvasRenderingContext2D,
  tile: number,
  x: number,
  y: number
) {
  const px = x * TILE_SIZE;
  const py = y * TILE_SIZE;

  switch (tile) {
    case TILE_EMPTY:
      // Ground - green grass
      ctx.fillStyle = "#22c55e"; // green-500
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = "#16a34a"; // green-600
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
      // Add some grass texture
      ctx.fillStyle = "#15803d"; // green-700
      ctx.fillRect(px + 5, py + 5, 3, 3);
      ctx.fillRect(px + 15, py + 12, 2, 2);
      ctx.fillRect(px + 25, py + 8, 3, 3);
      ctx.fillRect(px + 32, py + 15, 2, 2);
      break;

    case TILE_WALL:
      // Wall - dark gray stone
      ctx.fillStyle = "#374151"; // gray-700
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#4b5563"; // gray-600
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#1f2937"; // gray-800
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      ctx.strokeStyle = "#111827"; // gray-900
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
      break;

    case TILE_JOBS:
      // Jobs - blue building with label
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#3b82f6"; // blue-500
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#2563eb"; // blue-600
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Draw text label with outline for visibility
      const jobsTextX = px + TILE_SIZE / 2;
      const jobsTextY = py + TILE_SIZE / 2;
      ctx.font = "bold 8px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Draw black outline
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText("JOBS", jobsTextX, jobsTextY);
      // Draw white text
      ctx.fillStyle = "#ffffff";
      ctx.fillText("JOBS", jobsTextX, jobsTextY);
      break;

    case TILE_BLOG:
      // Blog - purple building with label
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#a855f7"; // purple-500
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#9333ea"; // purple-600
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Draw text label with outline for visibility
      const blogTextX = px + TILE_SIZE / 2;
      const blogTextY = py + TILE_SIZE / 2;
      ctx.font = "bold 8px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Draw black outline
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText("BLOG", blogTextX, blogTextY);
      // Draw white text
      ctx.fillStyle = "#ffffff";
      ctx.fillText("BLOG", blogTextX, blogTextY);
      break;

    case TILE_HACKATHON:
      // Hackathon - orange building with label
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#f97316"; // orange-500
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#ea580c"; // orange-600
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Draw text label (smaller font for longer word) with outline
      const hackTextX = px + TILE_SIZE / 2;
      const hackTextY1 = py + TILE_SIZE / 2 - 3;
      const hackTextY2 = py + TILE_SIZE / 2 + 3;
      ctx.font = "bold 6px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Draw black outline
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText("HACK", hackTextX, hackTextY1);
      ctx.strokeText("ATHON", hackTextX, hackTextY2);
      // Draw white text
      ctx.fillStyle = "#ffffff";
      ctx.fillText("HACK", hackTextX, hackTextY1);
      ctx.fillText("ATHON", hackTextX, hackTextY2);
      break;

    case TILE_CODE:
      // Code - cyan building with label
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#06b6d4"; // cyan-500
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#0891b2"; // cyan-600
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Draw text label
      const codeTextX = px + TILE_SIZE / 2;
      const codeTextY = py + TILE_SIZE / 2;
      ctx.font = "bold 8px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText("CODE", codeTextX, codeTextY);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("CODE", codeTextX, codeTextY);
      break;

    case TILE_PROFILE:
      // Members - pink building with label
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#ec4899"; // pink-500
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#db2777"; // pink-600
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Draw text label (smaller font to fit "MEMBER" in full)
      const profileTextX = px + TILE_SIZE / 2;
      const profileTextY = py + TILE_SIZE / 2;
      ctx.font = "bold 5px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText("MEMBER", profileTextX, profileTextY);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("MEMBER", profileTextX, profileTextY);
      break;

    case TILE_WHITEPAPER:
      // Whitepaper - yellow building with label
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#eab308"; // yellow-500
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#ca8a04"; // yellow-600
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Draw text label (smaller font)
      const wpTextX = px + TILE_SIZE / 2;
      const wpTextY1 = py + TILE_SIZE / 2 - 3;
      const wpTextY2 = py + TILE_SIZE / 2 + 3;
      ctx.font = "bold 6px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText("WHITE", wpTextX, wpTextY1);
      ctx.strokeText("PAPER", wpTextX, wpTextY2);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("WHITE", wpTextX, wpTextY1);
      ctx.fillText("PAPER", wpTextX, wpTextY2);
      break;

    case TILE_BACK_TO_TOWN:
      // Back to Town - red building with label
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#ef4444"; // red-500
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.fillStyle = "#dc2626"; // red-600
      ctx.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Draw text label (smaller font)
      const backTextX = px + TILE_SIZE / 2;
      const backTextY1 = py + TILE_SIZE / 2 - 3;
      const backTextY2 = py + TILE_SIZE / 2 + 3;
      ctx.font = "bold 6px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeText("BACK", backTextX, backTextY1);
      ctx.strokeText("TOWN", backTextX, backTextY2);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("BACK", backTextX, backTextY1);
      ctx.fillText("TOWN", backTextX, backTextY2);
      break;

    case TILE_TREE:
      // Tree - draw grass base first, then tree on top
      ctx.fillStyle = "#22c55e"; // green-500 grass base
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = "#16a34a"; // green-600
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
      // Tree trunk (brown)
      ctx.fillStyle = "#78350f"; // brown-800
      ctx.fillRect(px + TILE_SIZE / 2 - 3, py + TILE_SIZE - 12, 6, 12);
      // Tree leaves (green circle)
      ctx.fillStyle = "#166534"; // green-800
      ctx.beginPath();
      ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE - 12, 12, 0, Math.PI * 2);
      ctx.fill();
      // Tree leaves highlight
      ctx.fillStyle = "#15803d"; // green-700
      ctx.beginPath();
      ctx.arc(px + TILE_SIZE / 2 - 3, py + TILE_SIZE - 15, 8, 0, Math.PI * 2);
      ctx.fill();
      break;

    case TILE_GRAVEL:
      // Gravel path - gray/brown rocky texture
      ctx.fillStyle = "#78716c"; // stone-600
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = "#57534e"; // stone-700
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
      // Gravel texture - random small stones
      ctx.fillStyle = "#a8a29e"; // stone-400
      ctx.fillRect(px + 3, py + 3, 4, 4);
      ctx.fillRect(px + 12, py + 8, 3, 3);
      ctx.fillRect(px + 22, py + 5, 4, 4);
      ctx.fillRect(px + 8, py + 15, 3, 3);
      ctx.fillRect(px + 18, py + 18, 4, 4);
      ctx.fillRect(px + 28, py + 12, 3, 3);
      // Darker stones
      ctx.fillStyle = "#57534e"; // stone-700
      ctx.fillRect(px + 6, py + 10, 2, 2);
      ctx.fillRect(px + 15, py + 3, 2, 2);
      ctx.fillRect(px + 25, py + 15, 2, 2);
      ctx.fillRect(px + 10, py + 20, 2, 2);
      break;

    case TILE_PAVEMENT:
      // Pavement - light gray concrete
      ctx.fillStyle = "#d1d5db"; // gray-300
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = "#9ca3af"; // gray-400
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, TILE_SIZE, TILE_SIZE);
      // Pavement lines/seams
      ctx.strokeStyle = "#9ca3af"; // gray-400
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + TILE_SIZE / 2, py);
      ctx.lineTo(px + TILE_SIZE / 2, py + TILE_SIZE);
      ctx.moveTo(px, py + TILE_SIZE / 2);
      ctx.lineTo(px + TILE_SIZE, py + TILE_SIZE / 2);
      ctx.stroke();
      // Pavement texture - subtle highlights
      ctx.fillStyle = "#e5e7eb"; // gray-200
      ctx.fillRect(px + 2, py + 2, TILE_SIZE / 2 - 4, TILE_SIZE / 2 - 4);
      ctx.fillRect(px + TILE_SIZE / 2 + 2, py + TILE_SIZE / 2 + 2, TILE_SIZE / 2 - 4, TILE_SIZE / 2 - 4);
      break;

    case TILE_X:
      // X tile - black tile with X text
      ctx.fillStyle = "#22c55e"; // green ground
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      ctx.fillStyle = "#000000"; // black
      ctx.fillRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      // Draw X text
      const xTextX = px + TILE_SIZE / 2;
      const xTextY = py + TILE_SIZE / 2;
      ctx.font = "bold 16px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.strokeText("X", xTextX, xTextY);
      ctx.fillStyle = "#ffffff";
      ctx.fillText("X", xTextX, xTextY);
      break;
  }
}

// Player renderer using sprite images
export function renderPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Get sprite path based on direction and frame
  // Use frame directly to cycle through animation frames
  const spritePath = getCharacterSpritePath(direction, frame);
  
  // Try to get cached sprite
  const sprite = spriteCache.get(spritePath);
  
  if (sprite && sprite.complete) {
    // Scale sprite to fit tile size (TILE_SIZE = 40)
    // Target height is about 80% of tile size to leave room for shadow
    const targetHeight = TILE_SIZE * 0.8; // 32 pixels
    const scale = targetHeight / sprite.height;
    const scaledWidth = sprite.width * scale;
    const scaledHeight = sprite.height * scale;

    // Draw shadow (scaled proportionally)
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(0, scaledHeight / 2 - 2, scaledWidth * 0.3, scaledHeight * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw sprite centered and scaled
    ctx.drawImage(
      sprite,
      -scaledWidth / 2,
      -scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );
  } else {
    // Fallback to old rendering if sprite not loaded yet
    renderPlayerFallback(ctx, 0, 0, direction, frame);
  }

  ctx.restore();
}

// Fallback player renderer (original implementation)
function renderPlayerFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Walking animation bounce
  const bounce = Math.abs(Math.sin(frame * 0.3)) * 2;

  // Shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(0, 14, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body (simple rectangle)
  ctx.fillStyle = "#3b82f6"; // blue-500
  ctx.fillRect(-6, -2 - bounce, 12, 10);

  // Head
  ctx.fillStyle = "#fbbf24"; // yellow-400 (hair/hat)
  ctx.beginPath();
  ctx.arc(0, -8 - bounce, 6, 0, Math.PI * 2);
  ctx.fill();

  // Face based on direction
  if (direction === 0) {
    // Down - facing camera
    ctx.fillStyle = "#fef3c7"; // yellow-100 (skin)
    ctx.beginPath();
    ctx.arc(0, -8 - bounce, 5, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(-3, -10 - bounce, 2, 2);
    ctx.fillRect(1, -10 - bounce, 2, 2);
  } else if (direction === 1) {
    // Up - back of head
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(0, -8 - bounce, 6, 0, Math.PI * 2);
    ctx.fill();
  } else if (direction === 2) {
    // Left - profile
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.arc(-2, -8 - bounce, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillRect(-4, -10 - bounce, 2, 2);
  } else {
    // Right - profile
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.arc(2, -8 - bounce, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillRect(2, -10 - bounce, 2, 2);
  }

  // Legs with walking animation
  const legOffset = Math.sin(frame * 0.4) * 2;
  ctx.fillStyle = "#1e40af"; // blue-800
  ctx.fillRect(-5, 6 - bounce + legOffset, 4, 6);
  ctx.fillRect(1, 6 - bounce - legOffset, 4, 6);

  ctx.restore();
}

// Cat renderer - simple pixel art cat that follows the player
export function renderCat(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Walking animation bounce
  const bounce = Math.abs(Math.sin(frame * 0.3)) * 1.5;

  // Shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.beginPath();
  ctx.ellipse(0, 10, 6, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cat body (smaller than player)
  ctx.fillStyle = "#f97316"; // orange-500 (cat body)
  ctx.fillRect(-4, -1 - bounce, 8, 6);

  // Cat head
  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.arc(0, -6 - bounce, 5, 0, Math.PI * 2);
  ctx.fill();

  // Cat ears
  ctx.fillStyle = "#ea580c"; // orange-600
  ctx.beginPath();
  ctx.moveTo(-3, -10 - bounce);
  ctx.lineTo(-1, -8 - bounce);
  ctx.lineTo(-2, -6 - bounce);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(3, -10 - bounce);
  ctx.lineTo(1, -8 - bounce);
  ctx.lineTo(2, -6 - bounce);
  ctx.fill();

  // Cat face based on direction
  if (direction === 0) {
    // Down - facing camera
    ctx.fillStyle = "#fef3c7"; // yellow-100 (inner ear)
    ctx.beginPath();
    ctx.arc(-2, -8 - bounce, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(2, -8 - bounce, 1.5, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(-2, -7 - bounce, 1.5, 1.5);
    ctx.fillRect(0.5, -7 - bounce, 1.5, 1.5);
    // Nose
    ctx.fillStyle = "#fbbf24"; // yellow-400
    ctx.beginPath();
    ctx.moveTo(0, -5 - bounce);
    ctx.lineTo(-1, -4 - bounce);
    ctx.lineTo(1, -4 - bounce);
    ctx.fill();
    // Mouth
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -4 - bounce);
    ctx.lineTo(-1, -3 - bounce);
    ctx.moveTo(0, -4 - bounce);
    ctx.lineTo(1, -3 - bounce);
    ctx.stroke();
  } else if (direction === 1) {
    // Up - back of head
    ctx.fillStyle = "#ea580c";
    ctx.beginPath();
    ctx.arc(0, -6 - bounce, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (direction === 2) {
    // Left - profile
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.arc(-1, -6 - bounce, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillRect(-2, -7 - bounce, 1.5, 1.5);
  } else {
    // Right - profile
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.arc(1, -6 - bounce, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillRect(0.5, -7 - bounce, 1.5, 1.5);
  }

  // Cat tail (wagging animation)
  const tailWag = Math.sin(frame * 0.4) * 0.5;
  ctx.strokeStyle = "#f97316";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(4, 2 - bounce);
  ctx.quadraticCurveTo(6 + tailWag, 0 - bounce, 8 + tailWag * 2, -2 - bounce);
  ctx.stroke();

  // Legs with walking animation
  const legOffset = Math.sin(frame * 0.4) * 1.5;
  ctx.fillStyle = "#ea580c"; // orange-600
  ctx.fillRect(-3, 4 - bounce + legOffset, 2, 4);
  ctx.fillRect(1, 4 - bounce - legOffset, 2, 4);

  ctx.restore();
}

// Chicken renderer using sprite images
export function renderChicken(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  const spritePath = getChickenSpritePath(frame);
  const sprite = spriteCache.get(spritePath);
  
  if (sprite && sprite.complete) {
    const targetHeight = TILE_SIZE * 0.6; // Smaller than player
    const scale = targetHeight / sprite.height;
    const scaledWidth = sprite.width * scale;
    const scaledHeight = sprite.height * scale;

    // Draw shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.ellipse(0, scaledHeight / 2 - 1, scaledWidth * 0.25, scaledHeight * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw sprite centered and scaled
    ctx.drawImage(
      sprite,
      -scaledWidth / 2,
      -scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );
  } else {
    // Fallback rendering
    const bounce = Math.abs(Math.sin(frame * 0.3)) * 1;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.ellipse(0, 8, 5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fbbf24"; // yellow
    ctx.fillRect(-3, -1 - bounce, 6, 4);
    ctx.beginPath();
    ctx.arc(0, -4 - bounce, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillRect(-1, -5 - bounce, 1, 1);
    ctx.fillRect(0, -5 - bounce, 1, 1);
  }

  ctx.restore();
}

// Cow renderer using sprite images
export function renderCow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: number,
  frame: number
) {
  ctx.save();
  ctx.translate(x, y);

  const spritePath = getCowSpritePath(frame);
  const sprite = spriteCache.get(spritePath);
  
  if (sprite && sprite.complete) {
    const targetHeight = TILE_SIZE * 0.9; // Larger than chicken
    const scale = targetHeight / sprite.height;
    const scaledWidth = sprite.width * scale;
    const scaledHeight = sprite.height * scale;

    // Draw shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.ellipse(0, scaledHeight / 2 - 1, scaledWidth * 0.3, scaledHeight * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw sprite centered and scaled
    ctx.drawImage(
      sprite,
      -scaledWidth / 2,
      -scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );
  } else {
    // Fallback rendering
    const bounce = Math.abs(Math.sin(frame * 0.2)) * 1.5;
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.ellipse(0, 12, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#78716c"; // gray-brown
    ctx.fillRect(-5, -2 - bounce, 10, 8);
    ctx.beginPath();
    ctx.arc(0, -6 - bounce, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillRect(-2, -7 - bounce, 1.5, 1.5);
    ctx.fillRect(0.5, -7 - bounce, 1.5, 1.5);
  }

  ctx.restore();
}

