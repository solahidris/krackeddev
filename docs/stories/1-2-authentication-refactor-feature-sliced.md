# Story 1.2: Authentication Refactor (Feature-Sliced & SSR Migration)

Status: ready-for-dev

## Story

As a Developer,
I want to migrate the authentication system to `@supabase/ssr` and refactor the UI into feature-sliced components,
So that the application is secure (Admin routes protected) and maintainable.

## Acceptance Criteria

1. **Given** the current legacy auth implementation
2. **When** I refactor the codebase
3. **Then** `@supabase/ssr` must be installed and used for all Auth logic
4. **And** `src/lib/supabase.ts` must be REPLACED with standard `utils/supabase/client.ts`, `server.ts`, and `middleware.ts`
5. **And** `LoginModal.tsx` (250+ lines) must be decomposed into `src/features/auth/components/login-form.tsx` and `auth-dialog.tsx`
6. **And** the legacy `SupabaseContext` should be simplified or removed in favor of `utils/supabase/server` for server components

## Technical Requirements

- **Module**: `src/features/auth`
- **Dependencies**:
    - [INSTALL] `@supabase/ssr`
    - [REMOVE] Direct usage of `createClient` from `@supabase/supabase-js` in client components (use browser client builder).
- **Middleware**: Implement `src/middleware.ts` to refresh sessions and protect `/admin/*` routes.
- **Refactor Targets**:
    - `src/components/LoginModal.tsx` -> `src/features/auth/components/*`
    - `src/lib/supabase.ts` -> `src/lib/supabase/client.ts` & `src/lib/supabase/server.ts`

## Architecture Compliance

- **File Structure**:
    - `src/features/auth/components/login-form.tsx` (Business Logic)
    - `src/features/auth/components/auth-modal.tsx` (UI Wrapper)
    - `src/features/auth/actions.ts` (Login/Logout Server Actions)
- **Pattern**:
    - Use **Server Actions** for Login/Signup execution.
    - Use **Middleware** for Route Protection.
- **Type Safety**: Use generated Supabase types.

## Dev Notes

> [!WARNING]
> **Technical Debt Alert**: The current `LoginModal` mixes UI, State, and Logic.
> 1. Extract the "Login with GitHub/Google" logic to `src/features/auth/actions.ts` or a custom hook `useAuth`.
> 2. Ensure `src/middleware.ts` is configured to `updateSession` (handling cookie refresh) or the app will log out users unexpectedly.

### References

- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [FR1: GitHub OAuth](docs/prd.md#functional-requirements)
