"use client";

import React, { useState } from 'react';
import { 
  MALAYSIAN_STATES, 
  MalaysianState, 
  getStateById,
  MALAYSIA_MAP_PATH,
  STATE_POSITIONS,
  getStatePosition
} from '@/desktop/states-malaysia';

interface StatesProps {
  onStateSelect?: (state: MalaysianState) => void;
}

export const States: React.FC<StatesProps> = ({ onStateSelect }) => {
  const [selectedState, setSelectedState] = useState<MalaysianState | null>(null);

  const handleStateClick = (state: MalaysianState) => {
    setSelectedState(state);
    onStateSelect?.(state);
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-4 pt-20 flex flex-col overflow-hidden">
      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Left Side - Map Image */}
        <div className="flex-1 flex flex-col bg-gray-800 rounded-lg border border-gray-700 p-3 overflow-hidden min-w-0">
          {/* Map Container */}
          <div className="flex-1 flex flex-col min-h-0">
            <h2 className="text-lg font-semibold text-yellow-300 mb-2 flex-shrink-0">
              Malaysia Map
              {selectedState && (
                <span className="ml-2 text-sm text-yellow-400">- {selectedState.name}</span>
              )}
            </h2>
            <div className="bg-gray-900 rounded-lg p-2 border border-gray-700 flex items-center justify-center flex-1 min-h-0 relative">
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={MALAYSIA_MAP_PATH} 
                  alt="Malaysia Map" 
                  className="w-full h-full object-contain"
                />
                {/* State-specific Highlight Overlay - positioned relative to SVG */}
                {selectedState && STATE_POSITIONS[selectedState.id] && (
                  <div 
                    className="absolute pointer-events-none z-50"
                    style={{
                      top: STATE_POSITIONS[selectedState.id].top,
                      left: STATE_POSITIONS[selectedState.id].left,
                      width: STATE_POSITIONS[selectedState.id].width,
                      height: STATE_POSITIONS[selectedState.id].height,
                      transform: 'translate(calc(-50% + 25px), calc(-50% + 100px))',
                    }}
                  >
                    <div className="w-full h-full bg-yellow-400/30 border-2 border-yellow-400 rounded-lg animate-pulse shadow-[0_0_20px_rgba(234,179,8,0.6)]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - States List */}
        <div className="lg:w-80 flex flex-col bg-gray-800 rounded-lg border border-gray-700 p-3 overflow-hidden min-w-0">
          <h2 className="text-lg font-semibold text-yellow-300 mb-3 flex-shrink-0">States</h2>

          {/* States List - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="space-y-1.5">
              {MALAYSIAN_STATES.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleStateClick(state)}
                  className={`w-full p-2 rounded-lg border-2 transition-all text-left ${
                    selectedState?.id === state.id
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                  }`}
                >
                  <h3 className="text-sm font-semibold text-yellow-300 mb-0.5">
                    {state.name}
                  </h3>
                  <p className="text-xs text-gray-400">Code: {state.code}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
