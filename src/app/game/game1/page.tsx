/**
 * 3D Open World Game - Learning Platform with Token System
 *
 * INSTALLATION INSTRUCTIONS:
 * Run the following commands in your terminal:
 * npm install three @react-three/fiber @react-three/cannon @react-three/drei @types/three
 *
 * CONTROLS:
 * - W/A/S/D or Arrow Keys: Move stickman
 * - Collect money bags to earn tokens
 */

/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="@react-three/fiber" />

"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { Sky, Text } from "@react-three/drei";
import * as THREE from "three";
import { ArrowLeft, Gamepad2 } from "lucide-react";

// ============================================================================
// GAME STATE CONTEXT - Token system and game state management
// ============================================================================
interface GameContextType {
  tokens: number;
  addTokens: (amount: number) => void;
  collectedIds: Set<string>;
  collectItem: (id: string) => void;
  playerPosition: React.MutableRefObject<[number, number, number]>;
}

const GameContext = React.createContext<GameContextType | null>(null);

// ============================================================================
// GROUND COMPONENT - The open world terrain with grass texture
// ============================================================================
function Ground() {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static",
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#2d5a27" />
    </mesh>
  );
}

// ============================================================================
// STICKMAN COMPONENT - Animated walking character
// ============================================================================
function Stickman({
  isWalking,
  direction,
}: {
  isWalking: boolean;
  direction: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  // Walking animation
  useFrame((state) => {
    if (isWalking) {
      const time = state.clock.elapsedTime * 10;
      // Leg swing
      if (leftLegRef.current)
        leftLegRef.current.rotation.x = Math.sin(time) * 0.5;
      if (rightLegRef.current)
        rightLegRef.current.rotation.x = Math.sin(time + Math.PI) * 0.5;
      // Arm swing (opposite to legs)
      if (leftArmRef.current)
        leftArmRef.current.rotation.x = Math.sin(time + Math.PI) * 0.4;
      if (rightArmRef.current)
        rightArmRef.current.rotation.x = Math.sin(time) * 0.4;
    } else {
      // Reset to standing pose
      if (leftLegRef.current) leftLegRef.current.rotation.x *= 0.9;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 0.9;
      if (leftArmRef.current) leftArmRef.current.rotation.x *= 0.9;
      if (rightArmRef.current) rightArmRef.current.rotation.x *= 0.9;
    }
    // Face direction of movement
    if (groupRef.current && direction !== 0) {
      groupRef.current.rotation.y = direction;
    }
  });

  const bodyColor = "#1a1a2e";
  const skinColor = "#ffd5b4";

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      {/* Left Arm */}
      <group position={[-0.25, 1.3, 0]}>
        <mesh ref={leftArmRef} position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.25, 1.3, 0]}>
        <mesh ref={rightArmRef} position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group position={[-0.1, 0.6, 0]}>
        <mesh ref={leftLegRef} position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.1, 0.6, 0]}>
        <mesh ref={rightLegRef} position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// PLAYER COMPONENT - Controllable stickman with physics
// ============================================================================
function Player() {
  const context = React.useContext(GameContext);
  const [ref, api] = useBox<THREE.Group>(() => ({
    mass: 1,
    position: [0, 2, 0],
    args: [0.5, 2, 0.5],
    linearDamping: 0.95,
    angularDamping: 0.99,
    fixedRotation: true,
  }));

  const velocity = useRef([0, 0, 0]);
  const position = useRef<[number, number, number]>([0, 2, 0]);
  const keys = useRef({ w: false, a: false, s: false, d: false, space: false });
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState(0);
  const canJump = useRef(true);

  useEffect(() => {
    const unsubVel = api.velocity.subscribe(
      (v: number[]) => (velocity.current = v)
    );
    const unsubPos = api.position.subscribe((p: number[]) => {
      position.current = p as [number, number, number];
      if (context)
        context.playerPosition.current = p as [number, number, number];
      // Allow jumping when close to ground
      canJump.current = p[1] < 2.5;
    });
    return () => {
      unsubVel();
      unsubPos();
    };
  }, [api.velocity, api.position, context]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // Prevent arrow keys and space from scrolling the page
      if (
        ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)
      ) {
        e.preventDefault();
      }
      if (key === "w" || key === "arrowup") keys.current.w = true;
      if (key === "a" || key === "arrowleft") keys.current.a = true;
      if (key === "s" || key === "arrowdown") keys.current.s = true;
      if (key === "d" || key === "arrowright") keys.current.d = true;
      if (key === " ") keys.current.space = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // Prevent arrow keys and space from scrolling the page
      if (
        ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)
      ) {
        e.preventDefault();
      }
      if (key === "w" || key === "arrowup") keys.current.w = false;
      if (key === "a" || key === "arrowleft") keys.current.a = false;
      if (key === "s" || key === "arrowdown") keys.current.s = false;
      if (key === "d" || key === "arrowright") keys.current.d = false;
      if (key === " ") keys.current.space = false;
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const speed = 60;
    const jumpForce = 15;
    let vx = 0,
      vz = 0;
    let vy = velocity.current[1];

    if (keys.current.w) vz -= speed;
    if (keys.current.s) vz += speed;
    if (keys.current.a) vx -= speed;
    if (keys.current.d) vx += speed;

    // Jump when space is pressed and player is on ground
    if (keys.current.space && canJump.current) {
      vy = jumpForce;
      canJump.current = false;
    }

    const moving = vx !== 0 || vz !== 0;
    setIsWalking(moving);

    if (moving) {
      setDirection(Math.atan2(vx, -vz));
    }

    api.velocity.set(vx, vy, vz);
  });

  return (
    <group ref={ref}>
      <Stickman isWalking={isWalking} direction={direction} />
    </group>
  );
}

// ============================================================================
// RINGGIT BILL COLORS - Different colors for each denomination
// ============================================================================
const BILL_CONFIG: Record<
  number,
  { color: string; darkColor: string; glowColor: string }
> = {
  1: { color: "#1E90FF", darkColor: "#0066CC", glowColor: "#4169E1" }, // Blue - RM1
  5: { color: "#32CD32", darkColor: "#228B22", glowColor: "#00FF00" }, // Green - RM5
  10: { color: "#FF4500", darkColor: "#CC3700", glowColor: "#FF6347" }, // Red - RM10
  20: { color: "#FFD700", darkColor: "#DAA520", glowColor: "#FFFF00" }, // Yellow/Gold - RM20
  50: { color: "#00CED1", darkColor: "#008B8B", glowColor: "#40E0D0" }, // Cyan/Teal - RM50
  100: { color: "#9932CC", darkColor: "#7B1FA2", glowColor: "#DA70D6" }, // Purple - RM100
};

// ============================================================================
// RINGGIT BILL COLLECTIBLE - Paper money that gives tokens
// ============================================================================
function RinggitBill({
  id,
  position,
  denomination,
}: {
  id: string;
  position: [number, number, number];
  denomination: number;
}) {
  const context = React.useContext(GameContext);
  const [collected, setCollected] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const config = BILL_CONFIG[denomination] || BILL_CONFIG[1];

  const [ref] = useBox<THREE.Group>(() => ({
    args: [2.5, 1.5, 0.5],
    position,
    type: "Static",
    isTrigger: true,
    onCollide: () => {
      if (!collected && context && !context.collectedIds.has(id)) {
        setCollected(true);
        context.collectItem(id);
        context.addTokens(denomination);
      }
    },
  }));

  useFrame((state: { clock: { elapsedTime: number } }) => {
    if (groupRef.current && !collected) {
      // Gentle spinning and floating animation
      groupRef.current.rotation.y += 0.02;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  if (collected) return null;

  return (
    <group ref={ref}>
      <group ref={groupRef}>
        {/* Paper bill - front face */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <planeGeometry args={[2.4, 1.2]} />
          <meshStandardMaterial color={config.color} side={THREE.DoubleSide} />
        </mesh>

        {/* Paper bill - back face */}
        <mesh position={[0, 0, -0.02]} castShadow>
          <planeGeometry args={[2.4, 1.2]} />
          <meshStandardMaterial
            color={config.darkColor}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Bill edge/thickness */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.4, 1.2, 0.04]} />
          <meshStandardMaterial color={config.darkColor} />
        </mesh>

        {/* RM Text - Front */}
        <Text
          position={[0, 0.15, 0.05]}
          fontSize={0.35}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font={undefined}
          outlineWidth={0.02}
          outlineColor={config.darkColor}
        >
          RM{denomination}
        </Text>

        {/* Malaysia Text - Front */}
        <Text
          position={[0, -0.25, 0.05]}
          fontSize={0.15}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          MALAYSIA
        </Text>

        {/* RM Text - Back */}
        <Text
          position={[0, 0, -0.05]}
          fontSize={0.4}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
          font={undefined}
          outlineWidth={0.02}
          outlineColor={config.darkColor}
        >
          RM{denomination}
        </Text>

        {/* Glow effect */}
        <pointLight
          position={[0, 0, 0]}
          intensity={1}
          color={config.glowColor}
          distance={5}
        />
      </group>
    </group>
  );
}

// ============================================================================
// CAMERA CONTROLLER - Follow the player
// ============================================================================
function CameraController() {
  const { camera } = useThree();
  const context = React.useContext(GameContext);

  useFrame(() => {
    if (context?.playerPosition.current) {
      const [px, , pz] = context.playerPosition.current;
      // Smooth camera follow
      camera.position.x += (px - camera.position.x) * 0.05;
      camera.position.z += (pz + 15 - camera.position.z) * 0.05;
      camera.position.y = 12;
      camera.lookAt(px, 0, pz);
    }
  });

  useEffect(() => {
    camera.position.set(0, 12, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

// ============================================================================
// GENERATE BILL POSITIONS - 100 bills spread across the map
// ============================================================================
const DENOMINATIONS = [1, 5, 10, 20, 50, 100];

function generateBills(): Array<{
  position: [number, number, number];
  denomination: number;
}> {
  const bills: Array<{
    position: [number, number, number];
    denomination: number;
  }> = [];
  const gridSize = 5; // 5x5 grid = 25 bills (reduced for performance)
  const spacing = 12;
  const offset = (gridSize * spacing) / 2;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Add some randomness to positions
      const x = i * spacing - offset + (Math.random() - 0.5) * 6;
      const z = j * spacing - offset + (Math.random() - 0.5) * 6;
      const y = 1.5 + Math.random() * 0.5;

      // Weighted denomination selection (more low value, fewer high value)
      const rand = Math.random();
      let denomination: number;
      if (rand < 0.35) denomination = 1; // 35% RM1
      else if (rand < 0.55) denomination = 5; // 20% RM5
      else if (rand < 0.7) denomination = 10; // 15% RM10
      else if (rand < 0.82) denomination = 20; // 12% RM20
      else if (rand < 0.92) denomination = 50; // 10% RM50
      else denomination = 100; // 8% RM100

      bills.push({ position: [x, y, z], denomination });
    }
  }
  return bills;
}

// Pre-generate bills (stable across renders)
const GENERATED_BILLS = generateBills();

// ============================================================================
// 3D SCENE - Main game world
// ============================================================================
function GameScene() {
  return (
    <Physics gravity={[0, -30, 0]}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <hemisphereLight intensity={0.3} color="#87CEEB" groundColor="#2d5a27" />
      <CameraController />
      <Ground />
      <Player />
      {GENERATED_BILLS.map((bill, i) => (
        <RinggitBill
          key={i}
          id={`bill-${i}`}
          position={bill.position}
          denomination={bill.denomination}
        />
      ))}
    </Physics>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function Game1Page() {
  const [tokens, setTokens] = useState(0);
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());
  const playerPosition = useRef<[number, number, number]>([0, 2, 0]);

  const addTokens = (amount: number) => setTokens((prev) => prev + amount);
  const collectItem = (id: string) =>
    setCollectedIds((prev) => new Set(prev).add(id));

  return (
    <GameContext.Provider
      value={{ tokens, addTokens, collectedIds, collectItem, playerPosition }}
    >
      {/* Fixed full-screen container that covers navbar/footer */}
      <div className="fixed inset-0 z-50 bg-linear-to-b from-gray-900 to-black flex flex-col p-4 md:p-6">
        {/* Header - Back button and centered title */}
        <header className="relative flex items-center justify-between mb-4">
          <Link
            href="/game"
            className="flex items-center gap-2 text-zinc-50/70 hover:text-zinc-50 transition-colors z-10"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Games</span>
          </Link>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-bold text-zinc-50 whitespace-nowrap">
            💰 Money Runner
          </h1>

          {/* Invisible spacer for flex alignment */}
          <div className="w-[120px]" />
        </header>

        {/* Game Container - Takes remaining space with padding */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full h-full max-w-[95%] max-h-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50">
            {/* 3D Canvas */}
            <Canvas shadows camera={{ fov: 60 }} className="bg-black">
              <Suspense fallback={null}>
                <GameScene />
              </Suspense>
            </Canvas>

            {/* In-Game UI Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Money Counter - Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-2 text-zinc-600 bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm border border-green-700/30">
                <span className="font-bold text-2xl">RM {tokens}</span>
              </div>

              {/* Controls Hint - Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                <p className="text-zinc-50/60 text-xs">
                  <span className="text-cyan-400 font-mono">WASD</span> move ·{" "}
                  <span className="text-cyan-400 font-mono">SPACE</span> jump
                </p>
              </div>

              {/* Restart Button - Bottom Right */}
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="absolute bottom-4 right-4 pointer-events-auto bg-white/10 hover:bg-white/20 text-zinc-50/70 hover:text-zinc-50 text-sm font-medium py-2 px-4 rounded-xl transition-colors border border-white/10"
              >
                Restart
              </button>

              {/* Bills Collected Counter - Top Left */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                <p className="text-zinc-50/80 text-sm font-medium">
                  💵 {collectedIds.size} / 25 bills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}
