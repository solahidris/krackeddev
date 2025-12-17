# Project Context: krackeddevs-docs

This file serves as a high-level guide for AI agents working on the krackeddevs-docs project. It summarizes critical rules, active technology decisions, and the location of key documentation.

## 1. Project Identity

- **Name:** Kracked Devs (Platform)
- **Goal:** A gamified marketplace connecting authenticated developers with bounties.
- **Phase:** Solutioning/Implementation Preparation

## 2. Core Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Backend/Auth:** Supabase (Auth, Postgres, Realtime, Edge Functions)
- **State Management:** Zustand (Client), React Query (Server)
- **Icons:** Lucide React

## 3. Key Architecture Patterns

- **Feature-Sliced Design:** Code organized by features in `src/features/*`.
- **Kebab-Case:** All filenames must use `kebab-case.ts` (e.g., `user-profile.tsx`, not `UserProfile.tsx`).
- **Server Actions:** Use Next.js Server Actions for data mutation; avoid API routes where possible.
- **Game Bridge:** The "Santan Island" game is an external iframe integrated via `postMessage`.

## 4. Documentation Map

- **Business/Vision:** `docs/brd.md` (Original Vision)
- **Requirements:** `docs/prd.md` (Functional/Non-Functional Specs)
- **Architecture:** `docs/architecture.md` (Tech Stack & Structure)
- **Epics & Stories:** `docs/epics.md` (Implementation Tasks)
- **Status:** `docs/bmm-workflow-status.yaml` (Workflow Progress)

## 5. Critical Rules for Agents

1. **Read First:** Always check `docs/architecture.md` before creating new components to ensure consistency.
2. **No "Placeholder" Code:** If a feature is requested, implement it fully or clearly mark `// TODO` with a specific reason.
3. **Strict Linting:** Follow the project's specific linting rules (referenced in `.eslintrc` or equivalent).
4. **Artifacts:** Update `docs/` files when requirements change; code and docs must stay in sync.
