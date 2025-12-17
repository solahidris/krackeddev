# Story 1.1: Project Structure Audit & Initialization

Status: ready-for-dev

<!-- Note: Validation verified against checklist.md - Critical fixes applied. -->

## Story

As a Developer,
I want the project structure to follow the feature-sliced design (src/features),
So that the codebase is scalable and aligns with the agreed Architecture.

## Acceptance Criteria

1.  **Given** the current codebase
2.  **When** I audit the directory structure
3.  **Then** `src/features` directory must exist with all required feature sub-folders
4.  **And** `profiles` table must include a `role` column (admin/user) for RBAC compliance
5.  **And** each feature folder must contain an `index.ts` (barrel file)
5.  **And** `src/components/ui` must contain the shared Shadcn components
6.  **And** Supabase configuration must be verified by checking `.env.local` for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7.  **And** TypeScript types for Supabase must be generated and saved to `src/types/supabase.ts`

## Technical Requirements

-   **Framework**: Next.js (App Router)
-   **Styling**: Tailwind CSS + Shadcn/UI
-   **Structure Pattern**: Feature-sliced design (`src/features/*`)
-   **Naming Convention**: `kebab-case` for all files
-   **Type Safety**: Supabase Database definitions must be generated.

## Architecture Compliance

-   **Project Initialization**: Verify user has run `create-next-app` + `shadcn` init.
-   **Dependency Check**:
    -   Must use `@supabase/ssr` (latest) NOT `@supabase/auth-helpers-nextjs` (deprecated).
    -   Ensure `zustand`, `lucide-react` are installed.
-   **Directory Structure Audit**:
    -   `src/app`: Routes only.
    -   `src/features`: Business logic (create if missing).
    -   `src/components/ui`: Shared UI primitives.
    -   `src/lib`: Shared utilities (`supabase`, `utils`).
    -   `src/types`: Global types.

## Dev Notes

**Execute the following Setup Steps:**

1.  **Environment Audit**: Check `.env.local`. If missing, create it from example and ask user for keys.
2.  **Feature Scaffold**: Create these folders if they don't exist:
    -   `src/features/auth`
    -   `src/features/landingpage`
    -   `src/features/profiles`
    -   `src/features/bounty-board`
    -   `src/features/admin-dashboard`
    -   `src/features/game-bridge`
3.  **Barrel Files**: Inside EACH feature folder above, create an empty `index.ts`.
4.  **Type Generation**: Run `npx supabase gen types typescript --project-id <id> > src/types/supabase.ts`. (Ask user for Project Ref ID if unknown).
5.  **Clean Up**: Ensure no legacy "page" logic remains in `src/app` root without being planned for refactor.

### References

-   [Architecture: Technical Constraints](docs/architecture.md#technical-constraints--dependencies)
-   [Architecture: Project Structure](docs/architecture.md#complete-project-directory-structure)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
