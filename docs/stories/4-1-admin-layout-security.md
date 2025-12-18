# Story 4.1: Admin Layout & Security

Status: ready-for-dev

## Story

As an Admin,
I want a dedicated dashboard area that is secure and separate from the public site,
So that I can perform sensitive operations safely.

## Acceptance Criteria

1. **Given** a user is logged in
2. **When** they attempt to access `/admin/dashboard`
3. **Then** the system should check if their role is 'admin'
4. **And** if not, they should be redirected to the home page (FR-ADM-02) - *implied requirement*
5. **And** the implementation should be in `src/features/admin-dashboard` and `src/app/(admin)`

## Technical Requirements

- **Module**: `src/features/admin-dashboard`
- **Routing**: `src/app/(admin)/layout.tsx` (Side navigation) + `src/app/(admin)/dashboard/page.tsx`
- **Security**: Middleware or RLS check.
    - **Middleware**: Use Supabase auth helper to protect `/admin/*` routes.
    - **RLS**: Ensure data accessed here requires admin privileges.

## Architecture Compliance

> **Reference:** [Architecture Decision Document](docs/architecture.md) - Section: Component Boundaries & Feature Mapping

- **File Structure**:
    - `src/features/admin-dashboard/components/admin-sidebar.tsx`

    - `src/features/admin-dashboard/layouts/admin-layout.tsx`
- **Barrel Files**: Ensure `index.ts` exists in `src/features/admin-dashboard` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Role Management**: Check `profiles.role` (added in Story 1.1).
- **Bootstrap Admin**: There is no UI to create the *first* admin.
    - **Action**: Developer must manually update the `role` to 'admin' in the `profiles` table via Supabase Dashboard for their own user after signing up.


### References

- [FR-ADM-02: Admin Access](docs/prd.md#functional-requirements)

## Tasks

- [x] Create `src/features/admin-dashboard/components/admin-sidebar.tsx` <!-- id: 1 -->
- [x] Create `src/features/admin-dashboard/layouts/admin-layout.tsx` <!-- id: 2 -->
- [x] Export components from `src/features/admin-dashboard/index.ts` <!-- id: 3 -->
- [x] Create `src/app/(admin)/layout.tsx` using `AdminLayout` <!-- id: 4 -->
- [x] Create `src/app/(admin)/dashboard/page.tsx` <!-- id: 5 -->
- [x] Verify middleware protection for `/admin` routes (Manual Verification) <!-- id: 6 -->

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
