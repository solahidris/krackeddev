# Story 1.2: Authentication Refactor (Feature-Sliced)

Status: ready-for-dev

## Story

As a User,
I want to sign up and login using Email or GitHub,
So that I can access the platform securely with my identity verification.

## Acceptance Criteria

1. **Given** I am on the Login page
2. **When** I click "Login with GitHub"
3. **Then** I should be redirected to GitHub and authenticated back to the app (FR1)
4. **And** my user record should be created in `auth.users`
5. **And** the changes/audit should confirm the logic resides in `src/features/auth`

6. **Given** I am on the Login/Signup page
7. **When** I enter a valid email and password
8. **Then** I should be authenticated successfully (FR2)
9. **And** I must have consented to PDPA (FR4)

## Technical Requirements

- **Module**: `src/features/auth`
- **Auth Provider**: Supabase Auth (GitHub OAuth + Email/Password)
- **State Management**: React Query (Server) + Supabase Client
- **Security**: PDPA Consent (Checkbox required before "Sign Up" button enable)

## Architecture Compliance

- **File Structure**:
    - `src/features/auth/components/login-form.tsx`
    - `src/features/auth/actions.ts` (if any server-side logic needed, though Supabase Auth is mostly client/middleware)
    - `src/features/auth/types.ts`
- **Naming**: `kebab-case` filenames.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/auth` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.
- **Dependencies**: Use `@supabase/auth-helpers-nextjs` or `@supabase/ssr` (as per `package.json` - verify installed).

## Dev Notes

- **Refactor Scope**: There is likely existing Auth logic in `src/app/(auth)` or components. Move the *business logic* and *components* to `src/features/auth`.
- **Routes**: Keep the route handlers in `src/app/(auth)/login/page.tsx` but make them simple wrappers around feature components.
- **PDPA**: Ensure the "I agree to Privacy Policy" checkbox is checked before form submission.

### References

- [FR1: GitHub OAuth](docs/prd.md#functional-requirements)
- [FR4: PDPA Consent](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
