# Component Inventory

**Scan Depth:** Exhaustive
**Source:** `src/components` & `src/game`

## Game Engine (Phaser + React)

### Core
*   **`RunnerScene`** (`src/game/runner/RunnerScene.ts`): Main Phasor scene logic (Player, Obstacles, Pickups, HUD).
*   **`BaseGameWorld`** (`src/components/game/BaseGameWorld.tsx`): React wrapper for Phaser game. Handles canvas, user input, mobile detection, and React overlays (dialogs, toasts).

### Scenes/Overlays
*   **`ProfileScene`** (`src/components/game/ProfileScene.tsx`): Profile visualization map.
*   **`OnboardingTown`**: (File listed)
*   **`JobTownBoard`**: (File listed)

## UI Components
*   **`Navbar`**: Main navigation.
*   **`Footer`**: Site footer.
*   **`PageHero`**: Hero section component.

## Shared UI (`src/components/ui`)
Standard accessible primitives (likely Shadcn/UI):
*   `Button`, `Card`, `Dialog`, `Input`, `Badge`, `Table`, `DropdownMenu`
