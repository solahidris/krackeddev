# Story 3.2: GitHub Stats Integration

Status: ready-for-dev

## Story

As a User,
I want my profile to automatically show my GitHub stats,
So that I don't have to manually update my portfolio.

## Acceptance Criteria

1. **Given** a user has linked their GitHub account
2. **When** they view their profile
3. **Then** the system should fetch their contribution graph and top languages from GitHub (FR7)
4. **And** this data should be displayed in the profile scene
5. **And** this should be implemented using Server Actions in `src/features/profiles/actions.ts`

## Technical Requirements

- **Module**: `src/features/profiles`
- **API**: GitHub GraphQL API (preferred) or REST API.
- **Auth**: Use the provider token from Supabase Auth (`provider_token` in session) to query GitHub on behalf of user.
- **Components**: `GithubGraph`, `TopLanguages`.

## Architecture Compliance

- **Server Actions**: `fetchGithubStats(accessToken)`

- **Types**: Define `GithubStats` interface.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/profiles` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Token Access**: Supabase allows access to the provider token. Ensure you scope the OAuth request correctly (repo read access might be needed for private, but public read is usually fine for general stats).
- **Caching**: GitHub API has rate limits. Cache this data (e.g., in DB or Next.js `unstable_cache`).

### References

- [FR7: GitHub Stats](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
