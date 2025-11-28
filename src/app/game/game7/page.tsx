'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Code2, Gamepad2 } from 'lucide-react';

// Game dimensions (matching pixel art aspect ratio 2816:1536 ≈ 1.83:1)
const GAME_WIDTH = 880;
const GAME_HEIGHT = 480;

// Colors for player
const COLORS = {
  background: 0x1a2634,
  player: 0x00ffcc,
  playerGlow: 0x00ffcc,
};

// Player settings
const PLAYER_SIZE = 20;
const PLAYER_SPEED = 180;

export default function Game7Page() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Dynamic import of Phaser to avoid SSR issues
    const initGame = async () => {
      const Phaser = (await import('phaser')).default;

      // Prevent multiple game instances
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
      }

      // PlaygroundScene class
      class PlaygroundScene extends Phaser.Scene {
        private player!: Phaser.GameObjects.Rectangle;
        private playerGlow!: Phaser.GameObjects.Rectangle;
        private cursors!: {
          W: Phaser.Input.Keyboard.Key;
          A: Phaser.Input.Keyboard.Key;
          S: Phaser.Input.Keyboard.Key;
          D: Phaser.Input.Keyboard.Key;
        };

        constructor() {
          super({ key: 'PlaygroundScene' });
        }

        preload() {
          // Load the pixel art playground background
          this.load.image('playground-bg', '/playground-bg.png');
        }

        create() {
          // Add background image centered
          const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'playground-bg');
          bg.setOrigin(0.5, 0.5);
          bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

          // Create player with glow effect
          this.createPlayer();

          // Setup WASD controls
          this.setupControls();

          // Instructions text with background for visibility
          const instructionsBg = this.add.rectangle(
            GAME_WIDTH / 2,
            GAME_HEIGHT - 25,
            200,
            24,
            0x000000,
            0.6
          );
          instructionsBg.setStrokeStyle(1, 0x00ffcc, 0.5);
          
          this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 25, 'Use WASD to move', {
            fontSize: '12px',
            color: '#00ffcc',
            fontFamily: 'monospace',
          }).setOrigin(0.5);
        }

        private createPlayer() {
          const centerX = GAME_WIDTH / 2;
          const centerY = GAME_HEIGHT / 2;

          // Glow effect (larger, more transparent rectangle behind player)
          this.playerGlow = this.add.rectangle(
            centerX,
            centerY,
            PLAYER_SIZE + 10,
            PLAYER_SIZE + 10,
            COLORS.playerGlow,
            0.25
          );

          // Main player rectangle
          this.player = this.add.rectangle(
            centerX,
            centerY,
            PLAYER_SIZE,
            PLAYER_SIZE,
            COLORS.player,
            1
          );
          
          // Add border to player for visibility
          this.player.setStrokeStyle(2, 0xffffff, 0.8);

          // Add slight pulsing animation to glow
          this.tweens.add({
            targets: this.playerGlow,
            alpha: { from: 0.25, to: 0.5 },
            scaleX: { from: 1, to: 1.15 },
            scaleY: { from: 1, to: 1.15 },
            duration: 600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
          });
        }

        private setupControls() {
          if (!this.input.keyboard) return;

          this.cursors = {
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
          };
        }

        update(_time: number, delta: number) {
          if (!this.cursors || !this.player) return;

          const speed = PLAYER_SPEED * (delta / 1000);
          let dx = 0;
          let dy = 0;

          // Read WASD input
          if (this.cursors.W.isDown) dy -= speed;
          if (this.cursors.S.isDown) dy += speed;
          if (this.cursors.A.isDown) dx -= speed;
          if (this.cursors.D.isDown) dx += speed;

          // Normalize diagonal movement
          if (dx !== 0 && dy !== 0) {
            const factor = 1 / Math.sqrt(2);
            dx *= factor;
            dy *= factor;
          }

          // Apply movement
          this.player.x += dx;
          this.player.y += dy;

          // Clamp position within bounds (accounting for player size)
          const halfSize = PLAYER_SIZE / 2;
          const padding = 20;
          this.player.x = Phaser.Math.Clamp(
            this.player.x,
            halfSize + padding,
            GAME_WIDTH - halfSize - padding
          );
          this.player.y = Phaser.Math.Clamp(
            this.player.y,
            halfSize + padding,
            GAME_HEIGHT - halfSize - padding
          );

          // Update glow position to follow player
          this.playerGlow.x = this.player.x;
          this.playerGlow.y = this.player.y;
        }
      }

      // Phaser game configuration
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        parent: gameContainerRef.current!,
        backgroundColor: COLORS.background,
        scene: PlaygroundScene,
        pixelArt: true, // Keep pixel art crisp
        scale: {
          mode: Phaser.Scale.NONE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      // Create the game instance
      gameInstanceRef.current = new Phaser.Game(config);
    };

    initGame();

    // Cleanup on unmount
    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <main className="min-h-screen pb-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="mb-10 md:mb-12 flex items-center justify-between">
          <Link
            href="/game"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>
          <div className="flex items-center gap-2 text-neon-secondary">
            <Code2 className="w-5 h-5" />
            <span className="text-sm">Nabil - Game 7</span>
          </div>
        </div>

        <Card className="mb-10 md:mb-12 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl mb-4 flex items-center justify-center gap-3">
              <Gamepad2 className="w-12 h-12 text-neon-secondary" />
              Retro Playground
            </CardTitle>
            <p className="text-lg text-white/60">
              A simple retro-style playground. Move around with WASD!
            </p>
          </CardHeader>
        </Card>

        <Card className="border-white/10 bg-black/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6 md:p-8 lg:p-10 flex items-center justify-center">
            <div
              ref={gameContainerRef}
              className="flex items-center justify-center rounded-lg overflow-hidden"
              style={{ width: '880px', height: '480px', maxWidth: '100%' }}
            />
          </CardContent>
        </Card>

        <Card className="mt-6 border-white/10 bg-black/40 backdrop-blur-md">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono">W</kbd>
                <span>Up</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono">A</kbd>
                <span>Left</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono">S</kbd>
                <span>Down</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono">D</kbd>
                <span>Right</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
