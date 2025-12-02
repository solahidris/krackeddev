"use client";

import { useEffect } from 'react';

/**
 * Hook to handle closing dialogs with ESC key (desktop only) or Y button (gamepad button index 3)
 * On mobile, ESC is disabled - only Y button closes dialogs
 * @param isOpen - Whether the dialog is currently open
 * @param onClose - Callback function to close the dialog
 */
export function useDialogClose(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // Check if mobile device
    const isMobile = window.innerWidth < 768;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only listen for ESC on desktop
      if (e.key === 'Escape' && !isMobile) {
        e.preventDefault();
        onClose();
      }
    };

    // Gamepad Y button handler (button index 3)
    let gamepadPollInterval: number | null = null;
    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad && gamepad.buttons[3]?.pressed) {
          onClose();
          break;
        }
      }
    };

    // Listen for keyboard events (only ESC on desktop)
    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Poll for gamepad input (gamepad API doesn't have events for button presses)
    gamepadPollInterval = window.setInterval(checkGamepad, 100);

    // Also listen for gamepad connected events
    const handleGamepadConnected = () => {
      if (gamepadPollInterval === null) {
        gamepadPollInterval = window.setInterval(checkGamepad, 100);
      }
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);

    return () => {
      if (!isMobile) {
        window.removeEventListener('keydown', handleKeyDown);
      }
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      if (gamepadPollInterval !== null) {
        clearInterval(gamepadPollInterval);
      }
    };
  }, [isOpen, onClose]);
}

