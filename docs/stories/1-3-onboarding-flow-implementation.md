# Story 1.3: Onboarding Flow Implementation

Status: ready-for-dev

## Story

As a New User,
I want to complete my profile details (Role, Stack, Location),
So that I can be accurately matched with relevant bounties.

## Acceptance Criteria

1. **Given** a user logs in for the first time
2. **When** they attempt to access the dashboard
3. **Then** they should be redirected to the /onboarding route (FR3)

4. **Given** I am on the onboarding form
5. **When** I enter my Role (e.g. Junior), Stack (e.g. React), and Location
6. **Then** this data should be saved to my profile record
7. **And** the implementation should reside in `src/features/onboarding`

## Technical Requirements

- **Module**: `src/features/onboarding`
- **Database**: Updates `public.custom_users` (or `users`) table - Check DB schema.
- **Components**: `OnboardingForm` (Zod validated).
- **Routing**: Middleware or Layout check for `onboarding_completed` flag.

## Architecture Compliance

- **File Structure**:
    - `src/features/onboarding/components/onboarding-wizard.tsx`
    - `src/features/onboarding/actions.ts` (Server Action to save profile)
    - `src/features/onboarding/schema.ts` (Zod schema)
- **Naming**: `kebab-case` filenames.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/onboarding` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.
- **Server Actions**: `saveOnboardingDetails(data)`

## Dev Notes

- **Middleware**: You might need to add a check in `middleware.ts` or a root layout check to redirect new users to `/onboarding`.
- **Existing Code**: Check if an onboarding page exists. If so, refactor to `src/features`.
- **Field Requirements**: Role (Enum/Select), Stack (Multi-select/Tags), Location (Text/Select).

### References

- [FR3: Onboarding Flow](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
