# Story 4.3: User Management

Status: ready-for-dev

## Story

As an Admin,
I want to view a list of users and ban them if necessary,
So that I can protect the platform from bad actors.

## Acceptance Criteria

1. **Given** I am on the User Management page
2. **When** I click "Ban" on a user
3. **Then** I must see a confirmation dialog warning of the consequences
4. **When** I confirm the action
5. **Then** their account status should be updated to 'banned' (FR-ADM-01)
6. **And** they should be prevented from logging in
7. **And** the UI should visually reflect their BANNED status (e.g., Red Badge)
8. **Given** I am on a mobile device
9. **Then** the user list should appear as a stack of cards, not a squashed table

## Technical Requirements

- **Module**: `src/features/admin-dashboard`
- **Components**: 
    - `UserTable`: Responsive table (hidden on mobile).
    - `UserListCards`: Card view (visible on mobile).
    - `BanDialog`: Warning modal.
- **Back-end**: Update `public.profiles.status` column.
    - Status enum: 'active' | 'banned'.

## Architecture Compliance

- **Server Actions**: `fetchUsers()`, `toggleUserBan(userId)`.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/admin-dashboard`.
- **Type Safety**: Use generated Supabase types.

## Tasks

- [ ] Create migration to add `status` column (enum: active, banned) to `profiles` table.
- [ ] Update `Profile` type definition in `src/types/database.ts`.
- [ ] Implement `fetchUsers` server action (with pagination support).
- [ ] Implement `toggleUserBan` server action.
- [ ] Create `UserTable` component (Desktop view).
- [ ] Create `UserCard` component (Mobile view).
- [ ] Implement `BanConfirmationDialog`.
- [ ] Create Admin User Management Page at `src/app/(admin)/admin/users/page.tsx` handling responsive switching.
- [ ] Update Middleware (`src/lib/supabase/middleware.ts`) to deny access to banned users.

## Dev Notes

- **Responsiveness**: Use `hidden md:table` for table and `block md:hidden` for card list.
- **Admin API**: Ensure `toggleUserBan` checks for admin role strictly.

### References

- [FR-ADM-01: User Management](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
