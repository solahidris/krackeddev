"use client";

import React from 'react';

// Malaysian states data (Peninsular Malaysia only)
export const MALAYSIAN_STATES = [
  { id: 'johor', name: 'Johor', code: 'JH' },
  { id: 'kedah', name: 'Kedah', code: 'KH' },
  { id: 'kelantan', name: 'Kelantan', code: 'KN' },
  { id: 'malacca', name: 'Malacca', code: 'MK' },
  { id: 'negeri-sembilan', name: 'Negeri Sembilan', code: 'NS' },
  { id: 'pahang', name: 'Pahang', code: 'PH' },
  { id: 'penang', name: 'Penang', code: 'PG' },
  { id: 'perak', name: 'Perak', code: 'PK' },
  { id: 'perlis', name: 'Perlis', code: 'PL' },
  { id: 'selangor', name: 'Selangor', code: 'SL' },
  { id: 'terengganu', name: 'Terengganu', code: 'TR' },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', code: 'KL' },
  { id: 'putrajaya', name: 'Putrajaya', code: 'PJ' },
] as const;

export type MalaysianState = typeof MALAYSIAN_STATES[number];

// Map file path - Update this to use a complete Malaysia map that includes Sabah and Sarawak
// Current map only shows Peninsular Malaysia
export const MALAYSIA_MAP_PATH = '/malaysia-map.svg';

// State position mapping for highlighting on the map (Peninsular Malaysia only)
export const STATE_POSITIONS: Record<string, { top: string; left: string; width: string; height: string }> = {
  'johor': { top: '75%', left: '50%', width: '15%', height: '20%' },
  'kedah': { top: '15%', left: '20%', width: '12%', height: '15%' },
  'kelantan': { top: '10%', left: '60%', width: '15%', height: '18%' },
  'malacca': { top: '65%', left: '45%', width: '8%', height: '10%' },
  'negeri-sembilan': { top: '60%', left: '40%', width: '12%', height: '15%' },
  'pahang': { top: '35%', left: '50%', width: '20%', height: '35%' },
  'penang': { top: '12%', left: '15%', width: '6%', height: '8%' },
  'perak': { top: '25%', left: '25%', width: '15%', height: '25%' },
  'perlis': { top: '8%', left: '12%', width: '8%', height: '10%' },
  'selangor': { top: '55%', left: '35%', width: '12%', height: '15%' },
  'terengganu': { top: '15%', left: '55%', width: '12%', height: '20%' },
  'kuala-lumpur': { top: '58%', left: '38%', width: '4%', height: '5%' },
  'putrajaya': { top: '60%', left: '40%', width: '3%', height: '4%' },
};

// Helper functions
export const getStateById = (id: string): MalaysianState | undefined => {
  return MALAYSIAN_STATES.find(state => state.id === id);
};

export const getStateByCode = (code: string): MalaysianState | undefined => {
  return MALAYSIAN_STATES.find(state => state.code === code);
};

// Get state position for map highlighting
export const getStatePosition = (stateId: string) => {
  return STATE_POSITIONS[stateId];
};

