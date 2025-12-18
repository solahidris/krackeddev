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

- **Server Actions**: `createBounty(data)`, `updateBounty(id, data)`, `deleteBounty(id)`. MUST use the `ActionResult<T>` wrapper pattern.
- **Validation**: Zod schema for Bounty inputs.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/admin-dashboard` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## UX/UI Requirements

- **Empty States**: `BountyTable` must show a clear "No bounties found" message with a CTA to create one if the list is empty.
- **Feedback**: Use `sonner` toasts for success (e.g., "Bounty created") and error messages.
- **Safety**: "Delete Bounty" action must trigger a Confirmation Dialog (`AlertDialog`) before execution.
- **Loading States**: Disable buttons and show loading spinners during Form submission.
- **Navigation**: Include Breadcrumbs (e.g., Admin > Bounties > Create) for easier navigation.
- **Inputs**: 
    - `reward_amount`: Number input with currency prefix.
    - `status`: Select dropdown (Draft, Open, Pending, Completed).

## Dev Notes

- **Rich Text**: Description likely needs Markdown or Rich Text support. Use a simple textarea or Markdown editor component.

### References

- [FR13: Bounty CRUD](docs/prd.md#functional-requirements)

## Tasks

- [ ] Create Zod schema for Bounty (Create/Update) in `src/features/admin-dashboard/schemas.ts` <!-- id: 1 -->
- [ ] Implement Server Actions in `src/features/admin-dashboard/actions.ts`: `createBounty`, `updateBounty`, `deleteBounty` <!-- id: 2 -->
- [ ] Create `BountyForm` component in `src/features/admin-dashboard/components/bounty-form.tsx` <!-- id: 3 -->
- [ ] Create `BountyTable` component in `src/features/admin-dashboard/components/bounty-table.tsx` <!-- id: 4 -->
- [ ] Create Admin Page: `src/app/(admin)/admin/bounties/page.tsx` (List) <!-- id: 5 -->
- [ ] Create Admin Page: `src/app/(admin)/admin/bounties/create/page.tsx` (Create) <!-- id: 6 -->
- [ ] Create Admin Page: `src/app/(admin)/admin/bounties/[id]/edit/page.tsx` (Edit) <!-- id: 7 -->
- [ ] Add "Bounties" link to `AdminSidebar` <!-- id: 8 -->
- [ ] Run Tests (`npm test src/features/admin-dashboard`) <!-- id: 9 -->

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
