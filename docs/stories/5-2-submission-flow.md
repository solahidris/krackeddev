# Story 5.2: Submission Flow

Status: ready-for-dev

## Story

As a Developer,
I want to submit my solution via a GitHub PR URL,
So that I can claim the bounty.

## Acceptance Criteria

1. **Given** I am viewing a bounty details page
2. **When** I click "Submit Solution"
3. **Then** I should see a form requiring a valid URL
4. **And** submitting it should create a record in `bounty_submissions` (FR11)
5. **And** I should see my submission status change to "Submitted" (FR12)
6. **And** if I attempt to submit again for the same bounty, I should see an error message (MVP Constraint: 1 submission max)

## Technical Requirements

- **Module**: `src/features/bounty-board` (or `src/features/submissions` - optional separation, but keep in bounty-board for now if simple).
- **Table**: `bounty_submissions`.
- **Validation**: Regex check for valid GitHub PR URL.

## Architecture Compliance

- **Server Actions**: `submitBountySolution(bountyId, url)`.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/bounty-board` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Submission Limit**: STRICTLY 1 submission per user per bounty (MVP Constraint).
   - If user attempts a second submission, show error: "You have already submitted a solution for this bounty."
   - **Future Context**: PM decision is to stick to 1:1 for MVP. Post-launch, we will gather feedback to see if users need multiple submissions.

### References

- [FR11: Submission](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
