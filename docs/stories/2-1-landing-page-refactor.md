# Story 2.1: Landing Page Refactor

Status: ready-for-dev

## Story

As a Developer,
I want to move the landing page logic into a dedicated feature module,
So that the codebase remains organized and I can maintain the UI separately from the routing.

## Acceptance Criteria

1. **Given** the existing `src/app/page.tsx`
2. **When** I refactor the code
3. **Then** a new `src/features/landingpage` directory should exist
4. **And** it should contain the `TownhallV2` and `SplitTextAnimation` components
5. **And** `src/app/page.tsx` should import the main landing container from the feature
6. **And** the UI and animation behavior must remain exactly the same as before

## Technical Requirements

- **Module**: `src/features/landingpage`
- **Components**: Move `TownhallV2`, `SplitTextAnimation` from `src/components` (or wherever they are) to `src/features/landingpage/components`.
- **Styling**: Ensure `jobs.css` or relevant styles are correctly imported/colocated.

## Architecture Compliance

- **File Structure**:
    - `src/features/landingpage/components/townhall.tsx`
    - `src/features/landingpage/components/hero-animation.tsx`
    - `src/features/landingpage/page.tsx` (The feature page component, imported by app route)
- **Naming**: `kebab-case` filenames.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/landingpage` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Existing Assets**: Be careful with image paths if moving components. Use absolute paths (`/assets/...`) or Next.js `Image` component.
- **Audio Context**: The existing page has audio unlock logic (`unlockAudio` event). Preserve this carefully as it likely interacts with a global music player.

### References

- [FR-LAND-01: Game Hero](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
