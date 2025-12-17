# Project Overview

**Generated:** 2025-12-17
**Scan Level:** Exhaustive

## Executive Summary

`kracked-dev` is a Gamified Job Board platform built with Next.js 16 (App Router) and Supabase. The application uniquely fuses a traditional React web interface with an immersive pixel-art game world powered by Phaser 3.

## Technical Architecture

### Hybrid Core
The application operates as a hybrid monolith:
1.  **Web App Layer (Next.js):** Handles routing, auth, SEO, and static content.
2.  **Game Layer (Phaser 3):** Renders the interactive "Verse" (e.g., `RunnerScene`, `ProfileScene`) inside a React wrapper (`BaseGameWorld`).
3.  **Bridge:** React components communicate with Phaser via effect hooks and shared state management.

### Data & State
*   **Database:** PostgreSQL (Supabase) managed via Drizzle ORM.
*   **API:** Next.js Route Handlers (Edge Runtime) for job fetching and filtering.
*   **Services:**
    *   **Real Bounties:** Hardcoded in `src/lib/bounty/data.ts`.
    *   **Mock Jobs:** "Quests" managed by `mockJobService.ts` (Fantasy theme).
    *   **Live Jobs:** Drizzle-based fetching from `jobs` table (`src/app/api/jobs`).

## Current Status (Deep Dive)

*   **Architecture Pattern:** Monolithic with co-located components.
    *   *Observation:* Logic is scattered between `src/app`, `src/components`, and `src/game`.
    *   *Target:* Feature-Sliced Design (FSD) as per imported docs.
*   **Game Integration:**
    *   Uses `BaseGameWorld` as a heavy React-Phaser adapter.
    *   Game logic (`RunnerScene`) mixes gameplay (jumping, scoring) with app concerns (sprint days, features shipped).
*   **API Layer:**
    *   Partially implemented "Edge" runtime API for jobs.
    *   Manual query parameter parsing and filtering logic in `route.ts`.

## Key Directories

*   `src/game/`: Pure Phaser scenes and entities.
*   `src/components/game/`: React wrappers and UI overlays for the game.
*   `src/lib/db/`: Drizzle schema and connection logic.
*   `src/app/api/`: Server-side route handlers.

For detailed breakdown, see [Component Inventory](./component-inventory.md) and [Data Models](./data-models.md).
