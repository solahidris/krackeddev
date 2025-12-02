"use client";

import React, { useState, useCallback } from 'react';

interface DPadProps {
  onDirectionChange: (dir: string | null) => void;
}

export const DPad: React.FC<DPadProps> = ({ onDirectionChange }) => {
  const [activeDir, setActiveDir] = useState<string | null>(null);

  const handleDirection = useCallback(
    (dir: string | null) => {
      setActiveDir(dir);
      onDirectionChange(dir);
    },
    [onDirectionChange]
  );

  const buttonClass = (dir: string) =>
    `w-12 h-12 rounded-xl flex items-center justify-center text-xl select-none transition-all touch-none ${
      activeDir === dir
        ? "bg-blue-500/80 scale-95"
        : "bg-white/20 active:bg-blue-500/60"
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
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20" />
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
};



