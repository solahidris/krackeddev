# Story 2.3: Navigation & Job Preview

Status: ready-for-dev

## Story

As a User,
I want clear navigation to other parts of the site (Jobs, Game),
So that I can explore the platform easily.

## Acceptance Criteria

1. **Given** I am on the homepage
2. **When** I interact with the navigation elements
3. **Then** I should be able to navigate to the Job Board (FR-LAND-03)
4. **And** I should see a preview of recent active jobs (FR-LAND-05)
5. **And** external links (like game) should work correctly in new tabs if required

## Technical Requirements

- **Module**: `src/features/landingpage`
- **Components**: `JobPreviewList`, `NavigationCards` (or similar).
- **Data**: Fetch recent 3 bounties via Server Action.

## Architecture Compliance

- **File Structure**:
    - `src/features/landingpage/components/job-preview.tsx`
- **Barrel Files**: Ensure `index.ts` exists in `src/features/landingpage` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.
- **Routing**: Links to `/bounties` (or `/jobs` if we haven't refactored that route yet - stick to `/jobs` for now if that's where it is, or define the new route). Note: Epic 5 will refactor Jobs->Bounties. For now, link to existing `/jobs` or prepare for `/bounties`. Recommendation: Link to `/bounties` and ensure route exists or redirects.

## Dev Notes

- **Job Preview**: Simple list showing Title, Price, and Stack.
- **Navigation**: The "Townhall" might already have clickable buildings. Ensure they route correctly.

### References

- [FR-LAND-03: Navigation](docs/prd.md#functional-requirements)
- [FR-LAND-05: Job Preview](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
