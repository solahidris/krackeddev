---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
status: 'complete'
inputDocuments: ['docs/prd.md']
workflowType: 'architecture'
lastStep: 8
project_name: 'krackeddevs-docs'
user_name: 'Muhaiminjuhari'
date: '2025-12-12'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

* **Marketplace Core:** High-read, low-write for public users. High-write for Admins.
* **Ops Dashboard:** Needs dense data views (Tables) for internal admins.
* **Game Bridge:** Iframe/canvas embedding with cross-window communication for Auth.

**Non-Functional Requirements (Architecture Drivers):**

* **Performance:** LCP < 2.5s -> Requires Aggressive Caching (ISR/SSG) for Bounty Pages.
* **Security:** Row-Level Security (RLS) is mandatory for data isolation.
* **Reliability:** 99.9% public uptime -> Vercel/Edge caching strategy.

**Scale & Complexity:**

* **Primary Domain:** Web Application (Marketplace + SaaS).
* **Complexity Level:** Medium (Due to Game Integration + RBAC).
* **Estimated Components:** ~15-20 Core Pages/Components (Auth, Profile, Bounty Board, Submission Flow, Admin Dash, Game Wrapper).

### Technical Constraints & Dependencies

* **Framework:** Next.js (App Router) - **MANDATORY**.
* **Mobile:** Responsive Web / PWA (No React Native).
* **Game:** External build artifact (must load efficiently).
* **Framework:** Next.js (App Router) - **MANDATORY**.
* **Mobile:** Responsive Web / PWA (No React Native).
* **Game:** External build artifact (must load efficiently).
* **Compliance:** PDPA (Data encryption).

### Cross-Cutting Concerns Identified

* **Authentication:** Unified Identity Layer (GitHub OAuth) across App and Game.
* **State Management:** Syncing "Game Progress" (XP/Coins) from the Game iframe back to the Rails/Postgres DB.
* **RBAC Middleware:** Protecting Admin routes from curious Developers.

## Starter Template Evaluation

### Primary Technology Domain

**Web Application (Next.js Full Stack)**

### Starter Options Considered

* **T3 Stack:** Great for Type safety, but defaults to NextAuth/Prisma. We need specific Supabase Realtime clients for the game.
* **SaaS Boilerplates:** Bloated with Stripe/Subscription logic we explicitly _don't_ want for the Concierge MVP.
* **Official "Clean" Build:** `create-next-app` + `shadcn` + `supabase`. Most flexible.

### Selected Starter: "Hybrid Clean Build"

**Rationale for Selection:**
We need a "thin" Auth layer to pass sessions to the Game Iframe. Boilerplates hide this logic. Starting clean allows us to implement the "Concierge" payment flow without untangling existing Stripe webhooks.

**Initialization Command:**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
# Followed by:
npx shadcn@latest init
npm install @supabase/supabase-js @supabase/ssr zustand
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**

* TypeScript (Strict Mode).
* Node.js (LTS).

**Styling Solution:**

* Tailwind CSS (Utility-first).
* Shadcn/UI (Radix Primitives) for accessible components.

**Build Tooling:**

* Next.js (Webpack/Turbopack).
* ESLint + Prettier.

**Testing Framework:**

* Jest (Unit) + Playwright (E2E) - _Implementation Pending_.

**Code Organization:**

* `/src` directory structure.
* Feature-sliced folders (e.g. `src/features/auth`, `src/features/checkout`).

**Development Experience:**

* Supabase Local Dev (Docker) for DB/Edge Function testing.
* Next.js Fast Refresh.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

* **Database:** Supabase (PostgreSQL) - _Inherited from Starter_
* **Game Bridge:** Iframe + PostMessage + Supabase Edge Functions - _Decided Now_
* **API Pattern:** Server Actions + RLS - _Decided Now_

**Important Decisions (Shape Architecture):**

* **State Management:** Zustand (Client) + React Query (Server/Hydration) - _Decided Now_
* **Deployment:** Vercel (Frontend) + Supabase (Backend) - _Decided Now_

**Deferred Decisions (Post-MVP):**

* **Payment Gateway:** Manual "Concierge" process for Phase 1.
* **Native Mobile:** PWA only for Phase 1.

### Data Architecture

* **Database:** PostgreSQL (Supabase Managed).
* **Schema Strategy:** Relational (Users <-> Bounties <-> Submissions).
* **Data Access:** Direct RLS Policies (Security enforced at DB layer).
* **Client State:** Zustand for ephemeral Game State (XP/Coins).

### Authentication & Security

* **Auth Provider:** Supabase Auth (GitHub OAuth).
* **Game Bridge Security:** `iframe.contentWindow.postMessage(session_token)` to pass Auth Token.
* **Validation:** Zod schemas shared between Client and Server Actions.

### API & Communication Patterns

* **Primary Pattern:** Next.js Server Actions (Mutations) + RLS (Fetching).
* **No API Layer:** No Express/Rest API. Direct DB access from Server Components.
* **Realtime:** Supabase Realtime Channels for Game <-> Dashboard sync.

### Frontend Architecture

* **Component Model:** React Server Components (RSC) where possible.
* **Client Components:** Only for interactive islands (Game, Forms).
* **Styling:** Tailwind CSS + Shadcn/UI (Radix).

### Infrastructure & Deployment

* **Host:** Vercel (Frontend/Edge Functions).
* **Database Host:** Supabase Cloud.
* **Game Assets:** Hosted on Vercel Public (Static) or separate subdomain.
* **CI/CD:** Vercel GitHub Integration (Auto-deploy on merge).

### Decision Impact Analysis

**Implementation Sequence:**

1. Initialize Next.js + Supabase.
1. Initialize Next.js + Supabase.
2. Configure Auth + RLS Types.
3. Build "Game Bridge" Proof-of-Concept.
4. Implement manual Bounty Board.

**Cross-Component Dependencies:**

* **Game Bridge:** Depends heavily on Supabase Auth Cookie configuration.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
4 areas (Naming, Structure, Communication, Process) where strict consistency is required.

### Naming Patterns

**Database Naming Conventions:**

* **Tables:** `snake_case` (e.g., `user_profiles`, `bounty_submissions`).
* **Columns:** `snake_case` (e.g., `is_active`, `github_url`).
* **Foreign Keys:** `target_id` (e.g., `user_id`, `bounty_id`).

**API/Action Naming Conventions:**

* **Server Actions:** `verbNoun` (e.g., `createBounty`, `fetchUserProfile`).
* **URL Slugs:** `kebab-case` (e.g., `/bounty-board/landing-page-component`).

**Code Naming Conventions:**

* **Files:** `kebab-case.tsx` (e.g., `bounty-card.tsx`, `auth-provider.tsx`). _Strict enforcement to avoid Git casing issues._
* **Components:** `PascalCase` (e.g., `BountyCard`).
* **Hooks:** `camelCase` (e.g., `useGameState`).

### Structure Patterns

**Project Organization:**

* **Feature-Sliced Design:** Group by Feature, NOT by Type.
  * `src/features/auth/*`
  * `src/features/bounty-board/*`
  * `src/features/admin-dashboard/*`
* **Shared UI:** `src/components/ui/*` (Shadcn primitives).

**File Structure Patterns:**

* **Pages:** `page.tsx` (Next.js default).
* **Layouts:** `layout.tsx` (Next.js default).
* **Colocation:** Keep related utils/types INSIDE the feature folder.

### Format Patterns

**API Response Formats (Server Actions):**

* **Wrapper:**

    ```typescript
    type ActionResult<T> = {
      data: T | null;
      error: string | null;
    }
    ```

* **No Exceptions:** Server Actions must catch errors and return the error string, NEVER throw to the client.

### Communication Patterns

**Event System Patterns (Game Bridge):**

* **Protocol:** `window.postMessage`
* **Event Name:** `KRACKED_AUTH_SYNC`
* **Payload:** `{ type: 'KRACKED_AUTH_SYNC', token: string, user_id: string }`

**State Management Patterns:**

* **Server:** React Query (automatic caching/revalidation).
* **Game Client:** Zustand (ephemeral state like 'current level').

### Enforcement Guidelines

**All AI Agents MUST:**

* Use `kebab-case` for ALL filenames.
* Place new business logic in `src/features/[feature-name]`.
* Wrap Server Action returns in the standard `ActionResult` type.

**Anti-Patterns:**

* ❌ Putting all components in a giant `src/components` folder.
* ❌ Throwing errors from Server Actions without catching them.
* ❌ Using `camelCase.tsx` filenames.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
krackeddevs/
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
├── supabase/
│   ├── config.toml           # Local Supabase Config
│   └── migrations/           # SQL Migrations
├── src/
│   ├── app/
│   │   ├── (public)/         # SEO Optimized Public Pages
│   │   │   ├── page.tsx      # Landing
│   │   │   └── bounties/
│   │   ├── (admin)/          # Protected Admin Routes
│   │   │   └── dashboard/
│   │   ├── (auth)/           # Auth Routes (not protected)
│   │   │   ├── login/
│   │   │   └── callback/
│   │   ├── api/
│   │   │   └── webhooks/     # Stripe/System Webhooks
│   │   ├── globals.css
│   │   └── layout.tsx        # Root Layout
│   ├── components/
│   │   ├── ui/               # Shadcn Primitives (Button, Badge)
│   │   └── providers.tsx     # React Query / Theme Providers
│   ├── features/
│   │   ├── access-control/   # RLS & Role logic
│   │   ├── auth/             # Login Forms & Actions
│   │   ├── game-bridge/      # Iframe & PostMessage Logic
│   │   ├── bounty-board/     # Listings, Search, Filters
│   │   ├── submissions/      # Submission Logic & Validation
│   │   └── profiles/         # User Profile & Stats
│   ├── lib/
│   │   ├── supabase/         # Client/Server Utilities
│   │   └── utils.ts          # Shared helpers (cn, dates)
│   └── types/                # Global DB Types
└── public/
    ├── assets/
    └── game/                 # External Game Build (if self-hosted)
```

### Architectural Boundaries

**API Boundaries (Internal):**

* **Server Actions:** live closest to the feature (e.g., `src/features/bounty-board/actions.ts`).
* **Data Access:** Components NEVER import SQL directly. They import Server Actions or Hooks.

**Component Boundaries:**

* **Public/Admin Split:** Strict separation in `src/app`. Admin layout uses distinct specific sidebar navigation.
* **Game Isolation:** The Game lives in an `iframe` and communicates strictly via `window.postMessage`.

### Requirements to Structure Mapping

**Feature/Epic Mapping:**

* **User Management:** `src/features/access-control` + `src/features/profiles`
* **Bounty Marketplace:** `src/features/bounty-board`
* **Game Integration:** `src/features/game-bridge` + `public/game`
* **Admin Ops:** `src/app/(admin)/dashboard`

### Integration Points

**Internal Communication:**

* **Game <-> App:** `postMessage` (Client Side) -> `Server Action` (DB Side).
* **Components <-> Data:** React Query (Hooks) for fetching, Server Actions for mutations.

**External Integrations:**

* **GitHub OAuth:** Handled by Supabase Auth (Callback route).
* **Payment Gateway:** (Phase 2) Webhooks in `src/app/api/webhooks`.

### File Organization Patterns

**Source Organization:**

* **Colocation:** `actions.ts`, `types.ts`, and `components/` live INSIDE their feature folder.
* **"Barrel" Files:** Use `index.ts` in feature folders to expose only public components.

## Architecture Validation Results

### Coherence Validation ✅

* **Decision Compatibility:** Next.js + Supabase + Shadcn is a proven "Golden Stack." No conflicts.
* **Pattern Consistency:** Feature-sliced design aligns perfectly with Next.js App Router's file-system routing.

### Requirements Coverage Validation ✅

* **Game Integation:** Covered by `src/features/game-bridge` + `public/game` + PostMessage Pattern.
* **SEO:** Covered by `src/app/(public)` static routes.
* **Security:** Covered by RLS Policies and `src/features/access-control`.

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**First Implementation Priority:**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
