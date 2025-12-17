# Architecture Analysis: Actual vs Target

**Date:** 2025-12-17
**Target Architecture:** Feature-Sliced Design (FSD)
**Current Architecture:** Component-Based Monolith

## Gap Analysis

### 1. Directory Structure

| Feature | Target (FSD) | Actual (Current) | Gap |
| :--- | :--- | :--- | :--- |
| **Feature Isolation** | `src/features/*` | `src/components/*` mixed | **High:** Logic is not sliced by feature. |
| **Domain Logic** | Co-located with feature | `src/lib/*`, `src/services/*` | **Medium:** Domain logic is centralized in lib/services. |
| **Game Bridge** | `src/features/game-bridge` | `src/components/game/*` | **Medium:** Game logic exists but isn't isolated as a feature module. |
| **API Layer** | Server Actions in features | Route Handlers (`src/app/api`) | **Medium:** Using classic API routes instead of Server Actions for some features. |

### 2. Implementation Discrepancies

#### A. The "Quest" vs "Job" Dual Model
*   **Target:** Unified Job Board.
*   **Actual:**
    *   `jobs` table (Real world jobs).
    *   `MOCK_QUESTS` (Fantasy themed jobs in `mockJobService.ts`).
    *   *Risk:* Conflicting domain models (Fantasy vs Real). Need a clear strategy for merging or separating these concerns.

#### B. Game State Management
*   **Target:** Zustand for Client, React Query for Server.
*   **Actual:**
    *   Phaser internal state (`RunnerScene` properties).
    *   React `useState` / `useRef` in `BaseGameWorld`.
    *   *Action:* Need to unify game state storage to allow "Game Bridge" to work effectively.

## Recommendations for Migration

1.  **Refactor Directory:** Create `src/features/` and move `bounty-board`, `game-bridge`, and `profiles` logic there.
2.  **Unify Data:** Decide on the authoritative source for "Jobs". If "Quests" are just a gamified view of "Jobs", create an adapter.
3.  **Game Bridge:** Extract `BaseGameWorld` logic into a cleaner hook/component separation within `src/features/game-bridge`.
