// Utility to parse SVG path data and convert to canvas coordinates
// This will be used to create accurate Malaysia map from SVG

export interface Point {
  x: number;
  y: number;
}

// Parse SVG path commands and extract points
// This is a simplified parser that handles basic path commands
export function parseSVGPath(pathData: string, width: number, height: number): Point[] {
  const points: Point[] = [];
  const commands = pathData.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || [];
  
  let currentX = 0;
  let currentY = 0;
  let startX = 0;
  let startY = 0;
  
  for (const command of commands) {
    const type = command[0];
    const coords = command.slice(1).trim().split(/[\s,]+/).filter(s => s).map(Number);
    
    switch (type.toLowerCase()) {
      case 'm': // Move to (relative)
        currentX += coords[0] || 0;
        currentY += coords[1] || 0;
        startX = currentX;
        startY = currentY;
        points.push({ x: currentX, y: currentY });
        break;
      case 'l': // Line to (relative)
        for (let i = 0; i < coords.length; i += 2) {
          currentX += coords[i] || 0;
          currentY += coords[i + 1] || 0;
          points.push({ x: currentX, y: currentY });
        }
        break;
      case 'h': // Horizontal line (relative)
        currentX += coords[0] || 0;
        points.push({ x: currentX, y: currentY });
        break;
      case 'v': // Vertical line (relative)
        currentY += coords[0] || 0;
        points.push({ x: currentX, y: currentY });
        break;
      case 'c': // Cubic bezier (relative) - approximate with end point
        if (coords.length >= 6) {
          currentX += coords[4] || 0;
          currentY += coords[5] || 0;
          points.push({ x: currentX, y: currentY });
        }
        break;
      case 'z': // Close path
        if (points.length > 0 && (currentX !== startX || currentY !== startY)) {
          points.push({ x: startX, y: startY });
        }
        break;
      // Handle absolute coordinates (uppercase)
      case 'M':
        currentX = coords[0] || 0;
        currentY = coords[1] || 0;
        startX = currentX;
        startY = currentY;
        points.push({ x: currentX, y: currentY });
        break;
      case 'L':
        for (let i = 0; i < coords.length; i += 2) {
          currentX = coords[i] || currentX;
          currentY = coords[i + 1] || currentY;
          points.push({ x: currentX, y: currentY });
        }
        break;
      case 'H':
        currentX = coords[0] || currentX;
        points.push({ x: currentX, y: currentY });
        break;
      case 'V':
        currentY = coords[0] || currentY;
        points.push({ x: currentX, y: currentY });
        break;
      case 'C':
        if (coords.length >= 6) {
          currentX = coords[4] || currentX;
          currentY = coords[5] || currentY;
          points.push({ x: currentX, y: currentY });
        }
        break;
    }
  }
  
  // Normalize points to 0-1 range based on SVG dimensions
  if (points.length > 0) {
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    
    const svgWidth = maxX - minX;
    const svgHeight = maxY - minY;
    
    return points.map(p => ({
      x: (p.x - minX) / svgWidth,
      y: (p.y - minY) / svgHeight,
    }));
  }
  
  return points;
}

// Check if point is in polygon using ray casting algorithm
export function pointInPolygon(point: Point, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    
    const intersect = ((yi > point.y) !== (yj > point.y)) &&
      (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

