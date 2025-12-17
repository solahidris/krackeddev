# Story 3.3: Stats & Wins Display

Status: ready-for-dev

## Story

As a User,
I want to see my "Wins" and "Earnings" on my profile,
So that I can demonstrate my track record on the platform.

## Acceptance Criteria

1. **Given** a user has verified boundy wins
2. **When** any user views their profile (FR6)
3. **Then** the "Wins" and "Earnings" counters should reflect the database values (FR5)
4. **And** these stats should be pulled from the `profiles` table

## Technical Requirements

- **Module**: `src/features/profiles`
- **Database**: Query `bounty_submissions` (where status='approved') or a denormalized `user_stats` table.
- **Components**: `StatsCounter` (or integrate into `ProfileScene`).

## Architecture Compliance

- **Server Actions**: `fetchUserBountyStats(userId)`

- **RLS**: Public read access allowed for these stats.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/profiles` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Visuals**: Make sure "Earnings" is formatted nicely (e.g., RM 5,000).

### References

- [FR5: Developer Stats](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
