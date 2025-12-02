"use client";

import React, { useState, useCallback } from 'react';
import { Joystick } from './Joystick';

interface MobileControlsProps {
  onDirectionChange: (dir: string | null) => void;
  onInteract: () => void;
  canInteract: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onDirectionChange,
  onInteract,
  canInteract,
}) => {
  const [interactPressed, setInteractPressed] = useState(false);

  const handleInteract = useCallback(() => {
    setInteractPressed(true);
    onInteract();
    setTimeout(() => setInteractPressed(false), 150);
  }, [onInteract]);

  const buttonClass = (pressed: boolean, enabled: boolean) =>
    `w-20 h-20 rounded-full flex items-center justify-center font-bold select-none transition-all touch-none ${
      enabled
        ? pressed
          ? "bg-green-500 scale-95"
          : "bg-green-500 active:bg-green-600"
        : "bg-green-500 opacity-50"
    }`;

  return (
    <div className="relative z-30 flex items-center justify-between w-full pointer-events-none">
      {/* Joystick - Leftmost */}
      <div className="pointer-events-auto">
        <Joystick onDirectionChange={onDirectionChange} />
      </div>

      {/* Action button - Rightmost */}
      <div className="pointer-events-auto">
        <button
          onClick={handleInteract}
          disabled={!canInteract}
          className={buttonClass(interactPressed, canInteract)}
        >
          <span className="text-white font-mono text-2xl">X</span>
        </button>
      </div>
    </div>
  );
};

