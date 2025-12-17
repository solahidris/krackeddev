# Story 6.1: Game Bridge Implementation

Status: ready-for-dev

## Story

As a Developer,
I want a secure bridge between the React App and the Game Iframe,
So that I can pass the user's authentication token to the game.

## Acceptance Criteria

1. **Given** the game is loaded in an iframe
2. **When** the app receives a request for token
3. **Then** it should post the current session token to the iframe via `postMessage`
4. **And** it should restrict this communication to the trusted game origin (FR18)
5. **And** implementation should represent `src/features/game-bridge`

## Technical Requirements

- **Module**: `src/features/game-bridge`
- **Protocol**: `window.postMessage`
- **Security**: origin check is mandatory.
- **Components**: `GameBridgeProvider` or `useGameBridge`.

## Architecture Compliance


- **Event**: `KRACKED_AUTH_SYNC`
- **File Structure**:
    - `src/features/game-bridge/hooks/use-game-bridge.ts`
    - `src/features/game-bridge/types.ts`
- **Barrel Files**: Ensure `index.ts` exists in `src/features/game-bridge` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Game URL**: Store in `.env.local` as `NEXT_PUBLIC_GAME_URL`.

### References

- [FR18: Game Session Auth](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
