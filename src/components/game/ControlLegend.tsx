"use client";

import React from 'react';

interface ControlLegendProps {
  isMobile: boolean;
}

export const ControlLegend: React.FC<ControlLegendProps> = ({ isMobile }) => {
  if (isMobile) {
    return null;
  }

  return (
    <div className="bg-black/70 border-2 border-yellow-400 p-3 rounded">
      <div className="space-y-1">
        <p className="text-yellow-400 text-xs font-mono">
          <span className="text-white font-bold">WASD</span> - Move
        </p>
        <p className="text-yellow-400 text-xs font-mono">
          <span className="text-white font-bold">SPACE</span> - Action
        </p>
      </div>
    </div>
  );
};

