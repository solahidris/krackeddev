"use client";

import React from 'react';

interface GameBoyButtonYProps {
  className?: string;
  size?: number;
}

export const GameBoyButtonY: React.FC<GameBoyButtonYProps> = ({ 
  className = '', 
  size = 20 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={className}
      style={{ imageRendering: 'pixelated' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Button shadow/depth - inverted triangle pointing down */}
      <polygon
        points="2,2 10,18 18,2"
        fill="#404040"
        stroke="#000000"
        strokeWidth="0.5"
      />
      {/* Button main color */}
      <polygon
        points="3,4 10,16 17,4"
        fill="#808080"
        stroke="#000000"
        strokeWidth="0.5"
      />
      {/* Highlight */}
      <polygon
        points="4,6 10,14 16,6"
        fill="#a0a0a0"
        opacity="0.6"
      />
      {/* Dark edge for depth */}
      <line
        x1="10"
        y1="16"
        x2="3"
        y2="4"
        stroke="#404040"
        strokeWidth="1"
      />
    </svg>
  );
};

