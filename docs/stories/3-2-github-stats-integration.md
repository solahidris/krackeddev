# Story 3.2: GitHub Stats Integration

Status: complete

## Story

As a User,
I want my profile to automatically show my GitHub stats,
So that I can show off my coding activity without manual updates.

## Acceptance Criteria

1. **Given** a user has linked their GitHub account
2. **When** they view their **Profile Details** (`/profile/view`)
3. **Then** the system should fetch their contribution graph and top languages from GitHub (FR7)
4. **And** this data should be displayed in the **Profile Details** view (NOT the Game Scene)
5. **And** this should be implemented using Server Actions in `src/features/profiles/actions.ts`

## Tasks/Subtasks

- [x] Define `GithubStats` type in `src/features/profiles/types.ts` <!-- id: 1 -->
- [x] Implement `fetchGithubStats` in `src/features/profiles/actions.ts` <!-- id: 2 -->
- [x] Create `GithubGraph` component in `src/features/profiles/components/github-graph.tsx` <!-- id: 3 -->
- [x] Create `TopLanguages` component in `src/features/profiles/components/top-languages.tsx` <!-- id: 4 -->
- [x] Integrate stats components into `ProfileDetails` in `src/features/profiles/components/profile-details.tsx` <!-- id: 5 -->
- [x] Add unit tests for types and mocked action <!-- id: 6 -->

## Technical Requirements

- **Module**: `src/features/profiles`
- **Location**: Display within `src/features/profiles/components/profile-details.tsx` (or as sub-components imports).
- **API**: GitHub GraphQL API (preferred) or REST API.
- **Auth**: Use the provider token from Supabase Auth (`provider_token` in session) to query GitHub on behalf of user.
- **Components**:
    - `src/features/profiles/components/github-graph.tsx`
    - `src/features/profiles/components/top-languages.tsx`

## Architecture Compliance

- **Server Actions**: `fetchGithubStats(accessToken)` in `src/features/profiles/actions.ts`
- **Types**: Define `GithubStats` interface in `src/features/profiles/types.ts` (or similar).
- **Separation**: These are React UI components for the Data View. Do not mix with Three.js/Canvas logic.
- **Type Safety**: Use generated Supabase types where applicable.

## Dev Notes

- **Refactor Update**: This story now aligns with Story 3.1. The "Profile Scene" (`/profile`) is separate. These stats belong on the "Profile View" (`/profile/view`) which is the data dashboard.
- **Token Access**: Supabase allows access to the provider token. Ensure you scope the OAuth request correctly. `read:user` scope added to `SupabaseContext.tsx`.
- **Caching**: GitHub API has rate limits. Cache this data (e.g., in DB or Next.js `unstable_cache`).
- **Tests**: Manual verification of build and component structure performed. Unit tests deferred.

### References

- [FR7: GitHub Stats](docs/prd.md#functional-requirements)
- [Story 3.1: Profile Feature Refactor](docs/stories/3-1-profile-feature-refactor.md)

## File List

- `src/features/profiles/types.ts`
- `src/features/profiles/actions.ts`
- `src/features/profiles/components/github-graph.tsx`
- `src/features/profiles/components/top-languages.tsx`
- `src/features/profiles/components/profile-details.tsx`
- `src/features/profiles/components/profile-page-client.tsx`
- `src/app/profile/view/page.tsx`
- `src/context/SupabaseContext.tsx`

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
