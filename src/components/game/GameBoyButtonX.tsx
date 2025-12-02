"use client";

import React from 'react';

interface GameBoyButtonXProps {
  className?: string;
  size?: number;
}

export const GameBoyButtonX: React.FC<GameBoyButtonXProps> = ({ 
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
      {/* Button shadow/depth */}
      <polygon
        points="2,18 10,2 18,18"
        fill="#404040"
        stroke="#000000"
        strokeWidth="0.5"
      />
      {/* Button main color */}
      <polygon
        points="3,16 10,4 17,16"
        fill="#808080"
        stroke="#000000"
        strokeWidth="0.5"
      />
      {/* Highlight */}
      <polygon
        points="4,14 10,6 14,14"
        fill="#a0a0a0"
        opacity="0.6"
      />
      {/* Dark edge for depth */}
      <line
        x1="10"
        y1="4"
        x2="3"
        y2="16"
        stroke="#404040"
        strokeWidth="1"
      />
    </svg>
  );
};

