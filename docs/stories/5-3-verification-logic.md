# Story 5.3: Verification Logic

Status: ready-for-dev

## Story

As an Admin,
I want to approve or reject submissions,
So that I can verify the quality of work.

## Acceptance Criteria

1. **Given** I am viewing a submission
2. **When** I click "Approve" or "Reject"
3. **Then** I must provide a comment
4. **And** the submission status should create (update to 'approved'/'rejected') (FR15)
5. **And** if approved, I should be able to mark it as "Paid" with a transaction reference (FR16)

## Technical Requirements

- **Module**: `src/features/admin-dashboard` (or `bounty-board` admin view). Ideally part of Admin Dashboard.
- **Logic**: Transaction Reference is manual input string.

## Architecture Compliance

- **Server Actions**: `reviewSubmission(submissionId, status, comment)`.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/admin-dashboard` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Payouts**: Manual process for Phase 1. Just store the ref number.

### References

- [FR15: Verification](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
