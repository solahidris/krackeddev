# Story 4.3: User Management

Status: ready-for-dev

## Story

As an Admin,
I want to view a list of users and ban them if necessary,
So that I can protect the platform from bad actors.

## Acceptance Criteria

1. **Given** I am on the User Management page
2. **When** I click "Ban" on a user
3. **Then** their account status should be updated to 'banned' (FR-ADM-01)
4. **And** they should be prevented from logging in

## Technical Requirements

- **Module**: `src/features/admin-dashboard`
- **Components**: `UserTable` with actions.
- **Back-end**: Update `auth.users.banned_until` (Supabase Admin API) OR a `status` column in `public.users`.
    - Preference: use `public.users.status` or `is_banned` flag, checked by Middleware/RLS.

## Architecture Compliance

- **Server Actions**: `fetchUsers()`, `banUser(userId)`.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/admin-dashboard` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Admin API**: `banUser` might require `supabaseAdmin` client (service role key) if modifying `auth.users`. Keep this logic secure in an action only accessible to admins.

### References

- [FR-ADM-01: User Management](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
