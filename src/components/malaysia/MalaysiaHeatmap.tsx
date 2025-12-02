"use client";

import React, { useRef, useEffect, useState } from 'react';
import {
  KUALA_LUMPUR_REGION,
  KEDAH_REGION,
  MEMBER_LOCATIONS,
  loadMalaysiaSVG,
} from '@/lib/malaysia/mapData';

// Heatmap color function - maps member count to red-orange gradient
function getHeatmapColor(intensity: number, maxIntensity: number = 5): string {
  if (intensity === 0) return 'transparent';
  
  // Normalize intensity to 0-1 range
  const normalized = intensity / maxIntensity;
  
  // Red-orange gradient: darker for higher intensity
  if (normalized >= 0.8) {
    return 'rgba(255, 69, 0, 0.9)'; // OrangeRed - darker
  } else if (normalized >= 0.6) {
    return 'rgba(255, 99, 71, 0.7)'; // Tomato
  } else if (normalized >= 0.4) {
    return 'rgba(255, 140, 0, 0.6)'; // DarkOrange
  } else if (normalized >= 0.2) {
    return 'rgba(255, 160, 122, 0.5)'; // LightSalmon - lighter
  } else {
    return 'rgba(255, 179, 71, 0.3)'; // LightGoldenrod
  }
}

// Get heatmap intensity for a point based on distance from regions
function getHeatmapIntensity(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  let totalIntensity = 0;
  
  // Check Kuala Lumpur region
  const klCenterX = KUALA_LUMPUR_REGION.center.x * width;
  const klCenterY = KUALA_LUMPUR_REGION.center.y * height;
  const klRadius = KUALA_LUMPUR_REGION.radius * Math.min(width, height);
  const klDx = x - klCenterX;
  const klDy = y - klCenterY;
  const klDistance = Math.sqrt(klDx * klDx + klDy * klDy);
  
  if (klDistance <= klRadius) {
    const klNormalizedDist = klDistance / klRadius;
    const klIntensity = 5 * (1 - klNormalizedDist * 0.8); // 5 members, fade out
    totalIntensity += Math.max(0, klIntensity);
  }
  
  // Check Kedah region
  const kedahCenterX = KEDAH_REGION.center.x * width;
  const kedahCenterY = KEDAH_REGION.center.y * height;
  const kedahRadius = KEDAH_REGION.radius * Math.min(width, height);
  const kedahDx = x - kedahCenterX;
  const kedahDy = y - kedahCenterY;
  const kedahDistance = Math.sqrt(kedahDx * kedahDx + kedahDy * kedahDy);
  
  if (kedahDistance <= kedahRadius) {
    const kedahNormalizedDist = kedahDistance / kedahRadius;
    const kedahIntensity = 1 * (1 - kedahNormalizedDist * 0.7); // 1 member, fade out
    totalIntensity += Math.max(0, kedahIntensity);
  }
  
  return totalIntensity;
}

// Member data with names for avatar generation
const KUALA_LUMPUR_MEMBERS = [
  { name: 'Member 1', id: 1 },
  { name: 'Member 2', id: 2 },
  { name: 'Member 3', id: 3 },
  { name: 'Member 4', id: 4 },
  { name: 'Member 5', id: 5 },
];

const KEDAH_MEMBERS = [
  { name: 'Member 1', id: 6 },
];

// Generate avatar URL using ui-avatars.com
function getAvatarUrl(name: string, size: number = 64): string {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=3b82f6&color=fff&bold=true`;
}

// Load member images
function loadMemberImages(members: { name: string; id: number }[]): Promise<HTMLImageElement[]> {
  if (typeof document === 'undefined') {
    return Promise.resolve([]);
  }
  
  const promises: Promise<HTMLImageElement>[] = members.map((member) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Enable CORS for external images
      img.onload = () => resolve(img);
      img.onerror = () => {
        // Fallback to placeholder if image fails
        const placeholder = createPlaceholderImage(64);
        const fallbackImg = new Image();
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.src = placeholder;
      };
      img.src = getAvatarUrl(member.name, 64);
    });
  });
  
  return Promise.all(promises);
}

// Create placeholder image data URL
function createPlaceholderImage(size: number = 32): string {
  if (typeof document === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Draw a simple avatar placeholder with gradient
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, '#3b82f6'); // Blue center
  gradient.addColorStop(1, '#1e40af'); // Darker blue edge
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw a simple person icon
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2 - 4, size / 5, 0, Math.PI * 2); // Head
  ctx.fill();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2 + 6, size / 3.5, Math.PI, 0, false); // Body
  ctx.fill();
  
  return canvas.toDataURL();
}


// Render member pin with image - classic map pin shape with pointy bottom
function renderMemberPin(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  image: HTMLImageElement | null,
  pinSize: number = 40,
  index: number = 0
) {
  ctx.save();
  ctx.translate(x, y);
  
  const pinHeadRadius = pinSize * 0.4; // Radius of the circular head
  const pinPointLength = pinSize * 0.35; // Length of the pointy bottom
  const pinPointWidth = pinSize * 0.15; // Width of the pointy bottom at the base
  
  // Draw pin shadow (offset to the right and down)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.moveTo(2, pinHeadRadius + 2);
  ctx.lineTo(pinPointWidth / 2 + 2, pinHeadRadius + 2);
  ctx.lineTo(2, pinHeadRadius + pinPointLength + 2);
  ctx.closePath();
  ctx.fill();
  
  // Draw the pointy bottom part of the pin
  ctx.fillStyle = '#dc2626'; // Red pin color
  ctx.beginPath();
  ctx.moveTo(0, pinHeadRadius);
  ctx.lineTo(-pinPointWidth / 2, pinHeadRadius);
  ctx.lineTo(0, pinHeadRadius + pinPointLength);
  ctx.lineTo(pinPointWidth / 2, pinHeadRadius);
  ctx.closePath();
  ctx.fill();
  
  // Draw pin head circle background (white)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, pinHeadRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw pin head border
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw member image inside the pin head
  if (image && image.complete) {
    const imageSize = pinHeadRadius * 1.4;
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, pinHeadRadius * 0.85, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(image, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
    ctx.restore();
  } else {
    // Fallback: draw placeholder circle
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(0, 0, pinHeadRadius * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw a small highlight on the pin head for 3D effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.arc(-pinHeadRadius * 0.3, -pinHeadRadius * 0.3, pinHeadRadius * 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

// Render grouped member pins in a cluster
function renderGroupedMemberPins(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  images: HTMLImageElement[],
  pinSize: number = 40,
  offsetX: number = 0,
  offsetY: number = 0
) {
  const groupX = centerX + offsetX;
  const groupY = centerY + offsetY;
  
  // Arrange pins in a circular/arc pattern when grouped
  const angleStep = (Math.PI * 2) / images.length;
  const radius = pinSize * 0.6; // Distance from center
  
  images.forEach((image, index) => {
    // For small groups, arrange in a tighter cluster
    let pinX, pinY;
    if (images.length <= 3) {
      // Small cluster: arrange in a tight triangle or line
      const spacing = pinSize * 0.8;
      if (images.length === 1) {
        pinX = groupX;
        pinY = groupY;
      } else if (images.length === 2) {
        pinX = groupX + (index === 0 ? -spacing / 2 : spacing / 2);
        pinY = groupY;
      } else {
        // Triangle arrangement
        const angle = (index * Math.PI * 2) / 3 - Math.PI / 2;
        pinX = groupX + Math.cos(angle) * radius;
        pinY = groupY + Math.sin(angle) * radius;
      }
    } else {
      // Larger group: arrange in a circle
      const angle = index * angleStep - Math.PI / 2; // Start from top
      pinX = groupX + Math.cos(angle) * radius;
      pinY = groupY + Math.sin(angle) * radius;
    }
    
    renderMemberPin(ctx, pinX, pinY, image, pinSize, index);
  });
}

export default function MalaysiaHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgImageRef = useRef<HTMLImageElement | null>(null);
  const klMemberImagesRef = useRef<HTMLImageElement[]>([]);
  const kedahMemberImagesRef = useRef<HTMLImageElement[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1200 });
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load SVG image and member images
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      svgImageRef.current = img;
      setSvgLoaded(true);
    };
    img.onerror = () => {
      console.warn('Failed to load Malaysia SVG');
      setSvgLoaded(true); // Still mark as loaded to proceed with fallback
    };
    img.src = '/malaysia-map.svg';
    
    // Also load via the utility function
    loadMalaysiaSVG().catch(console.error);
    
    // Load member images
    Promise.all([
      loadMemberImages(KUALA_LUMPUR_MEMBERS),
      loadMemberImages(KEDAH_MEMBERS)
    ]).then(([klImages, kedahImages]) => {
      klMemberImagesRef.current = klImages;
      kedahMemberImagesRef.current = kedahImages;
      setImagesLoaded(true);
    }).catch(console.error);
  }, []);

  // Handle responsive sizing - fit screen without scrolling
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        // Get available viewport space
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Account for padding and UI elements (back button, etc.)
        const padding = 80; // Top and bottom padding
        const availableHeight = viewportHeight - padding;
        const availableWidth = viewportWidth - 64; // Side padding
        
        // SVG aspect ratio
        const svgAspectRatio = svgImageRef.current 
          ? svgImageRef.current.width / svgImageRef.current.height
          : 1317.8705 / 1561.5887; // Fallback aspect ratio
        
        // Calculate dimensions that fit both width and height
        const widthByHeight = availableHeight * svgAspectRatio;
        const heightByWidth = availableWidth / svgAspectRatio;
        
        // Use the smaller dimension to ensure it fits
        let width, height;
        if (widthByHeight <= availableWidth) {
          // Constrained by height
          height = availableHeight;
          width = widthByHeight;
        } else {
          // Constrained by width
          width = availableWidth;
          height = heightByWidth;
        }
        
        // Ensure minimum size
        width = Math.max(width, 400);
        height = Math.max(height, 300);
        
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [svgLoaded]);

  // Draw Malaysia map with heatmap
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas with dark background
    ctx.fillStyle = '#0a0a0a'; // Very dark background
    ctx.fillRect(0, 0, width, height);

    // Create a temporary canvas to process SVG
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return;
    
    // Draw SVG image if loaded
    if (svgImageRef.current && svgLoaded) {
      // Draw the SVG map to temp canvas
      tempCtx.drawImage(svgImageRef.current, 0, 0, width, height);
      
      // Get image data once
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Process pixels: create Malaysia mask and base color
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // If pixel is part of Malaysia (white/grey, not black)
        if (a > 0 && (r > 50 || g > 50 || b > 50)) {
          // Set base color for Malaysia (dark grey-blue)
          data[i] = 30;     // R
          data[i + 1] = 40;  // G
          data[i + 2] = 50;  // B
          data[i + 3] = 255; // A
        } else {
          // Keep background black
          data[i] = 10;
          data[i + 1] = 10;
          data[i + 2] = 10;
          data[i + 3] = 255;
        }
      }
      
      tempCtx.putImageData(imageData, 0, 0);
      
      // Draw processed SVG to main canvas
      ctx.drawImage(tempCanvas, 0, 0);
    } else {
      // Fallback: draw simple outline if SVG not loaded
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(width * 0.1, height * 0.1, width * 0.25, height * 0.8);
      ctx.strokeRect(width * 0.1, height * 0.1, width * 0.25, height * 0.8);
      ctx.fillRect(width * 0.4, height * 0.2, width * 0.55, height * 0.7);
      ctx.strokeRect(width * 0.4, height * 0.2, width * 0.55, height * 0.7);
    }

    // Heatmap overlay removed - no red/orange glowing effects

    // Heatmap gradients removed - no glowing effects

    // Draw grouped member pins
    const pinSize = Math.max(35, Math.min(width, height) / 35);
    const klCenterX = KUALA_LUMPUR_REGION.center.x * width;
    const klCenterY = KUALA_LUMPUR_REGION.center.y * height;
    
    // Draw 5 grouped pins for Kuala Lumpur - 25px southeast
    renderGroupedMemberPins(
      ctx,
      klCenterX,
      klCenterY,
      klMemberImagesRef.current,
      pinSize,
      25, // 25px east (right)
      25  // 25px south (down)
    );
    
    // Draw 1 pin for Kedah - 25px southeast
    const kedahCenterX = KEDAH_REGION.center.x * width;
    const kedahCenterY = KEDAH_REGION.center.y * height;
    renderGroupedMemberPins(
      ctx,
      kedahCenterX,
      kedahCenterY,
      kedahMemberImagesRef.current,
      pinSize,
      25, // 25px east
      25  // 25px south
    );

    // Draw member count labels
    const fontSize = Math.max(14, width / 60);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const mapSize = Math.min(width, height);

    // Kuala Lumpur label - moved 20px south-east (down and right)
    const klX = KUALA_LUMPUR_REGION.center.x * width + 20;
    const klY = KUALA_LUMPUR_REGION.center.y * height - (KUALA_LUMPUR_REGION.radius * mapSize + 10);
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeText('5 active members here', klX, klY);
    ctx.fillText('5 active members here', klX, klY);

    // Kedah label
    const kedahX = KEDAH_REGION.center.x * width;
    const kedahY = KEDAH_REGION.center.y * height - (KEDAH_REGION.radius * mapSize + 30);
    ctx.strokeText('1 active member here', kedahX, kedahY);
    ctx.fillText('1 active member here', kedahX, kedahY);
  }, [dimensions, svgLoaded, imagesLoaded]);

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        className="block border-4 border-gray-700 shadow-2xl"
        style={{
          imageRendering: 'auto', // Smooth rendering for heatmap
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
        }}
      />
    </div>
  );
}
