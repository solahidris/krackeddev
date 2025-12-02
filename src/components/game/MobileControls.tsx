"use client";

import React, { useState, useCallback } from 'react';
import { Joystick } from './Joystick';
import { GameBoyButtonX } from './GameBoyButtonX';
import { GameBoyButtonY } from './GameBoyButtonY';

interface MobileControlsProps {
  onDirectionChange: (dir: string | null) => void;
  onInteract: () => void;
  canInteract: boolean;
  onClose?: () => void;
  canClose?: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onDirectionChange,
  onInteract,
  canInteract,
  onClose,
  canClose = false,
}) => {
  const [interactPressed, setInteractPressed] = useState(false);
  const [closePressed, setClosePressed] = useState(false);

  const handleInteract = useCallback(() => {
    setInteractPressed(true);
    onInteract();
    setTimeout(() => setInteractPressed(false), 150);
  }, [onInteract]);

  const handleClose = useCallback(() => {
    if (onClose && canClose) {
      setClosePressed(true);
      onClose();
      setTimeout(() => setClosePressed(false), 150);
    }
  }, [onClose, canClose]);

  const buttonClass = (pressed: boolean, enabled: boolean) =>
    `w-20 h-20 rounded-full flex items-center justify-center font-bold select-none transition-all touch-none ${
      enabled
        ? pressed
          ? "bg-green-500 scale-95"
          : "bg-green-500 active:bg-green-600"
        : "bg-green-500 opacity-50"
    }`;

  return (
    <div className="relative flex items-center justify-between w-full pointer-events-none">
      {/* Joystick - Leftmost */}
      <div className="pointer-events-auto">
        <Joystick onDirectionChange={onDirectionChange} />
      </div>

      {/* Action buttons - Right side */}
      <div className="pointer-events-auto flex items-center gap-3">
        {/* Y button for closing dialogs */}
        {onClose && (
          <button
            onClick={handleClose}
            disabled={!canClose}
            className={`${buttonClass(closePressed, canClose)} relative top-4`}
            aria-label="Close dialog (Y button)"
          >
            <span className="text-white font-mono text-2xl font-bold">Y</span>
          </button>
        )}

        {/* X button for interaction */}
        <button
          onClick={handleInteract}
          disabled={!canInteract}
          className={`${buttonClass(interactPressed, canInteract)} relative -top-4`}
          aria-label="Interact (X button)"
        >
          <span className="text-white font-mono text-2xl font-bold">X</span>
        </button>
      </div>
    </div>
  );
};

