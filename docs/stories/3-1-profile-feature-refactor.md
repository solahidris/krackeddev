# Story 3.1: Profile Feature Refactor & Alignment

Status: review

## Story

As a Developer,
I want to decouple the **Profile Data Feature** (View/Edit) from the **Profile Game Scene**,
So that I can scale the user profile management features independently from the game visualization.

## Context

- **Game Side**: `src/app/profile/page.tsx` renders the `ProfileScene`. This is an immersive "room" view.
- **Feature Side**: `src/app/profile/view/page.tsx` renders the `ProfilePageClient`. This is the data-heavy view for details and editing.

## Acceptance Criteria

1. **Given** the split between Game Scene and Data View
2. **When** I refactor/organize the code
3. **Then** `src/features/profiles` should contain ONLY the data-related components:
    - `ProfileDetails` (Read-only view)
    - `EditProfileForm` (Edit view)
    - `ProfilePageClient` (Client wrapper/state manager)
    - Actions (`actions.ts`)
4. **And** `src/app/profile/page.tsx` should remain the entry point for the **Game Scene** (using `src/components/game/ProfileScene` or similar).
5. **And** `src/app/profile/view/page.tsx` should reference the `src/features/profiles` module.
6. **And** `ProfileScene` should **NOT** be moved into `src/features/profiles` (unless re-architected as a separate feature, but for now keep distinct).

## Tasks/Subtasks

- [x] Analyze `src/features/profiles` for any Game Logic leakage <!-- id: 1 -->
- [x] Verify `ProfileDetails` component implementation <!-- id: 2 -->
- [x] Verify `EditProfileForm` component implementation <!-- id: 3 -->
- [x] Verify `ProfilePageClient` component implementation <!-- id: 4 -->
- [x] Verify `src/app/profile/view/page.tsx` integration <!-- id: 5 -->
- [x] Ensure `src/app/profile/page.tsx` is strictly Game Scene <!-- id: 6 -->
- [x] Run application and verify both routes work independently <!-- id: 7 -->

## Technical Requirements

- **Module**: `src/features/profiles`
- **Focus**: CRUD operations for User Profile.
- **Separation**: Ensure no leaking of "Game" logic (Three.js/Canvas) into "Feature" logic (Forms/Data), and vice versa, except via clean interfaces if needed.

## Architecture Compliance

- **File Structure**:
    - `src/features/profiles/components/profile-details.tsx`
    - `src/features/profiles/components/edit-profile-form.tsx`
    - `src/features/profiles/components/profile-page-client.tsx`
    - `src/features/profiles/actions.ts`
- **Naming**: `kebab-case` filenames.
- **Type Safety**: Use Supabase types.

## Dev Notes

- The previous version of this story incorrectly assumed `ProfileScene` should be part of the feature module.
- Current direction is strict separation: `/profile` = Game, `/profile/view` = App/Data.

### References

- [FR6: Public Profile View](docs/prd.md#functional-requirements)

## File List

- `docs/stories/3-1-profile-feature-refactor.md` (Story updated)
- `src/features/profiles/components/profile-details.tsx` (Verified)
- `src/features/profiles/components/edit-profile-form.tsx` (Verified)
- `src/features/profiles/components/profile-page-client.tsx` (Verified)
- `src/features/profiles/actions.ts` (Verified)

## Changes

- Updated story to reflect architectural reality (Game vs Data separation).
- Verified all components in `src/features/profiles` are game-logic free.
- Verified `npm run build` passes with the split routes.

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
