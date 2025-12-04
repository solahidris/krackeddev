"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';

interface JoystickProps {
  onDirectionChange: (dir: string | null) => void;
}

export const Joystick: React.FC<JoystickProps> = ({ onDirectionChange }) => {
  const [activeDir, setActiveDir] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const JOYSTICK_SIZE = 120;
  const KNOB_SIZE = 52.5;
  const DEAD_ZONE = 18.75;

  const getDirection = useCallback((x: number, y: number): string | null => {
    const distance = Math.sqrt(x * x + y * y);
    if (distance < DEAD_ZONE) {
      return null;
    }

    const angle = Math.atan2(y, x) * (180 / Math.PI);
    
    // Normalize angle to 0-360
    const normalizedAngle = (angle + 360) % 360;

    // Determine direction based on angle
    if (normalizedAngle >= 315 || normalizedAngle < 45) {
      return 'right';
    } else if (normalizedAngle >= 45 && normalizedAngle < 135) {
      return 'down';
    } else if (normalizedAngle >= 135 && normalizedAngle < 225) {
      return 'left';
    } else {
      return 'up';
    }
  }, []);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let x = clientX - centerX;
    let y = clientY - centerY;

    // Limit to joystick bounds
    const maxDistance = (JOYSTICK_SIZE - KNOB_SIZE) / 2;
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance > maxDistance) {
      x = (x / distance) * maxDistance;
      y = (y / distance) * maxDistance;
    }

    setPosition({ x, y });

    const dir = getDirection(x, y);
    if (dir !== activeDir) {
      setActiveDir(dir);
      onDirectionChange(dir);
    }
  }, [activeDir, getDirection, onDirectionChange]);

  // Reset position smoothly when released
  const resetPosition = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setActiveDir(null);
    onDirectionChange(null);
  }, [onDirectionChange]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    updatePosition(clientX, clientY);
  }, [updatePosition]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (isDragging) {
      updatePosition(clientX, clientY);
    }
  }, [isDragging, updatePosition]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    // Smoothly return to center
    resetPosition();
  }, [resetPosition]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [isDragging, handleMove]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  // Mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <div
      ref={joystickRef}
      className="relative rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/30"
      style={{
        width: JOYSTICK_SIZE,
        height: JOYSTICK_SIZE,
        touchAction: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={knobRef}
        className={`absolute rounded-full ${
          isDragging ? 'bg-blue-500/90' : 'bg-white/40'
        }`}
        style={{
          width: KNOB_SIZE,
          height: KNOB_SIZE,
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      />
    </div>
  );
};

