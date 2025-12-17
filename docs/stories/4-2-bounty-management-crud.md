# Story 4.2: Bounty Management (CRUD)

Status: ready-for-dev

## Story

As an Admin,
I want to create, edit, and delete bounties,
So that I can keep the marketplace up to date.

## Acceptance Criteria

1. **Given** I am on the Admin Dashboard
2. **When** I fill out the "Create Bounty" form
3. **Then** a new bounty record should be created in the database (FR13)
4. **Given** an existing bounty
5. **When** I edit the details
6. **Then** the changes should be saved

## Technical Requirements

- **Module**: `src/features/admin-dashboard`
- **Tables**: `bounties`
- **Components**: `BountyForm` (Create/Edit), `BountyTable`.

## Architecture Compliance

- **Server Actions**: `createBounty(data)`, `updateBounty(id, data)`, `deleteBounty(id)`.
- **Validation**: Zod schema for Bounty inputs.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/admin-dashboard` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Rich Text**: Description likely needs Markdown or Rich Text support. Use a simple textarea or Markdown editor component.

### References

- [FR13: Bounty CRUD](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
