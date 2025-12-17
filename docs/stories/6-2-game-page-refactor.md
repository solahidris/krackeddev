# Story 6.2: Game Page Refactor

Status: ready-for-dev

## Story

As a User,
I want to access the game page directly,
So that I can play "Santan Island".

## Acceptance Criteria

1. **Given** I click the "Game" link in navigation
2. **When** the page loads
3. **Then** the verified `src/features/game-bridge` component should mount
4. **And** the game should load within the iframe (FR17)

## Technical Requirements

- **Module**: `src/features/game-bridge`
- **Components**: `GamePage` (Feature wrapper).
- **Route**: `src/app/game/page.tsx` (or similar).

## Architecture Compliance

- **File Structure**:
    - `src/features/game-bridge/components/game-iframe.tsx`
- **Barrel Files**: Ensure `index.ts` exists in `src/features/game-bridge` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.
- **Assets**: If game is hosted in `/public/game`, point iframe there. If external, use env var.

## Dev Notes

- **Full Screen**: Game likely needs full viewport height.

### References

- [FR17: Game Page Access](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
