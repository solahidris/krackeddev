import * as Phaser from "phaser";
import { RunnerPlayer } from "./entities/RunnerPlayer";

interface Obstacle extends Phaser.Physics.Arcade.Sprite {
  obstacleType: string;
}

interface Pickup extends Phaser.Physics.Arcade.Sprite {
  pickupType: string;
  value: number;
}

export class RunnerScene extends Phaser.Scene {
  private player!: RunnerPlayer;
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private pickups!: Phaser.Physics.Arcade.Group;

  private score = 0;
  private distance = 0;
  private featuresShipped = 0;
  private sprintDay = 1;

  private gameSpeed = 200;
  private baseSpeed = 200;
  private maxSpeed = 450;
  private speedIncrement = 8;

  private obstacleTimer?: Phaser.Time.TimerEvent;
  private pickupTimer?: Phaser.Time.TimerEvent;
  private dayTimer?: Phaser.Time.TimerEvent;

  private isGameOver = false;
  private hasStarted = false;
  private jumpKeyHeld = false;

  private scoreText!: Phaser.GameObjects.Text;
  private dayText!: Phaser.GameObjects.Text;
  private featuresText!: Phaser.GameObjects.Text;
  private startText!: Phaser.GameObjects.Text;
  private gameOverContainer!: Phaser.GameObjects.Container;
  
  private backgroundLayers: { sprite: Phaser.GameObjects.TileSprite; speedFactor: number }[] = [];

  private obstacleNames = ["Legacy Bug", "Merge Conflict", "Prod Incident", "Tech Debt"];
  private pickupNames = ["PR Merged", "Feature Shipped", "Offer Letter", "Code Review"];
  private flyingObstacleName = "Scope Creep";

  constructor() {
    super({ key: "RunnerScene" });
  }

  preload(): void {
    // Player character is generated with graphics, no sprite needed
    // Removed "runner-tileset" loading to avoid potential missing texture box if it's not found or corrupt
  }

  create(): void {
    this.resetGameState();

    const { width, height } = this.scale;

    // 1. Static Sky Gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x050510, 0x050510, 0x1a1a2e, 0x2a0a2e, 1);
    bg.fillRect(0, 0, width, height);

    // 2. Generate and Add Parallax Layers
    this.createParallaxBackgrounds();

    // 3. Grid lines (Cyber floor effect only, removing full screen grid)
    const gridGraphics = this.add.graphics();
    gridGraphics.lineStyle(1, 0x00ff00, 0.1);
    const groundY = height - 24;
    
    // Create ground
    this.ground = this.physics.add.staticGroup();
    
    // Draw ground tiles across the width
    for (let x = 0; x < width + 32; x += 16) {
      const tile = this.add.rectangle(x, groundY, 16, 16, 0x00ff00, 0.8);
      tile.setStrokeStyle(1, 0x00aa00);
      this.ground.add(tile);
    }

    // Ground collision zone
    const groundZone = this.add.rectangle(width / 2, groundY + 8, width, 16, 0x000000, 0);
    this.physics.add.existing(groundZone, true);
    this.ground.add(groundZone);

    // Create player
    this.player = new RunnerPlayer(this, 60, groundY - 24);
    this.player.setScale(2);

    // Player-ground collision
    this.physics.add.collider(this.player, this.ground);

    // Obstacles group
    this.obstacles = this.physics.add.group();
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, undefined, this);

    // Pickups group
    this.pickups = this.physics.add.group();
    this.physics.add.overlap(this.player, this.pickups, this.collectPickup, undefined, this);

    // HUD
    this.createHUD();

    // Start text (Press Space to Start)
    // Note: Removed "block of stuff" (debug ground/start text background) as requested
    this.startText = this.add.text(width / 2, height / 2 - 20, "PRESS SPACE TO START", {
      fontFamily: "monospace",
      fontSize: "14px",
      color: "#00ff00",
    }).setOrigin(0.5);

    // Blinking start text
    this.tweens.add({
      targets: this.startText,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    // Input - use native window events for keyboard to ensure they work
    this.setupKeyboardInput();
    
    this.input.on("pointerdown", this.handleJump, this);
    this.input.on("pointerup", this.handleJumpRelease, this);
  }

  private setupKeyboardInput(): void {
    // Use native window keyboard events for reliability
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        this.handleJump();
      }
      if (e.code === "KeyR") {
        this.handleRestart();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        this.handleJumpRelease();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up on scene shutdown
    this.events.on("shutdown", () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    });
  }

  private createHUD(): void {
    const { width } = this.scale;
    const padding = 10;
    const fontSize = "10px";

    // Day counter (top left)
    this.dayText = this.add.text(padding, padding, "DAY 1 OF SPRINT", {
      fontFamily: "monospace",
      fontSize: fontSize,
      color: "#00ffff",
    });

    // Score (top center)
    this.scoreText = this.add.text(width / 2, padding, "SCORE: 0", {
      fontFamily: "monospace",
      fontSize: fontSize,
      color: "#00ff00",
    }).setOrigin(0.5, 0);

    // Features shipped (top right)
    this.featuresText = this.add.text(width - padding, padding, "SHIPPED: 0", {
      fontFamily: "monospace",
      fontSize: fontSize,
      color: "#ffff00",
    }).setOrigin(1, 0);
  }

  private handleJump(): void {
    if (this.isGameOver) return;

    // Prevent repeated jumps from key repeat
    if (this.jumpKeyHeld) return;
    
    this.jumpKeyHeld = true;

    if (!this.hasStarted) {
      this.startGame();
    }

    this.player.jump();
  }

  private handleJumpRelease(): void {
    this.jumpKeyHeld = false;
    if (this.isGameOver || !this.hasStarted) return;
    this.player.releaseJump();
  }

  private handleRestart(): void {
    if (this.isGameOver) {
      this.scene.restart();
    }
  }

  private startGame(): void {
    this.hasStarted = true;
    this.startText.destroy();

    // Start spawning obstacles
    this.obstacleTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    // Start spawning pickups
    this.pickupTimer = this.time.addEvent({
      delay: 2500,
      callback: this.spawnPickup,
      callbackScope: this,
      loop: true,
    });

    // Day progression
    this.dayTimer = this.time.addEvent({
      delay: 5000,
      callback: this.advanceDay,
      callbackScope: this,
      loop: true,
    });
  }

  private spawnObstacle(): void {
    if (this.isGameOver) return;

    const { width, height } = this.scale;
    const groundY = height - 24;

    // Chance to spawn flying "Scope Creep" (increases with day)
    const spawnFlying = Math.random() < (0.1 + this.sprintDay * 0.05) && this.sprintDay > 1;

    if (spawnFlying) {
      const droneY = groundY - 45; // Head height, requires duck or perfect jump
      const droneRect = this.add.rectangle(width + 20, droneY, 20, 12, 0xff00ff, 0.9);
      droneRect.setStrokeStyle(2, 0xff88ff);
      const drone = droneRect as unknown as Obstacle;
      drone.obstacleType = this.flyingObstacleName;
      
      this.physics.add.existing(drone);
      this.obstacles.add(drone);
      
      const body = drone.body as Phaser.Physics.Arcade.Body;
      body.setAllowGravity(false);
      body.setVelocityX(-(this.gameSpeed * 1.2)); // Flying enemies move faster!
      body.setImmovable(true);
      
      // Add label
      const text = this.add.text(0, -15, "SCOPE CREEP", { 
        fontSize: "8px", 
        color: "#ff00ff", 
        fontFamily: "monospace" 
      }).setOrigin(0.5);
      
      // Attach text to drone container? simplified: just a drone for now or add container logic
      // For simplicity in this setup, we'll skip complex container logic and just use the rect
      // but let's add a simple visual indicator
      
      return;
    }

    // Create ground obstacle
    const obstacleType = Phaser.Math.RND.pick(this.obstacleNames);
    const obstacleRect = this.add.rectangle(
      width + 20,
      groundY - 16,
      16,
      24,
      0xff0000,
      0.9
    );
    obstacleRect.setStrokeStyle(2, 0xff6666);
    const obstacle = obstacleRect as unknown as Obstacle;
    obstacle.obstacleType = obstacleType;

    this.physics.add.existing(obstacle);
    this.obstacles.add(obstacle);

    const body = obstacle.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setVelocityX(-this.gameSpeed);
    body.setImmovable(true);

    // Random gap variation - sometimes spawn a second obstacle
    if (Math.random() < 0.3 && this.sprintDay > 2) {
      this.time.delayedCall(300, () => {
        if (!this.isGameOver) this.spawnObstacle();
      });
    }
  }

  private spawnPickup(): void {
    if (this.isGameOver) return;

    const { width, height } = this.scale;
    const groundY = height - 24;

    // Pickups spawn at varying heights to encourage jumping
    const pickupY = Phaser.Math.Between(groundY - 60, groundY - 100);
    const pickupType = Phaser.Math.RND.pick(this.pickupNames);
    const value = pickupType === "Offer Letter" ? 100 : pickupType === "Feature Shipped" ? 50 : 25;

    const pickupRect = this.add.rectangle(
      width + 20,
      pickupY,
      12,
      12,
      0x00ffff,
      0.9
    );
    pickupRect.setStrokeStyle(2, 0x00aaff);
    const pickup = pickupRect as unknown as Pickup;
    pickup.pickupType = pickupType;
    pickup.value = value;

    this.physics.add.existing(pickup);
    this.pickups.add(pickup);

    const body = pickup.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setVelocityX(-this.gameSpeed);

    // Floating animation
    this.tweens.add({
      targets: pickup,
      y: pickupY - 8,
      duration: 400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  private advanceDay(): void {
    if (this.isGameOver) return;

    this.sprintDay++;
    this.dayText.setText(`DAY ${this.sprintDay} OF SPRINT`);

    // Increase speed
    this.gameSpeed = Math.min(this.maxSpeed, this.baseSpeed + this.speedIncrement * this.sprintDay);

    // Flash effect for new day
    this.cameras.main.flash(200, 0, 255, 255, false);
  }

  private hitObstacle(
    player: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
    obstacle: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    if (this.isGameOver) return;

    const obs = obstacle as unknown as Obstacle;
    this.gameOver(obs.obstacleType);
  }

  private collectPickup(
    player: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
    pickup: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    const p = pickup as unknown as Pickup;

    this.score += p.value;
    this.featuresShipped++;
    this.scoreText.setText(`SCORE: ${this.score}`);
    this.featuresText.setText(`SHIPPED: ${this.featuresShipped}`);

    // Collect effect
    this.tweens.add({
      targets: p,
      scale: 1.5,
      alpha: 0,
      duration: 150,
      onComplete: () => p.destroy(),
    });

    // Pop-up text
    const popText = this.add.text(p.x, p.y - 10, `+${p.value}`, {
      fontFamily: "monospace",
      fontSize: "8px",
      color: "#00ffff",
    }).setOrigin(0.5);

    this.tweens.add({
      targets: popText,
      y: p.y - 30,
      alpha: 0,
      duration: 500,
      onComplete: () => popText.destroy(),
    });
  }

  private gameOver(cause: string): void {
    this.isGameOver = true;

    // Stop timers
    this.obstacleTimer?.remove();
    this.pickupTimer?.remove();
    this.dayTimer?.remove();

    // Stop all obstacles and pickups
    this.obstacles.getChildren().forEach((obj) => {
      const body = (obj as Phaser.GameObjects.GameObject).body as Phaser.Physics.Arcade.Body;
      body.setVelocity(0);
    });
    this.pickups.getChildren().forEach((obj) => {
      const body = (obj as Phaser.GameObjects.GameObject).body as Phaser.Physics.Arcade.Body;
      body.setVelocity(0);
    });

    // Player death effect
    this.player.setTint(0xff0000);
    this.tweens.add({
      targets: this.player,
      alpha: 0.5,
      duration: 100,
      yoyo: true,
      repeat: 3,
    });

    // Game over screen
    const { width, height } = this.scale;

    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

    const gameOverText = this.add.text(width / 2, height / 2 - 40, "BURNOUT!", {
      fontFamily: "monospace",
      fontSize: "24px",
      color: "#ff0000",
    }).setOrigin(0.5);

    const causeText = this.add.text(width / 2, height / 2 - 15, `Hit by: ${cause}`, {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#ff6666",
    }).setOrigin(0.5);

    const statsText = this.add.text(
      width / 2,
      height / 2 + 15,
      `You survived ${this.sprintDay} days\nand shipped ${this.featuresShipped} features`,
      {
        fontFamily: "monospace",
        fontSize: "10px",
        color: "#ffffff",
        align: "center",
      }
    ).setOrigin(0.5);

    const finalScoreText = this.add.text(width / 2, height / 2 + 50, `FINAL SCORE: ${this.score}`, {
      fontFamily: "monospace",
      fontSize: "12px",
      color: "#00ff00",
    }).setOrigin(0.5);

    const restartText = this.add.text(width / 2, height / 2 + 75, "Press R to restart", {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#00ffff",
    }).setOrigin(0.5);

    this.tweens.add({
      targets: restartText,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    this.gameOverContainer = this.add.container(0, 0, [
      overlay,
      gameOverText,
      causeText,
      statsText,
      finalScoreText,
      restartText,
    ]);
  }

  private resetGameState(): void {
    this.score = 0;
    this.distance = 0;
    this.featuresShipped = 0;
    this.sprintDay = 1;
    this.gameSpeed = this.baseSpeed;
    this.isGameOver = false;
    this.hasStarted = false;
    this.jumpKeyHeld = false;
  }

  update(time: number, delta: number): void {
    if (this.isGameOver || !this.hasStarted) return;

    // Update player jump physics
    this.player.updateJump(delta);

    // Update distance score
    this.distance += this.gameSpeed * (delta / 1000);
    this.score = Math.floor(this.distance / 10) + this.featuresShipped * 25;
    this.scoreText.setText(`SCORE: ${this.score}`);

    // Clean up off-screen objects
    this.obstacles.getChildren().forEach((obj) => {
      const sprite = obj as Phaser.GameObjects.Rectangle;
      if (sprite.x < -50) {
        sprite.destroy();
      }
    });

    // Flying movement (sine wave)
    this.obstacles.getChildren().forEach((obj) => {
      const obs = obj as unknown as Obstacle;
      if (obs.obstacleType === this.flyingObstacleName) {
        obs.y += Math.sin(time / 200) * 0.5; // Bobbing effect
      }
    });

    this.pickups.getChildren().forEach((obj) => {
      const sprite = obj as Phaser.GameObjects.Rectangle;
      if (sprite.x < -50) {
        sprite.destroy();
      }
    });

    // Update velocities to match current game speed
    this.obstacles.getChildren().forEach((obj) => {
      const body = (obj as Phaser.GameObjects.GameObject).body as Phaser.Physics.Arcade.Body;
      body.setVelocityX(-this.gameSpeed);
    });

    this.pickups.getChildren().forEach((obj) => {
      const body = (obj as Phaser.GameObjects.GameObject).body as Phaser.Physics.Arcade.Body;
      body.setVelocityX(-this.gameSpeed);
    });

    // Scroll backgrounds
    this.backgroundLayers.forEach((layer) => {
      layer.sprite.tilePositionX += (this.gameSpeed * layer.speedFactor * delta) / 1000;
    });
  }

  private createParallaxBackgrounds(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Clear old textures if they exist
    if (this.textures.exists("bg-far")) this.textures.remove("bg-far");
    if (this.textures.exists("bg-mid")) this.textures.remove("bg-mid");

    // --- Far Layer (Slow, Tall Skyline) ---
    const farGraphics = this.make.graphics();
    farGraphics.fillStyle(0x151525); // Dark silhouette
    
    let currentX = 0;
    while (currentX < width) {
      const bWidth = Phaser.Math.Between(20, 50);
      const bHeight = Phaser.Math.Between(60, 120);
      farGraphics.fillRect(currentX, height - bHeight - 10, bWidth, bHeight + 20);
      currentX += bWidth + Phaser.Math.Between(-5, 2); // slight overlap
    }
    
    farGraphics.generateTexture("bg-far", width, height);
    
    const farLayer = this.add.tileSprite(0, 0, width, height, "bg-far");
    farLayer.setOrigin(0, 0);
    this.backgroundLayers.push({ sprite: farLayer, speedFactor: 0.1 });

    // --- Mid Layer (Faster, detailed, neon accents) ---
    const midGraphics = this.make.graphics();
    midGraphics.fillStyle(0x2a2a4a); // Lighter purple/blue
    
    currentX = 0;
    while (currentX < width) {
      const bWidth = Phaser.Math.Between(15, 40);
      const bHeight = Phaser.Math.Between(30, 80);
      const x = currentX;
      const y = height - bHeight - 10;
      
      // Building body
      midGraphics.fillStyle(0x2a2a4a);
      midGraphics.fillRect(x, y, bWidth, bHeight + 20);
      
      // Neon Windows/Accents
      if (Math.random() > 0.3) {
        midGraphics.fillStyle(Math.random() > 0.5 ? 0x00ff00 : 0xff00ff, 0.5);
        const windowSize = 2;
        for (let wy = y + 5; wy < height - 10; wy += 6) {
           if (Math.random() > 0.4) {
             midGraphics.fillRect(x + 4, wy, bWidth - 8, windowSize);
           }
        }
      }
      
      currentX += bWidth + Phaser.Math.Between(2, 10); // Gaps between mid buildings
    }

    midGraphics.generateTexture("bg-mid", width, height);
    
    const midLayer = this.add.tileSprite(0, 0, width, height, "bg-mid");
    midLayer.setOrigin(0, 0);
    this.backgroundLayers.push({ sprite: midLayer, speedFactor: 0.3 });
  }
}

