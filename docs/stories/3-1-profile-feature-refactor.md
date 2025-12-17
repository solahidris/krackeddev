# Story 3.1: Profile Feature Refactor

Status: ready-for-dev

## Story

As a Developer,
I want to organize the profile logic into a scalable feature module,
So that I can easily extend the profile capabilities without cluttering the app directory.

## Acceptance Criteria

1. **Given** the existing `ProfileScene` in `src/app/profile/page.tsx`
2. **When** I refactor the code
3. **Then** a new `src/features/profiles` directory should exist
4. **And** it should contain the `ProfileScene` and related components
5. **And** the route `src/app/profile/page.tsx` should serve as a wrapper
6. **And** the UI should remain consistent with the existing theme

## Technical Requirements

- **Module**: `src/features/profiles`
- **Components**: `ProfileScene`.
- **Refactor**: Move logic from `src/app/profile`.

## Architecture Compliance

- **File Structure**:
    - `src/features/profiles/components/profile-scene.tsx`
    - `src/features/profiles/page.tsx`
- **Naming**: `kebab-case` filenames.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/profiles` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Scene Logic**: This likely involves a "Room" or specific game-like view. Keep it intact.

### References

- [FR6: Public Profile View](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
